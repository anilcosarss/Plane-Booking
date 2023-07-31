import React from 'react'
import "./Modal.scss"

const Modal = ({setModalOpen}) => {


  return (
    <div>
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-content">
          <h2>Uçuş Bulunamadı</h2>
          <p>
            Lütfen tüm alanları doldurduğunuza ve Antalya-Düsseldorf arası seçim yaptığınıza emin olun!
          </p>
          <button onClick={() => setModalOpen(false)} className="close-modal">
            CLOSE
          </button>
        </div>
      </div>

    </div>
  );
};

export default Modal;