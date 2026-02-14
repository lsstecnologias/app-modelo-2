if ("geolocation" in navigator) {
	/* geolocation is available */
	const opcoes = {
		enableHighAccuracy: true, // Tenta usar GPS para maior precisão
		//timeout: 5000,            // Tempo máximo de espera (5 segundos)
		maximumAge: 0             // Não aceita posições em cache
	}

	navigator.geolocation.getCurrentPosition(success, error, opcoes);
} else {
	/* geolocation IS NOT available */
}
function success(position) {
	const { latitude, longitude } = position.coords;
	async function buscarEndereco(lat, lon) {
		const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;


		await fetch(url, {
			headers: {
				mode: 'no-cors'
			}
		}).then(res => { return res.json() })
			.then((res) => {
				console.log(res)

			})

	}

	buscarEndereco(latitude, longitude)
	//$("#id01").addClass("d-block").removeClass('d-none');
}

function error(error) {


	alert("Ocorreu um erro desconhecido." + error);


}