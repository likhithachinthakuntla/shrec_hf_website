import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/light-bootstrap-dashboard-react.scss?v=2.0.0';

import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
} from 'react-bootstrap';
import { VictoryChart, VictoryScatter, VictoryZoomContainer } from 'victory';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import './Dashboard.css';

function Dashboard() {
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Yelp Movies Rating',
      },
    },
  };

  const dataHorBar = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: '#EC932F',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: 'My First dataset 2',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }

  const getScatterData = () => {
    const range = Array(50).fill({});
    const range_modified = range.map((index) => {
      return {
        x: getRandomIntInclusive(10, 50),
        y: getRandomIntInclusive(10, 90),
        size: Math.random(8) + 3,
      };
    });
    return range_modified;
  };

  const data = getScatterData();

  const data1 = {
    labels: [
      'You',
      'The Order',
      'Hangover Series',
      'Lord Of The Rings',
      'Batman Begins',
      'Iron Man 2',
      'The Whale',
    ],
    datasets: [
      {
        label: 'Rating',
        data: [2, 5, 6, 9, 10, 6, 8],
        fill: true,
        backgroundColor: 'rgba(6, 156,51, .3)',
        borderColor: '#02b844',
      },
    ],
  };

  return (
    <>
      <Container fluid className='background2'>
        <Row>
          <Col lg='3' sm='6'>
            <Card className='card-stats'>
              <Card.Body>
                <Row>
                  <Col xs='5'>
                    <div className='icon-big text-center icon-warning'>
                      <i className='nc-icon nc-chart text-warning'></i>
                    </div>
                  </Col>
                  <Col xs='7'>
                    <div className='numbers'>
                      <p className='card-category'></p>
                      <Card.Title as='h4'>Yelp Reviews</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className='stats'>
                  <i className='fas fa-redo mr-1'></i>
                  Dataset
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
                    <div className='icon-big text-center icon-warning'>
                      <i className='nc-icon nc-light-3 text-success'></i>
                    </div>
                  </Col>
                  <Col xs='7'>
                    <div className='numbers'>
                      <p className='card-category'></p>
                      <Card.Title as='h4'>50GB</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className='stats'>
                  <i className='far fa-calendar-alt mr-1'></i>
                  Size
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
                    <div className='icon-big text-center icon-warning'>
                      <i className='nc-icon nc-vector text-danger'></i>
                    </div>
                  </Col>
                  <Col xs='7'>
                    <div className='numbers'>
                      <p className='card-category'></p>
                      <Card.Title as='h4'>23504</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className='stats'>
                  <i className='far fa-clock-o mr-1'></i>
                  Number of records
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg='3' sm='6'>
            <Card className='card-stats'>
              <Card.Body>
                <Row>
                  <Col xs='5'>
                    <div className='icon-big text-center icon-warning'>
                      <i className='nc-icon nc-favourite-28 text-primary'></i>
                    </div>
                  </Col>
                  <Col xs='7'>
                    <div className='numbers'>
                      <p className='card-category'></p>
                      <Card.Title as='h4'>Supervised</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className='stats'>
                  <i className='fas fa-redo mr-1'></i>
                  Type of classification
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        {/* // --------------------------------------------------------------------------------------- */}

        <Row>
          <Col md='8'>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Feature importances</Card.Title>
                <p className='card-category'></p>
              </Card.Header>
              <Card.Body>
                <div>
                  {/* <VictoryChart
                    domain={{ y: [0, 100] }}
                    containerComponent={
                      <VictoryZoomContainer
                        zoomDomain={{ x: [5, 35], y: [0, 100] }}
                      />
                    }
                  >
                    <VictoryScatter
                      data={data}
                      style={{
                        data: {
                          opacity: ({ datum }) => (datum.y % 5 === 0 ? 1 : 0.7),
                          fill: ({ datum }) =>
                            datum.y % 5 === 0 ? 'tomato' : 'black',
                        },
                      }}
                    />
                  </VictoryChart> */}
                  <Bar options={options} data={data1} />
                </div>
              </Card.Body>
              <Card.Footer>
                {/* <div className='legend'>
                  <i className='fas fa-circle text-info'></i>
                  Open <i className='fas fa-circle text-danger'></i>
                  Click <i className='fas fa-circle text-warning'></i>
                  Click Second Time
                </div> */}
                <hr></hr>
                <div className='stats'>
                  <i className='fas fa-history'></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          {/* <Col md='4'>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Number of occurrences</Card.Title>
                <p className='card-category'></p>
              </Card.Header>
              <Card.Body>
                <Bar options={options} data={data1} />
              </Card.Body>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
