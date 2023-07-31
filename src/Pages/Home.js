import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import "../Assets/scss/home.scss"
import { Link } from 'react-router-dom';
import { setFormData } from "../Redux/actions/searchFormActions"
import { setToAYT, setToDUS } from '../Redux/actions/directionActions';
import Modal from '../Components/Modal/searchModal';

import * as yup from 'yup';



const Home = (props) => {
    const [isModalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        if (props.formData.fromCity === 'DUS' && props.formData.toCity === 'AYT') {
            props.setToAYT(true);
            props.setToDUS(false);
        } else if (props.formData.fromCity === 'AYT' && props.formData.toCity === 'DUS') {
            props.setToDUS(true);
            props.setToAYT(false);
        } else {
            props.setToAYT(false);
            props.setToDUS(false);
        }
    }, [props.formData.fromCity, props.formData.toCity]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        props.setFormData({
            ...props.formData,
            [name]: value,
        });
    };

    // VALIDATIONS
    const [isValidate, setIsValidate] = useState(false);
  

    const schema = yup.object().shape({
        fromCity: yup.string().required("Şehir seçiniz zorunludur."),
        toCity: yup.string().required("Şehir seçiniz zorunludur."),
        departureDate: yup.date().required("Gidiş tarihi zorunludur."),
        numberOfPassengers: yup.string().required("Kişi sayısı seçiniz zorunludur."),
        way: yup.string().required("Seyahat şekli zorunludur"),
    });

    useEffect(() => {

        schema
            .validate(props.formData, { abortEarly: false })
            .then(() => {
                setIsValidate(true);
            })
            .catch(() => {
                setIsValidate(false);
            });

    }, [props.formData]);

    return (

        <div className='home-container'>
            
            {isModalOpen && <Modal setModalOpen={setModalOpen} />}
            <div className='home-header'>
                <h2>İyi Uçuşlar Dileriz!</h2>
            </div>
            <div className='home-body'>
                <h3>Uçus Ara</h3>
                <div className='home-form'>
                    <select name="fromCity" onChange={handleFormChange}>
                        <option value="">Şehir Seçiniz</option>
                        {props.destinations.destinations.ports.map((city, index) => (
                            <option key={index} value={city.code}>
                                {city.explanation} ({city.code})
                            </option>
                        ))}

                    </select>

                    <select name="toCity" onChange={handleFormChange}>
                        <option value="">Şehir Seçiniz</option>
                        {props.destinations.destinations.ports.map((city, index) => (
                            <option key={index} value={city.code}>
                                {city.explanation} ({city.code})
                            </option>
                        ))}
                    </select>
                    <div className='departureDate'>
                        <label for="departureDate">Gidiş tarihi :</label>
                        <input type='date' name='departureDate' onChange={handleFormChange} />
                    </div>
                    <div className='returnDate'>
                        <label for="returnDate">Dönüş tarihi :</label>
                        <input type="date" name='returnDate' onChange={handleFormChange} />
                    </div>
                    <select name='numberOfPassengers' onChange={handleFormChange} >
                        <option value="">Kişi Sayısı</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>

                    {(isValidate && props.formData.fromCity === 'DUS' && props.formData.toCity === 'AYT') ||
                        (isValidate && props.formData.fromCity === 'AYT' && props.formData.toCity === 'DUS') ? (
                        <Link to="/flights">
                            <button>Ara</button>
                        </Link>
                    ) : (
                        <button onClick={() => setModalOpen(true)}>Ara</button>
                    )}

                </div>
                <div name='tripType' onChange={handleFormChange} className='home-footer'>
                    <input type="radio" name="way" value="gidis" />
                    <label for="gidis">Gidiş</label>
                    <input type="radio" name="way" value="gidis-donus" />
                    <label for="gidis-donus">Gidiş Dönüş</label>
                    <input type="radio" name="way" value="coklu-ucus" />
                    <label for="coklu-ucus">Çoklu Uçuş</label>
                </div>

            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        destinations: state.destinations,
        formData: state.form.formData,
        toAYT: state.direction.toAYT,
        toDUS: state.direction.toDUS,
    }
}
const mapDispatchToProps = {
    setFormData,
    setToAYT,
    setToDUS,
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);