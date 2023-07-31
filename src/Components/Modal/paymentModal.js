import React from 'react'
import "./paymentModal.scss"
import { Link } from 'react-router-dom';

const PaymentModal = ({ setModalOpen ,setTicketModal}) => {
    return (
        <div>
            <div className="modal">
                <div className="overlay"></div>
                <div className="modal-content">
                    <h2>Tebrikler <br /> Ödemeniz Başarıyla gerçekleşti!</h2>
                    <div class="plane-container">
                        <img alt='img1' src="https://assets.codepen.io/1651485/trail.png" />
                        <img alt='img1' class="plane" src="https://assets.codepen.io/1651485/plane.png" />
                    </div>
                    <div className='buttons'>
                        <Link to='/'>
                            <button onClick={() => setModalOpen(false)} className="close-modal">
                                Ana menüye dön
                            </button>
                        </Link>
                        <button onClick={() => {
                            setModalOpen(false);
                            setTicketModal(true)
                            }} className="close-modal">
                            Uçuş bilgilerini göster
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default PaymentModal;