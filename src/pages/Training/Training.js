// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../Dashboard/scss/light-bootstrap-dashboard-react.scss?v=2.0.0';
// // import '../'
// import { Button, Card, Container, Row, Col } from 'react-bootstrap';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
// } from 'chart.js';
// import { IconButton } from '@mui/material';
// import { AiOutlineArrowRight } from 'react-icons/ai';
// import { useNavigate } from 'react-router-dom';

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
// function Training() {
//   const navigate = useNavigate();
//   useEffect(() => {
//     // Fetch Data to be populated in the table
//     // fetch('https://jsonplaceholder.typicode.com/users')
//     //   .then((resp) => resp.json())
//     //   .then((resp) => {
//     //     console.log(resp);
//     //     setTableData(resp);
//     //   });

//     // Fetch Data to be populated in the horizontal bar-chart
//     fetch('https://dummyjson.com/products/?limit=10')
//       .then((chartRes) => chartRes.json())
//       .then((chartRes) => {
//         console.log(chartRes);
//         setBarChartData(chartRes.products);
//       });
//   }, []);

//   const [barChartData, setBarChartData] = useState([]);
//   const options = {};
//   const data = {
//     labels: barChartData.map((x) => x.title),
//     datasets: [
//       {
//         label: 'Price',
//         data: barChartData.map((x) => x.price),
//         // fill: true,
//         backgroundColor: 'orange',
//         borderColor: 'orange',
//       },
//       // {
//       //   label: 'Stock',
//       //   backgroundColor: 'rgba(255,99,132,0.2)',
//       //   borderColor: 'rgba(255,99,132,1)',
//       //   borderWidth: 1,
//       //   hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//       //   hoverBorderColor: 'rgba(255,99,132,1)',
//       //   data: barChartData.map((x) => x.stock),
//       // },
//     ],
//   };

//   const data2 = {
//     labels: barChartData.map((x) => x.title),
//     datasets: [
//       {
//         label: 'Stock',
//         data: barChartData.map((x) => x.rating),
//         // fill: true,
//         backgroundColor: 'blue',
//         borderColor: 'blue',
//       },
//       // {
//       //   label: 'Stock',
//       //   backgroundColor: 'rgba(255,99,132,0.2)',
//       //   borderColor: 'rgba(255,99,132,1)',
//       //   borderWidth: 1,
//       //   hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//       //   hoverBorderColor: 'rgba(255,99,132,1)',
//       //   data: barChartData.map((x) => x.stock),
//       // },
//     ],
//   };

//   const handleInferencePage = () => {
//     navigate('/inference');
//   }

//   return (
//     <>
//       <Container fluid className='background2'>
//         <Row>
//           <Col
//             md='12'
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               color: 'white',
//               paddingBottom: '20px',
//             }}
//           >
//             <h1>Training Summary</h1>
//           </Col>
//         </Row>
//         {/* ------------------------------------------------------------------------------ */}
//         <Row>
//           <Col md='6'>
//             <Card>
//               <Card.Header>
//                 <Card.Title as='h4'>Model Accuracy</Card.Title>
//                 <p className='card-category'></p>
//               </Card.Header>
//               <Card.Body>
//                 <Line data={data} options={options}></Line>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md='6'>
//             <Card>
//               <Card.Header>
//                 <Card.Title as='h4'>Model Loss</Card.Title>
//                 <p className='card-category'></p>
//               </Card.Header>
//               <Card.Body>
//                 <Line data={data2} options={options}></Line>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//         {/* <Container style={{ marginInlineEnd: '0px', paddingBlockEnd: '50px' }}> */}
//         <Row>
//           <Col
//             sm={12}
//             style={{ display: 'flex', justifyContent: 'right' }}
//           >
//             <Button type='button' onClick={handleInferencePage} style={{ paddingLeft: '20px', color: 'white' }}>
//               NEXT
//               <IconButton
//                 aria-label='Add project'
//                 size='medium'
//                 style={{ color: 'white' }}
//               >
//                 <AiOutlineArrowRight fontSize='inherit' />
//               </IconButton>
//             </Button>
//           </Col>
//         </Row>
//         {/* </Container> */}
//       </Container>
//     </>
//   );
// }

// export default Training;





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



import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import './Training.css';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { AiOutlineArrowRight } from 'react-icons/ai';

function Training() {
    const navigate = useNavigate();
    function handleInferencePage() {
        navigate('/inferenceInput');
    }

    return (
        <>
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
                                <h1 style={{paddingBlockEnd:"150px", alignSelf: "flex-start"}}>Training Summary</h1>
                                <p style={{paddingBlockEnd:"100px", paddingLeft:"100px", fontSize: "20px", alignSelf: "flex-end"}}>In progress.....!</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            <Row>
              <Col
                sm={12}
                style={{ display: 'flex', justifyContent: 'right' }}
              >
                <Button type='button' onClick={handleInferencePage} style={{ paddingLeft: '20px', color: 'white' }}>
                  NEXT
                  <IconButton
                    aria-label='Add project'
                    size='small'
                    style={{ color: 'white' }}
                  >
                    <AiOutlineArrowRight fontSize='inherit' />
                  </IconButton>
                </Button>
              </Col>
            </Row>
            </Container>
        </>
    );
}

export default Training;
