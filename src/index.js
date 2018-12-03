import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  // No longer needed bc mv'd up to parent
  // initializing state so we can track if we're on X || O
  // constructor(props){
  //   super(props); // in js always call super for subclass constructor
  //   this.state = {
  //     value: null,
  //   };
  // }

  // this is now a FUNCTION component bc there's no state
  // we have rm'd the render function
  // render() { 
    return (
      <button 
        className="square"
        onClick={ () => props.onClick()}
      >
        {props.value} 
      </button>
    )
  // }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xNext: true,
    };
  }

  handleClick(i) {
    // slice mks cp of square and modifies that
    // aka making original immutable
    const squares = this.state.squares.slice();
    squares[i] = this.state.xNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xNext: !this.state.xNext,
    });
  }

  renderSquare(i) {
    return (
      // two props are passed to Square child: value && onClick
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
    // can name 'value' anything and is stored into prop(erties)
  }

  render() {
    const status = 'Next player: ' + (this.state.xNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


