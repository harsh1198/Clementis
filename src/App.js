import logo from './logo.svg';
import React, { Component } from 'react'
import './App.css';
import DialogForm from './component/DialogForm';
import View from './component/View';
import Button from '@material-ui/core/Button';

const heading = {
  fontSize: '30px',
  color: 'green'
}

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       showComponent: false,
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }
  
  _onButtonClick() {
    this.setState({
      showComponent: true,
    });
  }

  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <DialogForm />
        <Button style={heading} color="primary" onClick={this._onButtonClick} >View</Button>
        {this.state.showComponent ?
           <View /> :
           null
        }
      </div>
    )
  }
}

export default App;
