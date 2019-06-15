import React from 'react'
import './App.css'
import { connect } from 'react-redux'
import { updateChoice, updateMessage } from './redux/finalActions'

class App extends React.Component {

  sendDummData = () => {
    this.props.webSocket.send('hello');
  }

  rock = () => {
    this.props.updateChoice('Rock')
    this.props.webSocket.send('Rock')
  }

  paper = () => {
    this.props.webSocket.send('Paper')
    this.props.updateChoice('Paper')
  }

  scissor = () => {
    this.props.webSocket.send('Scissor')
    this.props.updateChoice('Scissor')
  }

  reset = () => {
    this.props.updateMessage('')
    this.props.updateChoice('')
    this.props.webSocket.send('reset')
  }

  render() {
    return (
      <>
        <div className='winner'>
          {this.props.message}
        </div>
        <div style={{textAlign: 'center'}}>
          <button style={{margin: '10px'}} onClick={this.rock}>Rock</button>
          <button style={{margin: '10px'}} onClick={this.paper}>Paper</button>
          <button style={{margin: '10px'}} onClick={this.scissor}>Scissor</button>
        </div>
        <div className='yourchoice'>
          {this.props.choice}
        </div>
        <div style={{textAlign: 'center'}}>
          <button style={{margin: '10px'}} onClick={this.reset}>Reset</button>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    choice: state.finalReducer.choice,
    message: state.finalReducer.message,
  };
};

const mapDispatchToProps = { updateChoice, updateMessage };

export default connect( // from react-redux
  mapStateToProps,
  mapDispatchToProps,
)(App);