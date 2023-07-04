import { Button, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import '../../pages/Dashboard/scss/light-bootstrap-dashboard-react.scss?v=2.0.0';
import './Popup.css';
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';

function Popup(props) {
  const { onClose } = props;
  const navigate = useNavigate();
  
  const userInputsPage = () => {
    const project_id = uuid();
    window.project_id = project_id;
    navigate('/pipeline_selection');
  }

  const [inputValue, setInputValue] = useState('');

  function handleInputChange(event) {
    setInputValue(event.target.value);
    window.projectName = event.target.value;
  }

  return (
    <div className='popup'>
      <h2 style={{ float: 'left' , fontSize: '30px'}}>Create a Project</h2>
      <div style={{ paddingTop: '10px', marginRight: '-20px' }}>
        <IconButton
          aria-label='Close'
          size='medium'
          style={{ float: 'right' }}
          onClick={onClose}
        >
          <IoCloseSharp fontSize='inherit' />
        </IconButton>
      </div>
      <form>
        <input
          id='input'
          type='text'
          required
          placeholder='Enter new project name'
          value={inputValue}
          onChange={handleInputChange}
        ></input>
        <select id='select'>
          <option value='objectDetection'>
            Object Detection
          </option>
          <option value='videoClassification'>
            Video Classification
          </option>
          <option value='text-classification'>
            Text Classification (Multi-class)
          </option>
        </select>
      </form>
      <Button variant='contained' onClick={() => userInputsPage()} style={{ float: 'right' }}>
        SUBMIT
      </Button>
    </div>
  );
}

export default Popup;
