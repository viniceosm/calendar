const Calendario = (function () {
	let $ = document.querySelector.bind(document);

	class CalendarioPrivado {
		constructor(_selectorCalendario, _selectorMesAnterior, _selectorProximoMes, _selectorLabelCalendario, callback) {
			Object.assign(this, {
				_selectorCalendario,
				_selectorMesAnterior,
				_selectorProximoMes,
				_selectorLabelCalendario,
				_data: new Date()
			});

			this.adicionaEventoAosBotoes();
			this.mostraData();

			callback();
		}

		montaDias() {
			$(this._selectorCalendario).innerHTML = '';

			let diaSemana = this.getSemanaPrimeiroDiaMes(this._data);
			let ultimoDia = this.getUltimoDiaMes(this._data);


			let diaMesAnterior = new Date(this._data.getFullYear(), this._data.getMonth(), 1);
			diaMesAnterior.setDate(diaMesAnterior.getDate() - diaSemana);

			for (let i = 0; i < diaSemana; i++) {
				$(this._selectorCalendario).innerHTML += `<div class="dia cinza">${diaMesAnterior.getDate() + i}</div>`;
			}

			for (let i = 1; i <= ultimoDia; i++) {
				let active = '';
				if (i == new Date().getDate()) {
					active = 'active';
				}

				$(this._selectorCalendario).innerHTML += `<div class="dia ${active}">${i}</div>`;
			}
		}

		mostraData() {
			let dia = this._data.getDate().toString().padStart(2, '0');
			let mes = (this._data.getMonth() + 1).toString().padStart(2, '0');
			let ano = this._data.getFullYear().toString().padStart(2, '0');

			$(this._selectorLabelCalendario).innerHTML = `${mes}/${ano}`;

			this.montaDias();
		}

		mesAnterior() {
			this._data.setMonth(this._data.getMonth() - 1);
			this.mostraData();
		}

		proximoMes() {
			this._data.setMonth(this._data.getMonth() + 1);
			this.mostraData();
		}

		adicionaEventoAosBotoes() {
			let self = this;
			$(this._selectorMesAnterior).addEventListener('click', function () { self.mesAnterior(); });
			$(this._selectorProximoMes).addEventListener('click', function () { self.proximoMes(); });
		}

		getUltimoDiaMes(data) {
			let dataNova = new Date(data.getFullYear(), (data.getMonth() + 1), 1);
			dataNova.setDate(dataNova.getDate() - 1);
			return dataNova.getDate();
		}

		getSemanaPrimeiroDiaMes(data) {
			let dataNova = new Date(data.getFullYear(), (data.getMonth()), 1);
			return dataNova.getDay();
		}
	}

	return CalendarioPrivado;
})();