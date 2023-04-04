import { Button, IconButton, Grid, Box, experimentalStyled as styled } from '@mui/material';
import React, { useState } from 'react';
import { CgAdd } from 'react-icons/cg';
import Popup from '../../components/Popup/Popup';
import './Home.css';
import '../../components/Popup/Popup.css';
import Paper from "@mui/material/Paper";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showNoProjects, setShowNoProjects] = useState(true);
  const [flag, setFlag] = useState(false);
  const [minHeight, setMinHeight] = useState('300px');
  function handleClick() {
    setShowPopup(true);
  }

  function handleClose() {
    setShowPopup(false);
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "	#1A2027" : "#D3D3D3",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.primary
  }));

  if (window.dropdownArray && !flag) {
    setShowNoProjects(false);
    setFlag(true);
    setMinHeight('300px');
  } else if (!flag) {
    setShowNoProjects(true);
    setFlag(true);
    setMinHeight('0px');
  }

  window.dropdownArray = window.dropdownArray ? window.dropdownArray : [];

  return (
    <div>
      <div className='box-style'>
        <div className='card-style'>
          <div className='title-container' style={{ minHeight: minHeight }}>
            <div className='project-title'>
              <h1 style={{ fontSize: '36px' }} className='project'>Projects</h1>
              <IconButton
                aria-label='Add project'
                size='medium'
                style={{ paddingBlockStart: '0px' }}
                onClick={handleClick}
              >
                <CgAdd fontSize='inherit' />
              </IconButton>
            </div>
            {!showNoProjects && (<div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {Object.keys(window.dropdownArray).map((key) => (
                    <Grid item xs={2} sm={4} md={4} key={key}>
                      <Item>
                        <Box
                          component="span"
                          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
                        >
                          •
                        </Box>
                        {key}
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>)}
          </div>
          <div className='create-project'>
            {/* <p className='project-status-data'>Oops!</p> */}
            {showNoProjects && (<div><p className='project-status'>No projects available!</p></div>)}
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
