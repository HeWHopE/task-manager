import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore } from '../../store/store' // Import the setupStore function
import '@testing-library/jest-dom' // Import @testing-library/jest-dom

import CreateBB from '../BoardPage/createBB'

test('testBB', () => {
  const store = setupStore() // Create the Redux store using setupStore

  render(
    <Provider store={store}>
      <CreateBB />
    </Provider>,
  )
  const linkElement = screen.getByTestId('createBB')
  expect(linkElement).toBeInTheDocument()
  expect(linkElement).toHaveTextContent('Create Board')
})
