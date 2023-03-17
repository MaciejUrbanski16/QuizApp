import logo from './logo.svg';
import { useState } from "react";

import './App.css';
import React from 'react';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { valueLogin: '' };
    this.state = { valuePassword: '' };

    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeLogin(event) {
    this.setState({ valueLogin: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ valuePassword: event.target.value });
  }

  handleSubmit(event) {
    alert('Login: ' + this.state.valueLogin + ' haslo: ' + this.state.valuePassword);
    event.preventDefault();
  }

  render() {
    return (
      <form className='loginForm' onSubmit={this.handleSubmit}>
        <label className='loginLabels'>
          Login22:
          <input id="login" type="text" value={this.state.value} onChange={this.handleChangeLogin} /><br />

        </label>

        <label className='loginLabels'>
          Password:
          <input id="password" type="password" value={this.state.value} onChange={this.handleChangePassword} /><br /><br />

        </label>
        <input className="submit" type="submit" value="Log in" /><br /><br />

        <a className='registerLabel'>Jeśli nie masz konta - <button onClick={this.props.toggleBool}>zarejestruj się</button></a>
      </form>
    );
  }
}

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { valueLogin: '' };
    this.state = { valuePassword: '' };

    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeLogin(event) {
    this.setState({ valueLogin: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ valuePassword: event.target.value });
  }

  handleSubmit(event) {
    alert('Login: ' + this.state.valueLogin + ' haslo: ' + this.state.valuePassword);
    event.preventDefault();
  }

  render() {
    return (
      <form className='loginForm' onSubmit={this.handleSubmit}>
        <label className='loginLabels'>
          Login:
          <input id="login" type="text" value={this.state.value} onChange={this.handleChangeLogin} /><br />

        </label>

        <label className='loginLabels'>
          Password:
          <input id="password" type="password" value={this.state.value} onChange={this.handleChangePassword} /><br /><br />

        </label>
        <input className="submit" type="submit" value="Register" /><br /><br />
      </form>
    );
  }
}

class StartButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  handleClick = () => {
    console.log('this is:', this);
  };
  render() {
    return (
      <button id="butStart" onClick={this.handleClick}>
        START button
      </button>
    );
  }
}


function App() {
  const [myBool, setmyBool] = useState(true);

  function toggleBool() {
    setmyBool(!myBool)
  }


  return (
   myBool ?
      <div className="App">
        <header className="App-header">
          <div id="loginForms">
            <LoginForm toggleBool={toggleBool}/>
          </div>
        </header>

      </div> :
             <div className="App">
             <header className="App-header">
               <div id="loginForms">
                 <RegisterForm />
               </div>
             </header>
     
           </div>

  );
}

export default App;
