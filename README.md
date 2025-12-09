# Um País, Muitas Crenças

Bem-vindo ao repositório do projeto "Um País, Muitas Crenças". Este site é uma plataforma dedicada à exploração, debate e compreensão da diversidade religiosa, com um foco especial no contexto moçambicano.

O site está a ser publicado automaticamente através da Netlify. Qualquer alteração enviada para o ramo `main` deste repositório será refletida no site ao vivo em poucos minutos.

## Funcionalidades Principais

*   **Página Principal (`index.html`):** A porta de entrada para o site, apresentando as diferentes secções.
*   **Debates Bíblicos (`debate.html`):** Uma secção para a análise aprofundada de passagens bíblicas, com um sistema de comentários (Disqus) para que cada debate tenha a sua própria área de discussão.
*   **Arquivo de Debates:** Páginas individuais para debates passados (ex: `debate_exodo_20_5.html`), permitindo que a discussão continue.
*   **Estrutura Modular:** O código foi refatorado para ser mais fácil de manter, com ficheiros CSS e JavaScript dedicados para cada funcionalidade principal.

## Como Fazer a Manutenção e Atualizar o Conteúdo

A gestão do site foi pensada para ser o mais simples possível.

### 1. Editar o Texto de uma Página Existente

Para alterar qualquer texto, imagem ou link:

1.  Encontre o ficheiro `.html` correspondente à página que quer editar (por exemplo, `sobre.html` para a página "Sobre Nós", ou `index.html` para a página principal).
2.  Abra o ficheiro no seu editor de código.
3.  Faça as alterações diretamente no HTML.
4.  Guarde o ficheiro.
5.  Envie as alterações para o GitHub (`git commit` e `git push`). O site será atualizado automaticamente.

### 2. Adicionar um Novo Debate ao Arquivo

Este é o processo mais comum que irá realizar. Siga estes passos:

1.  **Duplicar o Modelo:** Na pasta principal, encontre o ficheiro `debate_exodo_20_5.html`. Este é o seu modelo. Faça uma cópia deste ficheiro.

2.  **Renomear a Cópia:** Renomeie a cópia para um nome descritivo do novo debate. Por exemplo, se o debate for sobre Provérbios 16:9, o nome poderia ser `debate_proverbios_16_9.html`.

3.  **Editar o Novo Ficheiro:** Abra o novo ficheiro (`debate_proverbios_16_9.html`) e atualize:
    *   O `<title>` no cabeçalho (`<head>`).
    *   O título principal na secção `header-analise`.
    *   A referência do versículo, a citação, o contexto histórico e os pontos de discussão.
    *   **Importante:** O sistema de comentários do Disqus irá funcionar automaticamente nesta nova página sem precisar de qualquer alteração.

4.  **Adicionar o Link na Página Principal de Debates:**
    *   Abra o ficheiro `debate.html`.
    *   Navegue até à secção `<!-- ARQUIVO DE DEBATES -->`.
    *   Copie um dos blocos `<a href=... class="arquivo-item">...</a>` existentes.
    *   Cole o bloco copiado e altere o `href` para o nome do seu novo ficheiro (ex: `href="debate_proverbios_16_9.html"`).
    *   Atualize a referência do versículo, o título e as tags dentro deste novo link.

5.  **Enviar para o GitHub:** Guarde ambos os ficheiros (`debate.html` e o seu novo ficheiro de debate), faça `git commit` e `git push`. O novo debate aparecerá no arquivo e a nova página estará funcional.

## Deploy Automático (CI/CD)

Este repositório usa **GitHub Actions** para fazer o deploy automático para a **Netlify**.

*   **Como Funciona:** O ficheiro `.github/workflows/netlify.yml` contém as instruções. Sempre que é detetada uma nova alteração (`push`) no ramo `main`, uma "Ação" é iniciada.
*   **O Processo:** A Ação faz o checkout do código mais recente e usa a ferramenta `nwtgck/actions-netlify@v2` para enviar o conteúdo do diretório para a Netlify.
*   **Segredos:** A comunicação segura é garantida por dois segredos configurados no repositório do GitHub (`Settings > Secrets and variables > Actions`): `NETLIFY_SITE_ID` e `NETLIFY_AUTH_TOKEN`.

**Em resumo: para atualizar o site, basta enviar o seu trabalho para o ramo `main` do GitHub.**
