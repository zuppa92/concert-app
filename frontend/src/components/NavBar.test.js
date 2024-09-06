// src/components/NavBar.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from '../context/UserContext';

test('renders NavBar', () => {
  render(
    <Router>
      <UserContextProvider>
        <NavBar />
      </UserContextProvider>
    </Router>
  );
  expect(screen.getByText(/home/i)).toBeInTheDocument();
  expect(screen.getByText(/login/i)).toBeInTheDocument();
  expect(screen.getByText(/signup/i)).toBeInTheDocument();
});