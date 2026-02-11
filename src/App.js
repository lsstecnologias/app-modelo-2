import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Main from './components/main';
import Modal from './components/modal';
import $ from 'jquery'
import { useEffect } from 'react';
function App() {


  // Verificamos se o navegador suporta geolocalização
  /*if ("geolocation" in navigator) {

    const opcoes = {
      enableHighAccuracy: true, // Tenta usar GPS para maior precisão
      timeout: 5000,            // Tempo máximo de espera (5 segundos)
      maximumAge: 0             // Não aceita posições em cache
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
      
        console.log(`Sucesso!`);
        console.log(`Latitude: ${latitude}`);
        console.log(`Longitude: ${longitude}`);
        console.log(`Precisão: ${accuracy} metros`);
       
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


             
             
               
              `Rua: ${data.address.road || 'Não encontrada'}
              Bairro: ${data.address.suburb || data.address.neighbourhood || 'Não encontrado'}
              Cidade: ${data.address.city || data.address.town};
              Completo: ${data.display_name}`);
             

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
  } */
  return (
    <div>
      <Header /> 
      <Modal />
      <Main />
    </div>
  );
}

export default App;
