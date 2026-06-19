# Alura2 - p5.js Website (Vite)

Este repositório contém um scaffold de site construído com HTML/CSS/JavaScript e p5.js, empacotado com Vite para desenvolvimento e build de produção.

## Visão geral
- p5.js em modo instance (importado via npm)
- Layout com sidebar, painéis, controles e canvas
- Acessibilidade básica (skip link, roles, foco)
- Persistência de preferências via localStorage
- Ambiente moderno com Vite para dev e build

---

## Desenvolvimento local
1. Instale dependências:

```bash
npm install
```

2. Rode em modo desenvolvimento (hot-reload):

```bash
npm run dev
```

3. Abra o endereço mostrado pelo Vite (por padrão http://localhost:5173).

---

## Build para produção
Para gerar os arquivos otimizados para produção:

```bash
npm run build
```

A saída estará na pasta `dist/`.

Para pré-visualizar o build localmente:

```bash
npm run preview
```

---

## Deploy (opções)
A seguir há 3 opções simples para publicar o site. Escolha a que fizer mais sentido para você.

Opção A — Deploy rápido usando `gh-pages` (branch `gh-pages`)
1. Instale o pacote `gh-pages` globalmente ou como dependência de desenvolvimento:

```bash
npm install --save-dev gh-pages
```

2. Adicione ao `package.json` (scripts) algo como:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Rode:

```bash
npm run deploy
```

Isso criará/atualizará a branch `gh-pages` com os arquivos do `dist/` e o GitHub Pages servirá o site.

Opção B — GitHub Pages usando a pasta `docs/`
1. Gere o build:

```bash
npm run build
```

2. Copie o conteúdo de `dist/` para `docs/` e commit no branch `main`:

```bash
rm -rf docs && cp -r dist docs
git add docs && git commit -m "Deploy: docs build" && git push
```

3. No repositório no GitHub, vá em Settings → Pages e selecione branch `main` e pasta `/docs`.

Opção C (recomendada) — Deploy automático com GitHub Actions (GitHub Pages)

Crie um workflow em `.github/workflows/pages.yml` com este conteúdo:

```yaml
name: Build and deploy

on:
  push:
    branches:
      - main

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: ./dist

      - name: Deploy
        uses: actions/deploy-pages@v1
```

Após adicionar este arquivo, na aba *Actions* do GitHub o workflow rodará em cada push para `main` e fará deploy automático para GitHub Pages. Depois ative o Pages (Settings → Pages) caso necessário; normalmente o workflow configura isso automaticamente.

---

## Observações importantes para GitHub Pages
- Se você publicar em um repo que usa um subpath (ex.: `https://username.github.io/repo-name/`), defina o `base` em `vite.config.js`:

```js
// vite.config.js
export default defineConfig({
  base: '/REPO-NAME/',
  // ...rest
});
```

- Se usar a opção A (gh-pages) ou C (Actions), o processo cuidará de servir o conteúdo de `dist/`.

---

## Boas práticas e próximos passos
- Refatorar dashboard para importar a API do sketch (em vez de usar `window.*`) para um código mais modular.
- Adicionar CI de lint (ESLint) e testes de UI (Playwright/Cypress) para garantir qualidade.
- Otimizar imagens e assets para reduzir o tamanho do build.

---

Se quiser, posso:
- Criar e commitar o workflow de GitHub Actions automaticamente (opção C), ou
- Refatorar o dashboard para usar imports (em vez de window), ou
- Ajustar `vite.config.js` com `base` já configurado para GitHub Pages.

Diga qual opção prefere que eu aplique e eu faço o commit das alterações.
