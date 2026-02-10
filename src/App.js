import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Main from './components/main';
import $ from 'jquery'
function App() {
  // Verificamos se o navegador suporta geolocalização
  if ("geolocation" in navigator) {

    const opcoes = {
      enableHighAccuracy: true, // Tenta usar GPS para maior precisão
      timeout: 5000,            // Tempo máximo de espera (5 segundos)
      maximumAge: 0             // Não aceita posições em cache
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        /*
        console.log(`Sucesso!`);
        console.log(`Latitude: ${latitude}`);
        console.log(`Longitude: ${longitude}`);
        console.log(`Precisão: ${accuracy} metros`);
        */
        async function buscarEndereco(lat, lon) {
          const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

          try {
            const response = await fetch(url, {
              headers: {
                mode: 'no-cors'
              }
            });

            const data = await response.json();

            if (data.address) {
              let { address, neighbourhood, suburb, city_district, town, municipality, county, state_district, state, postcode, country, country_code } = data.address;

              var arr = [address, neighbourhood, suburb, city_district, town, municipality, county, state_district, state, postcode, country, country_code];
              var data_endereco = arr.filter((element) => { return element !== undefined });
              console.log(data_endereco)


             
              /*
               
              `Rua: ${data.address.road || 'Não encontrada'}
              Bairro: ${data.address.suburb || data.address.neighbourhood || 'Não encontrado'}
              Cidade: ${data.address.city || data.address.town};
              Completo: ${data.display_name}`);
              */

            } else {
              console.log("Nenhum endereço encontrado para estas coordenadas.");
            }
          } catch (error) {
            console.error("Erro ao consultar o Nominatim:", error);
          }
        }

        buscarEndereco(latitude, longitude)
      },
      (error) => {
        // Tratamento de erros comuns
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Usuário negou a solicitação de Geolocalização.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("As informações de localização não estão disponíveis.");
            break;
          case error.TIMEOUT:
            alert("A requisição expirou.");
            break;
          default:
            alert("Ocorreu um erro desconhecido.");
            break;
        }
      },
      opcoes
    );

  } else {
    console.log("Geolocalização não é suportada pelo seu navegador.");
  }
  return (
    <div className="App">
      <Header />

      <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="spinner-grow" role="status"> <span class="visually-hidden">Loading...</span>

              </div>
              <h5 class="modal-title fs-5 fw-normal ml-2" id="exampleModalLabel"
                style={{ fontFamily: "Arial, Helvetica, sans-serif !important" }}>Endereço</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="body-modal">

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>

          </div>
        </div>
      </div>
      <Main />
    </div>
  );
}

export default App;
