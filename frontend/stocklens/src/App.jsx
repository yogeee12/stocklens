import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import BrokerSummary from "./pages/BrokerSummary";

import "./styles/header.css"
import "./styles/theme.css"

function App(){
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/brokers' element={<BrokerSummary />}/>
    </Routes>
  )
}

export default App