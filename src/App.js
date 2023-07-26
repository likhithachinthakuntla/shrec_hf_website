import React, { Component } from 'react';
import Navbar from './components/Navbar_Sidebar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Input from './pages/Input/UserInput';
import MLA_Info from './pages/MLA_Info/MLA_Info';
import Dashboard from './pages/Dashboard/Dashboard';
import Training from './pages/Training/Training';
import PipelineSelection from './pages/PipelineSelection/PipelineSelection';
import TrainingInput from './pages/TrainingInput/TrainingInput';
import './App.css';
import Inference from './pages/Inference/Inference';
import InferenceInput from './pages/InferenceInput/InferenceInput';
import InferenceE2EInput from './pages/InferenceInput/InferenceE2EInput';

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/pipelineSelection' element={<PipelineSelection />} />
            <Route path='/mla_Info' element={<MLA_Info />} />
            <Route path='/userInputs' element={<Input />} />
            <Route path='/etl' element={<Dashboard />} />
            <Route path='/trainingInput' element={<TrainingInput />} />
            <Route path='/training' element={<Training />} />
            <Route path='/InferenceE2EInput' element={<InferenceE2EInput />} />
            <Route path='/inferenceInput' element={<InferenceInput />} />
            <Route path='/inference' element={<Inference />} />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
