/* Board 컴포넌트에서 호출되는 하위 컴포넌트 */
function Square({
  value,
  onSquareClick,
}: {
  /* 문자열과 함수를 받음 */
  value: string;
  onSquareClick: () => void;
}) {
  return (
    /* 각 버튼들이 함수를 받고 값을 출력 */
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;
