(function () {
  var checkout = 'https://pay.cakto.com.br/37jonij';
  var params = new URLSearchParams(window.location.search);
  var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'src', 'fbclid'];
  var extras = keys.filter(function (key) { return params.get(key); }).map(function (key) { return key + '=' + encodeURIComponent(params.get(key)); });
  if (!extras.length) return;
  var links = document.querySelectorAll('a[href="' + checkout + '"]');
  for (var i = 0; i < links.length; i++) { links[i].href = checkout + '?' + extras.join('&'); }
})();