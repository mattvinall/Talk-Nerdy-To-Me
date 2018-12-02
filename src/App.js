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

      // created a sorted array that sorts which joke has the highest likes, counting for dislikes as well
      const sortedArray = jokesArray.sort((a, b) => {
        return (b.likes - b.dislikes) - (a.likes - a.dislikes);
      })
      // stores the top ranked joke from the first index of the sorted array
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
    // sets the number of user dislikes in firebase 
    firebase.database().ref(`${this.state.randomJoke.id}/dislikes`).set(dislikes);
  }

  render() {
    return (
      <div className="App">
        <Header randomizeJoke={this.randomizeJoke} />
        <section>
          {
            // conditional render - will only render if randomJoke is NOT null
            this.state.randomJoke !== null &&
            (
              <div className="balloon container with-title wrapper">
                <div className="message">
                  <p className="balloon message -left balloon from-left question"><i className="octocat animate icon-left"></i>Q:{this.state.randomJoke.question}</p>
                  <p className="balloon message -right balloon from-right answer"><i className="icon github is-large icon-right"></i>A:{this.state.randomJoke.answer}</p>
                  <Reactions handleLikes={this.handleLikes} handleDislikes={this.handleDislikes} />
                </div>
              </div>
            )
          }
        </section>


        <div className="wrapper">
          <div className="trending balloon container with-title">
            <div className="message">
              <h2><i className="icon star is-medium icon star is-small"></i>Trending Joke<i className="icon star is-medium"></i></h2>
              <p>Q:{this.state.first.question}</p>
              <p>A:{this.state.first.answer}</p>
              <p><i className="icon heart is-medium"></i>likes:{this.state.first.likes}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;