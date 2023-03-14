import React from 'react';
import {  Routes, Route}from "react-router-dom";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Home from './pages/Home';
import About from './pages/About';
import AddEdit from './pages/AddEdit';  
import View from './pages/View';
import Header from './components/Header';

function App() {
  return (
   
    <div className="App">
      <Header/>
     <ToastContainer position="top-center"/>
     <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/add" element={<AddEdit/>} />
      <Route path="/update/:id" element={<AddEdit/>} />
      <Route path="/view/:id" element={<View/>} />
      <Route path="/about" element={<About/>} />

     </Routes>
    </div>
   
  );
}

export default App;
