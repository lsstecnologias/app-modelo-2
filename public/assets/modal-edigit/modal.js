// var elemento_pai = document.body;

const validForm = (event) => {
   event.preventDefault();
   const nome = document.getElementsByName("nome")[0];
   const sobrenome = document.getElementsByName("sobrenome")[0];
   const email = document.getElementsByName("email")[0];
   const contato = document.getElementsByName("contato")[0];
   const aceitarTermos = document.getElementsByName("aceitar_termos")[0];


   const contentMessagem = document.getElementById("content-mensagem");
   contentMessagem.className = "container-fluid p-0";

   const formData = new FormData();
   if ($('#nome').val()) {
      formData.append("modal-data-nome", nome.value);
      $('#nome').addClass("input-success").removeClass('input-error');

   } else {
      $('#nome').addClass("input-error").removeClass('input-success');

   }

   if (aceitarTermos.checked) {

      formData.append("modal-data-termos", aceitarTermos.checked);
      $('#termos_policy').addClass("input-success").removeClass('input-error');
   } else {
      formData.append("modal-data-termos", aceitarTermos.checked);
      $('#termos_policy').addClass("input-error").removeClass('input-success').css({ 'padding': '10px' })
   }

   if (sobrenome.value) {
      formData.append("modal-data-sobrenome", sobrenome.value);
      $('#sobrenome').addClass("input-success").removeClass('input-error');

   } else {
      $('#sobrenome').addClass("input-error").removeClass('input-success');

   }

   if (email.value) {

      const exp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (exp.test(email.value)) {
         formData.append("modal-data-email", email.value);

         $('#email').addClass("input-success").removeClass('input-error');
         contentMessagem.innerHTML = "";
      } else {
         $('#email').addClass("input-error").removeClass('input-success');

      }
   } else {

      $('#email').addClass("input-error").removeClass('input-success');

   }
   // const val_celular = celular.indexOf("9");
   // if (val_celular === 3) {
   if ($('#contato').val()) {
      formData.append("modal-data-contato", contato.value);
      $('#contato').addClass("input-success").removeClass('input-error');

   } else {
      $('#contato').addClass("input-error").removeClass('input-success');

   }
   if ($('#cod_estabelecimento').val()) {
      formData.append("modal-data-esta", $('#cod_estabelecimento').val());
   } else {
      alert("NENHUM ESTABELECIMENTO A ESSA VITRINE")
   }

   const urlApi = 'http://10.10.10.6/';
   const nameApi = 'api_comanda/';
   const param_api_save_clientes = '?api=setClientes';
   const xhr = new XMLHttpRequest();
   if ($('#contato').val() && $('#email').val() && $('#nome').val() && aceitarTermos.checked == true) {

      let data_atual = new Date();
      let data_post = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();
      let cod = Math.floor(Math.random() * (777 + 0)) - 1;
      cod_user = cod > 0 ? cod : null;
      formData.append("modal-data-post", data_post);
      formData.append("modal-data-cod", cod_user);
      formData.append("modal-data-mesa", $('#mesa').val());

      //RECUPERAR COD ESTABELECIMENTO PARA FAZER A REQUISIçÃO
      /*
      xhr.onreadystatechange = async () => {
         if (xhr.readyState == 4) {
            var res = xhr.responseText;
            if (res == 1) {
              
               contentMessagem.innerHTML = `
               <div class="alert alert-success mb-0 fade show" role="alert">
                  <strong><i class="bi bi-exclamation-triangle-fill"></i> OK</strong> 
               </div>`;

            }
         }
      }

      //fazer o envio do nosso request
      
      xhr.open("POST", urlApi + nameApi + param_api_save_clientes);
      xhr.send(formData);
*/
      console.log(formData);
   } else {
      contentMessagem.innerHTML = `
      <div class="alert alert-danger mb-0 fade show" role="alert">
         <strong><i class="bi bi-exclamation-triangle-fill"></i> Preencha os campos!</strong> 
      </div>`;
   }

}


//PARAMETROS DO ESTABELECIMENTO
const param = new URLSearchParams(window.location.search);
valor_param = param.get("mesa") ? `<strong>MESA</strong> #Nº ${param.get("mesa")}` : '';
cod_estabelecimento = param.get("est") ? `<strong>ESTABELECIMENTO ${param.get("est")}  </strong>` : '';

