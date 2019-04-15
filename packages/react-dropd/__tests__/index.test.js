import React from 'react'
import Dropd from '../dist/index.cjs'
import { render, fireEvent, cleanup } from 'react-testing-library'

const list = ['January', 'February', 'March', 'April']

describe('Dropd', () => {
  afterEach(cleanup)

  it('should render equal list items as the length of the list props', () => {
    const { getAllByTestId } = render(<Dropd list={list} />)

    expect(getAllByTestId('dropd-item').length).toEqual(list.length)
  })

  it('should contain the default placeholder', () => {
    const { container } = render(<Dropd list={list} />)

    expect(container.getElementsByClassName('is-placeholder')).toBeTruthy()
  })

  it('should not close dropd on click away when `closeOnBlur` prop is set to false', () => {
    const { getByTestId, baseElement } = render(
      <Dropd placeholder="Choose" list={list} closeOnBlur={false} />
    )

    expect(
      getByTestId('dropd-container').getElementsByClassName('open').length
    ).toEqual(0)
    fireEvent.mouseDown(getByTestId('dropd-toggle'))
    expect(
      getByTestId('dropd-container').getElementsByClassName('open').length
    ).toEqual(1)
    fireEvent.mouseDown(baseElement)
    expect(
      getByTestId('dropd-container').getElementsByClassName('open').length
    ).toEqual(1)
  })

  it('should close dropd on click away when `closeOnBlur` prop is set to true', () => {
    const { getByTestId, baseElement } = render(
      <Dropd placeholder="Choose" list={list} closeOnBlur={true} />
    )

    expect(
      getByTestId('dropd-container').getElementsByClassName('open').length
    ).toEqual(0)
    fireEvent.mouseDown(getByTestId('dropd-toggle'))
    expect(
      getByTestId('dropd-container').getElementsByClassName('open').length
    ).toEqual(1)
    fireEvent.mouseDown(baseElement)
    expect(
      getByTestId('dropd-container').getElementsByClassName('open').length
    ).toEqual(0)
  })

  it('should set the value prop as the current item', () => {
    const { getByTestId } = render(<Dropd list={list} value={list[0]} />)

    expect(getByTestId('dropd-current-value').textContent).toEqual(list[0])
  })

  it('should call the onItemChange function when it is passed', () => {
    const mockFn = jest.fn()
    const { getByTestId } = render(<Dropd list={list} onItemChange={mockFn} />)

    fireEvent.mouseDown(getByTestId('dropd-item'))
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should be open on mount when the `defaultOpen` prop is set to true', () => {
    const { getByTestId } = render(<Dropd list={list} defaultOpen={true} />)

    expect(
      getByTestId('dropd-container').getElementsByClassName('open').length
    ).toEqual(1)
  })
})
