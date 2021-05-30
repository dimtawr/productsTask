import { Component, useState } from 'react';
import { Button, Input, Row } from 'reactstrap';
import { loginFx, registrationFx } from '../../api/model';

const AuthorizationWindow = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authType, setAuthType] = useState(true);

  const changeLogin = (e) => {
    setLogin(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitLogin = (e) => {
    loginFx({ login, password });
  };
  const handleSwapOnRegistr = (e) => {
    setAuthType(!authType);
  };
  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmitRegistration = (e) => {
    registrationFx({
      login,
      password,
      confirmPassword,
    });
  };

  const AuthWindow = () => (
    <div className='authorization-window-container'>
      <div className='authorization-window-inputs'>
        <Row>
          {' '}
          Login: <Input defaultValue={login} onChange={changeLogin} />{' '}
        </Row>
        <Row>
          {' '}
          Password: <Input defaultValue={password} onChange={changePassword} type='password' />{' '}
        </Row>
      </div>
      <div className='authorization-window-button-row'>
        <Button className='authorization-window-button' onClick={handleSwapOnRegistr}>
          Sign Up
        </Button>
        <Button className='authorization-window-button' onClick={handleSubmitLogin}>
          Login
        </Button>
      </div>
    </div>
  );

  const RegistrationWindow = () => (
    <div className='authorization-window-container'>
      <div className='authorization-window-inputs'>
        <Row>
          {' '}
          Login: <Input defaultValue={login} onChange={changeLogin} />{' '}
        </Row>
        <Row>
          {' '}
          Password: <Input defaultValue={password} onChange={changePassword} type='password' />{' '}
        </Row>
        <Row>
          {' '}
          Confirm Password:{' '}
          <Input
            defaultValue={confirmPassword}
            onChange={changeConfirmPassword}
            type='password'
          />{' '}
        </Row>
      </div>
      <div className='authorization-window-button-row'>
        <Button className='authorization-window-button' onClick={handleSwapOnRegistr}>
          Sign In
        </Button>
        <Button className='authorization-window-button' onClick={handleSubmitRegistration}>
          Registration
        </Button>
      </div>
    </div>
  );
  return authType ? AuthWindow() : RegistrationWindow();
};

export default AuthorizationWindow;
