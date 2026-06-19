# Alura2 - p5.js Website Scaffold

Este repositório contém um exemplo de site em HTML/CSS/JavaScript usando p5.js.

Arquivos principais:
- index.html: layout com cabeçalho, menu, painel principal (canvas) e rodapé.
- css/styles.css: estilos responsivos e layout.
- js/sketch.js: sketch p5.js com API pública para controlar animação e cor de fundo.
- js/dashboard.js: lógica do menu e painel de controle.

Como usar:
1. Abra `index.html` em um navegador (arquivo local funciona porque usa CDN para p5.js).
2. No painel "Controles", altere a cor de fundo, ative a animação ou limpe a tela.

Notas de otimização:
- O sketch usa noLoop/redraw por padrão (só atualiza quando necessário) para reduzir uso de CPU.
- Canvas redimensiona com a janela para manter responsividade.

Contribuições e melhorias sugeridas:
- Adicionar módulos, empacotamento e build (Vite/Parcel) para produção.
- Permitir salvar configurações no localStorage.

