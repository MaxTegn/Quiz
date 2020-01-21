import React from 'react';
import CategoryPickComponent from './CategoryPickComponent'

class EndScreenComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gif: [],
            returnToCategory: false,
            loading: true
        }
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
    }

    async handleClick(e) {
        await this.setState({ returnToCategory: true })
    }

    render() {
        if (!this.state.returnToCategory) {
            return (
                <div>
                    <h2>Well done! You scored {this.props.points}</h2>
                    <button onClick={this.handleClick}>Try again</button>

                </div>
            )
        } else {
            return <CategoryPickComponent/>
        }

    }
}

export default EndScreenComponent;