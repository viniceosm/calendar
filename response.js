(function () {
  var xTablets = window.matchMedia("only screen and (min-width: 600px)")
  var xDesktop = window.matchMedia("only screen and (min-width: 768px)")

  function testMedias() {
    if (xDesktop.matches) {
      respDiaDesktop();
    } else if (xTablets.matches) {
      respDiaDesktop();
    } else {
      respDiaMobile();
    }
  }

  testMedias()

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