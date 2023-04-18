import React, { Component } from 'react';
import { Button, IconButton } from '@mui/material';

import { useNavigate } from 'react-router-dom';

function InProgress() {
  //   const message = message;

  //   const [showETL, setShowETL] = useState(false);
  window.showETLPage = false;
  const navigateToPage = () => {
    // navigate({ navigateToPage_Route });

    window.showETLPage = !window.showETLPage;
    console.log('I am here', window.showETLPage);
  };

  return (
    <>
      <h1>is in progress. Please check back later</h1>
      <Button
        variant='contained'
        onClick={() => navigateToPage()}
        style={{ float: 'right' }}
      >
        CHECK PROGRESS
      </Button>
    </>
  );
}

export default InProgress;
