
import React from 'react';
import './Pipeline_Selection.css';
import {
    Button,
    Grid,
    Box,
} from '@mui/material';
import { useNavigate } from "react-router-dom";

const Pipeline_Selection = () => {
    const navigate = useNavigate();
    const handleETLPipeline = () => {
        window.ETLPipeline = true;
        navigate('/userInputs');
    };
    const handleDataAnalysis = () => {
        navigate('/userInputs');
    };
    const handleTraining = () => {
        navigate('/training');
    };
    const handleInference = () => {
        navigate('/inference');
    };

    return (
        <>
            <div className='box-style'>
                <div className='card-style'>
                    <div className='align-center'>
                        <h1>What do you want to do?</h1>
                    </div>
                    <div className='align-buttons'>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                            >
                                <Button
                                    variant='contained'
                                    style={{ display: 'block', margin: '0 auto', width: '230px' }}
                                    onClick={handleDataAnalysis}
                                >
                                    Data Analysis<br />
                                    (ETL)
                                </Button>
                                <Button
                                    variant='contained'
                                    style={{ display: 'block', margin: '0 auto', width: '230px' }}
                                    onClick={handleTraining}
                                >
                                    Train<br />
                                    Data
                                </Button>
                                <Button
                                    variant='contained'
                                    style={{ display: 'block', margin: '0 auto', width: '230px' }}
                                    onClick={handleInference}
                                >
                                    Inference<br />
                                    Page
                                </Button>
                                <Button
                                    variant='contained'
                                    style={{ display: 'block', margin: '0 auto', width: '230px' }}
                                    onClick={handleETLPipeline}
                                >
                                    E2E Pipeline<br />
                                    (ETL+Train+Inference)
                                </Button>
                            </Grid>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pipeline_Selection;
