import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CloseXButton from '../ListsPage/buttons/closeXButton'

describe('CloseXButton Component', () => {
  it('renders without crashing', () => {
    render(<CloseXButton onClick={() => {}} />)
  })

  it('calls onClick handler when clicked', () => {
    const onClickMock = jest.fn()
    const { getByRole } = render(<CloseXButton onClick={onClickMock} />)
    const closeButton = getByRole('button')
    fireEvent.click(closeButton)
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
