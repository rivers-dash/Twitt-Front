import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { filterStream } from './actions/stream'

import './App.css';

class App extends Component {

	simpleAction = (event) => {
		let data = { filter: 'banana', limit: 2 }
		console.log(this.props.filterStream)
 		this.props.filterStream(data)
	}

	displayTweets() {
		const liste = this.props.stream.data.map((tweet, index) =>
		<div key={index} className="card profil-pic">
		  <img className="card-img-top" src={tweet.user.profile_image_url_https} alt="Card cap"/>
		  <div className="card-body">
		    <h5 className="card-title">{tweet.user.name}</h5>
		    <p className="card-text">{tweet.text}</p>
		    <button className="btn btn-outline-danger">Like</button>
		  </div>
		</div>
		)
		return liste
	}

  render() {
		if (this.props.stream.data) {
			return (
	      <div className="App">
	        <header className="App-header">
	          <button className="btn btn-secondary" onClick={this.simpleAction}>Test redux action</button>
						<pre>{ JSON.stringify(this.props) }</pre>
						{this.displayTweets()}
	        </header>
	      </div>
			)
		} else {
	    return (
	      <div className="App">
	        <header className="App-header">
	          <button className="btn btn-secondary" onClick={this.simpleAction}>Test redux action</button>
						<pre>{ JSON.stringify(this.props) }</pre>
	        </header>
	      </div>
	    )
		}
}
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = (dispatch) => {
	return {
		...bindActionCreators({
			filterStream,
		 }, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
