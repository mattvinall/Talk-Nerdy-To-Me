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
      console.log('snapshot ran')
      const jokesArray = snapshot.val();
      const currentJoke = this.state.randomJoke !== null ? jokesArray[this.state.randomJoke.id] : null;
      this.setState({
        jokes: snapshot.val(),
        randomJoke: currentJoke
      })
    })
  }

  // Generates a random joke from the jokes array
  randomizeJoke = () => {
    const randomJoke = this.state.jokes[Math.floor(Math.random() * this.state.jokes.length)];
    this.setState({
      randomJoke
    })
  }

  // keeps track of clicked likes from the user
  handleLikes = () => {
    const likes = this.state.randomJoke.likes + 1;
    // console.log(this.state.randomJoke.id, likes);
    firebase.database().ref(`/${this.state.randomJoke.id}/likes`).set(likes)
  }

  // keeps track clicked dislikes from the user
  handleDislikes = () => {
    const dislikes = this.state.dislikes - 1;
    console.log(this.state.randomJoke.id, dislikes);
    firebase.database().ref(`${this.state.randomJoke.id}/dislikes`).set(dislikes)

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
        <div class="tablet">
          <div class="content">
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
                    <p>{this.state.randomJoke.likes}</p>
                  </div>
                )
              }
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
