/* 승자 계산 함수, squares 파라미터 받고 사용 */
function calculateWinner(squares: any[]) {
  /* 승리할 수 있는 모든 조건 */
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
  /* 8번 반복됨 */
  for (let i = 0; i < lines.length; i++) {
    /* 순회하는 배열 요소를 각각 a, b, c로 분해 */
    const [a, b, c] = lines[i];
    /* squares[a]가 존재하며 squares[b] 및 squares[c]와 동시에 값이 "X" || "O"로 같은 경우 승리 판정 */
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      /* 적정 값을 뽑아 쓸 수 있게 객체 형태로 리턴 */
      return {
        /* squares[a] === "X" || "O" */
        winner: squares[a],
        /* lines === [0, 1, 2] || [3, 4, 5], ... */
        lines: [a, b, c],
      };
    } else if (!squares.includes(null)) {
      return {
        winner: "draw",
        lines: null
      };
    }
  }
  return null;
}

export default calculateWinner;
