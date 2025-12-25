# Um País, Muitas Crenças

Bem-vindo ao repositório do projeto "Um País, Muitas Crenças". Este site é uma plataforma dedicada à exploração, debate e compreensão da diversidade religiosa, com um foco especial no contexto moçambicano.

## Deploy Automático (CI/CD)

O site está a ser publicado automaticamente através da Netlify. **Qualquer alteração enviada para o ramo `main` deste repositório será refletida no site ao vivo em poucos minutos.**

## Tecnologias Utilizadas

*   **HTML5:** Para a estrutura e conteúdo das páginas.
*   **CSS3:** Para o estilo e design visual.
*   **JavaScript (Vanilla):** Para a funcionalidade interativa e a modularização do layout.
*   **GitHub Actions:** Para a automação do processo de deploy.
*   **Netlify:** Para a hospedagem do site.

## Estrutura do Projeto e o Sistema de Layout Modular

Para facilitar a manutenção, o site utiliza um sistema de layout modular baseado em JavaScript.

*   `index.html`, `sobre.html`, etc.: Ficheiros HTML principais que contêm o conteúdo específico de cada página.
*   `menu.html`: Um ficheiro que contém **apenas** o código HTML do menu de navegação principal.
*   `footer.html`: Um ficheiro que contém **apenas** o código HTML do rodapé principal.
*   `layout.js`: Um script que carrega dinamicamente o conteúdo de `menu.html` e `footer.html` e o insere em todas as páginas.
*   `css/`: Contém as folhas de estilo.
    *   `Um País Muitas Crenças.css`: Estilos globais do site.
    *   `menu.css`: Estilos específicos para o menu e rodapé.
    *   Outros ficheiros `tema-*.css`: Estilos para secções ou temas específicos.

## Como Fazer a Manutenção e Atualizar o Conteúdo

### 1. Editar o Menu ou o Rodapé (Alteração Global)

Esta é a grande vantagem do novo sistema. Para alterar o menu ou o rodapé em **todas as páginas de uma só vez**:

1.  **Para o menu:** Abra e edite o ficheiro `menu.html`.
2.  **Para o rodapé:** Abra e edite o ficheiro `footer.html`.
3.  Guarde o ficheiro e envie para o GitHub (`git commit` e `git push`). A alteração será aplicada a todo o site.

### 2. Editar o Conteúdo de uma Página Existente

Para alterar o texto, imagens ou qualquer outro conteúdo específico de uma página (sem ser o menu ou o rodapé):

1.  Encontre e abra o ficheiro `.html` correspondente (ex: `index.html` ou `sobre IPHC.html`).
2.  Faça as alterações diretamente no HTML.
3.  Guarde o ficheiro e envie para o GitHub.

### 3. Adicionar uma Nova Página

1.  **Crie um novo ficheiro HTML** (ex: `nova-pagina.html`).
2.  **Estruture o corpo (`<body>`)** da sua nova página da seguinte forma:

    ```html
    <body>
        <!-- Onde o menu será carregado -->
        <div id="menu-container"></div>

        <!-- SEU CONTEÚDO PRINCIPAL VAI AQUI -->
        <header>...</header>
        <main>...</main>
        <!-- FIM DO SEU CONTEÚDO PRINCIPAL -->

        <!-- Onde o rodapé será carregado -->
        <div id="footer-container"></div>

        <!-- Script que carrega o menu e o rodapé -->
        <script src="layout.js"></script>
    </body>
    ```

3.  Adicione as suas folhas de estilo e o conteúdo principal.
4.  Guarde e envie para o GitHub.

### 4. Adicionar um Novo Debate ao Arquivo

Este processo continua similar, mas agora integrado com o novo sistema de layout.

1.  **Duplicar o Modelo:** Use `debate_template.html` como base. Faça uma cópia e renomeie-a (ex: `debate_proverbios_16_9.html`).
2.  **Editar o Novo Ficheiro:** Abra a cópia e edite o conteúdo (título, versículo, análise). A estrutura com os contentores de menu/rodapé e o script `layout.js` já estará lá.
3.  **Adicionar Link no Arquivo:** Abra `debate.html`, vá até à secção de arquivo e adicione um novo link para o seu ficheiro recém-criado.
4.  **Enviar para o GitHub:** Guarde ambos os ficheiros, faça o `commit` e o `push`.

---
*Este README foi atualizado para refletir a nova arquitetura modular do projeto.*
