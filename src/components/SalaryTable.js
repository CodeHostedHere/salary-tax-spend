import OneRowTable from "./OneRowTable";
import TwoRowTable from "./TwoRowTable";

const SalaryTable = ({salariesGiven, radioValue, taxGiven}) => {
    if (salariesGiven.data.length === 0 || radioValue === 0 || !taxGiven){
      return <OneRowTable/>;
    } 
    let currency = salariesGiven.data[0]["currency"];
    let salary = salariesGiven.data.find(salary => salary.id === radioValue)
    if ( currency === '€'){
      return (<OneRowTable salaryChosen={salariesGiven.data[radioValue-1]} tax={taxGiven}/>);
    } else {
      return(<TwoRowTable salaryChosen={salariesGiven.data[radioValue-1]} tax={taxGiven}/>);
    }
  }

  export default SalaryTable