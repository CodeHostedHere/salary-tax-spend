
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Placeholder from 'react-bootstrap/Placeholder';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

const SpendTable = ({ salariesGiven, radioValue, taxGiven, spend }) => {
  if (taxGiven.data.length === 0) {
    return <></>;
  }

  let salaryCompensationonverted = salariesGiven.data[radioValue-1].compensationConverted;

  let taxPayableConverted = taxGiven.data.taxPayableConverted;
  let stringFormatOptions = { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  };
  let netMonthlyIncome = ((salaryCompensationonverted - taxPayableConverted) / 12);
  let formattedNetMonthlyIncome = netMonthlyIncome.toLocaleString('en', stringFormatOptions);
  let totalSpend = 0.0;
  spend.data.map(spendInfo => {
    totalSpend += spendInfo[1] * spendInfo[2];
  });
  let formattedTotalSpend = totalSpend.toLocaleString('en', stringFormatOptions);
  let monthlySavings = netMonthlyIncome - totalSpend;
  let formattedMonthlySavings = monthlySavings.toLocaleString('en', stringFormatOptions);
  return (
    <Table bordered striped size="sm" variant="dark">
      <tbody>
      <tr>
        <th>Net Monthly Income </th>
        <td></td><td></td><td></td>
        <th className="align-right">€{formattedNetMonthlyIncome}</th>
      </tr>
        <tr>
          <th>Expenses</th>
          <th>Cost</th>
          <th>Amount</th>
          <th>Total</th>
          <td></td>
        </tr>
        { spend.data.map(spendInfo => (
          <tr>
            <td>{spendInfo[0]}</td>
            <td>€ {spendInfo[1].toLocaleString('en', stringFormatOptions)}</td>
            <td>{spendInfo[2]}</td>
            <td> € {(spendInfo[1] * spendInfo[2]).toLocaleString('en', stringFormatOptions)}</td>
            <td></td>
          </tr>
        ))}
        <tr>
          <th>Expenses Total</th>
          <td></td><td></td>
          <td></td>
          <th className="align-right">€ {formattedTotalSpend}</th>
        </tr>
        <tr>
          <th>Monthly Savings</th>
          <td></td><td></td>
          <td></td>
          <th className="align-right">€ {formattedMonthlySavings}</th>
        </tr>
      </tbody>
    </Table>
  );
}


const DropDown = ({ title, setTitleFunction, cities }) => {
  return (
    <Dropdown onSelect={setTitleFunction}>
      <Dropdown.Toggle style={{ width: '100%'}}>
        {title}
      </Dropdown.Toggle>
      <Dropdown.Menu >
        { cities.map(city => (
           <Dropdown.Item key={city.id} eventKey={city.name}>{city.name}</Dropdown.Item>
          ))
        }
      </Dropdown.Menu>
    </Dropdown>
  );
}

const TripleButtonPlaceholder = ({}) => {
  return (
    <ButtonGroup style={{ width: '100%'}}>
      <Placeholder.Button aria-hidden="true" variant="secondary" style={{ width: '33%'}}/>
      <Placeholder.Button aria-hidden="true" variant="secondary" style={{ width: '33%'}}/>
      <Placeholder.Button aria-hidden="true" variant="secondary" style={{ width: '33%'}}/>
    </ButtonGroup>
  )
};

const TripleButtonGroup = ({ radioValue, setRadioFunction, radioLabels}) => {
  return (
    <ButtonGroup style={{ width: '100%'}}>
      {radioLabels.map((radio) => (
        <ToggleButton
          key={radio.id}
          id={radio.id}
          type="radio"
          variant={radioValue == radio.id ? ( 'outline-primary' ) : ('outline-secondary')}
          name="radio"
          value={radio.id}
          checked={radioValue == radio.id}
          onChange={(e) => setRadioFunction(e.target.value)}
        >
          {radio.seniority} {radio.role}
        </ToggleButton>
      ))}
    </ButtonGroup>

  );
}

const SalaryTable = ({salariesGiven, radioValue, taxGiven}) => {
  if (salariesGiven.data.length === 0 || radioValue === 0 || !taxGiven){
    return <EmptyTable/>;
  } 
  let currency = salariesGiven.data[0]["currency"];
  let salary = salariesGiven.data.find(salary => salary.id === radioValue)
  if ( currency === '€'){
    return (<TwoRowTable salaryChosen={salariesGiven.data[radioValue-1]} tax={taxGiven}></TwoRowTable>);
  } else {
    return(<FourRowTable salaryChosen={salariesGiven.data[radioValue-1]} tax={taxGiven}></FourRowTable>);
  }
}

const FourRowTable = ({salaryChosen, tax}) => {
  return (
    <div>
      <Table bordered striped size="sm" variant="dark">
        <tbody>
          <tr>
            <td className="align-middle" rowSpan={2}>
              Salary
            </td>
            <td className="annual-numbers"> 
              { salaryChosen.currency } { salaryChosen.compensation.toLocaleString("en-US") }
            </td>
            <td className="align-middle" rowSpan={2}>
              Tax
            </td>
            <td className="annual-numbers">
            { salaryChosen.currency } { tax.data.taxPayable && tax.data.taxPayable.toLocaleString("en-US") } 
            </td>
          </tr>
          <tr>
            <td className="annual-numbers">
              € { salaryChosen.compensationConverted.toLocaleString("en-US") }
            </td>
            <td className="annual-numbers">
          
            € { tax.data.taxPayableConverted && tax.data.taxPayableConverted.toLocaleString("en-US") }
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

const TwoRowTable = ({salaryChosen, tax}) => {
  return (
    <div>
      <Table bordered striped size="sm" variant="dark">
        <tbody>
          <tr>
            <td className="align-middle">
              Salary
            </td>
            <td className="align-right">
              € { salaryChosen.compensationConverted.toLocaleString("en-US") }
            </td>
            <td className="align-middle">
              Tax
            </td>
            <td className="align-right">
              € { tax.data.taxPayableConverted && tax.data.taxPayable.toLocaleString("en-US") }
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

const EmptyTable = () => {
  return (
    <div>
      <Table bordered striped size="sm" variant="dark">
        <tbody>
          <tr>
            <td className="align-middle">
              Salary
            </td>
            <td>
              € Salary
            </td>
            <td className="align-middle">
              Tax
            </td>
            <td>
              € Tax
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}



export default App;
