const Calendario = (function () {
	let qq = document.querySelector.bind(document);

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

			if (typeof callback === 'function')
				callback();
		}

		montaDias() {
			qq(this._selectorCalendario).innerHTML = '';

			let diaSemana = this.getSemanaPrimeiroDiaMes(this._data);
			let ultimoDia = this.getUltimoDiaMes(this._data);


			let diaMesAnterior = new Date(this._data.getFullYear(), this._data.getMonth(), 1);
			diaMesAnterior.setDate(diaMesAnterior.getDate() - diaSemana);

			for (let i = 0; i < diaSemana; i++) {
				qq(this._selectorCalendario).innerHTML += `<div class="dia cinza"><span class="num">${diaMesAnterior.getDate() + i}</span></div>`;
			}

			for (let i = 1; i <= ultimoDia; i++) {
				let active = '';
				if (i == new Date().getDate() && this._data.getMonth() == new Date().getMonth()) {
					active = 'active';
				}

				qq(this._selectorCalendario).innerHTML += `<div class="dia ${active}"><span class="num">${i}</span></div>`;
			}

			let self = this;
			notificacaoTodo();

			$('.dia:not(.cabecalhoDia)').on('mousedown', function (e) {
				let mes = (self._data.getMonth() + 1).toString().padStart(2, '0');
				let ano = self._data.getFullYear().toString().padStart(2, '0');

				$('.dia').each(function (i, e) {
					$(this).removeClass('active');
				});
				$(this).addClass('active', 'true');
				$("#myCardFlip").toggleClass("flip");
				$('#dataEscolhida').text(`${$(this).find('.num').text()}/${mes}/${ano}`);
				listaTodo();
			});
		}

		mostraData() {
			let dia = this._data.getDate().toString().padStart(2, '0');
			let mes = (this._data.getMonth() + 1).toString().padStart(2, '0');
			let ano = this._data.getFullYear().toString().padStart(2, '0');

			qq(this._selectorLabelCalendario).innerHTML = `${mes}/${ano}`;

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
			qq(this._selectorMesAnterior).addEventListener('click', function () { self.mesAnterior(); });
			qq(this._selectorProximoMes).addEventListener('click', function () { self.proximoMes(); });
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