//VERIFICA SE TEM PARAMETRO DO ESTABELECIMENTO
if (param.get("est")) {
   /*let num_estabelecimento = param.get("est");
   const obj = { num_est: num_estabelecimento };

   $.post("http://10.10.10.6/api_comanda/?api=getProdutosEstabelecimento", obj, (res, status) => {
      if (status == 'success') {
         const itemEsta = JSON.parse(res);          
         sessionStorage.setItem('item',JSON.stringify(itemEsta));
      }
   })*/


   //EXIBE MODAL
   const tag_body = document.body;
   const tag_div = document.createElement('div');
   tag_div.id = "container-modal";
   tag_div.innerHTML = `
   <div id="myModal" class="modal" style="display:block">
      <div class="modal-content">
         <div class="content-header">
            <div class="content-imagem"> 
               <img src="https://placehold.co/100x50"/>
            </div>
            <div class="content-imagem d-flex align-items-center"> 
               <h3 style="font-size:30px;margin-top: 15px;color:rgb(33 37 41 / 75%)">${valor_param}</h3> 
               <h5 style="font-size:20px;margin-top: 15px;color:rgb(33 37 41 / 75%)">${cod_estabelecimento}</h5> 
                 
            </div>          
            <span class="close">&times;</span>
         </div>      
         <div class="content-box">
            <div class="content-body">
            <div id="content-mensagem">            
            </div>
               <div class="content-form">
                  <form method="post" onSubmit="validForm(event)">
                     <div class="form-content">
                        <p  class="p-modal">Nome</p>
                        <input type="text" name="nome"  id="nome" class="form-inpt" autocomplete="off" />
                     </div>
                     <div class="form-content">
                        <p  class="p-modal">Sobrenome</p> 
                        <input type="text" name="sobrenome" id="sobrenome" class="form-inpt" autocomplete="off" />
                     </div>
                     <div class="form-content">
                        <p  class="p-modal">E-mail</p> 
                        <input type="text" name="email" id="email"  placeholder="e-mail" class="form-inpt" autocomplete="off" />
                     </div>
                        <div class="form-content">
                        <p class="p-modal">Contato</p> 
                        <input type="text" name="contato" id="contato"  placeholder="(00) 0000-0000" class="form-inpt" autocomplete="off"/>
                     </div>
                        <div class="form-content" id="termos_policy">
                           <input type="hidden" value="${param.get("mesa")}" name="mesa" id="mesa" />
                           <input type="hidden" value="${param.get("est")}" name="cod_estabelecimento" id="cod_estabelecimento" />
                           <input type="checkbox" name="aceitar_termos" id="aceitar-termos" value="true" />
                           <label for="aceitar-termos"> <strong>Aceitar termos</strong>,
                                 você concorda com o nosso <a href="#"> Aviso de Privacidade.</a> 
                           </label>
                        </div>
                        <div class="form-content">
                        <input type="submit" value="➜] Entrar" id="btnSubmit" class="form-inpt" />
                     </div>
                  </form>
               
               </div>
            </div>
         </div>

      </div>
   </div>`;
   tag_body.appendChild(tag_div);

   //$('body').attr(onchange = alerta())
   //var elemento_pai = document.body;
   var modal = document.getElementById("myModal");

   // Get the button that opens the modal
   var btn = document.getElementById("myBtn");

   // Get the <span> element that closes the modal
   var span = document.getElementsByClassName("close")[0];

   // When the user clicks the button, open the modal 
   /*btn.onclick = () => {
      modal.style.display = "block";
   }*/
   modal.style.display = "block";
   // When the user clicks on <span> (x), close the modal
   span.onclick = () => {
      modal.style.display = "none";
   }

   // When the user clicks anywhere outside of the modal, close it
   window.onclick = (event) => {
      if (event.target == modal) {
         modal.style.display = "block";
      }
   }
   let mostrarModal = "block";
   $(".modal").css({
      "display": mostrarModal,
      "position": "fixed",
      "z-index": "9999",
      "padding-top": "5px",
      "left": "0",
      "top": "0",
      "width": "100%",
      "height": "100%",
      "overflow": "auto",
      "background-color": "rgb(0, 0, 0)",
      "background-color": "rgba(0, 0, 0, 0.9)",
      "font-family": "Segoe UI"
   });
   	//$('input[name="contato"]').mask('(00) 0 0000-0000');
   $(".modal-content").css({
      "background-color": "#fefefe",
      "margin": "90px auto",
      "padding": "0px",
      "width": "90%",
      "border-radius": "10px",
      "box-shadow": "-2px 9px 61px 11px rgba(255,255,255,0.11)"

   });
   $(".close").css({
      "color": "#aaaaaa",
      "text-align": "center",
      "font-size": "32px",
      "font-weight": "bold",
      "width": "50px",
      "height": "50px",

   })
   $(".close").hover(function () {
      $(this).css({
         "color": "#000",
         "text-decoration": "none",
         "cursor": "pointer",
         "text-align": "center"
      })
   });
   $(".close").focus(function () {
      $(this).css({
         "color": "#000",
         "text-decoration": "none",
         "cursor": "pointer",
         "text-align": "center"
      })
   });
   $(".content-box").css({
      "display": "flex",
      "align-items": "center",
      "justify-content": "start",
      "width": "100%",
      "flex-wrap": "wrap",
      "margin-top": "0px",
      "border-radius": "10px"
   });
   $(".content-header").css({
      "width": "100%",
      "display": "flex",
      "justify-content": "center",

   });
   $(".content-header .close").css({
      "display": "block",
      "align-items": "center",
      "justify-content": "end",
      "border": "0px solid #f1f1f1f1"
   });
} else {
   alert("Nenhum estabelecimento")
}