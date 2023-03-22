import { Button, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { CgAdd } from 'react-icons/cg';
import Popup from '../../components/Popup/Popup';
import './Home.css';
import '../../components/Popup/Popup.css';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  function handleClick() {
    setShowPopup(true);
  }

  function handleClose() {
    setShowPopup(false);
  }

  return (
    <div>
      <div className='box-style'>
        <div className='card-style'>
          <div>
            <h1 style={{fontSize: '36px'}} className='project'>Projects</h1>
            <IconButton
              aria-label='Add project'
              size='medium'
              style={{ paddingBlockStart: '0px' }}
              onClick={handleClick}
            >
              <CgAdd fontSize='inherit' />
            </IconButton>
          </div>
          <div className='create-project'>
            <p className='project-status-data'>Oops!</p>
            <p className='project-status'>No projects available</p>
            <Button
              variant='contained'
              style={{ display: 'block', margin: '0 auto' }}
              onClick={handleClick}
            >
              Create New Project
            </Button>
            <div>
              {showPopup && (
                <div className='popup-background'>
                  <Popup onClose={handleClose} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
