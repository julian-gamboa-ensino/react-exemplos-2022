# Apostila - Configurando TOTP com Cognito e Amplify no Angular

## Introdução
Olá, alunos! Nesta apostila, vamos construir o componente Angular `setup-totp`, que adiciona autenticação multifator (MFA) com **TOTP (Time-Based One-Time Password)** ao nosso sistema usando **AWS Cognito** e **AWS Amplify**. Vamos imaginar que estamos construindo uma "portaria dupla" para o nosso aplicativo: a senha é a chave, e o TOTP é um crachá eletrônico que muda a cada 30 segundos, garantindo mais segurança. Usaremos o Amplify para uma UI de login pronta e para gerenciar o TOTP, tudo integrado com o Cognito. Vamos aprender conceitos importantes, como o método `verifyTOTPCode`, e explorar o fluxo de autenticação passo a passo!

## O que é TOTP e MFA?
- **TOTP (Time-Based One-Time Password)**: É um código temporário gerado por um aplicativo autenticador (ex.: Google Authenticator) a cada 30 segundos. Ele é baseado em uma chave secreta e no horário atual, garantindo que o código seja único e expire rapidamente.
- **MFA (Multi-Factor Authentication)**: Adiciona camadas extras de segurança ao login. Além da senha (fator 1: algo que você sabe), o TOTP é um segundo fator (fator 2: algo que você tem, como o celular com o app autenticador). Isso protege contra roubo de senhas, pois o invasor precisaria do código TOTP.
- **Analogia**: Pense no login com senha como a chave de um prédio. O TOTP é um crachá que você escaneia na entrada, e o código dele muda a cada 30 segundos. Sem o crachá, ninguém entra, mesmo com a chave!

