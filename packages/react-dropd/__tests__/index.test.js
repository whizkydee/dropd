import React from 'react'
import { render, waitForElement, fireEvent } from 'react-testing-library'
import DropD from '../index.js'

describe('DropD', () => {
  it('should render the same number of li elements as the length of the list props', () => {
    let list = ['test', 'test2']
    const { getAllByTestId } = render(<DropD list={list} />)
    expect(getAllByTestId('dropd-items').length).toEqual(2)
  })

  it('should contain the default placeholder', () => {
    let list = ['test', 'test2']
    const { getByTestId } = render(<DropD list={list} />)
    waitForElement(() => getByTestId('dropd-placeholder')).then(() => {
      expect(getByTestId('dropd-placeholder')).toBeTruthy()
    })
  })

  it('should not close the dropdown on focus loss when closeOnblur is set to false', () => {
    let list = ['test', 'test2']
    const { getByTestId } = render(<DropD placeholder="Choose" list={list} closeOnBlur={false} />)
      expect(getByTestId('dropd-container').getElementsByClassName('open').length).toEqual(0);
      fireEvent.mouseDown(getByTestId('dropd-button'));
      expect(getByTestId('dropd-container').getElementsByClassName('open').length).toEqual(1);

  })
})
