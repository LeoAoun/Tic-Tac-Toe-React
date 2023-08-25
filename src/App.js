import React, { useEffect, useState, useRef } from "react";
import "./main.css"
import "./tailwind.css";
import clickSrc from "./audios/click.mp3"
import drawSrc from "./audios/draw.mp3"
import winSrc from "./audios/win.mp3"

function App() {

  // Board 
  const [array, setArray] = useState(["", "", "", "", "", "", "", "", ""])

  // Player time
  const [playerTime, setPlayerTime] = useState("X")

  // Audios
  const clickRef = useRef(null)
  const winRef = useRef(null)
  const drawRef = useRef(null)

  // Square clicked
  function handleClick(i) {
    if (array[i] == "") {
      let copiaArray = [...array]
      copiaArray[i] = playerTime
      setArray(copiaArray)
      clickRef.current.volume = 0.7
      clickRef.current.play();
      setPlayerTime(playerTime === "X" ? "O" : "X")
    }
  }

  // Verify a winner every time that a different square is clicked
  useEffect(() => {
    VerifyWinner()
  }, [array])

  // Restart the game
  function Restart() {
    clickRef.current.volume = 0.7
    clickRef.current.play();
    setTimeout(() => window.location.reload(), 100)
  }

  // Return the winner or a draw
  function VerifyWinner() {
    if (
      (array[0] && array[0] == array[1] && array[1] == array[2]) ||
      (array[3] && array[3] == array[4] && array[4] == array[5]) ||
      (array[6] && array[6] == array[7] && array[7] == array[8]) ||
      (array[0] && array[0] == array[3] && array[3] == array[6]) ||
      (array[1] && array[1] == array[4] && array[4] == array[7]) ||
      (array[2] && array[2] == array[5] && array[5] == array[8]) ||
      (array[0] && array[0] == array[4] && array[4] == array[8]) ||
      (array[2] && array[2] == array[4] && array[4] == array[6])
    ) {

      winRef.current.volume = 0.5
      drawRef.current.currentTime = 0.2
      winRef.current.play();

      return (
        <div className="
      bg-black
        bg-opacity-90

        absolute
        top-0
        left-0
        right-0
        bottom-0

        flex
        flex-col
        items-center
        justify-center
        ">

          <h1 className="
          text-white 
          text-7xl 
          md:text-8xl 

          font-poppins
          font-bold

          mb-8
          ">
            PLAYER
          </h1>

          <h1 className="
        text-[#00aeff]
          text-7xl 
          md:text-8xl 

          font-poppins
          font-bold

          mb-8
          ">
            {playerTime == "X" ? "O" : "X"}
          </h1>

          <h1 className="
          text-white 
          text-7xl 
          md:text-8xl 

          font-poppins 
          font-bold
          ">
            WINS!
          </h1>

          <button onClick={() => Restart()} className="
          bg-yellow-500
          hover:bg-[#9b7700]
          opacity-100
          w-60
          h-16

          text-white
          text-[25px]

          font-semibold

          mt-24
          "
            style={{ textShadow: "2px 0px 4px black" }}
          >
            New Game
          </button>

        </div >
      )
    }

    else if (
      array[0] &&
      array[1] &&
      array[2] &&
      array[3] &&
      array[4] &&
      array[5] &&
      array[6] &&
      array[7] &&
      array[8]
    ) {

      drawRef.current.volume = 0.5
      drawRef.current.currentTime = 0.2
      drawRef.current.play();

      return (
        <div className="
        bg-black
        bg-opacity-90

        absolute
        top-0
        left-0
        right-0
        bottom-0

        flex
        flex-col
        items-center
        justify-center
        ">

          <h1 className="
          text-[#00aeff]
          text-7xl 
          md:text-8xl 

          font-poppins
          font-bold

          mb-8
          ">
            DRAW
          </h1>

          <button onClick={() => Restart()} className="
          bg-yellow-500
          hover:bg-[#9b7700]
          opacity-100
          w-60
          h-16

          text-white
          text-[25px]

          font-semibold

          mt-24
          "
            style={{ textShadow: "2px 0px 4px black" }}
          >
            New Game
          </button>

        </div>
      )
    }
  }


  return (
    <div className="h-screen">

      <div className="
      h-screen

      flex
      flex-col
      items-center 
      justify-center
      ">

        <h1 className="
        text-white 
        text-5xl
        md:text-7xl 

        font-poppins
        font-bold

        mb-9
        ">
          Tic Tac Toe
        </h1>

        <div className="
        grid 
        grid-cols-3 
        gap-[10px]
        ">

          {array.map((square, i) => (
            <button onClick={() => handleClick(i)}

              className="
              bg-white 
              rounded-lg
              w-24
              h-24
              md:w-44
              md:h-44 

              text-6xl
              md:text-8xl
              text-[#4A00E0] 

              font-semibold
              "
              key={i}
            >
              {square}

            </button>
          ))}

        </div>

      </div>

      <VerifyWinner />

      <audio ref={clickRef} src={clickSrc} />
      <audio ref={drawRef} src={drawSrc} />
      <audio ref={winRef} src={winSrc} />

    </div>
  )
}

export default App;

