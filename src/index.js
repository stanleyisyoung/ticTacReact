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
  // Section 2: moved up to game lvl
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xNext: true,
  //   };
  // }

  // handleClick(i) {
  //   // slice mks cp of square and modifies that
  //   // aka making original immutable
  //   const squares = this.state.squares.slice();
    
  //   // check if anyone won yet
  //   if(calculateWinner(squares) || squares[i]){
  //     return;
  //   }

  //   squares[i] = this.state.xNext ? 'X' : 'O';
  //   this.setState({
  //     squares: squares,
  //     xNext: !this.state.xNext,
  //   });
  // }

  renderSquare(i) {
    return (
      // two props are passed to Square child: value && onClickf
      // change .state to .props when data is coming from parent
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
    // can name 'value' anything and is stored into prop(erties)
  }

  render() {
    // mv'd to Game component
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if(winner) {
    //   status = this.props.winner + ' HAS WON!!!';
    // } else {
    //   status = "Next player: " + (this.state.xNext ? 'X' : 'O');
    // }
    
    return (
      <div>
        {/* rm below, mv'd to Game */}
        {/* <div className="status">{status}</div> */}
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
  // lift history state into game level
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xNext: true,
      stepNumber: 0,
    }
  }

  // handleClick(i) {
  //   const history = this.state.history.slice(0, this.state.history.stepNumber+1);
  //   const current = history[history.length-1];
  //   const squares = current.squares.slice();

  //   // check if there's a winner || spot taken
  //   if(calculateWinner(squares) || squares[i]){
  //     return;
  //   }

  //   squares[i] = this.state.xNext ? 'X' : 'O';
  //   this.setState({
  //     // concat doesn't mutate original arr, but push does
  //     history: history.concat([{
  //       squares: squares
  //     }]),
  //     xNext: !this.state.xNext,
  //     stepNumber: history.length,
  //   });
  // }
  
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber]; 
    const winner  = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return (
          <li key={move}>
            <button onClick={()=> this.jumpTo(move)}>{desc}</button>
          </li>
        )
    });

    let status;
    if(winner) {
      status = 'Winner winner chicken dinner: ' + winner;
    } else {
      status = 'Next player: ' + this.state.xNext ? 'X' : 'Y';
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick={ i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  // all possible win coordinate combos
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
