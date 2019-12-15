import React from 'react';

class QuestionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            resultText: "",
            questionInfo: [],
            result: false,
            questionCount: 0,
            points: 0,
            gameStarted: true
        }
        this.handleClick = this.handleClick.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    async componentDidMount() {
        this.setState({ loading: true })

        this.setState({
            loading: false
        })
    }

    async handleClick(e) {
        const value = e.target.value;
        console.log(this.state.gameStarted)
        console.log(this.state.questionCount)
        if (this.state.questionCount > 5) {
            this.setState({gameStarted: false})
        }
        if (value === "true") {
            await this.setState({
                resultText: "CORRECT",
                points: this.state.points + 1
            })
        } else {
            await this.setState({
                resultText: "WRONG"
            })
        }

        this.setState({ questionCount: this.state.questionCount + 1 })
    }

    startGame() {
        this.setState({ gameStarted: true })
    }

    render() {
        var { loading } = this.state;

        const styleCorrect = { color: "green" }
        const styleInCorrect = { color: "red" }

        return (
            <div>
                <h2>{this.props.questionInfo[this.state.questionCount].quest}</h2>
                <button onClick={this.handleClick} value={this.props.questionInfo[this.state.questionCount].answers[0].isCorrect}>A: {this.props.questionInfo[this.state.questionCount].answers[0].ansText}</button>
                <button onClick={this.handleClick} value={this.props.questionInfo[this.state.questionCount].answers[1].isCorrect}>B: {this.props.questionInfo[this.state.questionCount].answers[1].ansText}</button>
                <button onClick={this.handleClick} value={this.props.questionInfo[this.state.questionCount].answers[2].isCorrect}>C: {this.props.questionInfo[this.state.questionCount].answers[2].ansText}</button>
                <button onClick={this.handleClick} value={this.props.questionInfo[this.state.questionCount].answers[3].isCorrect}>D: {this.props.questionInfo[this.state.questionCount].answers[3].ansText}</button>
                <h2>You answer is {this.state.resultText}</h2>
                <h2>Score: {this.state.points}</h2>
            </div>
        )


    }
}


export default QuestionComponent;