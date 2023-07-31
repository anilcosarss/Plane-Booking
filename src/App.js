import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar  from './Components/Navbar';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Flights from './Pages/Flights';
import FlightInformation from './Pages/FlightInformation';
import Payment from './Pages/Payment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/flights' element={<Flights />} />
          <Route path='/flights/:id' element={<FlightInformation />} />
          <Route path='/payment' element={<Payment />} />

        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
