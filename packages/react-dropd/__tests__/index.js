import React, { Fragment } from 'react'
import Dropd from '../dist/index.cjs'
import { CLASSES, wait } from '../../helpers'
import { render, fireEvent, cleanup } from 'react-testing-library'

const list = ['January', 'February', 'March', 'April']

describe('Dropd', () => {
  afterEach(cleanup)

  test('should not be open on mount', () => {
    const { container } = render(<Dropd list={list} />)

    expect(
      container.querySelector(CLASSES.list).classList.contains('open')
    ).toBeFalsy()
  })

  test('should contain the default placeholder', () => {
    const { container } = render(<Dropd list={list} />)

    expect(container.querySelector(CLASSES.placeholder)).toBeTruthy()
  })

  test('should render equal list items as the length of the list props', () => {
    const { container } = render(<Dropd list={list} />)

    expect(container.querySelectorAll(CLASSES.item).length).toEqual(list.length)
  })

  test('`currentItem` in state should be set to `value` prop on initial render', () => {
    const { container } = render(<Dropd list={list} value={list[0]} />)

    expect(container.querySelector(CLASSES.currentItem).textContent).toEqual(
      list[0]
    )
  })

  test('should be open on mount when the `defaultOpen` prop is set to true', () => {
    const { container } = render(<Dropd list={list} defaultOpen={true} />)

    expect(container.querySelector(CLASSES.container).dataset.open).toBe('true')
  })

  test('should close on click away when `closeOnBlur` prop is set to true', () => {
    const { container, baseElement, getByTestId } = render(
      <Fragment>
        <input type="search" data-testid="input-mock" />
        <Dropd placeholder="Choose" list={list} closeOnBlur={true} />
      </Fragment>
    )
    const dropdContainer = container.querySelector(CLASSES.container)
    const dropdList = dropdContainer.querySelector(CLASSES.list)

    fireEvent.mouseDown(dropdContainer.querySelector(CLASSES.button))
    fireEvent.focus(getByTestId('input-mock'))
    wait().then(() => {
      expect(document.activeElement).toBe(getByTestId('input-mock'))
      expect(dropdList.classList.contains('open')).toBeFalsy()
    })

    fireEvent.mouseDown(dropdContainer.querySelector(CLASSES.button))
    fireEvent.mouseDown(baseElement)
    expect(dropdList.classList.contains('open')).toBeFalsy()
  })

  test('should not close on click away when `closeOnBlur` prop is set to false', () => {
    const { container, baseElement, getByTestId } = render(
      <Fragment>
        <input type="search" data-testid="input-mock" />
        <Dropd placeholder="Choose" list={list} closeOnBlur={false} />
      </Fragment>
    )
    const dropdContainer = container.querySelector(CLASSES.container)
    const dropdList = dropdContainer.querySelector(CLASSES.list)

    fireEvent.mouseDown(dropdContainer.querySelector(CLASSES.button))
    fireEvent.focus(getByTestId('input-mock'))
    wait().then(() => {
      expect(document.activeElement).toBe(getByTestId('input-mock'))
      expect(dropdList.classList.contains('open')).toBeTruthy()
    })

    fireEvent.mouseDown(baseElement)
    expect(dropdList.classList.contains('open')).toBeTruthy()
  })

  test('should call the `onItemChange` function when it is passed', () => {
    const mockFn = jest.fn()
    const { container } = render(<Dropd list={list} onItemChange={mockFn} />)

    fireEvent.mouseDown(container.querySelector(CLASSES.item))
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
