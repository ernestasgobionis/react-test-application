import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GenericInput from './input';

test('sets the value of the input', () => {
  render(<GenericInput label="Test input" />);
  const input = screen.getByLabelText(/Test input/i);
  const value = 'Some test value';
  fireEvent.change(input, { target: { value } });
  expect(input.value).toEqual(value);
});
