import { Table } from "react-bootstrap";

const OneRowTable = ({salaryChosen, tax}) => {
    return (
      <div>
        <Table bordered striped size="sm" variant="dark">
          <tbody>
            <tr>
              <td className="align-middle">
                Salary
              </td>
              <td className="align-right">
                € { salaryChosen && salaryChosen.compensationConverted.toLocaleString("en-US") }
              </td>
              <td className="align-middle">
                Tax
              </td>
              <td className="align-right">
                € { tax && tax.data.taxPayableConverted.toLocaleString("en-US") }
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

  export default OneRowTable