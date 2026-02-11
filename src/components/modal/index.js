import './style.css';
import $ from 'jquery';
const Modal = () => {
    function closeModal() {
        $("#id01").addClass("d-none").removeClass('d-block');
    }
    return (

        <div class="w3-container">

            <div id="id01" class="w3-modal d-block " style={{ zIndex: '777', top: '10px', fontFamily: 'Poppins, sans-serif' }}>
                <div class="w3-modal-content">
                    <div class="w3-container bg-white p-4 mt-4" style={{ fontFamily: 'Poppins, sans-serif' }} >
                        <span onClick={() => { closeModal() }} class="w3-button fs-3 w3-display-topright">&times;</span>
                        <h3 className='fs-normal  mb-4' style={{ fontFamily: 'Arial' }}>Sua Região</h3>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                        </div>
                        <div class="mt-3">
                            <button class="btn btn-secondary w-100">Confirmar</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}
export default Modal;