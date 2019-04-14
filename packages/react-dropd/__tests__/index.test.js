import React from 'react'
import { render } from 'react-testing-library'
import DropD from '../index.js'

describe('DropD', () => {
  it('should render the same number of li elements as the length of the list props', () => {
    let list = ['test', 'test2']
    const { getAllByTestId } = render(<DropD list={list} />)
    expect(getAllByTestId('dropd-items').length).toEqual(2)
  })
})
