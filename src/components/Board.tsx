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

  const length = Math.sqrt(squares.length);

  // 1. 불변성이 깨지지만 작성은 한 사례
  const testBoard = [];
  for (let i = 0; i < length; i++) {
    const testRow = [];
    for (let j = 0; j < length; j++) {
      testRow.push(
        <Square
          value={squares[3 * i + j]}
          onSquareClick={() => handleClick(3 * i + j)}
          key={3 * i + j}
        />
      );
    }
    testBoard.push(
      <div className="board-row" key={i}>
        {testRow}
      </div>
    );
  }

  // 2. Array.from 으로 작성해서 불변성은 지키는 사례, Array.from 확인해보기
  const testBoard1 = Array.from({ length }, (_, i) => {
    const testRow1 = Array.from({ length }, (_, j) => (
      <Square
        value={squares[3 * i + j]}
        onSquareClick={() => handleClick(3 * i + j)}
        key={3 * i + j}
      />
    ));
    return (
      <div className="board-row" key={i}>
        {testRow1}
      </div>
    );
  });

  return (
    <>
      {/* 게임 진행 상황 렌더링 */}
      <div className="status">{status}</div>
      {/* Square 컴포넌트 호출 및 props 대입
      onSquareClick prop으로 handleClick 메서드 전달하면 하위 컴포넌트가 사용하는 방식 */}
      {/* <div className="board-row">
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
      </div> */}

      {/* 3. 불변성은 지키고 return 문에서 표현식으로 작성한 사례 */}
      {Array(length)
        .fill(null)
        .map((_, i) => {
          const row = Array(length)
            .fill(null)
            .map((_, j) => (
              <Square
                value={squares[3 * i + j]}
                onSquareClick={() => handleClick(3 * i + j)}
                key={3 * i + j}
              />
            ));
          return (
            <div className="board-row" key={i}>
              {row}
            </div>
          );
        })}
    </>
  );
}

export default Board;