## Pré-requisitos
Antes de começar, tenha:
- **Node.js** (v18+).
- **Angular CLI** instalado (`npm install -g @angular/cli`).
- Conta na [AWS](https://aws.amazon.com) com acesso ao Cognito.
- Editor de código (ex.: VS Code).
- Aplicativo autenticador no celular (ex.: Google Authenticator).

## Configurando o AWS Cognito
O Cognito gerencia os usuários e o TOTP. Siga esses passos:

1. **Crie um User Pool**:
   - Acesse o [Console do Cognito](https://console.aws.amazon.com/cognito).
   - Clique em "Manage User Pools" > "Create a user pool".
   - Nomeie como `CertificadosUserPool` e clique em "Review defaults".
   - Em "Attributes", marque "Email" como obrigatório.
   - Em "MFA and verifications", habilite "Optional MFA" e selecione "TOTP (software token)".
   - Crie o pool.

2. **Crie um App Client**:
   - No User Pool, vá para "App integration" > "App client settings" > "Create app client".
   - Nomeie como `CertificadosApp` e desmarque "Generate client secret".
   - Adicione `http://localhost:4200` em "Callback URLs" e "Sign-out URLs".
   - Habilite "Implicit grant" e os escopos `openid`, `email`, `profile`.
   - Salve.

3. **Crie um Usuário de Teste**:
   - Vá para "Users and groups" > "Create user".
   - Use: 
     - Username: `teste@exemplo.com`
     - Password: `Teste123!` (temporária)
     - Email: `teste@exemplo.com`
   - Crie o usuário (ficará em "FORCE_CHANGE_PASSWORD").

4. **Anotações**:
   - Anote o `User Pool ID` (ex.: `us-west-2_abc123xyz`), `App Client ID` (ex.: `7xyz123abc456def789ghi`), e `Região` (ex.: `us-west-2`).

## Configurando o Projeto Angular
Vamos preparar o ambiente para usar o Amplify e criar o componente.

1. **Crie o Projeto**:
   - Execute:
     ```bash
     ng new login-aula-cognito --standalone --routing
     cd login-aula-cognito
     ```
   - Instale as dependências:
     ```bash
     npm install aws-amplify @aws-amplify/ui-angular qrcode
     ```

2. **Configure o Amplify**:
   - Edite `src/main.ts`:
     ```typescript
     import { bootstrapApplication } from '@angular/platform-browser';
     import { appConfig } from './app/app.config';
     import { AppComponent } from './app/app.component';
     import { Amplify } from 'aws-amplify';

     Amplify.configure({
       Auth: {
         region: 'us-west-2', // Substitua pela sua região
         userPoolId: 'us-west-2_abc123xyz', // Substitua pelo seu User Pool ID
         userPoolWebClientId: '7xyz123abc456def789ghi', // Substitua pelo seu App Client ID
         mandatorySignIn: false,
       },
     });

     bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
     ```
   - Substitua os valores de `region`, `userPoolId`, e `userPoolWebClientId` pelos seus.

3. **Crie o Componente de Login**:
   - Gere o componente:
     ```bash
     ng g c login
     ```
   - Edite `src/app/login/login.component.ts`:
     ```typescript
     import { Component } from '@angular/core';
     import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
     import { Router } from '@angular/router';
     import { Auth } from 'aws-amplify';

     @Component({
       selector: 'app-login',
       standalone: true,
       imports: [AmplifyAuthenticatorModule],
       templateUrl: './login.component.html',
       styleUrls: ['./login.component.css'],
     })
     export class LoginComponent {
       constructor(private readonly router: Router) {}

       async handleSignIn() {
         try {
           const session = await Auth.currentSession();
           const idToken = session.getIdToken().getJwtToken();
           localStorage.setItem('idToken', idToken);
           console.log('Login bem-sucedido! ID Token:', idToken);
           this.router.navigate(['/home']);
         } catch (err) {
           console.error('Erro ao obter sessão:', err);
         }
       }
     }
     ```
   - Edite `src/app/login/login.component.html`:
     ```html
     <div class="container">
       <amplify-authenticator
         [signUpAttributes]="['email']"
         (signedIn)="handleSignIn()"
       ></amplify-authenticator>
     </div>
     ```
   - Edite `src/app/login/login.component.css` (opcional, para estilizar):
     ```css
     .container {
       max-width: 400px;
       margin: 50px auto;
       padding: 20px;
       border: 1px solid #ccc;
       border-radius: 5px;
       text-align: center;
     }
     ```

4. **Crie o Componente `setup-totp`**:
   - Gere o componente:
     ```bash
     ng g c setup-totp
     ```
   - Edite `src/app/setup-totp/setup-totp.component.ts`:
     ```typescript
     import { Component, OnInit } from '@angular/core';
     import { Auth } from 'aws-amplify';
     import * as QRCode from 'qrcode';
     import { Router } from '@angular/router';

     @Component({
       selector: 'app-setup-totp',
       standalone: true,
       templateUrl: './setup-totp.component.html',
       styleUrls: ['./setup-totp.component.css'],
     })
     export class SetupTotpComponent implements OnInit {
       qrCodeURL: string | null = null;
       totpCode: string = '';
       status: string = '';
       user: any = null;

       constructor(private readonly router: Router) {}

       async ngOnInit() {
         try {
           this.user = await Auth.currentAuthenticatedUser();
         } catch (error) {
           console.error('Usuário não autenticado:', error);
           this.status = 'Você precisa estar logado para configurar o TOTP.';
           this.router.navigate(['/login']);
         }
       }

       async generateQRCode() {
         if (!this.user) {
           this.status = 'Usuário não autenticado.';
           return;
         }
         try {
           const secretCode = await Auth.setupTOTP(this.user);
           const totpURL = `otpauth://totp/${encodeURIComponent(this.user.username)}?secret=${secretCode}&issuer=CertificadosApp`;
           const qrCode = await QRCode.toDataURL(totpURL);
           this.qrCodeURL = qrCode;
           this.status = 'QR Code gerado. Escaneie com seu aplicativo autenticador.';
         } catch (error) {
           console.error('Erro ao configurar TOTP:', error);
           this.status = 'Erro ao configurar TOTP. Tente novamente.';
         }
       }

       async verifyTOTPCode() {
         if (!this.user) {
           this.status = 'Usuário não autenticado.';
           return;
         }
         try {
           await Auth.verifyTotpToken(this.user, this.totpCode);
           this.status = 'TOTP configurado com sucesso!';
           this.router.navigate(['/home']);
         } catch (error) {
           console.error('Erro ao validar TOTP:', error);
           this.status = 'Erro ao validar o código TOTP. Verifique e tente novamente.';
         }
       }
     }
     ```
   - Edite `src/app/setup-totp/setup-totp.component.html`:
     ```html
     <div>
       <h2>Configurar TOTP</h2>
       @if (!qrCodeURL) {
         <button (click)="generateQRCode()">Gerar QR Code</button>
       }
       @if (qrCodeURL) {
         <div>
           <p>Escaneie este código QR com seu aplicativo autenticador:</p>
           <img [src]="qrCodeURL" alt="QR Code para TOTP" />
           <div>
             <label>
               Insira o código gerado pelo aplicativo:
               <input type="text" [(ngModel)]="totpCode" placeholder="Código MFA" />
             </label>
             <button (click)="verifyTOTPCode()">Validar TOTP</button>
           </div>
         </div>
       }
       @if (status) {
         <p [ngClass]="status.includes('Erro') ? 'text-danger' : 'text-success'">{{status}}</p>
       }
     </div>
     ```
   - Edite `src/app/setup-totp/setup-totp.component.css`:
     ```css
     div {
       max-width: 400px;
       margin: 50px auto;
       padding: 20px;
       border: 1px solid #ccc;
       border-radius: 5px;
       text-align: center;
     }
     h2 { font-size: 1.5em; margin-bottom: 20px; }
     p { margin: 10px 0; }
     img { margin: 10px 0; max-width: 200px; }
     label { display: block; margin: 15px 0; }
     input { width: 100%; padding: 8px; margin: 5px 0; border: 1px solid #ccc; border-radius: 4px; }
     button { padding: 10px 20px; margin: 10px 0; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
     button:hover { background-color: #0056b3; }
     .text-danger { color: red; margin-top: 10px; }
     .text-success { color: green; margin-top: 10px; }
     ```

5. **Atualize as Rotas**:
   - Edite `src/app/app.routes.ts`:
     ```typescript
     import { Routes } from '@angular/router';
     import { LoginComponent } from './login/login.component';
     import { SetupTotpComponent } from './setup-totp/setup-totp.component';
     import { HomeComponent } from './home/home.component';

     export const routes: Routes = [
       { path: 'login', component: LoginComponent },
       { path: 'setup-totp', component: SetupTotpComponent },
       { path: 'home', component: HomeComponent },
       { path: '', redirectTo: '/login', pathMatch: 'full' },
     ];
     ```
   - Crie `src/app/home/home.component.ts` (opcional, para página inicial):
     ```typescript
     import { Component } from '@angular/core';

     @Component({
       selector: 'app-home',
       standalone: true,
       template: `
         <div class="container">
           <h2>Bem-vindo!</h2>
           <p>Você está logado.</p>
           <a routerLink="/setup-totp">Configurar TOTP</a>
         </div>
       `,
       styles: [`
         .container { max-width: 400px; margin: 50px auto; padding: 20px; text-align: center; }
       `],
     })
     export class HomeComponent {}
     ```

## Fluxo de Autenticação com Amplify e Cognito
Entenda como o Amplify e o Cognito trabalham juntos:
1. **Login com Amplify**:
   - O componente `<amplify-authenticator>` no `login.component` renderiza uma UI pronta para login, cadastro e recuperação de senha.
   - Quando o usuário faz login, o Amplify usa o Cognito para autenticar e retorna tokens (ex.: `idToken`).
   - Salvamos o `idToken` no `localStorage` para uso futuro.

2. **Configuração do TOTP**:
   - No `setup-totp.component`, usamos o Amplify para configurar o TOTP.
   - O método `Auth.setupTOTP(user)` gera uma chave secreta para o usuário no Cognito.
   - Essa chave é usada para criar um QR Code, que o usuário escaneia com um app autenticador.
   - O método `verifyTOTPCode` valida o código TOTP inserido.

3. **Login Futuro com MFA**:
   - Após configurar o TOTP, o Cognito exige o código TOTP em logins futuros.
   - O Amplify exibe um campo para o código MFA na UI de login.

**Analogia**: O Amplify é como um recepcionista que conversa com o Cognito (o gerente de segurança). O recepcionista entrega um crachá (QR Code) e verifica se o código do crachá está correto (`verifyTOTPCode`).

## Conceito: O Método `verifyTOTPCode`
O método `verifyTOTPCode` é essencial para ativar o TOTP no Cognito. Vamos detalhar sua função:

### O que faz?
- **Valida o código TOTP**: O método `Auth.verifyTotpToken(user, totpCode)` verifica se o código TOTP inserido pelo usuário (ex.: `123456`) corresponde ao código esperado, baseado na chave secreta gerada por `Auth.setupTOTP`.
- **Ativa o MFA no Cognito**: Se o código for válido, o Cognito associa o TOTP ao usuário, exigindo o código MFA em logins futuros.
- **Redireciona ou exibe erros**: Após a validação, redirecionamos para `/home` (sucesso) ou mostramos uma mensagem de erro.

### Código do Método
```typescript
async verifyTOTPCode() {
  if (!this.user) {
    this.status = 'Usuário não autenticado.';
    return;
  }
  try {
    await Auth.verifyTotpToken(this.user, this.totpCode);
    this.status = 'TOTP configurado com sucesso!';
    this.router.navigate(['/home']);
  } catch (error) {
    console.error('Erro ao validar TOTP:', error);
    this.status = 'Erro ao validar o código TOTP. Verifique e tente novamente.';
  }
}
```

### Como Funciona Internamente?
1. **Verificação de Autenticação**:
   - Checa se `this.user` existe (obtido por `Auth.currentAuthenticatedUser()`).
   - Se não houver usuário, exibe uma mensagem e interrompe.

2. **Chamada ao Amplify**:
   - `Auth.verifyTotpToken(user, totpCode)` envia o código TOTP ao Cognito.
   - O Cognito compara o código com o esperado, usando a chave secreta e o horário atual.
   - Se válido, o Cognito ativa o TOTP para o usuário.

3. **Tratamento de Resultado**:
   - **Sucesso**: Define `status` como "TOTP configurado com sucesso!" e redireciona para `/home`.
   - **Erro**: Captura o erro (ex.: código inválido, sincronização de horário errada), define `status` como mensagem de erro e exibe para o usuário.

### Por que é Importante?
- **Segurança**: Garante que o TOTP foi configurado corretamente antes de ativar o MFA.
- **Experiência do Usuário**: Fornece feedback claro (sucesso ou erro).
- **Integração com Cognito**: Faz a ponte entre o frontend (Angular) e o backend (Cognito) para ativar o MFA.

### Exemplo Prático
Imagine que você escaneou o QR Code com o Google Authenticator, e o app gerou o código `123456`. Você insere esse código no campo do componente `setup-totp` e clica em "Validar TOTP":
- O método `verifyTOTPCode` envia `123456` ao Cognito.
- O Cognito verifica se o código é válido.
- Se válido, você vê "TOTP configurado com sucesso!" e é redirecionado para `/home`.
- No próximo login, o Cognito pedirá um código TOTP, e você usará o app para gerá-lo.

## Gerenciamento de Erros no `verifyTOTPCode`
O método lida com erros comuns:
- **Código TOTP Inválido**: Se o código estiver errado, o Cognito retorna um erro, e exibimos "Erro ao validar o código TOTP. Verifique e tente novamente.".
- **Sincronização de Horário**: O TOTP depende do horário. Se o celular ou servidor estiverem dessincronizados, o código será inválido. Solução: Sincronize o horário do celular.
- **Usuário Não Autenticado**: Verificamos `this.user` para evitar chamadas inválidas.
- **Erros de Rede**: O `try/catch` captura falhas de conexão e exibe uma mensagem amigável.

## Testando o Componente
1. **Execute o Projeto**:
   - Use:
     ```bash
     ng serve
     ```
   - Acesse `http://localhost:4200`.

2. **Faça Login**:
   - Vá para `/login`. A UI do Amplify aparecerá.
   - Use `teste@exemplo.com` e `Teste123!` (mude a senha se solicitado).
   - Após o login, você será redirecionado para `/home`.

3. **Configure o TOTP**:
   - Clique em "Configurar TOTP" em `/home` para ir a `/setup-totp`.
   - Clique em "Gerar QR Code". Um QR Code aparecerá.
   - Escaneie o QR Code com seu aplicativo autenticador.
   - Insira o código TOTP gerado e clique em "Validar TOTP".
   - Veja a mensagem "TOTP configurado com sucesso!" e o redirecionamento para `/home`.

4. **Teste o MFA**:
   - Faça logout (limpe o `localStorage` ou adicione um botão de logout).
   - Faça login novamente. O Cognito pedirá o código TOTP.

## Personalizando a UI do Componente
Você pode estilizar o componente `setup-totp` para combinar com o design do seu app:
- **Mudar Cores**:
  - No CSS, altere o `background-color` dos botões (ex.: `#ff5733` para um laranja vibrante).
  - Exemplo:
    ```css
    button { background-color: #ff5733; }
    button:hover { background-color: #c70039; }
    ```
- **Ajustar o Tamanho do QR Code**:
  - Modifique o `max-width` da imagem:
    ```css
    img { max-width: 250px; }
    ```
- **Personalizar a UI do Amplify**:
  - No `login.component`, você pode estilizar o `<amplify-authenticator>`:
    ```html
    <amplify-authenticator [formFields]="formFields"></amplify-authenticator>
    ```
    ```typescript
    formFields = {
      signIn: {
        username: { label: 'E-mail', placeholder: 'Digite seu e-mail' },
        password: { label: 'Senha', placeholder: 'Digite sua senha' },
      },
    };
    ```

## Dicas Avançadas
### Depurando Problemas no `verifyTOTPCode`
- **Código Inválido**: Verifique o console para detalhes do erro (`console.error('Erro ao validar TOTP:', error)`). Certifique-se de que o código TOTP é o mais recente.
- **Sincronização de Horário**: No Google Authenticator, vá para Configurações > Correção de Tempo para Códigos e sincronize.
- **Logs Detalhados**: Adicione mais logs no método:
  ```typescript
  console.log('Código TOTP inserido:', this.totpCode);
  await Auth.verifyTotpToken(this.user, this.totpCode);
  console.log('TOTP validado com sucesso');
  ```

### Adicionando Logout
Adicione um botão de logout no `home.component`:
```typescript
import { Component } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="container">
      <h2>Bem-vindo!</h2>
      <p>Você está logado.</p>
      <a routerLink="/setup-totp">Configurar TOTP</a>
      <button (click)="logout()">Sair</button>
    </div>
  `,
  styles: [`
    .container { max-width: 400px; margin: 50px auto; padding: 20px; text-align: center; }
    button { margin-left: 10px; padding: 5px 10px; }
  `],
})
export class HomeComponent {
  async logout() {
    try {
      await Auth.signOut();
      localStorage.removeItem('idToken');
      window.location.href = '/login';
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }
}
```

## Dicas e Soluções de Problemas
- **Erro "Usuário não autenticado"**: Certifique-se de estar logado antes de acessar `/setup-totp`.
- **Erro ao gerar QR Code**: Verifique os valores em `main.ts` e reinstale `aws-amplify`.
- **Interface não aparece**: Confirme que `@aws-amplify/ui-angular` está importado no `login.component.ts`.
- **Capturar Imagem**: Use a ferramenta de captura de tela do navegador ou adicione `html2canvas` (veja o código na pasta).

## Próximos Passos
- Adicione um POST com `json-server` usando o `idToken` no branch `feature/post-json-server`.
- Explore personalização avançada do Amplify (ex.: internacionalização, temas).

## Agradecimentos
Obrigado por usar esta apostila! Crie, teste e divirta-se aprendendo. Qualquer dúvida, consulte o repositório ou peça ajuda ao professor.

*Data de atualização: 18/05/2025, 14:18 (horário de Brasília)*