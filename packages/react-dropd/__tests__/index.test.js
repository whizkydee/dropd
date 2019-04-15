import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import DropD from '../index.js'

describe('DropD', () => {
  afterEach(() => {
    cleanup();
  })

  it('should render the same number of li elements as the length of the list props', () => {
    let list = ['test', 'test2']
    const { getAllByTestId } = render(<DropD list={list} />)
    expect(getAllByTestId('dropd-items').length).toEqual(2)
  })

  it('should contain the default placeholder', () => {
    let list = ['test', 'test2']
    const { container } = render(<DropD list={list} />)
    expect(container.getElementsByClassName('is-placeholder')).toBeTruthy()


  })

  it('should not close the dropdown on focus loss when closeOnblur is set to false', () => {
    let list = ['test', 'test2']
    const { getByTestId, baseElement } = render(<DropD placeholder="Choose" list={list} closeOnBlur={false} />)
      expect(getByTestId('dropd-container').getElementsByClassName('open').length).toEqual(0);
      fireEvent.mouseDown(getByTestId('dropd-button'));
      expect(getByTestId('dropd-container').getElementsByClassName('open').length).toEqual(1);
      fireEvent.mouseDown(baseElement);
      expect(getByTestId('dropd-container').getElementsByClassName('open').length).toEqual(1);
  })

  it('should close the dropdown on focus loss when closeOnblur is set to true', () => {
    let list = ['test', 'test2']
    const { getByTestId, baseElement } = render(<DropD placeholder="Choose" list={list} closeOnBlur={true} />)
      expect(getByTestId('dropd-container').getElementsByClassName('open').length).toEqual(0);
      fireEvent.mouseDown(getByTestId('dropd-button'));
      expect(getByTestId('dropd-container').getElementsByClassName('open').length).toEqual(1);
      fireEvent.mouseDown(baseElement);
      expect(getByTestId('dropd-container').getElementsByClassName('open').length).toEqual(0);
  })

  it('should set the value props as the current item', () => {
    let list = ['test', 'test2']
    const { getByTestId } = render(<DropD list={list} value={list[0]} />)
    expect(getByTestId('dropd-current-value').textContent).toEqual(list[0])
  });

  it('should call the onItemChange function when it is passed', () => {
    let list = ['test', 'test2']
    const mockFn = jest.fn();
    const { getByTestId } = render(<DropD list={list} onItemChange={mockFn} />)
    fireEvent.mouseDown(getByTestId('dropd-items'));
    expect(mockFn).toHaveBeenCalledTimes(1);
  })

  it('should be open on mount when the defaultOpen prop is true', () => {
    let list = ['test', 'test2']
    const { getByTestId } = render(<DropD list={list} defaultOpen={true} />)
    expect(getByTestId('dropd-container').getElementsByClassName('open').length).toEqual(1);
  })
})
