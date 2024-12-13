https://www.paraview.org/Wiki/ParaView/Plugin_HowTo



Desenvolver um plugin para o ParaView permite que você estenda suas funcionalidades, adicionando novos leitores de arquivos, filtros ou representações de dados. Para criar um plugin que possibilite a visualização de seu formato específico de dados, siga estes passos:

1. **Escreva a Classe VTK Personalizada**: Desenvolva uma classe em C++ que herde de uma classe apropriada do VTK, como `vtkUnstructuredGridAlgorithm`, implementando a lógica necessária para ler seu formato de arquivo.

2. **Crie o Arquivo de Configuração do Gerenciador de Servidor**: Elabore um arquivo XML que descreva a interface do seu leitor para o ParaView, especificando propriedades e comportamentos.

3. **Configure o Ambiente de Compilação com CMake**: Utilize o CMake para configurar o processo de compilação do seu plugin, assegurando que ele seja compatível com a versão do ParaView que você está utilizando.

4. **Compile o Plugin**: Com o ambiente configurado, compile o plugin para gerar a biblioteca compartilhada correspondente.

5. **Carregue o Plugin no ParaView**: No ParaView, acesse `Ferramentas` > `Gerenciar Plugins` e carregue a biblioteca do seu plugin.

