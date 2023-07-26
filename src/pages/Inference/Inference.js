// import React from 'react';
// import './Inference.css';

// const Inference = () => {
//     return (
//         <>
//             <div className='box-style'>
//                 <div className='card-style'>
//                     <div className='align-center'>
//                         <div>
//                             <h1 style={{paddingBlockEnd:"200px"}}>Inference</h1>
//                             <p style={{ display: "flex", fontSize:"20px"}}>In progress............!</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Inference;



// import React, { useState, useEffect } from 'react';
// import { Button, Card, Container, Row, Col } from 'react-bootstrap';
// import './Inference.css';

// function Inference() {
//     return (
//         <>
//             <Container fluid className='background2'>
//                 <Row>
//                     <Col
//                         md='12'
//                         style={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             color: 'white',
//                             paddingBottom: '20px',
//                         }}
//                     >
//                         <div className='align-center'>
//                             <div>
//                                 <h1 style={{paddingBlockEnd:"200px", alignSelf: "flex-start"}}>Inference Summary</h1>
//                                 <p style={{paddingLeft:"100px", fontSize: "20px", alignSelf: "flex-end"}}>In progress.....!</p>
//                             </div>
//                         </div>
//                     </Col>
//                 </Row>
//             </Container>
//         </>
//     );
// }

// export default Inference;


