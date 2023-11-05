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
    /* squares[a]값을 따지고, squares[a]가 존재하며 squares[b]가 존재하고, squares[c]와 같다면 */
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      /* squares[a]를 반환함 */
      return squares[a];
    }
  }
  return null;
}

export default calculateWinner;