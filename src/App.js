import logo from './logo.svg';
import './App.css';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <Header />
      <main class="main" className='container-fluid'>
        <section id="menu" class="container menu section mt-4">
          <div class="row isotope-container" data-aos="fade-up" data-aos-delay="200">

            <div class="col-lg-6 menu-item isotope-item filter-starters">
              <img src="assets/img/menu/lobster-bisque.jpg" class="menu-img" alt="" />
              <div class="menu-content">
                <a href="#">Lobster Bisque</a><span>$5.95</span>
              </div>
              <div class="menu-ingredients text-start">
                Lorem, deren, trataro, filede, nerada
              </div>
            </div>


            <div class="col-lg-6 menu-item isotope-item filter-specialty">
              <img src="assets/img/menu/bread-barrel.jpg" class="menu-img" alt="" />
              <div class="menu-content">
                <a href="#">Bread Barrel</a><span>$6.95</span>
              </div>
              <div class="menu-ingredients text-start">
                Lorem, deren, trataro, filede, nerada
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
