import React, { useState, useRef, useCallback, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/light-bootstrap-dashboard-react.scss?v=2.0.0';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

import { VictoryChart, VictoryScatter, VictoryZoomContainer } from 'victory';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import './Dashboard.css';
import tableIcons from './MaterialTableIcons';
import InProgress from '../../components/In_Progress_page/In_Progress_Page';
import { Checkbox } from '@material-ui/core';
import { blue } from "@material-ui/core/colors";

function Dashboard() {

  const [cardData, setCardData] = useState({Name: '', Size:'', NumInstances:'', type:''});

  useEffect(() => {
    async function getDatasetStats() {
      const response = await fetch('/getDatasetStats');
      const data = await response.json();
      setCardData(data);
    }
    getDatasetStats();
  }, []);

  const checkboxOptions = [
    { id: 1, label: "Remove Punctuations" },
    { id: 2, label: "Remove Stop Words" },
    { id: 3, label: "Remove HTML Tags" },
    { id: 4, label: "Lemmatization (extract root words)" },
    { id: 5, label: "Stemming (remove suffix)" },
  ];

  const [selectedCheckboxOptions, setSelectedCheckboxOptions] = useState([]);

  const handleCheckboxChange = (event) => {
    const optionId = parseInt(event.target.value);
    const isChecked = selectedCheckboxOptions.includes(optionId);
    if (isChecked) {
      setSelectedCheckboxOptions(selectedCheckboxOptions.filter((id) => id !== optionId));
    } else {
      setSelectedCheckboxOptions([...selectedCheckboxOptions, optionId]);
    }
  };

  useEffect(() => {
    // Fetch Data to be populated in the table
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setTableData(resp);
      });

    // Fetch Data to be populated in the horizontal bar-chart
    fetch('https://dummyjson.com/products/?limit=10')
      .then((chartRes) => chartRes.json())
      .then((chartRes) => {
        console.log(chartRes);
        setBarChartData(chartRes.products);
      });
  }, []);

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

  // ------------------------------------------------------------
  // HORIZONTAL BAR CHART
  // ------------------------------------------------------------
  let ref = useRef(null);

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

  const [barChartData, setBarChartData] = useState([]);

  const data1 = {
    labels: barChartData.map((x) => x.title),
    datasets: [
      {
        label: 'Price',
        data: barChartData.map((x) => x.price),
        fill: true,
        backgroundColor: 'rgba(6, 156,51, .3)',
        borderColor: '#02b844',
      },
      // {
      //   label: 'Stock',
      //   backgroundColor: 'rgba(255,99,132,0.2)',
      //   borderColor: 'rgba(255,99,132,1)',
      //   borderWidth: 1,
      //   hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      //   hoverBorderColor: 'rgba(255,99,132,1)',
      //   data: barChartData.map((x) => x.stock),
      // },
    ],
  };

  const downloadImage = useCallback(() => {
    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = ref.current.toBase64Image();
    link.click();
  }, []);

  // ------------------------------------------------------------
  // TABLE
  // ------------------------------------------------------------

  const defaultMaterialTheme = createTheme();

  const [tableData, setTableData] = useState([]);

  const columns = [
    { title: 'ID', field: 'id' },
    { title: 'Username', field: 'username' },
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Phone', field: 'phone' },
    { title: 'Web Link', field: 'website' },
    { title: 'City', field: 'address.city' },
  ];

  // -----------------------------
  // window.showETLPage = true;
  console.log('On Dashboard', window.showETLPage);
  return (
    <>
      {window.showETLPage && <InProgress></InProgress>}

      {!window.showETLPage && (
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
                        <Card.Title as='h3'>{cardData.Name}</Card.Title>
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
                      <div className='icon-big icon-warning'>
                        <i className='nc-icon nc-light-3 text-success'></i>
                      </div>
                    </Col>
                    <Col xs='7'>
                      <div className='numbers'>
                        <p className='card-category'></p>
                        <Card.Title as='h3'>{cardData.Size}</Card.Title>
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
                      <div className='icon-big icon-warning'>
                        <i className='nc-icon nc-vector text-danger'></i>
                      </div>
                    </Col>
                    <Col xs='7'>
                      <div className='numbers'>
                        <p className='card-category'></p>
                        <Card.Title as='h3'>{cardData.NumInstances}</Card.Title>
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
                      <div className='icon-big icon-warning'>
                        <i className='nc-icon nc-favourite-28 text-primary'></i>
                      </div>
                    </Col>
                    <Col xs='7'>
                      <div className='numbers'>
                        <p className='card-category'></p>
                        <Card.Title as='h3'>{cardData.type}</Card.Title>
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

          <Row className='justify-content-md-center'>
          <Col md='12'>
              <Card>
                <Card.Header>
                  <Container>
                    <Row>
                      <Col sm={8}>
                        <Card.Title as='h4'>Select Pre-procesing Steps</Card.Title>
                      </Col>
                      {/* <Col
                        sm={4}
                        style={{ display: 'flex', justifyContent: 'right' }}
                      >
                        <Button type='button' onClick={downloadImage}>
                          Download
                        </Button>
                      </Col> */}
                    </Row>
                  </Container>
                  {/* <p className='card-category'></p> */}
                </Card.Header>
                <Card.Body>
                  <div
                    style={{ padding: '20px', width: '100%', height: '100%' }}
                  >
                  {checkboxOptions.map((option) => (
                    <div key={option.id}>
                      <Checkbox
                        value={option.id}
                        checked={selectedCheckboxOptions.includes(option.id)}
                        onChange={handleCheckboxChange}
                        color="primary"
                        style={{ color: blue[600] }}
                      />
                      {option.label}
                    </div>
                  ))}
                  </div>
                </Card.Body>
                <Card.Footer>
                  {/* <div className='legend'>
                  <i className='fas fa-circle text-info'></i>
                  Open <i className='fas fa-circle text-danger'></i>
                  Click <i className='fas fa-circle text-warning'></i>
                  Click Second Time
                </div> */}
                  {/* <hr></hr>
                <div className='stats'>
                  <i className='fas fa-history'></i>
                  Updated 3 minutes ago
                </div> */}
                </Card.Footer>
              </Card>
            </Col>
            <Col md='12'>
              <Card>
                <Card.Header>
                  <Container>
                    <Row>
                      <Col sm={8}>
                        <Card.Title as='h4'>Feature importances</Card.Title>
                      </Col>
                      <Col
                        sm={4}
                        style={{ display: 'flex', justifyContent: 'right' }}
                      >
                        <Button type='button' onClick={downloadImage}>
                          Download
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                  {/* <p className='card-category'></p> */}
                </Card.Header>
                <Card.Body>
                  <div
                    style={{ padding: '20px', width: '100%', height: '100%' }}
                  >
                    <Bar ref={ref} options={options} data={data1} />
                  </div>
                </Card.Body>
                <Card.Footer>
                  {/* <div className='legend'>
                  <i className='fas fa-circle text-info'></i>
                  Open <i className='fas fa-circle text-danger'></i>
                  Click <i className='fas fa-circle text-warning'></i>
                  Click Second Time
                </div> */}
                  {/* <hr></hr>
                <div className='stats'>
                  <i className='fas fa-history'></i>
                  Updated 3 minutes ago
                </div> */}
                </Card.Footer>
              </Card>
            </Col>
            {/* ---------------------------------------------------------------------------- */}
            <Col md='12'>
              <Card>
                <Card.Header>
                  <Card.Title as='h4'>Number of occurrences</Card.Title>
                  <p className='card-category'></p>
                </Card.Header>
                <Card.Body>
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                      icons={tableIcons}
                      options={{
                        exportButton: true,
                        exportAllData: true,
                      }}
                      columns={columns}
                      data={tableData}
                      title='Demo Title'
                    />
                  </ThemeProvider>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Dashboard;
