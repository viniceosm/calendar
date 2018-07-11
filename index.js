<script>
	class Calendario {
		constructor(selectorCalendario, selectorMesAnterior, selectorProximoMes) {
			Object.assign(this, {
				selectorCalendario,
				selectorMesAnterior,
				selectorProximoMes,
				data: new Date()
			});
		}
	}
</script>

<body>
	<button id="mesAnterior"> < </button>
	<button id="proximoMes"> > </button>
	<div id="calendario">
	</div>
</body>

<script>
	var meuCalendario = new Calendario('#calendario', '#mesAnterior', '#proximoMes');
</script>