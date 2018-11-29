import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase";

// GIMME DA ROOT GIMME DA ROOT 
const dbRef = firebase.database().ref();


class App extends Component {
  constructor() {
    super();
    this.state = {
      jokes: []
    }
  }

  componentDidMount() {
    dbRef.on('value', (snapshot) => {
      this.setState({
        jokes: snapshot.val()
      })
    })
  }

  randomizeJoke = () => {

  }
  render() {
    return (
      <div className="App">
        <h1>Talk Nerdy To Me</h1>
        <button onClick={this.randomizeJoke}>Tell Me A Joke</button>
        <section>
          {
            this.state.jokes.map(joke => {
              return (
                <div>
                  <p>{joke.question}</p>
                  <p>{joke.answer}</p>
                </div>
              );
            })
          }
        </section>
      </div>
    );
  }
}

export default App;
