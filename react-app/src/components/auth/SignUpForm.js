import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

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
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>
      <div>
        <input
        placeholder='User Name'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          required={true}
        ></input>
      </div>
      <div>
        <input
        placeholder='First Name'
          type='text'
          name='firstName'
          onChange={updateFirstName}
          value={firstName}
          required={true}
        ></input>
      </div>
      <div>
        <input
          placeholder='Last Name'
          type='text'
          name='lastName'
          onChange={updateLastName}
          value={lastName}
          required={true}
        ></input>
      </div>
      <div>
        <input
        type='date'
        name='birthDate'
        onChange={updateBirthDate}
        value={birthDate}
        required={true}
        ></input>
      </div>
      <div>
        <input
          placeholder='Email'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
      </div>
      <div>
        <input
          placeholder='Password'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
      </div>
      <div>
        <input
          placeholder='Confirm Password'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
