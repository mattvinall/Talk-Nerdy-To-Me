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
      first: {}, //keeps track of trending joke
    }
  }

  componentDidMount() {
    // snapshot of values in firebase
    dbRef.on('value', (snapshot) => {
      const jokesArray = snapshot.val();
      const currentJoke = this.state.randomJoke !== null ? jokesArray[this.state.randomJoke.id] : null;
      this.setState({
        jokes: snapshot.val(),
        randomJoke: currentJoke
      })

      const sortedArray = jokesArray.sort((a, b) => {
        // return b.likes - a.likes
        return (b.likes - b.dislikes) - (a.likes - a.dislikes);
      })
      const topRankedJoke = sortedArray[0];
      this.setState({
        first: topRankedJoke,
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
    // sets the number of user likes in firebase
    firebase.database().ref(`/${this.state.randomJoke.id}/likes`).set(likes);
  }

  // keeps track clicked dislikes from the user
  handleDislikes = () => {
    const dislikes = this.state.randomJoke.dislikes + 1;
    console.log(dislikes);
    // sets the number of user dislikes in firebase 
    firebase.database().ref(`${this.state.randomJoke.id}/dislikes`).set(dislikes);
  }

  // a function that counts the total likes and dislikes  
  handleTotal = () => {
    const total = this.state.likes - this.state.dislikes;
    firebase.database().ref(`${this.state.randomJoke.id}/total`).set(total);
  }


  render() {
    return (
      <div className="App">
        <div className="tablet">
          <div className="content">
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
            <h1>Trending Joke</h1>
            <div className="trending">
              <p>{this.state.first.question} likes:{this.state.first.likes}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;