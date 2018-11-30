import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase";
import Header from "./Header";
import Reactions from './Reactions';


// GIMME DA ROOT GIMME DA ROOT 
const dbRef = firebase.database().ref();

// App class
class App extends Component {
  constructor() {
    super();
    this.state = {
      jokes: [],
      randomJoke: null,
      likes: 0, // set initial state to 0 ++ will increment when user clicks (thumbs up)
      dislikes: 0, // set initial state to 0 -- will decremement when user clicks (thumbs down)
      total: 0
    }
  }

  componentDidMount() {
    // snapshot of values in firebase
    dbRef.on('value', (snapshot) => {
      this.setState({
        jokes: snapshot.val(),
      })
    })
  }

  randomizeJoke = () => {
    const randomJoke = this.state.jokes[Math.floor(Math.random() * this.state.jokes.length)];
    this.setState({
      randomJoke
    })
  }

  // keeps track of clicked likes from the user
  handleLikes = () => {
    const likes = this.state.likes + 1;
    this.setState({
      likes
    })
  }

  // keeps track clicked dislikes from the user
  handleDislikes = () => {
    const dislikes = this.state.dislikes - 1;
    this.setState({
      dislikes
    })
  }

  // a function that counts the total likes and dislikes  
  handleTotal = () => {
    const total = this.state.likes - this.state.dislikes;
    this.setState({
      total
    })
  }


  render() {
    return (
      <div className="App">
        <Header randomizeJoke={this.randomizeJoke} />
        <section>
          {
            // conditional render 
            this.state.randomJoke !== null &&
            (
              <div className="wrapper">
                <p className="question">Q:{this.state.randomJoke.question}</p>
                <p className="answer">A:{this.state.randomJoke.answer}</p>
                <Reactions handleLikes={this.handleLikes} handleDislikes={this.handleDislikes} />
              </div>
            )
          }
        </section>
      </div>
    );
  }
}

export default App;
