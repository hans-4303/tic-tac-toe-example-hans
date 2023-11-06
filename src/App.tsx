import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Board from "@components/Board";

function App() {
  /* 어차피 Array("길이").fill("값")이 any[] 형태로 반환됨 */
  const [history, setHistory] = useState<any[]>([Array(9).fill(null)]);
  /* 현재 움직임을 뜻함, number */
  const [currentMove, setCurrentMove] = useState<number>(0);
  /* currentMove % 2 값이 0인지 따짐, 원래는 const지만 state 렌더링 따라 갱신될 것 */
  const xIsNext: boolean = currentMove % 2 === 0;
  /* history 중 특정 인덱스에 접근하므로 역시 any[] 처리 */
  const currentSquares: any[] = history[currentMove];

  /* squares는 any[] 형태 */
  function handlePlay(nextSquares: any[]) {
    /* history 배열을 스프레드하고 slice, 0번째부터 currentMove까지만 반환하고 nextSquares를 이어주기 */
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    /* [...history.slice(0, currentMove + 1) == any[], nextSquares == any[]] 이므로 불변성 유지됐음, setState 호출 및 대입 */
    setHistory(nextHistory);
    /* 내역 길이 - 1로 setState, 즉 턴수를 나타냄 */
    setCurrentMove(nextHistory.length - 1);
  }

  /* 내역 버튼에 해당하는 함수, 파라미터로 숫자를 받은 뒤 해당 턴수로 이동함 */
  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  /* 턴수를 나타내는 ui, history state 만큼 반복함 */
  const moves = history.map((el /* ===squares */, index /* === move */) => {
    /* JSX 출력을 위한 변수 */
    let description;
    /* 인덱스가 0보다 크다면(== 턴수로 이동하고 싶다면) */
    if (index > 0) {
      description = "Go to move #" + index;
    } /* 인덱스가 0 이하라면(== 게임 초기화와 같다) */ else {
      description = "Go to game start";
    }
    /* 렌더링 되는 ui */
    return (
      <li key={index}>
        {index !== currentMove ? (
          <button onClick={() => jumpTo(index)}>{description}</button>
        ) : (
          <span>You are at move {currentMove}</span>
        )}
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        {/* 보드 컴포넌트 호출하고 props 넘기기 */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {/* moves 컴포넌트 배열 호출, 그런데 왜 적용한 것인지는 모르겠음 */}
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
