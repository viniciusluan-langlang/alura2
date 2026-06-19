Atualização: melhorias de layout e UX

O commit adiciona as seguintes melhorias ao scaffold original:
- Barra de salto (skip link) para acessibilidade.
- Sidebar com transições suaves e suporte a abrir/fechar em telas pequenas.
- Menu convertido para botões com roles ARIA e navegação por teclado (Enter/Space/Setas).
- Painéis agora são mostrados/ocultados via atributo [hidden] para manter melhor comportamento com leitores de tela.
- Persistência simples das preferências: cor de fundo, animação e itens (localStorage).
- Debounce no redimensionamento da janela para evitar recalculos excessivos do canvas.
- Foco gerenciável quando o menu é aberto, melhores estilos de foco.

Esses ajustes melhoram a usabilidade para teclado e leitores de tela, além de dar uma experiência mais suave em mobile.
