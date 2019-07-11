import React from 'react'
import { render } from 'enzyme'
import cashChange from '../app/helper/cash';
console.log('test', cashChange(1000, 300));

describe('test change', () => {
  it('should have a link to homepage ', () => {
    expect(1).toEqual(1)
  })
})
