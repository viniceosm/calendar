(function () {
  var xTablets = window.matchMedia("only screen and (min-width: 600px)")
  var xDesktop = window.matchMedia("only screen and (min-width: 768px)")

  function testMedias() {
    if (xDesktop.matches) {
      respDiaDesktop()
    } else if (xTablets.matches) {
      respDiaDesktop()
    } else {
      respDiaMobile()
    }
  }

  testMedias()

  // seleciona o nó alvo
  var target = document.querySelector('body')

  // cria uma nova instância de observador
  var observer = new MutationObserver(function (mutations) {
    testMedias()
  })

  // configuração do observador:
  var config = { attributes: true, childList: true, characterData: true, subtree: true }

  // passar o nó alvo, bem como as opções de observação
  observer.observe(target, config)

  for (var x of [xTablets, xDesktop]) {
    x.addListener(testMedias)
  }

  function respDiaDesktop() {
    for (var dia of document.querySelectorAll('.dia')) {
      dia.style.height = document.querySelector('.dia').clientWidth + 'px'
    }
  }

  function respDiaMobile() {
    for (var dia of document.querySelectorAll('.dia')) {
      dia.style.height = 'initial'
    }
  }
})()