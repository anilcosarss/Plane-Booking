import React from 'react'
import "../Assets/scss/flights.scss"
import { connect } from 'react-redux'
import { GiCommercialAirplane } from "react-icons/gi"
import { Link } from 'react-router-dom'


const Flights = (props) => {
    console.log(props.formData.way)

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

    const allFly = [...props.flights.flights.departureLegs, ...props.flights.flights.returnLegs];

    const currentFly = props.formData.way === "gidis-donus"
        ? allFly
        : props.toAYT
            ? props.flights.flights.departureLegs
            : props.flights.flights.returnLegs;

            


    return (
        <div className='flights'>

            <div className='flights-container'>
                <div className='flights-header'>
                    <div className='flight-from'>{props.formData.fromCity}</div>
                    <div className='flight-to'>{props.formData.toCity}</div>
                    <div className='fight-date'>{props.formData.departureDate}</div>
                    {props.formData.returnDate !== "" && <div className='fight-back'>{props.formData.returnDate}</div>}
                    <div className='passengers'>{props.formData.numberOfPassengers} Yolcu</div>
                </div>
                {currentFly && currentFly.map((item) => (
                    <div className='flights-body'>
                        <div className='inner-body'>
                            <div className='company'>
                                <div className='company-header'>
                                    Havayolu
                                </div>
                                <div className='company-body'>
                                    <GiCommercialAirplane />
                                </div>
                                <div>{item.airline}</div>
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
                            <div className='price'>
                                <div className='price-header'>Fiyat (kişi)</div>
                                <div className='price-footer'>{item.priceDetail.basePrice.amount} EUR</div>
                            </div>

                        </div>

                        <div className='button'>
                            <Link to={`/flights/${item.legId}`} >
                                <button className='choose'>Seç</button>
                            </Link>

                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        flights: state.flights,
        formData: state.form.formData,
        toAYT: state.direction.toAYT,
        toDUS: state.direction.toDUS,
    }
}

export default connect(mapStateToProps)(Flights);