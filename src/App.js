import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { Dashboard } from './pages'
import { Navbar } from './components'

import './App.css';

class App extends Component {

	render() {
		return (
	    <div className="App">
				<Navbar/>
				<div className="App">
	        <header className="App-header">
						<Dashboard/>
					</header>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = (dispatch) => {
	return {
		...bindActionCreators({
		 }, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
