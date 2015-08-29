
function setTemperatura (val) {
	var colorInc = 100 / 3;

	if(val != ""
		&& !isNaN(val)
		&& val <= 100
		&& val >= 0)
	{
		console.log(val);
		
		var valOrig = val;
		val = 100 - val;
		
		if(valOrig == 0)
		{
			$("#percent-box").val(0);
			$(".progress .percent").text(0 + "%");
		}
		else $(".progress .percent").text(valOrig + "%");
		
		$(".progress").parent().removeClass();
		$(".progress .water").css("top", val + "%");
		
		if(valOrig < colorInc * 1)
			$(".progress").parent().addClass("red");
		else if(valOrig < colorInc * 2)
			$(".progress").parent().addClass("orange");
		else
			$(".progress").parent().addClass("green");
	}
	else
	{
		$(".progress").parent().removeClass();
		$(".progress").parent().addClass("green");
		$(".progress .water").css("top", 100 - 67 + "%");
		$(".progress .percent").text(67 + "%");
		$("#percent-box").val("");
	}
}


// -- //


$(document).ready(function () {

	// CONFIGURAÇÃO DOS MOSTRADORES

	setTimeout(function() {
		$("#tankFood").industrial({});
	},250);

	setInterval(function() {
		$("#tankFood").each(function() {
			// exibe informação no mostrador a partir do sessionStorage
			var foodLevel = parseInt(window.sessionStorage.getItem("foodLevel"));
			$(this).industrial(foodLevel);
		});
	}, 500);


	// WEBSOCKET
	var ws = new WebSocket("ws://127.0.0.1:3000/ws/cliente");

	ws.onmessage = function (event) {
		var data = JSON.parse(event.data);

		// RESERVATÓRIO
		if (data.tipo == "resp_reservatorio") {
			window.sessionStorage.setItem("foodLevel", data.mensagem);
			$("#foodLevel").text(data.mensagem + "%");
		}

		// TEMPERATURA
		if (data.tipo == "resp_temp_humidade") {
			setTemperatura(data.temperatura);
		}

		// COMIDA
		if (data.tipo == "resp_comida") {
			swal({
				title: "Sucesso!",
				text: data.mensagem,
				type: "success",
				confirmButtonText: "Cool"
			});
		}

		// AUDIO
		if (data.tipo == "resp_toca_audio") {
			swal({
				title: "Sucesso!",
				text: data.mensagem,
				type: "success",
				confirmButtonText: "Cool"
			});
		}

		// ALERTAS
		if (data.tipo == "alerta") {
			swal({
				title: "Atenção!",
				text: data.mensagem,
				type: "warning",
				confirmButtonText: "Cool"
			});
		}
	};

	// bindings
	$('#btnComida').on('click', function () {
		ws.send('{ "tipo": "comida", "mensagem": "liberar", "destino": "ws/servidor" }');
	});

	$('#btnAudio').on('click', function () {
		ws.send('{ "tipo": "toca_audio", "mensagem": "Tocar audio", "destino": "ws/servidor"  }');
	});
        
        $('#btnAudio').on('click', function () {
		ws.send('{ "tipo": "toca_audio", "mensagem": "Tocar audio", "destino": "ws/servidor"  }');
	});

        $('#btnVerificarTemp').on('click', function () {
		ws.send('{ "tipo": "temp_humidade", "mensagem": "consultar", "destino": "ws/servidor"  }');
	});
        
        $('#btnVerificarReserv').on('click', function () {
		ws.send('{ "tipo": "reservatorio", "mensagem": "consultar", "destino": "ws/servidor"  }');
	});


});
