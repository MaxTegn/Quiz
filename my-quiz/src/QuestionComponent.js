import React from 'react';
import CategoryPickComponent from './CategoryPickComponent'

class QuestionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            resultText: "",
            questionInfo: [],
            result: false,
            questionCount: 0,
            points: 0,
            gameStarted: true,
            images: [],
            btnsDisabled: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    async componentDidMount() {
        this.setState({ loading: true })
        const url = "http://api.giphy.com/v1/gifs/random?api_key=3ilsHOUsdjeOhMDrB8vwAQaRDtVPkym4&tag=think";
        const response = await fetch(url);
        const data = await response.json();

        await this.setState({
            images: data,
            loading: false
        })
    }

    async handleClick(e) {
        const value = e.target.value;
        console.log(this.state.gameStarted)
        console.log(this.state.questionCount)

        if (this.state.questionCount > 8) {
            this.setState({ gameStarted: false })
        }
        if (value === "true") {
            await this.setState({
                resultText: "CORRECT",
                points: this.state.points + 1,
                btnsDisabled: true
            })
        } else {
            await this.setState({
                resultText: "WRONG",
                btnsDisabled: true
            })
        }

        await setTimeout(() => {
            this.setState({
                questionCount: this.state.questionCount + 1,
                btnsDisabled: false
            })
        }, 2000);

    }

    startGame() {
        this.setState({ gameStarted: true })
    }

    getStyle(checkIfCorrect) {
        let style = {}
        if (checkIfCorrect) {
            style = {
                color: "green"
            }
        } else {
            style = {
                color: "red"
            }
        }
        return style;
    }

    render() {
        var { loading } = this.state;

        const styleCorrect = { color: "green" }
        const styleInCorrect = { color: "red" }
        if (this.state.gameStarted && !loading) {
            return (
                <div>
                <h2>{this.props.questionInfo[this.state.questionCount].quest}</h2>
                <button onClick={this.handleClick} disabled={this.state.btnsDisabled} style={this.state.btnsDisabled ? this.getStyle(this.props.questionInfo[this.state.questionCount].answers[0].isCorrect) : {}} value={this.props.questionInfo[this.state.questionCount].answers[0].isCorrect}>A: {this.props.questionInfo[this.state.questionCount].answers[0].ansText}</button>
                <button onClick={this.handleClick} disabled={this.state.btnsDisabled} style={this.state.btnsDisabled ? this.getStyle(this.props.questionInfo[this.state.questionCount].answers[1].isCorrect) : {}} value={this.props.questionInfo[this.state.questionCount].answers[1].isCorrect}>B: {this.props.questionInfo[this.state.questionCount].answers[1].ansText}</button>
                <button onClick={this.handleClick} disabled={this.state.btnsDisabled} style={this.state.btnsDisabled ? this.getStyle(this.props.questionInfo[this.state.questionCount].answers[2].isCorrect) : {}} value={this.props.questionInfo[this.state.questionCount].answers[2].isCorrect}>C: {this.props.questionInfo[this.state.questionCount].answers[2].ansText}</button>
                <button onClick={this.handleClick} disabled={this.state.btnsDisabled} style={this.state.btnsDisabled ? this.getStyle(this.props.questionInfo[this.state.questionCount].answers[3].isCorrect) : {}} value={this.props.questionInfo[this.state.questionCount].answers[3].isCorrect}>D: {this.props.questionInfo[this.state.questionCount].answers[3].ansText}</button>
                <h2>You answer is {this.state.resultText}</h2>
                <h2>Score: {this.state.points}</h2>
                <img src={this.state.images.data.images.downsized.url}/>
            </div>
            )
        } else {
            return <CategoryPickComponent/>
        }

    }
}


export default QuestionComponent;