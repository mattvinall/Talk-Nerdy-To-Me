import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase";


// GIMME DA ROOT GIMME DA ROOT 
const dbRef = firebase.database().ref();


class App extends Component {
  constructor() {
    super();
    this.state = {
      jokes: [],
      randomJoke: null
    }
  }

  componentDidMount() {
    dbRef.on('value', (snapshot) => {
      this.setState({
        jokes: snapshot.val(),
        // randomJoke
      })
    })
  }

  randomizeJoke = () => {
    const randomJoke = this.state.jokes[Math.floor(Math.random() * this.state.jokes.length)];
    this.setState({
      randomJoke
    })
  }

  handleChange = (e) => {
    console.log(e.target.value);
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1><span>🤓</span>Talk Nerdy To Me<span>🤓</span></h1>
          <div className="buttonContainer">
            <button type="button" className="btn" onClick={this.randomizeJoke}>Tell Me A Joke</button>
          </div>
        </header>
        <section>
          {
            // conditional render 
            this.state.randomJoke !== null &&
            (
              <div className="wrapper">
                <p className="question">Q:{this.state.randomJoke.question}</p>
                <p className="answer">A:{this.state.randomJoke.answer}</p>

                <section className="reactions">
                  <button onClick={this.handleChange}><i className="icon like is-large"></i></button>
                  <button onClick={this.handleChange}><i className="icon like is-large flip"></i></button>
                </section>
              </div>
            )
          }
        </section>
      </div>
    );
  }
}

export default App;
