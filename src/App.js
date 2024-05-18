import './App.css';
import functionPlot from "function-plot";
import React, { Component, setState } from 'react'
import InputA from "./inputA";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      a: '',
      b: '',
      c: '',
      d: ''
    };

    this.handleChangeA = this.handleChangeA.bind(this);
    this.handleChangeB = this.handleChangeB.bind(this);
    this.handleChangeC = this.handleChangeC.bind(this);
    this.handleChangeD = this.handleChangeD.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeA(event) {
    this.setState({
      a: event.target.value
    });
  }

  handleChangeB(event) {
    this.setState({
      b: event.target.value
    });
  }

  handleChangeC(event) {
    this.setState({
      c: event.target.value
    });
  }

  handleChangeD(event) {
    this.setState({
      d: event.target.value
    });
  }

  getLimit(){
    let a = 3 * this.state.a
    let b = 2 * this.state.b
    let c = this.state.c
    let D = b**2 - 4 * a * c
    if(D < 0){
      return Math.max(20, 2 * Math.abs(this.state.d))
    }
    else if(D === 0){
      let root = -b / (2 * a)
      let val = this.state.a * root ** 3 + this.state.b * root ** 2 + this.state.c * root + this.state.d
      return 2 * Math.abs(val)
    }
    else{
      let root1 = (-b + Math.sqrt(D)) / (2 * a)
      let root2 = (-b - Math.sqrt(D)) / (2 * a)
      let val1 = this.state.a * root1 ** 3 + this.state.b * root1 ** 2 + this.state.c * root1 + this.state.d
      let val2 = this.state.a * root2 ** 3 + this.state.b * root2 ** 2 + this.state.c * root2 + this.state.d
      return 2 * Math.max(Math.abs(val1), Math.abs(val2))
    }
  }


  handleSubmit(event) {
    event.preventDefault();
    let lim = this.getLimit()
    console.log(lim)
    functionPlot({
      target: '#plot',
      width: 580,
      height: 400,
      yAxis: {
        label: 'Y axis',
        domain: [-lim, lim]
      },
      xAxis: {
        label: 'X axis',
        domain: [-20, 20]
      },
      data: [{
        fn: `${this.state.a}x^3 + ${this.state.b}x^2 + ${this.state.c}x + ${this.state.d}`
      }],
      disableZoom: true,
      grid: true
    })
  }


  render() {
    return (

        <div className="App">
          <form onSubmit={this.handleSubmit}>
            <InputA value={this.state.a} handler={this.handleChangeA}
            />
            <label>
              <input type="text" value={this.state.b} onChange={this.handleChangeB}/>
              x^2 +
            </label>
            <label>
              <input type="text" value={this.state.c} onChange={this.handleChangeC}/>
              x +
            </label>
            <label>
              <input type="text" value={this.state.d} onChange={this.handleChangeD}/>

            </label>
            <input type="submit" value="Plot"/>
          </form>
          <div id="plot"></div>
        </div>
    );
  }
}

export default App;