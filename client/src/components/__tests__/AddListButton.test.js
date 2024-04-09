import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddListButton from '../ListsPage/buttons/AddListButton';

describe('AddListButton Component', () => {
  it('renders without crashing', () => {
    render(<AddListButton onClick={() => {}} />);
  });

  it('calls onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<AddListButton onClick={onClickMock} />);
    const addButton = getByText('Add List');
    fireEvent.click(addButton);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
