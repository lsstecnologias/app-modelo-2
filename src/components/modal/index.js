import { useEffect, useState } from 'react';
import './style.css';
import mask from 'jquery-mask-plugin';
import './geolocation.js';
import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery';
const Modal = () => {
	const [inptEndereco, setInptEndereco] = useState(true);
	const [endr, setEndr] = useState("");
	const [lat, setLat] = useState();
	const [lon, setLon] = useState();

	const urlParams = new URLSearchParams(window.location.search);
	const mesa_n = urlParams.get('mesa');
	const estabelecimento_n = urlParams.get('est');
	console.log(mesa_n, estabelecimento_n)

	useEffect(() => {

		$('#contato').mask("(99) 9 9999-9999");
	}, []);

	const validarCliente = () => {
		if (estabelecimento_n) {

			const cel = $('#contato');
			const nome = $('#nome');

			const myUUID = uuidv4();
			const cliente_id = myUUID.substring(0, 4);

			const txt_msg_nome = $("#txt_msg_nome");
			const txt_msg_cel = $("#txt_msg_cel");

			const data_atual = new Date();
			const data_post = data_atual.toLocaleTimeString() + "-" + data_atual.toLocaleDateString().toString();
			var objData = { estabelecimento_id: estabelecimento_n, cliente_id:cliente_id, nome: null, celular: null, email: null, mesa: mesa_n, termos_policy: true, data_post: data_post };

			if (nome.val().indexOf(" ") < 1) {

				nome.addClass("is-invalid").removeClass("is-valid");
				objData.nome = null;
				txt_msg_nome.text("Preencha o nome completo!")
			} else {
				nome.addClass("is-valid").removeClass("is-invalid");
				objData.nome = nome.val();
				txt_msg_nome.text("")


			}


			if (cel.val().indexOf("9") == 5 && cel.val().length >= 16) {
				cel.addClass("is-valid").removeClass("is-invalid");
				objData.celular = cel.val();
				txt_msg_cel.text("")

			} else {
				cel.addClass("is-invalid").removeClass("is-valid");
				objData.celular = null;
				txt_msg_cel.text("Preencha o contato whatsapp!")
			}
			 if (objData.nome !== null && objData.celular !== null) {
				$.post('http://10.10.10.6:8181/api/postEstabelecimento/', objData, (res, status) => {
					if (status == 'success') {
						if(res == true){
							closeModal()
							sessionStorage.setItem("cliente-edigit", JSON.stringify([objData]))
							window.location.reload()
						}else{
							sessionStorage.setItem("cliente-edigit", JSON.stringify([]))
						}
					}
				})
			}

		} else {
			alert("Informe o estabelecimento!")
		}
	}

	var item = sessionStorage.getItem('cliente-edigit') ? JSON.parse(sessionStorage.getItem('cliente-edigit')) : [];

	if(item.length == 1){
		$("#id01").removeClass('d-block').addClass("d-none");
		return
	}
		
	

	function closeModal() {
		$("#id01").addClass("d-none").removeClass('d-block');
	}

	return (

		<div class="w3-container">

			<div id="id01" class="w3-modal d-block" style={{ zIndex: '777', top: '10px', fontFamily: 'Poppins, sans-serif' }}>
				<div class="w3-modal-content">
					<div class="w3-container bg-white p-4 mt-4" style={{ fontFamily: 'Poppins, sans-serif' }} >
						<div className='text-center mb-3'>
							{/* <span onClick={() => { closeModal() }} class="w3-button fs-3 w3-display-topright">&times;</span> */}
							<h3 className='fs-bold' style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Restaurant {estabelecimento_n ? estabelecimento_n : ''}</h3>
							<p class="fw-bold"> N {mesa_n ? mesa_n : ''}</p>
						</div>
						<div class="mb-3">
							<div class="form-floating mb-3">
								<input type="text" class="form-control" id="nome" autoComplete='off' />
								<label for="nome">Nome Completo</label>
								<div id="txt_msg_nome" class="p-2 text-danger"></div>
							</div>
							<div class="form-floating">
								<input type="text" class="form-control" id="contato" autoComplete='off' />
								<label for="contato">Contato</label>
								<div id="txt_msg_cel" class="p-2 text-danger "></div>
							</div>

						</div>
						<div class="mb-2 text-start"><input type="checkbox" id="termos_policy" /> <label
							for="termos_policy"><small>Aceitar termos de privacidade LGPD. </small></label></div>
						<div class="mt-3">
							<button class="btn btn-secondary w-100" onClick={() => { validarCliente() }}>Entrar</button>
						</div>

					</div>
				</div>
			</div>
		</div>
	)

}
export default Modal;