import Table from 'react-bootstrap/Table';

const TwoRowTable = ({salaryChosen, tax}) => {
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

  export default TwoRowTable