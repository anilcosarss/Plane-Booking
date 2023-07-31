import React from 'react'
import "./ticketInfo.scss"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const TicketInfoModal = (props) => {

    const lastFly = props.selectedFly[0]
    const customers = props.ticketData;

    return (
        <div>
            <div className="modal">
                <div className="overlay"></div>
                <div className="modal-content">
                    <h2>Uçuş Bilgileriniz</h2>
                    <div className='flight-informations-header'>
                        <span className='take-off-footer'>
                            {lastFly.depPort}
                        </span>
                        <span className='arrow'>&rarr;</span>
                        <span className='arrive-footer'>
                            {lastFly.arrPort}
                        </span>
                    </div>
                    <div class="flight-informations-body">
                        <div className='company'>
                            <div className='company-header'>
                                Havayolu
                            </div>
                            <div className='company-body'>

                                <span>{lastFly.airline}</span>
                            </div>
                        </div>

                        <div className='tail-no'>
                            <div className='tail-no-header'>Kuyruk No</div>
                            <div className='tail-no-body'>{lastFly.flightNo}</div>
                        </div>
                        <div className='take-off'>
                            <div className='take-off-header'>
                                Kalkış
                            </div>
                            <div className='take-off-body'>
                                {lastFly.depTime}
                            </div>

                        </div>

                        <div className='arrive'>
                            <div className='arrive-header'>
                                Varış
                            </div>
                            <div className='arrive-body'>
                                {lastFly.arrTime}
                            </div>

                        </div>


                    </div>
                    <div className='customer-informations'>
                        <div className='customers'>
                            <div className='customer'>
                                <h4>1.Yolcu</h4>

                                <span>{customers.customerName1} </span>
                                <span> {customers.customerSurname1}</span>
                                <div>{customers.gender1}</div>
                                <div>{customers.customerBirtday1}</div>
                            </div>
                            {customers.customerName2 !== "" &&
                                <div className='customer'>
                                    <h4>2.Yolcu</h4>
                                    <span>{customers.customerName2} </span>
                                    <span> {customers.customerSurname2}</span>
                                    <div>{customers.gender2}</div>
                                    <div>{customers.customerBirtday2}</div>
                                </div>
                            }

                            {customers.customerName3 !== "" &&
                                <div className='customer'>
                                    <h4>3.Yolcu</h4>
                                    <span>{customers.customerName3} </span>
                                    <span> {customers.customerSurname3}</span>
                                    <div>{customers.gender3}</div>
                                    <div>{customers.customerBirtday3}</div>
                                </div>
                            }
                            {customers.customerName4 !== "" &&
                                <div className='customer'>
                                    <h4>4.Yolcu</h4>
                                    <span>{customers.customerName4} </span>
                                    <span> {customers.customerSurname4}</span>
                                    <div>{customers.gender4}</div>
                                    <div>{customers.customerBirtda4}</div>
                                </div>
                            }



                        </div>
                    </div>
                 
                    <div className='buttons'>
                        <Link to='/'>
                            <button className="close-modal">
                                Ana menüye dön
                            </button>
                        </Link>

                    </div>

                </div>
            </div>

        </div>
    )
}
const mapStateToProps = state => {
    return {
        selectedFly: state.flight.selectedFly,
        formData: state.form.formData,
        ticketData: state.ticket.ticketData,
    }
}
export default connect(mapStateToProps)(TicketInfoModal);