import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Player } from 'video-react'

import { filterStream } from '../../actions/stream'

import './tweet.css';

class Tweet extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	displayMedia(data) {
		console.log(data)
		return (
			data.media.map((item, index) => {
				console.log(item)
				if (item.type === 'video') {
					return <video key={index} controls><source src={item.video_info.variants[0].url}/></video>
				} else if (item.type === 'photo') {
					console.log(item.media_url_https)
					return (
					 	<img key={index} className="media d-flex justify-content-center py-2 px-3" src={item.media_url_https} alt=""/>
					)
				}
			})
		)
	}

	displayMain() {
		const { tweet } = this.props
		if (tweet.retweeted_status) {
			return (
				<div>
					<div className="header d-flex p-1">
						<img className="profile-picture d-flex row align-self-center m-1" src={tweet.retweeted_status.user.profile_image_url_https} alt=""/>
						<div className="name d-flex mx-2">
							{tweet.retweeted_status.user.name}
						</div>
					</div>
					<div className="main flex-column p-1">
						<div className="text d-flex justify-content-left py-1 px-3">
							{tweet.retweeted_status.extended_tweet ? tweet.retweeted_status.extended_tweet.full_text : tweet.retweeted_status.text}
						</div>
						<div className="media">
							{ tweet.retweeted_status.extended_entities ? this.displayMedia(tweet.retweeted_status.extended_entities) : (tweet.retweeted_status.extended_tweet ? (tweet.retweeted_status.extended_tweet.extended_entities ? this.displayMedia(tweet.retweeted_status.extended_tweet.extended_entities) : <div className="no-media"></div>) : <div className="no-media"></div>) }
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className="main flex-column p-1">
					<div className="text d-flex justify-content-left py-1 px-3">
						{tweet.extended_tweet ? tweet.extended_tweet.full_text : tweet.text}
					</div>
					<div className="media">
						{ tweet.extended_entities ? this.displayMedia(tweet.extended_entities) : (tweet.extended_tweet ? (tweet.extended_tweet.extended_entities ? this.displayMedia(tweet.extended_tweet.extended_entities) : <div className="no-media"></div>) : <div className="no-media"></div>) }
					</div>
				</div>
			)
		}
	}

  render() {
		const { tweet } = this.props
		return(
			<div className="container flex-column align-self-center p-1 m-2">
				<div className="header d-flex p-1">
					<img className="profile-picture d-flex row align-self-center m-1" src={tweet.user.profile_image_url_https} alt=""/>
					<div className="user flex-column">
					<div className="name d-flex mx-2">
						{tweet.user.name}
					</div>
					<div className="description text-muted d-flex justify-content-left mx-2">
						{tweet.user.description}
					</div>
				</div>
				</div>
				<div className="main d-flex p-1">
						{this.displayMain()}
				</div>
				<div className="footer d-flex mx-2 my-1">
					<div className="comment d-flex justify-content-center mx-2">
						<div className="count d-flex align-self-center text-muted mx-2">{tweet.reply_count}</div>
						<span className="d-flex" role="img" aria-label="emoji">💬</span>
					</div>
					<div className="retweet d-flex justify-content-center mx-2">
						<div className="count d-flex align-self-center text-muted mx-2">{tweet.retweet_count}</div>
						<span className="d-flex" role="img" aria-label="emoji">🔁</span>
					</div>
					<div className="like d-flex justify-content-center mx-2">
						<div className="count d-flex align-self-center text-muted mx-2">{tweet.favorite_count}</div>
						<span className="d-flex" role="img" aria-label="emoji">❤️</span>
					</div>
				</div>
			</div>
		)
	}
}

Tweet.propTypes = {
	tweet: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);
