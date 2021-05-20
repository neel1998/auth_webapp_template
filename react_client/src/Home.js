import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button';

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: ""
    };
  }

  componentDidMount() {
    this.setState({
      username : JSON.parse(localStorage.getItem("user"))["username"]
    })
  }

  logout = () => {
   localStorage.removeItem('user')
   localStorage.removeItem('token')
   localStorage.removeItem('appId')
   this.props.history.push('/login')
 }

  render() {
      return (
        <div>
            <AppBar position="static" style = {{width : '100%', 'background':'#01579b'}}>
                <Toolbar>
                    <p>Template Auth Application</p>
                    <Button type = 'submit' variant="contained" style = {{"backgroundColor": "#01579b", "color" : "#FFFFFF", 'marginLeft':'auto'}} disableElevation onClick = {() => this.logout()}>Logout</Button>
                </Toolbar>
            </AppBar>
            <h1 style = {{'text-align' : 'center'}}>Welcome, {this.state.username}</h1>
            <h4 style = {{'text-align' : 'center'}}>This is a Private Page</h4>
        </div>
      )
    }
}
