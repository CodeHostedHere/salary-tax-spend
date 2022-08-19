import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

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

  export default TripleButtonGroup