/* 하위 컴포넌트 */
import Square from "@components/Square";
/* 로직 호출 */
import calculateWinner from "@utils/calculateWinner.util";

/* 게시판 컴포넌트 */
function Board({
  xIsNext,
  squares,
  onPlay,
}: {
  /* xIsNext는 계속 리렌더링 될 값 */
  xIsNext: boolean;
  /* square, onPlay는 특이점 없음 */
  squares: any[];
  onPlay: (nextSquares: any[]) => void;
}) {
  /* 인덱스를 받는 클릭 함수 */
  function handleClick(index: number) {
    /* 만약 승자 로직 값이 있거나 squares[index]가 있다면 리턴으로 나오기 */
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    /* squares.slice로 시작부터 끝까지 배열 얕은 복사 */
    const nextSquares = squares.slice();
    /* xIsNext === true 조건 따져서 X나 O 값 대입 */
    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }
    /* onPlay === handlePlay 함수에 nextSquares(게임 상황) 전달하기 */
    onPlay(nextSquares);
  }

  /* 승자 계산 함수의 반환 값(squares[a] | null) 다루기 */
  const winner = calculateWinner(squares);
  /* 게임 상태 선언 */
  let status;
  /* 승자 계산 함수의 반환 값 있는지 따져서 승자 표시하거나 다음 차례 나타내기 */
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      {/* 게임 진행 상황 렌더링 */}
      <div className="status">{status}</div>
      {/* Square 컴포넌트 호출 및 props 대입
      onSquareClick prop으로 handleClick 메서드 전달하면 하위 컴포넌트가 사용하는 방식 */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default Board;
