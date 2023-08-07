
import React from 'react';
import './PipelineSelection.css';
import {
    Button,
    Grid,
    Box,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { IconButton, Divider } from '@mui/material';
import { TfiSettings } from "react-icons/tfi";
import { SiMusicbrainz } from "react-icons/si";
import { FcFinePrint, FcMindMap, FcScatterPlot, FcSerialTasks, FcComboChart, FcServices, FcWorkflow } from "react-icons/fc";

const PipelineSelection = () => {
    const navigate = useNavigate();
    const handleE2EPipeline = () => {
        window.E2EPipeline = true;
        // window.ETLPage = true;
        // window.trainingPage = true;
        // window.inferencePage = true;
        navigate('/userInputs');
    };
    const handleDataAnalysis = () => {
        window.ETLPage = true;
        navigate('/userInputs');
    };
    const handleTraining = () => {
        window.trainingPage = true;
        navigate('/trainingInput');
    };
    const handleInference = () => {
        window.inferencePage = true;
        navigate('/inferenceInput');
    };

    return (
        <>
            <div className='box-style'>
                <div className='pipeline-card-style'>
                    <div className='align-center'>
                        <h1>What do you want to do?</h1>
                    </div>
                </div>
                <div className='pipeline-card-style'>
                    <div className='align-buttons'>
                        <div className='align-center' style={{ paddingBottom: '20px' }}>
                            <h5>Select any individual task</h5>
                        </div>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <div style={{ padding: '0px 10px 0px 10px' }}>
                                    <IconButton
                                        variant='contained'
                                        style={{
                                            borderRadius: '50%',
                                            backgroundColor: '#1976d2',
                                            color: '#fff',
                                            width: '140px', /* Adjust the width to increase horizontal width */
                                            height: '90px', /* Set the desired height for the button */
                                            padding: '0', /* Remove any padding to ensure the oval shape */
                                            boxShadow: '0 0 6px rgba(0, 0, 0, 0.3)',
                                            transition: 'box-shadow 0.3s ease-in-out',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 10px 3px rgba(0, 0, 0, 0.5)' }}
                                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 6px rgba(0, 0, 0, 0.3)' }}
                                        onClick={handleDataAnalysis}
                                    >
                                        <FcFinePrint style={{ width: '70%', height: '50%' }} />
                                        {/* Data Analysis<br />
                                    (ETL) */}
                                    </IconButton>
                                    <div className='align-center'>
                                        ETL
                                    </div>
                                </div>
                                <div style={{ padding: '0px 10px 0px 10px' }}>
                                    <IconButton
                                        variant='contained'
                                        style={{
                                            borderRadius: '50%',
                                            backgroundColor: '#1976d2',
                                            color: '#fff',
                                            width: '140px', /* Adjust the width to increase horizontal width */
                                            height: '90px', /* Set the desired height for the button */
                                            padding: '0', /* Remove any padding to ensure the oval shape */
                                            boxShadow: '0 0 6px rgba(0, 0, 0, 0.3)',
                                            transition: 'box-shadow 0.3s ease-in-out',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 10px 3px rgba(0, 0, 0, 0.5)' }}
                                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 6px rgba(0, 0, 0, 0.3)' }}
                                        onClick={handleTraining}
                                    >
                                        <FcServices style={{ width: '70%', height: '50%' }} />
                                        {/* Train<br />
                                    Data */}
                                    </IconButton>
                                    <div className='align-center'>
                                        Train
                                    </div>
                                </div>
                                <div style={{ padding: '0px 10px 0px 10px' }}>
                                    <IconButton
                                        variant='contained'
                                        style={{
                                            borderRadius: '50%',
                                            backgroundColor: '#1976d2',
                                            color: '#fff',
                                            width: '140px', /* Adjust the width to increase horizontal width */
                                            height: '90px', /* Set the desired height for the button */
                                            padding: '0', /* Remove any padding to ensure the oval shape */
                                            boxShadow: '0 0 6px rgba(0, 0, 0, 0.3)',
                                            transition: 'box-shadow 0.3s ease-in-out',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 10px 3px rgba(0, 0, 0, 0.5)' }}
                                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 6px rgba(0, 0, 0, 0.3)' }}
                                        onClick={handleInference}
                                    >
                                        <FcComboChart style={{ width: '70%', height: '50%' }} />
                                        {/* Inference<br />
                                    Page */}
                                    </IconButton>
                                    <div className='align-center'>
                                        Inference
                                    </div>
                                </div>
                            </Grid>
                        </Box>
                    </div>
                    {/* <div className='align-buttons'> */}
                    <div className='align-center' style={{ paddingBottom: '0px' }}>
                        {/* <Divider></Divider>   OR   <Divider></Divider> */}
                        <Divider style={{ backgroundColor: 'black', width: '200px' }} />
                        <span style={{ margin: '0px 10px' }}>OR</span>
                        <Divider style={{ backgroundColor: 'black', width: '200px' }} />

                        {/* <h6>OR</h6> */}
                    </div>
                    {/* </div> */}
                    <div className='align-buttons'>
                        <div className='align-center' style={{ paddingBottom: '20px' }}>
                            <h5>Execute E2E Pipeline</h5>
                        </div>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                            >
                                <div>
                                    <IconButton
                                        variant='contained'
                                        style={{
                                            borderRadius: '50%',
                                            backgroundColor: '#1976d2',
                                            color: '#fff',
                                            width: '140px', /* Adjust the width to increase horizontal width */
                                            height: '90px', /* Set the desired height for the button */
                                            padding: '0', /* Remove any padding to ensure the oval shape */
                                            boxShadow: '0 0 6px rgba(0, 0, 0, 0.3)',
                                            transition: 'box-shadow 0.3s ease-in-out',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 10px 3px rgba(0, 0, 0, 0.5)' }}
                                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 6px rgba(0, 0, 0, 0.3)' }}
                                        onClick={handleE2EPipeline}
                                    >
                                        <FcWorkflow style={{ width: '70%', height: '50%' }} />
                                        {/* E2E Pipeline<br />
                                    (ETL+Train+Inference) */}
                                    </IconButton>
                                    <div className='align-center'>
                                        End to End Pipeline
                                    </div>
                                </div>
                            </Grid>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PipelineSelection;
