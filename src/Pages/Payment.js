import React,{useState} from 'react'
import "../Assets/scss/payment.scss"
import * as yup from 'yup';
import PaymentModal from '../Components/Modal/paymentModal';
import TicketInfoModal from '../Components/Modal/ticketInfoModal';

const Payment = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [ticketModal ,setTicketModal] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [isRulesAccepted, setIsRulesAccepted] = useState(false);

  const monthOptions = [];
  for (let i = 1; i <= 12; i++) {
    monthOptions.push(<option key={i} value={i}>{i}</option>);
  }

  const yearOptions = [];
  for (let i = 24; i <= 32; i++) {
    yearOptions.push(<option key={`20${i}`} value={`20${i}`}>{`20${i}`}</option>);
  }

  const paymentSchema = yup.object().shape({
    cardNumber: yup
    .string()
    .required('Kart numarası zorunludur')
    .matches(/^\d{4}(\s?\d{4}){3}$/, 'Geçersiz kart numarası'),
    cvv: yup
    .string()
    .required('CVV zorunludur')
    .test('is-valid-cvv', 'CVV geçersiz', (value) => {
      return /^\d{3}$/.test(value);
    }),
    isRulesAccepted: yup.boolean().oneOf([true], 'Kuralları kabul etmelisiniz'),
  });

  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    const numbersOnly = value.replace(/\D/g, ''); 
    let formattedValue = '';
    for (let i = 0; i < numbersOnly.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += numbersOnly[i];
    }
    setCardNumber(formattedValue.trim()); 
  };

  const handleSubmit = async () => {
    try {
      await paymentSchema.validate({
        cardNumber,
        cvv,
        isRulesAccepted,
      });
      setModalOpen(true);
    } catch (error) {
      alert(error.message);
    }
  };




  return (
    <div className='payment'>
      <div className='payment-container'>
                {ticketModal && <TicketInfoModal setTicketModal={setTicketModal} />}
      {isModalOpen && <PaymentModal setTicketModal={setTicketModal} setModalOpen={setModalOpen} />}
        <h3>Ödeme Bilgileri</h3>
        <div className='payment-types'>
          <div>Kredi Kartı / Banka Kartı</div>
          <div>Kolay Havale</div>
          <div>Papara</div>
        </div>
        <div className='card-no'>
          <input
            type='text'
            placeholder='Kart Numarası'
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength='19'
            />
        </div>

        <div className='card-information'>

          <div className='card-group'>
            <div className='card-month'>
              <select name="cars" id="cars">
                {monthOptions}
              </select>
            </div>

            <div className='card-year'>
              <select name="months">
                {yearOptions}
              </select>
            </div>
            <div className='card-code'>
              <input
                type='text'
                placeholder='CVV'
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength='3'
                />
            </div>
          </div>

          <div className='payment-selection'>
            <div className='payment-selection-header'>
              <h3>Taksit Seçenekleri</h3>
            </div>
            <div className='payment-radio'>
              <input checked type="radio" name="hire" value="tekcekim" />
              <label for="sahis">Tek Çekim</label>
              <input type="radio" name="hire" value="3months" />
              <label for="sirket">3 ay</label>
              <input type="radio" name="hire" value="6months" />
              <label for="sahissirketi">6 ay</label>
              <input type="radio" name="hire" value="12months" />
              <label for="sahissirketi">12 ay</label>
            </div>
            <div className='checkbox'>
              <input
                type='checkbox'
                name='rules'
                checked={isRulesAccepted}
                onChange={() => setIsRulesAccepted(!isRulesAccepted)} />
              <label for="rules"> Lorem ipsum kurallarını okudum onaylıyorum.</label>
            </div>

            <div className='total-payment'>
              <div>Toplam ödenecek Tutar <b>47.500</b></div>
              <div className='button'>
                <button onClick={handleSubmit}>Ödemeyi Tamamla</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment