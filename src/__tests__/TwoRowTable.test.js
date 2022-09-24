import React, { Component } from 'react';
import renderer from 'react-test-renderer';

import TwoRowTable from '../components/TwoRowTable';


describe('Two Row Table', () =>{
  const salaryChosen = {
    currency: 'BGN',
    compensation: '35000',
    compensationConverted: '30000'
  };
  const tax = {
    data: { 
      taxPayable: '8000',
      taxPayableConverted: '6000'
  }};

  const twoRowTableComponent = renderer.create(<TwoRowTable salaryChosen={salaryChosen} tax={tax}/>);
  let row = twoRowTableComponent.root.findAllByType('tr');
  let td = twoRowTableComponent.root.findAllByType('td');

  it('Renders correct dimensions', () => {
    expect(row.length === 2);
    expect(td.length === 4);
  });

  it('Contains correct data', () => {
    expect(td[0].children[0]).toBe("Salary");
    expect(td[1].children[0]).toBe("BGN");
    expect(td[1].children[2]).toBe("35000");

    expect(td[2].children[0]).toBe("Tax");
    expect(td[3].children[0]).toBe("BGN");
    expect(td[3].children[2]).toBe("8000");

    expect(td[4].children[0]).toBe("€ ");
    expect(td[4].children[1]).toBe("30000");

    expect(td[5].children[0]).toBe("€ ");
    expect(td[5].children[1]).toBe("6000");
  });

});



describe('something truthy', () => {
    test('true to be true', () => {
      expect(true).toBe(true);
    });
  });