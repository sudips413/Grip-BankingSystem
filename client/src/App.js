import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Customer from './components/Customers/Customer';
import Transaction from './components/Transaction/Transaction';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/getstarted" element={<Customer />} />
        <Route path="/transfer" element={<Transaction />} />
      </Routes>

    </Router>  
  );
}

export default App;
