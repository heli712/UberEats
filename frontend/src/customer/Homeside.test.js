import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
// import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import Homeside from './Homeside.js';
import combineReducers from '../reducers';

const store = createStore(combineReducers);

const component = TestRenderer.create(
  <Provider store={store}>
    <MemoryRouter>
      <Homeside>
      </Homeside>{' '}
    </MemoryRouter>
  </Provider>
);

afterEach(cleanup);

it('renders', async () => {
  expect(component.toJSON()).toMatchSnapshot();
});

test('Check for header', async () => {
  const { getByTestId } = render(
    <Provider store={store}>
       <MemoryRouter>
      <Homeside>
      </Homeside>{' '}
    </MemoryRouter>
    </Provider>
  );
  expect(getByTestId('Homeside')).toHaveTextContent('Recent Activity');
});