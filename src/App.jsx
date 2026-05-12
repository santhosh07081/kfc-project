import './App.css'
import { BrowserRouter as Router, Routes, Route, NavigationType } from 'react-router-dom';
import { LocationProvider } from './Components/Content/LocationContext';
import Home from './Components/Header/Home'; 
import Menu from './Components/Header/Menu'; 
import Deals from './Components/Header/Deals'; 
import SignIn from './Components/Header/SignIn'; 
import Cart from './Components/Header/Cart'; 
import Profile from './Components/Header/Profile';
import NavBar from './Components/Header/NavBar';
import Order from './Components/Content/Order';
import LocationBar from './Components/Header/LocationBar';
import Footer from './Components/Footer/Footer';
import FixedLocationBar from './Components/Content/FixedLocationBar';
import TopLocationBar from './Components/Header/TopLocationBar';

function App() {
  

  return (
  <div className='App'>
      <LocationProvider>
        <Router>
          <div className="sticky top-0 z-50 bg-white">
          <TopLocationBar />
            <LocationBar />
            <NavBar />
            
          </div>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/menu' element={<Menu/>} />
            <Route path='/deals' element={<Deals/>} />
            <Route path='/profile'  element={<Profile/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/cart' element={<Cart/>} />
          </Routes>
          
          <Footer />
        </Router>
      </LocationProvider>
    </div>

     

  )
}

export default App
