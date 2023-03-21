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
  Tooltip,
} from 'react-bootstrap';
import { VictoryChart, VictoryScatter, VictoryZoomContainer } from 'victory';

import './Dashboard.css';

function Dashboard() {
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
                      <p className='card-category'>Number</p>
                      <Card.Title as='h4'>150GB</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className='stats'>
                  <i className='fas fa-redo mr-1'></i>
                  Update Now
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
                      <p className='card-category'>Revenue</p>
                      <Card.Title as='h4'>$ 1,345</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className='stats'>
                  <i className='far fa-calendar-alt mr-1'></i>
                  Last day
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
                      <p className='card-category'>Errors</p>
                      <Card.Title as='h4'>23</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className='stats'>
                  <i className='far fa-clock-o mr-1'></i>
                  In the last hour
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
                      <p className='card-category'>Followers</p>
                      <Card.Title as='h4'>+45K</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className='stats'>
                  <i className='fas fa-redo mr-1'></i>
                  Update now
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
                <Card.Title as='h4'>Users Behavior</Card.Title>
                <p className='card-category'>24 Hours performance</p>
              </Card.Header>
              <Card.Body>
                <div>
                  <VictoryChart
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
                  </VictoryChart>
                </div>
              </Card.Body>
              <Card.Footer>
                <div className='legend'>
                  <i className='fas fa-circle text-info'></i>
                  Open <i className='fas fa-circle text-danger'></i>
                  Click <i className='fas fa-circle text-warning'></i>
                  Click Second Time
                </div>
                <hr></hr>
                <div className='stats'>
                  <i className='fas fa-history'></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md='4'>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Email Statistics</Card.Title>
                <p className='card-category'>Last Campaign Performance</p>
              </Card.Header>
              <Card.Body>
                <div
                  className='ct-chart ct-perfect-fourth'
                  id='chartPreferences'
                >
                  {/* <ChartistGraph
                    data={{
                      labels: ['40%', '20%', '40%'],
                      series: [40, 20, 40],
                    }}
                    type='Pie'
                  /> */}
                </div>
                <div className='legend'>
                  <i className='fas fa-circle text-info'></i>
                  Open <i className='fas fa-circle text-danger'></i>
                  Bounce <i className='fas fa-circle text-warning'></i>
                  Unsubscribe
                </div>
                <hr></hr>
                <div className='stats'>
                  <i className='far fa-clock'></i>
                  Campaign sent 2 days ago
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
