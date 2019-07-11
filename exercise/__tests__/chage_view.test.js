import React from 'react'
import { shallow } from 'enzyme'
import ChangeMoney from '../app/components/changeMoney';

describe('test', () => {
  const change = [1000,1000,1000,100,100,20,5];
  const Wrapper = shallow(<ChangeMoney change={change} />)
  it('should be success', () => {
    expect(Wrapper).toBeDefined()
  })

  it('check component display right img', () => {
    Wrapper.find('img').forEach((node, index) => {
      expect(node.prop('src')).toMatch(`${change[index]}`)
    });
  })
})