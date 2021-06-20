import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../components/useAuth';
import useFormInput from '../../components/useFormInput';

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

  return (
    <div className={styles.loginContainer}>
      Login

      <p className={styles.hintText}>Hint: please use 'eve.holt@reqres.in' for email and 'cityslicka' for password</p>

      <label>
        Email
        <br />

        <input
          type='text'
          placeholder='eve.holt@reqres.in'
          {...email}
          autoComplete='new-password'
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
          placeholder='cityslicka'
          {...password}
          autoComplete='new-password'
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
