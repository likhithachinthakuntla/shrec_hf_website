import React from 'react';
import {
  Button,
  Card,
  Grid,
  CardContent,
  Box,
  Stack,
  Stepper,
  Step,
  StepButton,
  Typography,
} from '@mui/material';
import './MLA_Info.css';
import HFM from '../../assets/images/Flow_Chart.png';

const MLA_Info = () => {
  return (
    <Box className='box-container'>
      <Card className='card-container'>
        <CardContent>
          <h1>END TO END AI ANALYSIS</h1>
        </CardContent>
        <CardContent>
          <img src={HFM} height='400' width='1000' />
        </CardContent>
      </Card>
    </Box>
  );
};

export default MLA_Info;
