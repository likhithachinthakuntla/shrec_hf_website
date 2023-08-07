import { useState, Fragment, useEffect } from 'react';
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
} from '@mui/material';
import Dropdown from '../../components/Dropdown/dropdown';
import HFM from '../../assets/images/Flow_Chart.png';
import './InferenceInput.css';
import { useNavigate } from 'react-router-dom';

const steps = [
  'Select Infrastructure',
];

const InferenceE2EInput = () => {
const navigate = useNavigate();
const [modelTrainingData, setModelTrainingData] = useState([]);
  const infrastructureData = [
    'Sapphire Rapids CPU',
    'etc...'
  ];

  const ip = Array(1).fill([]);

  ip[0] = Object.values(infrastructureData).map((item) => {
    return { value: item, label: item };
  });

  const [isLoadingModelTrainingData, setIsLoadingModelTrainingData] = useState(true);
  const [selectedInfrastructureData, setSelectedInfrastructureData] = useState({label: '', value:''});

  const [activeStep, setActiveStep] = useState(1);
  const [completed, setCompleted] = useState(true);

  const [submitClicked, setSubmitClicked] = useState(false);
  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps();
  };

  const proceed = () => {
    if (isLastStep()) {
      setCompleted(true);
      if(completed) {
        const selectedDropdownList = [];
        selectedDropdownList.push(getSelectedData(0));
        // selectedDropdownList.push(getSelectedData(1));
        // const dropdownArray = selectedDropdownListArray;
        // dropdownArray.push(selectedDropdownList);
        // setSelectedDropdownListArray(dropdownArray);
        if(window.dropdownArray == undefined) {
          window.dropdownArray = {};
        }
        window.dropdownArray[window.projectName] = selectedDropdownList;
        navigate('/inference');
      }
    }
    if (submitClicked) {
      setSubmitClicked(true);
    } else {
      setSubmitClicked(false);
    }
  };

  const handleSelectedData = (id, eventData) => {
    if (id==0) {
      setSelectedInfrastructureData(eventData);
    }
  }

  const getSelectedData = (key) => {
     if (key==0) {
      return selectedInfrastructureData;
    }
  }

  async function showSubDatasetsForDataset() {
    const response = await fetch(`/showSubDatasetsForDataset/?dataset_name=${window.dataset_name}`);
    const data = await response.json();
    window.subsetData = data;
  }

  async function showModelsForDataset() {
    const response = await fetch(`/showModelsForDataset/?dataset_name=${window.dataset_name}`);
    const data = await response.json();
    setModelTrainingData(data);
    setIsLoadingModelTrainingData(false);
  }

  useEffect(() => {
    showModelsForDataset();
    showSubDatasetsForDataset();
  }, [window.dataset_name]);

  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    if (isLastStep()) {
      setCompleted(false);
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const renderStepProgressComponent = () => {
    return (
      <Box sx={{ width: '90%' }}>
        <Stepper activeStep={activeStep - 1}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed}>
              <StepButton color='inherit' onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        {submitClicked == false && (
          <Fragment>
            {renderStep()}
            {/* <div style={{paddingTop: '60px'}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {activeStep > 1 && (
                <Button
                  color='inherit'
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  variant='outlined'
                >
                  Back
                </Button>
              )}
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep < 2 && (
                <Button onClick={handleNext} sx={{ mr: 1 }} variant='contained'>
                  Next
                </Button>
              )}
            </Box>
            </div> */}
          </Fragment>
        )}

        <Fragment>
          {activeStep >= 1 && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  pt: 2,
                  justifyContent: 'center',
                }}
              >
                <Button onClick={proceed} sx={{ mr: 1 }} variant='contained'>
                  Submit
                </Button>
              </Box>
            </>
          )}
        </Fragment>
      </Box>
    );
  };

  const renderFinalStep = () => {
    return (
      <>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          spacing={2}
          mt={2}
          mb={4}
        >
          {Object.entries({
            0: 'Infrastructure',
          }).map(([key, value]) => (
            <Grid item key={key} xs={6} marginY={1} className='align-center'>
              <Dropdown placeholder={value} options={ip[key]} id={key} handleSelectedData={handleSelectedData} selectedOption={getSelectedData(key)} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  const renderStep = () => {
    // if (completed) return
     return renderFinalStep();
    // debugger;
    // switch (activeStep) {
    //   case 1:
    //     return renderStep1();
    //   default:
    //     return null;
    // }
  };


  const renderStep1 = () => {
    return (
      <Grid className='dropdown-pos' marginY={4} ml={4}>
        <Dropdown placeholder='Infrastructure' options={ip[1]} id={1} handleSelectedData={handleSelectedData} selectedOption={selectedInfrastructureData} />
      </Grid>
    );
  };

  return (
    <Box className='box-container'>
      <Card className='card-container'>
        <CardContent className='align-center card-content'>
          <h1>INFERENCE INPUTS</h1>
        </CardContent>

        <CardContent className='align-center card-content'>
          {renderStepProgressComponent()}
        </CardContent>
      </Card>

      <Card className='card-container'>
        <CardContent>
          <img src={HFM} height='500' width='800' />
        </CardContent>
      </Card>
    </Box>
  );
};

export default InferenceE2EInput;
