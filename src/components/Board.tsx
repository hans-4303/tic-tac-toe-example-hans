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
  onPlay: (nextSquares: any[], coordinateSquare: number[]) => void;
}) {
  /* 인덱스를 받는 클릭 함수 */
  function handleClick(index: number) {
    const locations = [
      /* row 1 */
      [1, 1],
      [2, 1],
      [3, 1],
      /* row 2 */
      [1, 2],
      [2, 2],
      [3, 2],
      /* row 3 */
      [1, 3],
      [2, 3],
      [3, 3],
    ];

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
    onPlay(nextSquares, locations[index]);
  }

  /* 승자 계산 함수의 반환 값(squares[a] | null) 다루기 */
  /* Q4. 승자 계산 함수 편집 및 활용, 승자와 라인 둘을 반환 */
  const winner = calculateWinner(squares) && calculateWinner(squares)?.winner;
  const lines = calculateWinner(squares) && calculateWinner(squares)?.lines;

  /* 게임 상태 선언 */
  let status;
  /* 승자 계산 함수의 반환 값 있는지 따져서 승자 표시하거나 다음 차례 나타내기 */
  if (winner && winner !== "draw") {
    status = "Winner: " + winner;
  } else if (winner && winner === "draw") {
    status = "It's a " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const length = Math.sqrt(squares.length);

  // 5. 배열을 Array(length).fill(null)로 선언
  const testBoard3 = Array(length).fill(null);
  // map 메서드는 별도로 실행하는 케이스: 초기 배열 불변성 지켜짐, 아는 한 가장 좋겠음
  const renderBoard3 = testBoard3.map((_, i) => {
    const row = Array(length)
      .fill(null)
      .map((_, j) => (
        <Square
          value={squares[3 * i + j]}
          onSquareClick={() => handleClick(3 * i + j)}
          key={3 * i + j}
          squareIndex={3 * i + j}
          winningLines={lines}
        />
      ));
    return (
      <div className="board-row" key={i}>
        {row}
      </div>
    );
  });

  return (
    <>
      {/* 게임 진행 상황 렌더링 */}
      <div className="status">{status}</div>
      {renderBoard3}
    </>
  );
}

export default Board;
