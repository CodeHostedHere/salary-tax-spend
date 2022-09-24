import React, { Component } from 'react';
import renderer from 'react-test-renderer';

import OneRowTable from '../components/OneRowTable';

describe('One Row Table', () =>{
  const salaryChosen = {
    compensationConverted: '30000'
  };
  const tax = {
    data: { taxPayableConverted: '6000'}
  };
  const oneRowTableComponent = renderer.create(<OneRowTable salaryChosen={salaryChosen} tax={tax}/>);
  let row = oneRowTableComponent.root.findAllByType('tr');
  let td = oneRowTableComponent.root.findAllByType('td');

  it('Renders correct dimensions', () => {
    expect(row.length === 1);
    expect(td.length === 4);
  });

  it('Contains correct data', () => {
    expect(td[0].children[0]).toBe("Salary");
    expect(td[1].children[0]).toBe("€ ");
    expect(td[1].children[1]).toBe("30000");

    expect(td[2].children[0]).toBe("Tax");
    expect(td[3].children[0]).toBe("€ ");
    expect(td[3].children[1]).toBe("6000");
  });

});