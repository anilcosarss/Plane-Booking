import React, { useState } from 'react'
import "../Assets/scss/flight-information.scss"
import { GiCommercialAirplane } from "react-icons/gi"
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { setTicketData } from '../Redux/actions/contactFormActions';
import { setSelectedFly } from '../Redux/actions/flightActions';
import {setFormData} from '../Redux/actions/searchFormActions'

const FlightInformation = (props) => {
    const { id } = useParams();

    const allFly = [...props.flights.flights.departureLegs, ...props.flights.flights.returnLegs];
    const selectedFly = allFly.filter((item) => item.legId == id);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        props.setTicketData({
            ...props.ticketData,
            [name]: value,
        });
    };

    

    /// Time Format
    const convertToMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };
    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} Sa ${remainingMinutes} Dk`;
    };
    /// Time Format



    // Passengers section
    const numberOfPassengers = props.formData.numberOfPassengers;
    const passengersArray = Array.from({ length: numberOfPassengers }, (_, index) => index + 1);

    // Tc.id control for owner of bill
    const [isNonCitizen, setIsNonCitizen] = useState(false);

    // Tc.id control for array
    const [isNonCitizenArray, setIsNonCitizenArray] = useState(Array(numberOfPassengers).fill(false));
    const handleIsNonCitizenChange = (index) => {
        const updatedArray = [...isNonCitizenArray];
        updatedArray[index] = !updatedArray[index];
        setIsNonCitizenArray(updatedArray);
    };


    const [isInsurance, setIsInsurance] = useState(false)
    const totalPrice = isInsurance
        ? selectedFly[0].priceDetail.salesPrice.amount * numberOfPassengers + 30
        : selectedFly[0].priceDetail.salesPrice.amount * numberOfPassengers;



    const handleSubmit = () => {
        props.setSelectedFly(selectedFly)
    };

    return (
        <>
            <div className='flight-information-container'>
                {selectedFly.map((item) => (
                    <div key={item.legId} className='flight-information'>
                        <div className='information-header'>
                            <div className='information-header-right'>
                                <h3> Uçuş Bilgileri</h3>
                                <div>{item.depPort} &#8594; {item.arrPort} / {item.flightDate}</div>
                            </div>
                            <div className='information-header-left'>
                                <a>Uçuş Kuralları</a>
                            </div>
                        </div>
                        <div className='information-body'>
                            <div className='company'>
                                <div className='company-header'>
                                    Havayolu
                                </div>
                                <div className='company-body'>
                                    <GiCommercialAirplane />
                                    <span>{item.airline}</span>
                                </div>
                            </div>

                            <div className='tail-no'>
                                <div className='tail-no-header'>Kuyruk No</div>
                                <div className='tail-no-body'>{item.flightNo}</div>
                            </div>
                            <div className='take-off'>
                                <div className='take-off-header'>
                                    Kalkış
                                </div>
                                <div className='take-off-body'>
                                    {item.depTime}
                                </div>
                                <div className='take-off-footer'>
                                    {item.depPort}
                                </div>
                            </div>
                            <div className='time'>
                                <div className='time-header'>
                                    Süre
                                </div>
                                <div className='time-body'>
                                    {formatTime(convertToMinutes(item.arrTime) - convertToMinutes(item.depTime))}
                                </div>
                                <div className='time-footer'>
                                    Direkt
                                </div>
                            </div>
                            <div className='arrive'>
                                <div className='arrive-header'>
                                    Varış
                                </div>
                                <div className='arrive-body'>
                                    {item.arrTime}
                                </div>
                                <div className='arrive-footer'>
                                    {item.arrPort}
                                </div>
                            </div>
                        </div>

                    </div>
                ))}

                <div className='price-details'>
                    <h3 className='price-details-header'>
                        Fiyat Detayı
                    </h3>
                    <div className='price-details-body'>
                        <div className='customer-type'>
                            <span>Yolcu Tipi</span>
                            <span>{props.formData.numberOfPassengers} Yetişkin</span>
                        </div>
                        <div className='price'>
                            <span>Fiyat</span>
                            <span>{selectedFly[0].priceDetail.basePrice.amount * numberOfPassengers} {selectedFly[0].priceDetail.basePrice.currency}</span>
                        </div>
                        <div className='vergi'>
                            <span>Vergi / Harç</span>
                            <span>{selectedFly[0].priceDetail.totalTax.amount * numberOfPassengers} {selectedFly[0].priceDetail.basePrice.currency}</span>
                        </div>
                        <div className='hizmet'>
                            <span>Hizmet Bedeli</span>
                            <span>{selectedFly[0].priceDetail.surcharge.amount * numberOfPassengers} {selectedFly[0].priceDetail.basePrice.currency}</span>
                        </div>
                        <div className='total'>
                            <span>Toplam</span>
                            <span>{selectedFly[0].priceDetail.salesPrice.amount * numberOfPassengers} {selectedFly[0].priceDetail.basePrice.currency}</span>
                        </div>


                    </div>

                </div>
                <div className='customer-information'>
                    <h3 className='customer-information-header'>Yolcu Bilgileri</h3>
                    <div className='customer-information-body'>
                        <div className='customers'>
                            {passengersArray.map((passengerIndex) => (
                                <div key={passengerIndex} className='customer-section'>
                                    <h5>{`${passengerIndex}. Yetişkin`}</h5>
                                    <div className='customer-information-form'>
                                        <div className='radio-buttons'>

                                            <input onChange={handleFormChange} type="radio" name={`gender${passengerIndex}`} value="Erkek" />
                                            <label for="man">Erkek</label>

                                            <input onChange={handleFormChange} type="radio" name={`gender${passengerIndex}`} value="Kadın" />
                                            <label for="woman">Kadın</label>


                                        </div>
                                        <div>
                                            <input onChange={handleFormChange} className='customer' name={`customerName${passengerIndex}`} type='text' placeholder='İsim' />
                                        </div>
                                        <div>
                                            <input onChange={handleFormChange} className='surname' name={`customerSurname${passengerIndex}`} type='text' placeholder='Soyisim' />

                                        </div>
                                        <div>
                                            <input onChange={handleFormChange} className='name' name={`customerBirtday${passengerIndex}`} type='date' />

                                        </div>
                                        <div>
                                            <input
                                                onChange={handleFormChange}
                                                disabled={isNonCitizenArray[passengerIndex - 1]}
                                                className='name'
                                                type='number'
                                                placeholder='TC Kimlik No'
                                                name={`customerCitizen${passengerIndex}`} />


                                        </div>

                                        <div className='checkbox'>
                                            <input type="checkbox"
                                                name={`tc-id-${passengerIndex}`}
                                                value={`tc-id-${passengerIndex}`}
                                                checked={isNonCitizenArray[passengerIndex - 1]}
                                                onChange={() => handleIsNonCitizenChange(passengerIndex - 1)}
                                            />
                                            <label for="tc-id"> TC Vatandaşı değilim</label>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>

                </div>
                <div className='contact-information'>
                    <div className='contact-information-header'>
                        <h3>İletişim Bilgileri</h3>
                    </div>
                    <div className='contact-information-body'>
                        <input onChange={handleFormChange} className='email' name='contactMail' type='text' placeholder='E-Posta' />
                        <input onChange={handleFormChange} className='number' name='contactNumber' type='number' placeholder='Cep Telefonu' />
                    </div>
                    <div className='contact-information-footer'>
                        <input type="checkbox" name="changes" value="changes" />
                        <label for="changes">Fırsat ve kampanyalardan haberdar olmak istiyorum</label>
                    </div>


                </div>

                <div className='bill-information'>
                    <div className='bill-information-header'>
                        <h3>Fatura Bilgileri</h3>
                    </div>
                    <div className='bill-information-body'>
                        <div className='radio-buttons' onChange={handleFormChange}>
                            <input type="radio" id="html" name="billType" value="sahis" />
                            <label for="sahis">Şahıs</label>
                            <input type="radio" id="html" name="billType" value="sirket" />
                            <label for="sirket">Şirket</label>
                            <input type="radio" id="html" name="billType" value="sahissirketi" />
                            <label for="sahissirketi">Şahış Şirketi</label>
                        </div>
                        <div className='input-group'>
                            <input onChange={handleFormChange} className='name' name='billName' type='text' placeholder='İsim' />
                            <input onChange={handleFormChange} className='surname' name='billSurname' type='text' placeholder='Soyisim' />
                            <input onChange={handleFormChange} disabled={isNonCitizen} name='billCitizen' className='tc-id' type='number' placeholder='TC Kimlik No' />
                            <div className='checkbox'>
                                <input
                                    type="checkbox"
                                    name="tc-id"
                                    value="tc-id"
                                    checked={isNonCitizen}
                                    onChange={() => setIsNonCitizen(!isNonCitizen)} // Checkbox durumunu değiştir
                                />
                                <label for="tc-id"> TC Vatandaşı değilim</label>
                            </div>
                        </div>
                    </div>
                    <div className='bill-information-footer'>
                        <p>Fatura bilgilerinin doğruluğunu kontrol ediniz</p>
                    </div>

                </div>
                <div className='ticket-insurance'>
                    <div className='ticket-insurance-header'>
                        <h3>Uçak Bileti Sigortası</h3>
                    </div>
                    <div className='ticket-insurance-body'>
                        <div className='checkbox'>
                            <input
                                onChange={() => setIsInsurance(!isInsurance)}
                                type="checkbox"
                                name="tc-id"
                                value="tc-id"
                            />
                            <label for="tc-id">Sigorta yapmak istiyorum (30 EUR)</label>
                        </div>
                        <div className='insurance-prices'>
                            <div className='insurance-total-prices'>
                                ({numberOfPassengers} Kişi) Toplam fiyat = <b>{totalPrice} {selectedFly[0].priceDetail.basePrice.currency}</b>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='submit-button'>
                    <Link to="/payment">
                        <button onClick={handleSubmit}>Ödeme Ekranına Geç</button>
                    </Link>
                </div>

            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        flights: state.flights,
        formData: state.form.formData,
        ticketData: state.ticket.ticketData,
    }
}
const mapDispatchToProps = {
    setTicketData,
    setSelectedFly,
    setFormData,

};

export default connect(mapStateToProps, mapDispatchToProps)(FlightInformation); 