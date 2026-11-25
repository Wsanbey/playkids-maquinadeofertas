// Repassa UTMs e fbclid da página de vendas para o checkout da Cakto.
(function () {
  var params = new URLSearchParams(window.location.search);
  var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'src', 'fbclid'];
  var extras = keys
    .filter(function (key) { return params.get(key); })
    .map(function (key) { return key + '=' + encodeURIComponent(params.get(key)); });

  var links = document.querySelectorAll('a[data-checkout]');

  if (extras.length) {
    for (var i = 0; i < links.length; i++) {
      var base = links[i].getAttribute('href');
      links[i].href = base + (base.indexOf('?') > -1 ? '&' : '?') + extras.join('&');
    }
  }

  // Evento de clique no checkout (Meta Pixel)
  for (var j = 0; j < links.length; j++) {
    links[j].addEventListener('click', function () {
      if (window.fbq) fbq('track', 'InitiateCheckout');
    });
  }

  // Botão fixo no celular: aparece depois do herói, some perto da oferta.
  var sticky = document.querySelector('.sticky-cta');
  var hero = document.querySelector('.hero');
  var offer = document.getElementById('oferta');
  if (sticky && hero && 'IntersectionObserver' in window) {
    var heroOut = false, offerIn = false;
    var update = function () { sticky.classList.toggle('show', heroOut && !offerIn); };
    new IntersectionObserver(function (e) { heroOut = !e[0].isIntersecting; update(); }).observe(hero);
    new IntersectionObserver(function (e) { offerIn = e[0].isIntersecting; update(); }).observe(offer);
  }
})();
