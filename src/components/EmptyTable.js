import React from 'react'
import Table from 'react-bootstrap/Table';

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

export default EmptyTable