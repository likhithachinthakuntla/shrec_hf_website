import { useState, Fragment } from 'react';
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
import './UserInput.css';
import { useNavigate } from 'react-router-dom';

const steps = [
  'Select Dataset',
  'Select Model and Framework',
  'Select Infrastructure',
];

const UserInput = () => {
  const navigate = useNavigate();
  const analyseData = () => {};

  const etlData = ['Yelp Reviews'];
  const modelTrainingData = ['Bert', 'LSTM'];
  const trainingFrameworkData = ['Tensorflow', 'PyTorch'];
  const infrastructureData = [
    'Sapphire Rapids CPU',
    'Ponte Vecchio GPU',
    'Arctic Sound GPU',
    'Habana Gaudi',
    'Habana Gaudi 2',
  ];

  const ip = Array(4).fill([]);

  ip[0] = Object.values(etlData).map((item) => {
    return { value: item, label: item };
  });

  ip[1] = Object.values(modelTrainingData).map((item) => {
    return { value: item, label: item };
  });

  ip[2] = Object.values(trainingFrameworkData).map((item) => {
    return { value: item, label: item };
  });

  ip[3] = Object.values(infrastructureData).map((item) => {
    return { value: item, label: item };
  });

  const [selectedEtlData, setSelectedEtlData] = useState({label: '', value:''});
  const [selectedModelTrainingData, setSelectedModelTrainingData] = useState({label: '', value:''});
  const [selectedTrainingFrameworkData, setSelectedTrainingFrameworkData] = useState({label: '', value:''});
  const [selectedInfrastructureData, setSelectedInfrastructureData] = useState({label: '', value:''});

  const [isChartVisible, toggleChartVisibility] = useState(false);

  const [activeStep, setActiveStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  const [submitClicked, setSubmitClicked] = useState(false);
  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps();
  };

  // const [selectedDropdownListArray, setSelectedDropdownListArray] = useState([]);

  const proceed = () => {
    if (isLastStep()) {
      setCompleted(true);
      if(completed) {
        const selectedDropdownList = [];
        selectedDropdownList.push(getSelectedData(0));
        selectedDropdownList.push(getSelectedData(1));
        selectedDropdownList.push(getSelectedData(2));
        selectedDropdownList.push(getSelectedData(3));
        // const dropdownArray = selectedDropdownListArray;
        // dropdownArray.push(selectedDropdownList);
        // setSelectedDropdownListArray(dropdownArray);
        if(window.dropdownArray == undefined) {
          window.dropdownArray = {};
        }
        window.dropdownArray[window.projectName] = selectedDropdownList;
        navigate('/etl');
      }
    }
    if (submitClicked) {
      setSubmitClicked(true);
    } else {
      setSubmitClicked(false);
    }
  };

  const handleSelectedData = (id, eventData) => {
    if(id==0) {
        setSelectedEtlData(eventData);
    } else if (id==1) {
        setSelectedModelTrainingData(eventData);
    } else if (id==2) {
      setSelectedTrainingFrameworkData(eventData);
    } else if (id==3) {
      setSelectedInfrastructureData(eventData);
    }
  }

  const getSelectedData = (key) => {
    if(key==0) {
      return selectedEtlData;
  } else if (key==1) {
    return selectedModelTrainingData;
  } else if (key==2) {
    return selectedTrainingFrameworkData;
  } else if (key==3) {
    return selectedInfrastructureData;
  }
  }

  const handleNext = () => {
    // debugger;
    // if (isLastStep()) {
    //   setCompleted(true);
    //   return toggleChartVisibility((chartVisible) => !chartVisible);
    // }
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    // debugger;
    if (isLastStep()) {
      setCompleted(false);
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    console.log('step = ', step);
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
              {activeStep < 3 && (
                <Button onClick={handleNext} sx={{ mr: 1 }} variant='contained'>
                  Next
                </Button>
              )}
            </Box>
          </Fragment>
        )}

        <Fragment>
          {activeStep >= 3 && (
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
            0: 'Dataset',
            1: 'Model Training',
            2: 'Training Framework',
            3: 'Infrastructure',
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
    if (completed) return renderFinalStep();
    // debugger;
    switch (activeStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  const renderStep1 = () => {
    return (
      <Grid className='dropdown-pos' marginY={4} ml={4}>
        <Dropdown placeholder='Dataset' options={ip[0]} id={0} handleSelectedData={handleSelectedData} selectedOption={selectedEtlData} />
      </Grid>
    );
  };

  const renderStep2 = () => {
    return (
      <>
        <Stack
          direction='row'
          className='dropdown-pos'
          spacing={2}
          marginY={4}
          ml={4}
        >
          <Dropdown placeholder='Model Training' options={ip[1]} id={1} handleSelectedData={handleSelectedData} selectedOption={selectedModelTrainingData} />
          <Dropdown placeholder='Training Framework' options={ip[2]} id={2} handleSelectedData={handleSelectedData} selectedOption={selectedTrainingFrameworkData} />
        </Stack>
      </>
    );
  };

  const renderStep3 = () => {
    return (
      <Grid className='dropdown-pos' marginY={4} ml={4}>
        <Dropdown placeholder='Infrastructure' options={ip[3]} id={3} handleSelectedData={handleSelectedData} selectedOption={selectedInfrastructureData} />
      </Grid>
    );
  };

  return (
    <Box className='box-container'>
      <Card className='card-container'>
        <CardContent className='align-center card-content'>
          <h1>MACHINE LEARNING PIPELINE INPUTS</h1>
        </CardContent>

        <CardContent className='align-center card-content'>
          {renderStepProgressComponent()}
        </CardContent>
      </Card>

      <Card className='card-container'>
        <CardContent>
          <img src={HFM} height='300' width='900' />
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserInput;
