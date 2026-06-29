import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavigationType,
} from "react-router-dom";
import { LocationProvider } from "./Context/LocationContext";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import Deals from "./Pages/Deals";
import SignIn from "./Pages/SignIn";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import NavBar from "./Components/Layout/Header/NavBar";
import Order from "./Components/Order/Order";
import LocationBar from "./Components/Layout/Header/LocationBar";
import Footer from "./Components/Layout/Footer/Footer";
import FixedLocationBar from "./Components/Layout/Header/FixedLocationBar";
import TopLocationBar from "./Components/Layout/Header/TopLocationBar";

function App() {
  return (
    <div className="App">
      <LocationProvider>
        <Router>
          <div className="sticky top-0 z-50 bg-white">
            <TopLocationBar />
            <LocationBar />
            <NavBar />
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>

          <Footer />
        </Router>
      </LocationProvider>
    </div>
  );
}

export default App;
