# Projeto de Filtros de Imagens com Rust, WebAssembly e JavaScript

Este é um projeto web experimental que utiliza **Rust**, **WebAssembly** e **JavaScript** para aplicar filtros em imagens diretamente no navegador.

## Objetivo
Explorar a integração de **Rust** e **WebAssembly** com tecnologias web para criar uma aplicação performática e interativa que permita aos usuários modificar imagens com diferentes filtros.

## Funcionalidades
- Upload de imagens pelo usuário.
- Aplicação de filtros variados como:
  - Escala de cinza.
  - Sepia.
  - Negativo.
  - Borrão.
- Visualização em tempo real dos resultados.

## Tecnologias Utilizadas
- **Rust**: Para implementar a lógica de processamento de imagens.
- **WebAssembly**: Para compilar o código Rust e executar no navegador.
- **JavaScript**: Para lidar com a interface e a comunicação com o WebAssembly.
- **HTML/CSS**: Para criar a interface do usuário.

## Como Executar
1. Certifique-se de ter o **Rust** instalado e configurado.
2. Instale o **wasm-pack** para compilar o projeto em WebAssembly:
   ```bash
   cargo install wasm-pack
   ```
3. Compile o projeto para WebAssembly:
   ```bash
   wasm-pack build --target web
   ```
4. Abra o arquivo HTML no navegador para interagir com a aplicação.

## Estado do Projeto
O projeto ainda está em desenvolvimento inicial e faz parte de um estudo sobre processamento de imagens e tecnologias web modernas. Feedbacks e sugestões são bem-vindos!