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

  // seleciona o n� alvo
  var target = document.querySelector('body')

  // cria uma nova inst�ncia de observador
  var observer = new MutationObserver(function (mutations) {
    testMedias()
  })

  // configura��o do observador:
  var config = { attributes: true, childList: true, characterData: true, subtree: true }

  // passar o n� alvo, bem como as op��es de observa��o
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