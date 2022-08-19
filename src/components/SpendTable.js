import Table from 'react-bootstrap/Table';

const headerTable  = ["Expenses", "Cost", "Amount", "Total", ""]
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
          {headerTable.map(item => <th>{item}</th>)}
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

  export default SpendTable