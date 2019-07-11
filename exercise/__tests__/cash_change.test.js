import React from 'react'
import { render } from 'enzyme'
import cashChange from '../app/helper/cash';

describe('test', () => {
  it('should be success', () => {
    expect(1).toEqual(1)
  })
})

describe('test cashChange function', () => {
  // cashChange(cash: any, amount: any)
  it('Deadpool 2, ticket: 1, price: 100, total: 100, cash: 100', () => {
    const change = cashChange(100, 1*100).join();
    expect(change).toEqual('')
  })
  it('Ghostland, ticket: 1, price: 182, total: 182, cash: 200', () => {
    const change = cashChange(200, 1*182).join();
    expect(change).toEqual('10,5,2,1')
  })
  it('Avengers Infinity War, ticket: 3, price: 355, total: 1065, cash: 2000', () => {
    const change = cashChange(2000, 3*355).join();
    expect(change).toEqual('500,100,100,100,100,20,10,5')
  })
  it('Ghostland, ticket: 4, price: 182, total: 728, cash: 1000', () => {
    const change = cashChange(1000, 4*182).join();
    expect(change).toEqual('100,100,50,20,2')
  })
  it('Midnight Sun, ticket: 1, price: 167, total: 167, cash: 1000', () => {
    const change = cashChange(1000, 1*167).join();
    expect(change).toEqual('500,100,100,100,20,10,2,1')
  })
  it('Avengers, ticket: 5, price: 355, total: 1775, cash: 5000', () => {
    const change = cashChange(5000, 5*355).join();
    expect(change).toEqual('1000,1000,1000,100,100,20,5')
  })
  it('not enough cash, cash: 300, total: 500', () => {
    const change = cashChange(300, 1*500);
    expect(change).toEqual(new Error('not enough money'));
  })
})
