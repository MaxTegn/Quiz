import React, { Component } from 'react';
import QuestionComponent from './QuestionComponent'
import CategoryPickComponent from './CategoryPickComponent'

class Game extends Component {
    constructor(props) {
    	super(props)
    	this.state = {
    		gameStarted: false
    	}
 //       this.gameOver = this.gameOver.bind(this)
        this.handler = this.handler.bind(this)
    }

/*    gameOver(value){
        //console.log(this.gameStarted)
        this.setState({gameStarted: value})
    }*/

    handler(){
        this.setState({
            gameStarted: false
        })
    }

    render() {
    	let whatToShow = this.state.gameStarted ? <QuestionComponent handler={this.handler}/> : <CategoryPickComponent/>

        return <div>
    			<h1>Hello World</h1>
    			{whatToShow}
    		   </div>
    }
}

export default Game;