import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login/Login';

test('renders login form', () => {
    render(<Login />);
    
    // Assert that the login form is rendered
    const loginForm = screen.getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();
});

test('submits login form', () => {
    render(<Login />);
    
    // Simulate user input
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Simulate form submission
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    // Assert that the form is submitted
    expect(submitButton).toBeDisabled(); // Assuming the button is disabled after submission
    // Add more assertions as needed
});
