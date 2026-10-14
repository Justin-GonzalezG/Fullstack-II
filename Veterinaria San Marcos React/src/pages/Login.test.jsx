import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';

describe('Página Login - Veterinaria San Marcos', () => {
  test('muestra el título de inicio de sesión y los campos', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();

    expect(document.getElementById('login-email')).toBeInTheDocument();
    expect(document.getElementById('login-password')).toBeInTheDocument();
  });

  test('permite escribir en los campos del formulario', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const inputEmail = document.getElementById('login-email');
    const inputPassword = document.getElementById('login-password');

    await user.type(inputEmail, 'justin@gmail.com');
    await user.type(inputPassword, '12345');

    expect(inputEmail.value).toBe('justin@gmail.com');
    expect(inputPassword.value).toBe('12345');
  });
});