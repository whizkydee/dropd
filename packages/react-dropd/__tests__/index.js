import Dropd from '../index.js'
import React, { Fragment } from 'react'
import { CLASSES } from '../../helpers'
import { render, fireEvent, cleanup } from 'react-testing-library'

const monthList = ['January', 'February', 'March', 'April', 'May', 'June']

const mockDropd = props => {
  const { container, baseElement, getByTestId } = render(
    <Fragment>
      <input type="search" data-testid="input-mock" />
      <Dropd list={monthList} {...props} />
    </Fragment>
  )

  const dropdElem = container.querySelector(CLASSES.container)
  const [list, button, placeholder, currentItem] = [
    'list',
    'button',
    'placeholder',
    'currentItem',
  ].map(c => dropdElem.querySelector(CLASSES[c]))

  const inputMock = getByTestId('input-mock')
  const items = dropdElem.querySelectorAll(CLASSES.item)

  return {
    list,
    items,
    button,
    container,
    dropdElem,
    inputMock,
    placeholder,
    baseElement,
    currentItem,
  }
}

describe('Dropd', () => {
  afterEach(cleanup)

  test('should not be open on mount', () => {
    expect(mockDropd().list.classList.contains('open')).toBeFalsy()
  })

  test('should contain the default placeholder', () => {
    expect(mockDropd().placeholder).toBeTruthy()
  })

  test('should render equal list items as the length of the list props', () => {
    expect(mockDropd().items.length).toEqual(monthList.length)
  })

  test('`currentItem` in state should be set to `value` prop on initial render', () => {
    expect(mockDropd({ value: monthList[0] }).currentItem.textContent).toEqual(
      monthList[0]
    )
  })

  test('should be open on mount when the `defaultOpen` prop is set to true', () => {
    expect(mockDropd({ defaultOpen: true }).dropdElem.dataset.open).toBe('true')
  })

  test('should close on click away when `closeOnBlur` prop is set to true', () => {
    const { button, baseElement, list } = mockDropd({ closeOnBlur: true })

    fireEvent.mouseDown(button)
    fireEvent.mouseDown(baseElement)
    expect(list.classList.contains('open')).toBeFalsy()
  })

  test('should close on input mousedown when `closeOnBlur` prop is set to true', () => {
    const { button, inputMock, baseElement, list } = mockDropd({
      closeOnBlur: true,
    })

    fireEvent.mouseDown(button)
    fireEvent.mouseDown(inputMock)
    expect(document.activeElement).toBe(baseElement)
    expect(list.classList.contains('open')).toBeFalsy()
  })

  test('should not close on click away when `closeOnBlur` prop is set to false', () => {
    const { button, baseElement, list } = mockDropd({ closeOnBlur: false })

    fireEvent.mouseDown(button)
    fireEvent.mouseDown(baseElement)
    expect(list.classList.contains('open')).toBeTruthy()
  })

  test('should not close on input mousedown when `closeOnBlur` prop is set to false', () => {
    const { button, baseElement, list, inputMock } = mockDropd({
      closeOnBlur: false,
    })

    fireEvent.mouseDown(button)
    fireEvent.mouseDown(inputMock)
    expect(document.activeElement).toBe(baseElement)
    expect(list.classList.contains('open')).toBeTruthy()
  })

  test('should call the `onOpen` function when it is passed', () => {
    const mockFn = jest.fn()

    fireEvent.mouseDown(mockDropd({ onOpen: mockFn }).button)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  test('should call the `onItemChange` function when it is passed', () => {
    const mockFn = jest.fn()

    fireEvent.mouseDown(mockDropd({ onItemChange: mockFn }).items[0])
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
