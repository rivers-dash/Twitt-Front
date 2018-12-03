import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { filterStream } from '../../actions/stream'
import { Tweet } from '../../components'

import './dashboard.css';


class Dashboard extends Component {

	simpleAction = (event) => {
		let data = { filter: 'macron', limit: 6 }
		console.log(this.props.filterStream)
 		this.props.filterStream(data)
	}

	displayTweets() {
		const liste = this.props.stream.data.map((tweet, index) =>
		<li className="tweet-container d-flex justify-content-center" key={index}>
			<Tweet
				tweet={tweet}
			/>
		</li>
		)
		return liste
	}

  render() {
		if (this.props.stream.data) {
			return (
				<div className="dashboard -flex flex-column justify-content-center mt-3">
					<div className="d-flex justify-content-center my-3">
          	<button className="btn btn-secondary" onClick={this.simpleAction}>Test redux action</button>
					</div>
					<ul className="tweets-container row">
						{this.displayTweets()}
					</ul>
	      </div>
			)
		} else {
	    return (
	      <div>
          <button className="btn btn-secondary" onClick={this.simpleAction} >Test redux action</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
