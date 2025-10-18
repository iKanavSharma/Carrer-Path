import { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  

  return <div>
    <BrowserRouter>
    <Navbar/>
    <Routes>
       <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  </div>
}

export default App
