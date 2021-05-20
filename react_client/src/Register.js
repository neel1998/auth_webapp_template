import React, { Component } from 'react';
import {baseServerURL} from './constants'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'name' : '',
      'email' : '',
      'username': '',
      'psswd' : '',
      'confirm_psswd' : '',
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {

      if (this.state.name.length === 0 || this.state.email.length === 0 || this.state.username.length === 0 || this.state.psswd.length === 0 || this.state.confirm_psswd.length === 0 ) {
        alert("Please fill all required field")
        return
      }
      else if (this.state.psswd !== this.state.confirm_psswd) {
        alert("Passwords must match")
        return
      }

      let body = {
        'name' : this.state.name,
        'email' : this.state.email,
        'username': this.state.username,
        'psswd' : this.state.psswd
      }
      fetch(baseServerURL + '/register', {
        method : 'POST',
        headers : {
          'Content-type': 'application/json',
        },
        body : JSON.stringify(body)
      }
    ).then((res)=> {
      if (res.status === 200) {
        // this.props.history.push('/');
        this.props.history.push('/login')
      }
      else if (res.status === 402) {
        alert("Username already taken")
      }
      else if (res.status === 400) {
        alert("Something went wrong")
      }
      else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch((res)=> {
      alert("Something went wrong")
    })

      return false;
  }

  render() {
    return (
      <div style = {{'text-align': 'center'}}>
        <AppBar position="static" style = {{width : '100%', 'background':'#01579b'}}>
        <Toolbar>
            <h2>Register</h2>
        </Toolbar>
       </AppBar>
        <form style = {{'text-align': 'center', 'margin-top' : "50px"}}>
        <TextField
          variant="outlined"
          label = "Name"
          type = "text"
          name = "name"
          style = {{"width" : "100vh", "margin":"10px"}}
          placeholder = "Enter Name"
          value = {this.state.name}
          onChange = {this.handleInputChange}
          required
        />
        <br/>
        <TextField
          variant="outlined"
          label = "Email"
          type = "text"
          name = "email"
          style = {{"width" : "100vh", "margin":"10px"}}
          placeholder = "Enter Email"
          value = {this.state.email}
          onChange = {this.handleInputChange}
          required
        />
        <br/>
        <TextField
          variant="outlined"
          label = "Username"
          type = "text"
          name = "username"
          style = {{"width" : "100vh", "margin":"10px"}}
          placeholder = "Enter Username"
          value = {this.state.username}
          onChange = {this.handleInputChange}
          required
        />
        <br/>
        <TextField
          variant="outlined"
          label = "Password"
          type = "password"
          name = "psswd"
          style = {{"width" : "100vh", "margin":"10px"}}
          placeholder = "Enter Password"
          value = {this.state.password}
          onChange = {this.handleInputChange}
          required
        />
        <br/>
        <TextField
          variant="outlined"
          label = "Confirm Password"
          type = "password"
          name = "confirm_psswd"
          style = {{"width" : "100vh", "margin":"10px"}}
          placeholder = "Confirm Password"
          value = {this.state.confirm_psswd}
          onChange = {this.handleInputChange}
          required
        />
        <br/>


        <br/>
       <Button value="Submit" onClick = {this.onSubmit} variant="contained" style = {{"backgroundColor" : "#01579b", "color": "#FFFFFF"}}> Register </Button>
      </form>
     </div>
    );
  }
}
