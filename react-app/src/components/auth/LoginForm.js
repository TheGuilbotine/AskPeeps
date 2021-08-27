import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      alert(`You have successfully logged in.`)
    }
  };

  const demoLogin = async () => {
    await dispatch(login('demo@aa.io', 'password'))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/feed' />;
  }

  return (
    // <div className='login-form__page-container'>
      <div className='login-form__container'>
        <form className='login-form' onSubmit={onLogin}>
          <div className="errors__container">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='form-input__container'>
            <input
              className='form-input'
              placeholder='User Name'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='form-input__container'>
            <input
              className='form-input'
              placeholder='Password'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <div className='login-buttons__container'>
              <button className="login-button" type='submit'>Login</button>
              <button className="login-button" type='submit' onClick={demoLogin}>Demo</button>
            </div>
          </div>
        </form>
      </div>
    // </div>
  );
};

export default LoginForm;
