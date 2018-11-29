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

  render() {
    return (
      <div className="App">
        <h1>Talk Nerdy To Me</h1>
        <button onClick={this.randomizeJoke}>Tell Me A Joke</button>
        <section>
          {
            this.state.randomJoke !== null &&
            (
              <div>
                <p>{this.state.randomJoke.question}</p>
                <p>{this.state.randomJoke.answer}</p>
              </div>
            )
          }
        </section>
      </div>
    );
  }
}

export default App;
