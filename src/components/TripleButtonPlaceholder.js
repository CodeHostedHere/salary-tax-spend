import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Placeholder } from 'react-bootstrap';

const TripleButtonPlaceholder = ({}) => {
    return (
      <ButtonGroup style={{ width: '100%'}}>
        <Placeholder.Button aria-hidden="true" variant="secondary" style={{ width: '33%'}}/>
        <Placeholder.Button aria-hidden="true" variant="secondary" style={{ width: '33%'}}/>
        <Placeholder.Button aria-hidden="true" variant="secondary" style={{ width: '33%'}}/>
      </ButtonGroup>
    )
  };

  export default TripleButtonPlaceholder