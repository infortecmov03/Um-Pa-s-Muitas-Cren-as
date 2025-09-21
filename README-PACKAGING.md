# Empacotamento e Atualizações (Windows e Android)

Este documento descreve como transformar este site em: (1) um aplicativo desktop para Windows usando Electron e (2) um aplicativo Android usando Capacitor, além do fluxo de atualização via GitHub Pages / Netlify.

Resumo das mudanças adicionadas ao projeto:
- `manifest.json` — metadados PWA
- `service-worker.js` — cache e estratégia offline-first
- `version.json` — versão/timestamp para detecção de atualizações
- `package.json` — scripts e dependências de desenvolvimento do Electron
- `electron/main.js` — entrada básica do Electron para Windows
- `capacitor.config.json` — configuração mínima para Capacitor

1) Requisitos
- Node.js (>=16) e npm instalados
- Para Windows: `electron-builder` (já listado nas devDependencies)
- Para Android: Java JDK, Android SDK, Android Studio + Capacitor CLI

2) Fazer o site funcionar como PWA (teste local)

Instale um servidor HTTP simples (opcional):

```powershell
npx http-server . -p 8080
```

Abra `http://localhost:8080` e verifique no DevTools > Application > Service Workers se o `service-worker.js` foi registrado. Teste o site offline (Desative rede e recarregue) para validar cache.

3) Atualizações via GitHub Pages / Netlify

Para que o app detecte atualizações, hospede o conteúdo do site (incluindo `version.json`) em pelo menos um dos endpoints usados pelo cliente. No ficheiro `script.js` há uma constante `REMOTE_VERSION_URLS` — substitua os placeholders por suas URLs reais:

- `https://<seu-usuario>.github.io/<repo>/version.json`
- `https://<seu-site>.netlify.app/version.json`

Quando você atualizar o conteúdo no repositório e fizer deploy no GitHub Pages/Netlify, atualize também `version.json` (p.ex. com um timestamp ISO). Os clientes online irão buscar `version.json` periodicamente (a cada 15 minutos) e, se detectarem uma versão diferente da local, irão acionar o service worker para atualizar o cache e notificar o usuário a recarregar.

4) Gerar executável Windows (Electron)

- Instale dependências:

```powershell
npm install
```

- Rodar em modo desenvolvimento:

```powershell
npm run start
```

- Para empacotar (produzir instalador/exe):

```powershell
npm run pack:win
```

Isso usa `electron-builder`. Ajuste `package.json` (campo `build`) caso queira configurações específicas (nome do instalador, ícones, assinatura, etc.).

Observação: O Electron carrega o `index.html` localmente; o service worker continuará disponível (é executado no contexto do renderer). O app terá comportamento offline via cache e o mesmo mecanismo de `version.json` aplica-se.

5) Gerar APK / AAB Android (Capacitor)

- Instale o Capacitor globalmente (se ainda não tiver):

```powershell
npm install @capacitor/cli @capacitor/core --save-dev
npx cap init mz.umpais.muitascrencas "Um Pais Muitas Crencas" --web-dir="."
```

- Adicione a plataforma Android:

```powershell
npx cap add android
```

- Abra o projeto native no Android Studio:

```powershell
npx cap open android
```

- No Android Studio: build > Generate Signed Bundle / APK para gerar APK/AAB.

Importante: o PWA hospedado localmente será copiado para o diretório `android/app/src/main/assets/public` quando você executar `npx cap copy` antes de abrir o projeto no Android Studio. Antes de cada build nativo, atualize seus arquivos web e rode `npx cap copy`.

6) Boas práticas e considerações
- Atualize `version.json` a cada deploy para que os clientes detectem mudanças.
- Verifique CORS e paths absolutos se usar recursos externos.
- Substitua placeholders das URLs de `REMOTE_VERSION_URLS` em `script.js`.
- Ícones: adicione `icons/icon-192.png` e `icons/icon-512.png` para boas experiências em dispositivos.
- Teste em dispositivos reais e emulados para Android.

7) Próximos passos (opcionais)
- Automatizar publicação do build web para GitHub Pages / Netlify via GitHub Actions.
- Usar `electron-updater` + servidor de releases para atualizações automáticas no desktop.
- Configurar HTTPS e headers cache-control apropriados no Netlify para controlar TTL.

Se quiser, eu posso:
- substituir os placeholders de `REMOTE_VERSION_URLS` pelas URLs reais (forneça-as);
- adicionar ícones padrão (posso gerar imagens PNG básicas se desejar);
- configurar um workflow de GitHub Actions para publicar automaticamente no GitHub Pages/Netlify.
