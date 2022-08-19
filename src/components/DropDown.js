import Dropdown from 'react-bootstrap/Dropdown';


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

  export default DropDown