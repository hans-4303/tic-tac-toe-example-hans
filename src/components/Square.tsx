/* Board 컴포넌트에서 호출되는 하위 컴포넌트 */
function Square({
  value,
  onSquareClick,
  squareIndex,
  winningLines,
}: {
  /* 문자열과 함수를 받음 */
  value: string;
  onSquareClick: () => void;
  squareIndex: number;
  winningLines: number[] | null | undefined;
}) {
  return (
    /* 각 버튼들이 함수를 받고 값을 출력 */
    <button
      className={
        /* 조건부 렌더링을 하고 있으니까 null 경우가 생겨도 문제 없음 */
        winningLines && winningLines.includes(squareIndex)
          ? "square-win"
          : "square"
      }
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default Square;
