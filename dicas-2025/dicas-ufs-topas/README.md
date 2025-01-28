# **Apostila Básica: Introdução ao TOPAS - Simulação Monte Carlo em Física Médica**

## **1. Introdução à Física Médica**
   - **Definição**: O que é física médica?
   - **Aplicações da Física Médica**:
     - Radioterapia
     - Imagens médicas (Raio-X, CT, PET, etc.)
     - Controle de qualidade em equipamentos
   - **Importância da Simulação Monte Carlo**:
     - Precisão no cálculo de dose
     - Modelagem de interação da radiação com tecidos e materiais

## **2. O que é o TOPAS?**
   - **Definição**: TOPAS (**TOol for PArticle Simulation**) é uma ferramenta baseada no Geant4.
   - **Importância do TOPAS**:
     - Uso em radioterapia, radiobiologia e imagem médica
     - Simples para usuários sem conhecimento avançado de programação
   - **História e Objetivos**:
     - Surgiu para simplificar simulações Monte Carlo complexas
     - Ampla aceitação na comunidade científica (mais de 900 usuários no mundo)

## **3. Conceitos Básicos do TOPAS**
   - **Simulações Monte Carlo**:
     - O que é? Modelagem estatística de processos aleatórios
     - Aplicação em física médica: interação de partículas com matéria
   - **Geometria e Materiais**:
     - Como modelar objetos (pacientes, detectores, etc.)
     - Exemplos: cilindro de água, fantomas de teste
   - **Fontes de Partículas**:
     - Tipos de partículas: fótons, elétrons, prótons, etc.
     - Definição de feixes e suas energias
   - **Scorers**: Ferramentas que registram resultados (dose, fluência, etc.)
     - Dose média em tecidos
     - Simulação de imagens médicas (próton CT, por exemplo)

## **4. Configurando o TOPAS**
   - **Requisitos Básicos**:
     - Computador com sistema operacional Linux, MacOS ou Windows com suporte ao TOPAS
     - Conhecimento básico de arquivos texto
   - **Instalação**:
     - Onde baixar: [topasmc.org](http://topasmc.org)
     - Pré-requisitos do sistema
   - **Estrutura de um Projeto TOPAS**:
     - Arquivos de **Controle de Parâmetros** (`.txt`)
     - Exemplos práticos:
       - Criação de uma geometria simples (cubo de água)
       - Definição de uma fonte de prótons
       - Registro de dose em um fantoma

### **Exemplo de Parâmetro Básico**:
```plaintext
s:Ge/MyBox/Type = "TsBox"           # Declara um cubo
d:Ge/MyBox/HLX = 5.0 cm             # Define metade do comprimento do cubo (X)
d:Ge/MyBox/HLY = 5.0 cm             # Define metade do comprimento do cubo (Y)
d:Ge/MyBox/HLZ = 5.0 cm             # Define metade do comprimento do cubo (Z)
s:Ge/MyBox/Material = "G4_WATER"    # Material: água
```

## **5. Aplicações do TOPAS na Física Médica**
   - **Radioterapia de Prótons**:
     - Modelagem de **curvas de Bragg** (distribuição de dose de prótons)
     - Avaliação de heterogeneidades nos tecidos
   - **Radiobiologia**:
     - Simulações em escala celular (TOPAS-nBio)
   - **Imagens Médicas**:
     - Simulação de detectores
     - Reconstrução de imagens com partículas (ex: Próton-CT)
   - **Brachyterapia**:
     - Simulação de fontes radioativas, como o **Ir-192**

## **6. Exercício Prático Simples**
   - **Objetivo**: Simular a passagem de um feixe de prótons através de um cilindro de água.
   - **Etapas**:
     1. Criar a geometria (cilindro de água)
     2. Configurar a fonte de prótons (energia inicial e posição)
     3. Adicionar scorers (dose média absorvida)
     4. Executar a simulação no TOPAS

   **Exemplo de Código**:
   ```plaintext
   # Definição da Geometria
   s:Ge/World/Type = "TsBox"
   d:Ge/World/HLX = 100.0 cm
   d:Ge/World/HLY = 100.0 cm
   d:Ge/World/HLZ = 100.0 cm
   s:Ge/World/Material = "G4_AIR"

   s:Ge/Cyl/Type = "TsCylinder"
   d:Ge/Cyl/Radius = 5.0 cm
   d:Ge/Cyl/HLZ = 10.0 cm
   s:Ge/Cyl/Material = "G4_WATER"

   # Fonte de Prótons
   s:So/Beam/Type = "TsBox"
   d:So/Beam/HLX = 1.0 mm
   d:So/Beam/PosX = -10.0 cm
   d:So/Beam/Energy = 150.0 MeV

   # Scorer de Dose
   s:Sc/Dose/Quantity = "DoseToMedium"
   s:Sc/Dose/Component = "Cyl"
   ```

## **7. Conclusão**
   - A importância do TOPAS na física médica moderna
   - Simulações precisas melhoram tratamentos e diagnósticos
   - Ferramenta acessível para estudantes e profissionais

## **8. Referências e Materiais de Apoio**
   - **Site Oficial**: [topasmc.org](http://topasmc.org)
   - **Documentação**: TOPAS User Guide
   - **Artigos Principais**: Estudos de caso e aplicações em física médica
