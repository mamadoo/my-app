import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../components/useAuth';
import useFormInput from '../../components/useFormInput';
import { ENTER_KEY_CODE, isValidEmail } from '../../utils';

import styles from './Login.module.css';

function Login() {
  const _isMounted = useRef(true);
  const email = useFormInput('');
  const password = useFormInput('');
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signin } = useAuth();
  const history = useHistory();

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    }
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!email.value) {
      errors.emailError = true;
      errors.emailErrorMessage = 'Email not entered.'
    } else if (!isValidEmail(email.value)) {
      errors.emailError = true;
      errors.emailErrorMessage = 'Please enter valid email address'
    }

    if (!password.value) {
      errors.passwordError = true;
      errors.passwordErrorMessage = 'Password not entered.'
    }

    return {
      errors,
    };
  };

  const handleLogin = () => {
    const { errors } = validateForm();

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    setError(null);
    setLoading(true);
    signin({
      email: email.value,
      password: password.value,
    }).then(() => {
      if (_isMounted.current) {
        setLoading(false);
        history.push('/');
      }
    }).catch(errorMessage => {
      if (_isMounted.current) {
        setLoading(false);
        setError(errorMessage);
      }
    });
  };

  const handleKeyUp = (event) => {
    const keyCode = event.keyCode;

    if (keyCode === ENTER_KEY_CODE) {
      handleLogin();
    }
  };

  return (
    <div className={styles.loginContainer}>
      Login

      <p className={styles.hintText}>Hint: please use 'eve.holt@reqres.in' for email and 'cityslicka' for password</p>

      <label>
        Email
        <br />

        <input
          type='text'
          placeholder='Hint: eve.holt@reqres.in'
          {...email}
          autoComplete='new-password'
          onKeyUp={handleKeyUp}
        />

        {
          formErrors.emailError && (
            <p className={styles.errorText}>{formErrors.emailErrorMessage}</p>
          )
        }
      </label>

      <label className={styles.passwordSection}>
        Password
        <br />

        <input
          type='password'
          placeholder='Hint: cityslicka'
          {...password}
          autoComplete='new-password'
          onKeyUp={handleKeyUp}
        />

        {
          formErrors.passwordError && (
            <p className={styles.errorText}>{formErrors.passwordErrorMessage}</p>
          )
        }
      </label>

      {
        error && (
          <p className={styles.errorText}>{error}</p>
        )
      }

      <input
        type='button'
        className={styles.loginButton}
        value={loading ? 'Loading...' : 'Login'}
        onClick={handleLogin}
        disabled={loading}
      />
    </div>
  );
}

export default Login;
