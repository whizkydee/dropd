import React from 'react'
import Dropd from '../dist/index.cjs'
import { CLASSES } from '../../helpers'
import { render, fireEvent, cleanup } from 'react-testing-library'

const list = ['January', 'February', 'March', 'April']

describe('Dropd', () => {
  afterEach(cleanup)

  it('should render equal list items as the length of the list props', () => {
    const { container } = render(<Dropd list={list} />)

    expect(container.querySelectorAll(CLASSES.item).length).toEqual(list.length)
  })

  it('should contain the default placeholder', () => {
    const { container } = render(<Dropd list={list} />)

    expect(container.querySelector(CLASSES.placeholder)).toBeTruthy()
  })

  it('should not close on click away if `closeOnBlur` prop is set to false', () => {
    const { container, baseElement } = render(
      <Dropd placeholder="Choose" list={list} closeOnBlur={false} />
    )
    const dropdContainer = container.querySelector(CLASSES.container)

    fireEvent.mouseDown(dropdContainer.querySelector(CLASSES.button))
    // `data-open` attribute should be `true` even after the button is clicked.
    expect(dropdContainer.dataset.open).toBe('true')

    fireEvent.mouseDown(baseElement)
    expect(dropdContainer.dataset.open).toBe('true')
  })

  it('should close on click away if `closeOnBlur` prop is set to true', () => {
    const { container, baseElement } = render(
      <Dropd placeholder="Choose" list={list} closeOnBlur={true} />
    )

    const dropdContainer = container.querySelector(CLASSES.container)
    const dropdList = dropdContainer.querySelector(CLASSES.list)

    // shouldn't be open on mount.
    expect(dropdList.classList.contains('open')).toBe(false)

    fireEvent.mouseDown(dropdContainer.querySelector(CLASSES.button))
    // should open after the button is clicked.
    expect(dropdList.classList.contains('open')).toBe(true)

    fireEvent.mouseDown(baseElement)
    // should close once the user clicks away.
    expect(dropdList.classList.contains('open')).toBe(false)
  })

  it('should set the value prop as the current item', () => {
    const { container } = render(<Dropd list={list} value={list[0]} />)

    expect(container.querySelector(CLASSES.currentItem).textContent).toEqual(
      list[0]
    )
  })

  it('should call the onItemChange function when it is passed', () => {
    const mockFn = jest.fn()
    const { container } = render(<Dropd list={list} onItemChange={mockFn} />)

    fireEvent.mouseDown(container.querySelector(CLASSES.item))
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should be open on mount when the `defaultOpen` prop is set to true', () => {
    const { container } = render(<Dropd list={list} defaultOpen={true} />)

    expect(container.querySelector(CLASSES.container).dataset.open).toBe('true')
  })
})
