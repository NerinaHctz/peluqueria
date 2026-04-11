import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./assets/components/Header"
import Footer from "./assets/components/Footer"
import Home from "./assets/pages/Home"
import Gallery from "./assets/pages/Gallery"
import Contact from "./assets/pages/Contact"
import Services from "./assets/pages/Services"
import Booking from "./assets/pages/Booking"
import "./App.css"

function App() {
  return <Router>
    <Header />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Gallery" element={<Gallery />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Services" element={<Services />} />
      <Route path="/Booking" element={<Booking />} />
    </Routes>

    <Footer />
  </Router>

}


export default App
