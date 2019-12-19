import React from 'react';
import './App.css';
import QuestionComponent from './QuestionComponent'

class CategoryPickComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            category: "",
            gameStarted: false,
            questionInfo: [],
            gif: {},
            images: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    handleClick(e) {
        const { value } = e.target;
        this.setState({
            category: value
        })
    }

    async componentDidMount() {
        const url = "http://api.giphy.com/v1/gifs/random?api_key=3ilsHOUsdjeOhMDrB8vwAQaRDtVPkym4";
        const response = await fetch(url);
        const data = await response.json();

        await this.setState({
            images: data,
            loading: false
        })
    }

    convert(string) {
        return string.replace(/&#(?:x([\da-f]+)|(\d+));/ig, function(_, hex, dec) {
            return String.fromCharCode(dec || +('0x' + hex))
        })
    }

    convert2(string) {
        return string.replace("&quot;", '"').replace("&quot;", '"'); 
 }

    async startGame() {
        const url = "https:/opentdb.com/api.php?amount=10&category=" + this.state.category + "&difficulty=easy&type=multiple";
        const response = await fetch(url);
        const data = await response.json();

        const allInfo = data.results;
        console.log(allInfo)
        let recievedInfo = [];
        let stringTest = "Which English football club has the nickname &#039;The Foxes&#039;?";
        //&quot

        for (var i = 0; i < allInfo.length; i++) {
            let tempArray = [{
                quest: this.convert2(this.convert(allInfo[i].question)),
                answers: [
                    { ansText: allInfo[i].incorrect_answers[0], isCorrect: false },
                    { ansText: allInfo[i].incorrect_answers[1], isCorrect: false },
                    { ansText: allInfo[i].incorrect_answers[2], isCorrect: false },
                    { ansText: allInfo[i].correct_answer, isCorrect: true }
                ]
            }];
            recievedInfo = recievedInfo.concat(tempArray);
        }

        let answerInfo = [];
        for (var i = 0; i < allInfo.length; i++) {
            let tempArray = {
                answers: [{ ansText: allInfo[i].incorrect_answers[0], isCorrect: false },
                    { ansText: allInfo[i].incorrect_answers[1], isCorrect: false },
                    { ansText: allInfo[i].incorrect_answers[2], isCorrect: false },
                    { ansText: allInfo[i].correct_answer, isCorrect: true }
                ]
            };
            answerInfo = answerInfo.concat(tempArray);
        }

        let testArr = answerInfo
        for (var i = 0; i < allInfo.length; i++) {
            testArr[i].answers.sort(() => Math.random() - 0.5)
            recievedInfo[i].answers = testArr[i].answers;
        }
        console.log(testArr)


        this.setState({
            questionInfo: recievedInfo,
        })

        this.setState({ gameStarted: true })
    }

    render() {
        let categoryChosen = false;
        if (this.state.category == "") {
            categoryChosen = true;
        }

        const btnStyle = { backgroundColor: "green" };

        if (!this.state.gameStarted) {
            return (
                <div className="category-pick">
                <button value="21" style={this.state.category == 21 ? btnStyle : {}} onClick={this.handleClick}>Sports</button>
                <button value="22" style={this.state.category == 22 ? btnStyle : {}} onClick={this.handleClick}>Geopraphy</button><br/>
                <button value="26" style={this.state.category == 26 ? btnStyle : {}} onClick={this.handleClick}>Celebrities</button>    
                <button value="9" style={this.state.category == 9 ? btnStyle : {}} onClick={this.handleClick}>General Knowledge</button>
                <br/><br/><button  onClick={this.startGame} disabled={categoryChosen}>Start Game</button>
                <h2>The category is: {this.state.category}</h2>
            </div>
            )
        } else {
            return (
                <div>
            <QuestionComponent questionInfo={this.state.questionInfo} gameStarted={this.state.gameStarted}/>
            </div>
            )
        }

    }

}

export default CategoryPickComponent;