import { useEffect, useState } from 'react';
import './style.css';
import $ from 'jquery';
const Modal = () => {

	const [endr, setEndr] = useState();
		const [lat, setLat] = useState();
			const [lon, setLon] = useState();
	useEffect(() => {
	

	}, [setEndr])
	function closeModal() {
		$("#id01").addClass("d-none").removeClass('d-block');
	}
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

			try {
				const response = await fetch(url, {
					headers: {
						mode: 'no-cors'
					}
				});

				const data = await response.json();

				if (data.address) {
					let { address, neighbourhood, suburb, city_district, town, municipality, county, state_district, state, postcode, country, country_code } = data.address;

					//var data_endereco = data.address.map((element) => { return element !== undefined });

					setEndr([{ address, neighbourhood, suburb, city_district, town, municipality, county, state_district, state, postcode, country, country_code }])
					
	


				} else {
					console.log("Nenhum endereço encontrado para estas coordenadas.");
				}
			} catch (error) {
				console.error("Erro ao consultar o Nominatim:", error);
			}
		}

		buscarEndereco(latitude, longitude)

		//$("#id01").addClass("d-block").removeClass('d-none');
	}
	function error(error) {


		alert("Ocorreu um erro desconhecido.");


	}
	return (

		<div class="w3-container">
			
			<div id="id01" class="w3-modal d-block" style={{ zIndex: '777', top: '10px', fontFamily: 'Poppins, sans-serif' }}>
				<div class="w3-modal-content">
					<div class="w3-container bg-white p-4 mt-4" style={{ fontFamily: 'Poppins, sans-serif' }} >
						<span onClick={() => { closeModal() }} class="w3-button fs-3 w3-display-topright">&times;</span>
						<h3 className='fs-normal  mb-4' style={{ fontFamily: 'Arial' }}>Sua Região</h3>
						<div class="mb-3">
							<label for="exampleFormControlInput1" class="form-label">Email address</label>
							<input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
						
						</div>
						<div class="mt-3">
							<button class="btn btn-secondary ">Alterar</button> <button class="btn btn-secondary ">Confirmar</button>
						</div>
		{endr && endr.map((element)=>{  console.log(element.city)})}
					</div>
				</div>
			</div>
		</div>
	)

}
export default Modal;