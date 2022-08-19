import TwoRowTable from "./TwoRowTable";
import FourRowTable from "./FourRowTable";
import EmptyTable from "./EmptyTable";

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

  export default SalaryTable