import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import './Inference.css';
import { AiOutlineLoading, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import TextField from '@mui/material/TextField';
import { IconButton, Grid } from '@mui/material';
import { IoIosArrowDropdownCircle, IoIosArrowDropleftCircle } from "react-icons/io";

function Inference() {

    const [isCardLoading, setIsCardLoading] = useState(true);
    const [cardData, setCardData] = useState({ modelName: '--', inferenceTask: '--', infrastructure: '--', inputType: '--' });
    const [showFeatureImportances, setShowFeatureImportances] = useState(false);
    const handleClickFeatureImportances = () => {
        setShowFeatureImportances(!showFeatureImportances);
    }

    const [inputText, setInputText] = useState('');
    const [inferenceResult, setInferenceResult] = useState({label: '', score: ''});

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    // const handleButtonClick = () => {
    //     // Perform inference or any desired action here
    //     // Update the inferenceResult state with the new data
    //     setInferenceResult(`Inference result for "${inputText}"`);
    // };

    // const [text, setText] = useState('');

    // const handleTextChange = (event) => {
    //     setText(event.target.value);
    // };

    const handleButtonClick = () => {
        // Perform any action you want with the text
        // console.log(inputText);
        getPredictions();
    };

    async function getInferStats() {
        try {
            const reqUrl = `/getInferStats/?modelID=${window.modelName}`;
            const response = await fetch(reqUrl);
            const data = await response.json();
            // setSelectedSubset(window.subsetData);
            setCardData(data);
            // setGraphsRender(true);
            setIsCardLoading(false);
          } catch (error) {
            setCardData({ modelName: '--', inferenceTask: '--', infrastructure: '--', inputType: '--' });
            setIsCardLoading(false);
          }
    }

    useEffect(() => {
        getInferStats();
    }, []);

    async function getPredictions() {
        try {
            const device_name = "Sapphire Rapids CPU"
            const reqUrl = `/getPredictions/?modelID=${window.modelName}&device_name=${device_name}&input=${inputText}`;
            const response = await fetch(reqUrl);
            const data = await response.json();
            setInferenceResult(data);
            debugger;
            // setSelectedSubset(window.subsetData);
            // setCardData(data);
            // setGraphsRender(true);
            // setIsCardLoading(false);
          } catch (error) {
            // setCardData({ modelName: '--', inferenceTask: '--', infrastructure: '--', inputType: '--' });
            // setIsCardLoading(false);
          }
    }

    return (
        <>
            <Container fluid className='background2'>
                <Row>
                    <Col lg='3' sm='6'>
                        <Card className='card-stats'>
                            <Card.Body>
                                <Row>
                                    <Col xs='5'>
                                        <div className='icon-big icon-warning'>
                                            <i className='nc-icon nc-chart text-warning'></i>
                                        </div>
                                    </Col>
                                    <Col xs='7'>
                                        <div className='numbers'>
                                            <p className='card-category'></p>
                                            {isCardLoading && (<div className="loadingcontainer" style={{ paddingBlockEnd: '0px' }}>
                                                <AiOutlineLoading className="loadingicon" />
                                                <p style={{ paddingTop: '5px' }}>Loading...</p>
                                            </div>)}
                                            {!isCardLoading && (<Card.Title as='h3' class="ellipse">{cardData.modelName}</Card.Title>)}
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <hr></hr>
                                <div className='stats'>
                                    <i className='fas fa-redo mr-1'></i>
                                    Model name
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>

                    {/* --------------------------------------------------------------------------------------------- */}

                    <Col lg='3' sm='6'>
                        <Card className='card-stats'>
                            <Card.Body>
                                <Row>
                                    <Col xs='5'>
                                        <div className='icon-big icon-warning'>
                                            <i className='nc-icon nc-light-3 text-success'></i>
                                        </div>
                                    </Col>
                                    <Col xs='7'>
                                        <div className='numbers'>
                                            <p className='card-category'></p>
                                            {isCardLoading && (<div className="loadingcontainer" style={{ paddingBlockEnd: '0px' }}>
                                                <AiOutlineLoading className="loadingicon" />
                                                <p style={{ paddingTop: '5px' }}>Loading...</p>
                                            </div>)}
                                            {!isCardLoading && (<Card.Title as='h3'>{cardData.inferenceTask}</Card.Title>)}
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <hr></hr>
                                <div className='stats'>
                                    <i className='far fa-calendar-alt mr-1'></i>
                                    Inference task
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>

                    {/* --------------------------------------------------------------------------------------------- */}

                    <Col lg='3' sm='6'>
                        <Card className='card-stats'>
                            <Card.Body>
                                <Row>
                                    <Col xs='5'>
                                        <div className='icon-big icon-warning'>
                                            <i className='nc-icon nc-vector text-danger'></i>
                                        </div>
                                    </Col>
                                    <Col xs='7'>
                                        <div className='numbers'>
                                            <p className='card-category'></p>
                                            {isCardLoading && (<div className="loadingcontainer" style={{ paddingBlockEnd: '0px' }}>
                                                <AiOutlineLoading className="loadingicon" />
                                                <p style={{ paddingTop: '5px' }}>Loading...</p>
                                            </div>)}
                                            {!isCardLoading && (<Card.Title as='h3'>{cardData.infrastructure}</Card.Title>)}
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <hr></hr>
                                <div className='stats'>
                                    <i className='far fa-clock-o mr-1'></i>
                                    Infrastructure
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col lg='3' sm='6'>
                        <Card className='card-stats'>
                            <Card.Body>
                                <Row>
                                    <Col xs='5'>
                                        <div className='icon-big icon-warning'>
                                            <i className='nc-icon nc-favourite-28 text-primary'></i>
                                        </div>
                                    </Col>
                                    <Col xs='7'>
                                        <div className='numbers'>
                                            <p className='card-category'></p>
                                            {isCardLoading && (<div className="loadingcontainer" style={{ paddingBlockEnd: '0px' }}>
                                                <AiOutlineLoading className="loadingicon" />
                                                <p style={{ paddingTop: '5px' }}>Loading...</p>
                                            </div>)}
                                            {!isCardLoading && (<Card.Title as='h3'>{cardData.inputType}</Card.Title>)}
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <hr></hr>
                                <div className='stats'>
                                    <i className='fas fa-redo mr-1'></i>
                                    Input type
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md='12'>
                        <Card>
                            <Card.Header>
                                <Container>
                                    <Row>
                                        <Col sm={8}>
                                            <Card.Title as='h4'>Inference - Hugging Face</Card.Title>
                                        </Col>
                                        <Col
                                            sm={4}
                                            style={{ display: 'flex', justifyContent: 'right' }}
                                        >
                                            <IconButton
                                                aria-label='Add project'
                                                size='large'
                                                style={{ paddingBlockStart: '0px', paddingBlockEnd: '40px' }}
                                                onClick={handleClickFeatureImportances}
                                            >
                                                <div>{!showFeatureImportances && <IoIosArrowDropleftCircle fontSize='inherit' />}</div>
                                                <div>{showFeatureImportances && <IoIosArrowDropdownCircle fontSize='inherit' />}</div>
                                            </IconButton>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Header>
                            {showFeatureImportances && <Card.Body>
                                {/* <div
                                    style={{ padding: '0px 0px 0px 20px', width: '100%', height: '100%' }}
                                >
                                    <div style={{paddingBottom: "20px"}}>
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Enter text"
                                            multiline
                                            rows={7}
                                            defaultValue=""
                                            style={{width: "400px"}}
                                        />
                                    </div>
                                    <div className = 'align-center' style={{width: "400px"}}>
                                        <Button onClick={handleButtonClick}>Submit</Button>
                                    </div>
                                    <p>jhvfjwrbvfkebfvkeb</p>
                                </div> */}
                                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
  <div style={{ padding: '0px 20px 20px 0px' }}>
    <TextField
      id="outlined-multiline-static"
      label="Enter text"
      multiline
      rows={7}
      defaultValue=""
      style={{ width: '400px' }}
      value={inputText}
      onChange={handleInputChange}
    />
  </div>
  <div style={{ paddingBottom: '20px' }}>
    <p>
        {/* Machine learning (ML) inference is the process of running live data points into a machine learning algorithm (or “ML model”) to calculate an output such as a single numerical score. This process is also referred to as “operationalizing an ML model” or “putting an ML model into production.” When an ML model is running in production, it is often then described as artificial intelligence (AI) since it is performing functions similar to human thinking and analysis. Machine learning inference basically entails deploying a software application into a production environment, as the ML model is typically just software code that implements a mathematical algorithm. That algorithm makes calculations based on the characteristics of the data, known as “features” in the ML vernacular. */}
        <br/><br/>
        Label: {inferenceResult.label}
        <br/><br/>
        Score: {inferenceResult.score}
    </p>
  </div>
</div>
<div className="align-center" style={{ width: '400px' }}>
  <Button onClick={handleButtonClick}>Submit</Button>
</div>

                            </Card.Body>}
                            <Card.Footer>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Inference;
