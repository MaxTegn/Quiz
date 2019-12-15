import React, { Component } from 'react';
import QuestionComponent from './QuestionComponent'
import CategoryPickComponent from './CategoryPickComponent'

class Game extends Component {
    constructor() {
    	super()
    	this.state = {
    		gameStarted: false
    	}
    }
    render() {
    	let whatToShow = this.state.gameStarted ? <QuestionComponent/> : <CategoryPickComponent/>

        return <div>
    			<h1>Hello World</h1>
    			{whatToShow}
    		   </div>
    }
}

export default Game;