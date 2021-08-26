import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import './SIgnUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(
                                  username,
                                  firstName,
                                  lastName,
                                  birthDate,
                                  email,
                                  password
                                  )
      );
      if (data) {
        console.log('------------------------------------');
        console.log(data);
        console.log('------------------------------------');
        setErrors(data)
      }
    } else {
      setErrors(["Passwords do not match"])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateBirthDate = (e) => {
    setBirthDate(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-form__container'>
      <form className='signup-form' onSubmit={onSignUp}>
        <div className="errors__container">
          {errors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
        <h1>Signup to AskPeeps</h1>
        <div className='form-input__container'>
          <input
            className='form-input'
            placeholder='User Name'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            required={true}
          ></input>
        </div>
        <div className='form-input__container'>
          <input
            className='form-input'
            placeholder='First Name'
            type='text'
            name='firstName'
            onChange={updateFirstName}
            value={firstName}
            required={true}
          ></input>
        </div>
        <div className='form-input__container'>
          <input
            className='form-input'
            placeholder='Last Name'
            type='text'
            name='lastName'
            onChange={updateLastName}
            value={lastName}
            required={true}
          ></input>
        </div>
        <div className='form-input__container'>
          <div className='form-input__birthday-container'>
            <label>Birthday</label>
            <input
              className='form-input__date'
              type='date'
              name='birthDate'
              onChange={updateBirthDate}
              value={birthDate}
              required={true}
            ></input>
          </div>
        </div>
        <div className='form-input__container'>
          <input
            className='form-input'
            placeholder='Email'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            required={true}
          ></input>
        </div>
        <div className='form-input__container'>
          <input
            className='form-input'
            placeholder='Password'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            required={true}
          ></input>
        </div>
        <div className='form-input__container'>
          <input
            className='form-input'
            placeholder='Confirm Password'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className='signup-buttons__container'>
          <button className='signup-button' type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
