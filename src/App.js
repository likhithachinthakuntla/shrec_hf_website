import Navbar from './components/Navbar_Sidebar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Input from './pages/Input/UserInput';
import MLA_Info from './pages/MLA_Info/MLA_Info';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/mla_Info' element={<MLA_Info />} />
          <Route path='/userInputs' element={<Input />} />
          <Route path='/etl' element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
