import React, {Component} from 'react';
import './App.css';
import trafficLightMachine from './machine/timer'
import { interpret } from 'xstate';

class App extends Component {

  trafficLightService = interpret(trafficLightMachine).onTransition(state => {
    return this.setState({
      count: state.context.counter
    })
  })

  state = {
    count: Number
  }

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    console.log("Component App did moount")
    this.setState({
      count: 0
    })
  }

  componentWillUnmount() {
    this.setState({
      count: 0
    })
    this.trafficLightService.stop()
  }

  componentDidUpdate() {
    console.log("Component did update")
    console.log("Coynter Value", this.state.count);
  }

  sendStartTimerToMachine = () => {
    this.trafficLightService.start()
    this.trafficLightService.send('START_TIMER')
  }

  sendStopTimerToMachine = () => {
    this.trafficLightService.send('STOP_TIMER')
    this.setState({
      count: 0
    })
    this.trafficLightService.stop()
  }

  render() {
    console.log(this.state)
      return (
        <div className="App">
          <button onClick={this.sendStartTimerToMachine}>
            Start Timer
          </button>
          <button onClick={this.sendStopTimerToMachine}>
            Stop Timer
          </button>
          <h1>{this.state.count}</h1>
        </div>
      );    
  }  
}

export default App;