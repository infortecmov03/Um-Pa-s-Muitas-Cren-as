
const CACHE_NAME = 'um-pais-muitas-crencas-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/Biblioteca Digital.html',
  '/Chegada do Islamismo a Moçambique.html',
  '/Comunidades Islâmicas.html',
  '/Cristianismo.html',
  '/Denominações Cristãs em Moçambique.html',
  '/Distribuição Religiosa em Moçambique.html',
  '/Festividades Cristãs em Moçambique e no Mundo.html',
  '/Guerras Religiosas em Moçambique.html',
  '/História do Cristianismo em Moçambique.html',
  '/História do Islamismo.html',
  '/Igreja Nações para Cristo Onório.html',
  '/Influência Cultural do Cristianismo em Moçambique.html',
  '/Mulheres nas Religiões.html',
  '/Ramadã e Celebrações Islâmicas.html',
  '/Religião e Independência.html',
  '/Sincretismo Religioso.html',
  '/Sobre Adventistas emMoçambique.html',
  '/Sobre Anglicana.html',
  '/Sobre Apostólica.html',
  '/Sobre Assembleia de Deus.html',
  '/Sobre Católica.html',
  '/Sobre Igreja Presbiteriana.html',
  '/Sobre Igreja Zionista.html',
  '/Sobre Igreja da Graça em Moçambique.html',
  '/Sobre Igreja de Deus.html',
  '/Sobre Igreja de Profetas em Moçambique.html',
  '/Sobre Maná.html',
  '/Sobre Metodista.html',
  '/Sobre Sara Nossa Terra em Moçambique.html',
  '/Sobre Testemunhas de Jeová em Moçambique.html',
  '/Sobre testemunhas de jeova.html',
  '/Sobre universal.html',
  '/Tradições do Islamismo.html',
  '/Um País Muitas Crenças.css',
  '/Um País Muitas Crenças.js',
  '/biblioteca.css',
  '/biblioteca.js',
  '/books.json',
  '/contato.css',
  '/contato.html',
  '/contato.js',
  '/debate.css',
  '/debate.html',
  '/debate_exodo_20_5.html',
  '/denuncia.css',
  '/denuncia.html',
  '/denuncia.js',
  '/dossie-testemunhas-de-jeova.html',
  '/estudos.css',
  '/estudos.html',
  '/estudos.js',
  '/footer.js',
  '/galeria-denominacoes.css',
  '/home.css',
  '/islamismo.html',
  '/mapa-distribuicao.css',
  '/mapa-distribuicao.js',
  '/menu.css',
  '/menu.js',
  '/scripts.js',
  '/sobre.css',
  '/sobre.html',
  '/tema-adventista.css',
  '/tema-analise-critica.css',
  '/tema-anglicana.css',
  '/tema-apostolica.css',
  '/tema-assembleia.css',
  '/tema-catolica.css',
  '/tema-contato.css',
  '/tema-cristianismo.css',
  '/tema-deus.css',
  '/tema-festividades.css',
  '/tema-graca.css',
  '/tema-historia.css',
  '/tema-islamismo.css',
  '/tema-metodista.css',
  '/tema-onorio.css',
  '/tema-presbiteriana.css',
  '/tema-profetas.css',
  '/tema-sara.css',
  '/tema-testemunhas.css',
  '/tema-universal.css',
  '/tema-zionista.css',
  '/testemunhos.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
