import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { filterStream } from './actions/stream'
import { Tweet } from './components'

import './App.css';

class App extends Component {

	simpleAction = (event) => {
		let data = { filter: 'macron', limit: 2 }
		console.log(this.props.filterStream)
 		this.props.filterStream(data)
	}

	displayTweets() {
		const liste = this.props.stream.data.map((tweet, index) =>
		<div className=" tweet-container d-flex justify-content-center" key={index}>
			<Tweet
				tweet={tweet}
			/>
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
						<div className="tweets-container flex-column justify-content-center">
							{this.displayTweets()}
						</div>
	        </header>
	      </div>
			)
		} else {
	    return (
	      <div className="App">
	        <header className="App-header">
	          <button className="btn btn-secondary" onClick={this.simpleAction}>Test redux action</button>

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
