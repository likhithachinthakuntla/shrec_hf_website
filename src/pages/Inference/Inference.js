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


import React, { useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import './Inference.css';

function Inference() {
    const [inputText, setInputText] = useState('');
    const [inferenceResult, setInferenceResult] = useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleButtonClick = () => {
        // Perform inference or any desired action here
        // Update the inferenceResult state with the new data
        setInferenceResult(`Inference result for "${inputText}"`);
    };

    return (
        <Container fluid className='background2'>
            <Row>
                <Col
                    md='12'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        color: 'white',
                        paddingBottom: '20px',
                    }}
                >
                    <div className='align-center'>
                        <div>
                            <h1 style={{ paddingBlockEnd: '200px', alignSelf: 'flex-start' }}>Inference Summary</h1>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex' }}>
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={handleInputChange}
                                        style={{ marginRight: '10px' }}
                                    />
                                    <Button onClick={handleButtonClick}>Submit</Button>
                                </div>
                                <p style={{ paddingLeft: '100px', fontSize: '20px', alignSelf: 'flex-end' }}>
                                    {inferenceResult}
                                </p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Inference;
