
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SalaryTable from './components/SalaryTable';
import TripleButtonGroup from './components/TripleButtonGroup';
import TripleButtonPlaceholder from './components/TripleButtonPlaceholder';
import DropDown from './components/DropDown';
import SpendTable from './components/SpendTable';

const API_ENDPOINT = 'http://localhost:8080/';
const CITIES_URL = `${API_ENDPOINT}city/all`;
const ROLES_URL = `${API_ENDPOINT}role/all`;
const SALARY_URL = `${API_ENDPOINT}salary`;
const TAX_URL = `${API_ENDPOINT}tax`;
const SPEND_URL = `${API_ENDPOINT}spend`;

const genericReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

function App() {
  const [radioValue, setRadioValue] = React.useState(0);
  const [dropdownTitle, setDropdownTitle] = React.useState('Select City');
  const [salaries, dispatchSalaries] = React.useReducer(genericReducer,
    { data: [], isLoading: false, isError: false });
  const [cities, dispatchCities] = React.useReducer(genericReducer,
    { data: [], isLoading: false, isError: false });
  const [roles, dispatchRoles] = React.useReducer(genericReducer,
    { data: [], isLoading: false, isError: false });
  const [tax, dispatchTax] = React.useReducer(genericReducer,
    { data: [], isLoading: false, isError: false });
  const [spend, dispatchSpend] = React.useReducer(genericReducer,
    { data: [], isLoading: false, isError: false });

  const handleFetchInitialData = React.useEffect(() => {
    genericFetch(CITIES_URL, dispatchCities);
    genericFetch(ROLES_URL, dispatchRoles);
  }, []);

  async function genericFetch(url, dispatchFunction){ 
      dispatchFunction({ type: 'FETCH_INIT' });
      try {
        const result = await axios.get(url);
        dispatchFunction({
          type: 'FETCH_SUCCESS',
          payload: result.data,
        });
      } catch {
        dispatchFunction({ type: 'FETCH_FAILURE' });
      }
    }
  
  const handleDropdownChange = title => {
    setDropdownTitle(title)
    if (title === 'Select City') {
      return;
    }
    let cityForData = cities.data.find( city => city.name == title );
    let cityForDataID = cityForData.id;
    genericFetch(`${SALARY_URL}/${cityForDataID}`, dispatchSalaries);
    genericFetch(`${SPEND_URL}/${cityForDataID}`, dispatchSpend);
    console.log(JSON.stringify(spend));
  }

  const handleFetchTax = React.useCallback(async () => {
    if (salaries.data.length === 0 || radioValue === 0){
      return;
    } 
    let salaryId = salaries.data[radioValue-1].id;
    genericFetch(`${TAX_URL}/${salaryId}`, dispatchTax)
  }, [radioValue, salaries]);

  React.useEffect(() => {
    handleFetchTax();
  }, [handleFetchTax]);

  return (
    <Container>
      <Row>
      <Col></Col>
        <Col xs={7}>
          <div>
            { cities.isError && <Alert variant='danger'>Something went wrong loading Cities...</Alert>}
            { cities.isLoading ? (
              <DropDown title="Loading..." setTitleFunction={handleDropdownChange} cities={[]}/>
            ) : (
              <DropDown title={dropdownTitle} setTitleFunction={handleDropdownChange} cities={cities.data}></DropDown>
            )}

            { roles.isError && <Alert variant='danger'>Something went wrong loading Roles...</Alert>}

            { roles.isLoading ? (
              <TripleButtonPlaceholder/>
            ) : (
              <TripleButtonGroup radioValue={radioValue} setRadioFunction={setRadioValue} radioLabels={roles.data}/>
            )}
            <SalaryTable salariesGiven={salaries} radioValue={radioValue} taxGiven={tax}></SalaryTable>
          </div>
          <div>
            { spend.isError && <Alert variant='danger'>Something went wrong loading Spend...</Alert>}

            { spend.isLoading ? (
            <></>) : (
              <SpendTable salariesGiven={salaries} radioValue={radioValue} taxGiven={tax} spend={spend}/>
            )}
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};



export default App;
