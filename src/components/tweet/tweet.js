import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'

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
				if (item.type === 'video') {
					return (
						<div className="" key={index}>
							<ReactPlayer className="video d-flex justify-content-center py-2 px-3" key={index} url={item.video_info.variants[0].url} playing />
						</div>
					)
				} else if (item.type === 'photo') {
					console.log(item.media_url_https)
					return (
						<div className="image justify-content-center" key={index}>
					 		<img key={index} className="media justify-content-center py-2 px-3 media" src={item.media_url_https} alt=""/>
						</div>
					)
				}
			})
		)
	}

	displayRetweet() {
		const { tweet } = this.props
		return (
			<div>
				<div className="header d-flex px-1">
					<div className="user flex-column">
						<div className="retweet-tag d-flex text-muted mx-2">
							<b>{tweet.user.name}</b> <span className="ml-1">a retweeté</span>
						</div>
					</div>
				</div>

				<div className="main d-flex p-1">
					<div className="d-flex align-items-start">
						<img className="profile-picture d-flex justify-content-center m-2" src={tweet.retweeted_status.user.profile_image_url_https} alt=""/>
					</div>
					<div className="container">
						<div className="header d-flex">
							<div className="name d-flex">
								{tweet.retweeted_status.user.name}
							</div>
						</div>
						<div className="main d-flex flex-column">
							<div className="text d-flex justify-content-left py-1">
								{tweet.retweeted_status.extended_tweet ? tweet.retweeted_status.extended_tweet.full_text : tweet.retweeted_status.text}
							</div>
							<div className="">
								{tweet.retweeted_status.extended_entities ? this.displayMedia(tweet.retweeted_status.extended_entities) : (tweet.retweeted_status.extended_tweet ? (tweet.retweeted_status.extended_tweet.extended_entities ? this.displayMedia(tweet.retweeted_status.extended_tweet.extended_entities) : <div className="no-media"></div>) : <div className="no-media"></div>)}
							</div>
						</div>
					</div>
				</div>

				<div className="footer d-flex mx-2 my-1">
					<div className="comment d-flex justify-content-center mx-2">
						<div className="count d-flex align-self-center text-muted mx-2">{tweet.retweeted_status.reply_count}</div>
						<span className="d-flex" role="img" aria-label="emoji">💬</span>
					</div>

					<div className="retweet d-flex justify-content-center mx-2">
						<div className="count d-flex align-self-center text-muted mx-2">{tweet.retweeted_status.retweet_count}</div>
						<span className="d-flex" role="img" aria-label="emoji">🔁</span>
					</div>

					<div className="like d-flex justify-content-center mx-2">
						<div className="count d-flex align-self-center text-muted mx-2">{tweet.retweeted_status.favorite_count}</div>
						<span className="d-flex" role="img" aria-label="emoji">❤️</span>
					</div>
				</div>

			</div>
		)
	}

	displayTweet() {
		const { tweet } = this.props
		return (
			<div>

				<div className="main d-flex p-1">
					<div className="d-flex align-items-start">
						<img className="profile-picture d-flex justify-content-center m-2" src={tweet.user.profile_image_url_https} alt=""/>
					</div>

					<div className="header d-flex p-1">
						<div className="user flex-column">
							<div className="name d-flex">
								{tweet.user.name}
							</div>
							<div className="text-muted justify-content-left description">
								{tweet.user.description}
							</div>

							<div className="text d-flex justify-content-left py-1">
								{tweet.extended_tweet ? tweet.extended_tweet.full_text : tweet.text}
							</div>
							<div className="">
								{tweet.extended_entities ? this.displayMedia(tweet.extended_entities) : (tweet.extended_tweet ? (tweet.extended_tweet.extended_entities ? this.displayMedia(tweet.extended_tweet.extended_entities) : <div className="no-media"></div>) : <div className="no-media"></div>)}
							</div>
						</div>
					</div>
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

  render() {
		const { tweet } = this.props
		return(
			<div className="tweet-box flex-column align-self-center py-2 m-1">
				{ tweet.retweeted_status ? this.displayRetweet() : this.displayTweet() }
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
