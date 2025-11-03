import { useState,useRef,useEffect } from 'react'
import Dice from './components/Dice'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice())
  const buttonRef=useRef(null)

  const gameWon=dice.every(die => die.isHeld &&
    dice.every(die => die.value === dice[0].value))
  
  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])
  
  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id:nanoid(),
        className: 'w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] border-none rounded-[10px] bg-white font-bold text-[1.4rem] sm:text-[1.75rem] shadow-[0_2px_2px_rgba(0,0,0,0.15)]'
      }))
  }

  function rollDice() {
    if (!gameWon) {
      setDice(oldDice => oldDice.map(die=>
      die.isHeld ? die :
        { ...die, value: Math.ceil(Math.random() * 6) }
    ))
    } else {
      setDice(generateAllNewDice())
    }
  }

  function hold(id) {
    setDice(oldDice => oldDice.map(die =>
        die.id === id ?
          { ...die, isHeld: !die.isHeld } : die
      ))
  }

  const diceElements = dice.map(dieObj => (
    <Dice key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} hold={()=>hold(dieObj.id)} className={dieObj.className}/>))

  return (
    <main className='bg-[#F5F5F5] w-full max-w-[400px] rounded-[5px] flex flex-col justify-evenly items-center p-5'>
      {gameWon && <Confetti />}
      <h1 className="text-[28px] sm:text-[40px] m-0 font-bold">Tenzies</h1>
      <p className="font-inter mt-0 text-center font-normal text-center">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='grid grid-rows-2 grid-cols-5 gap-[10px] sm:gap-5 mb-[20px] sm:mb-10'>
        {diceElements}
      </div>
      <button ref={buttonRef} onClick={rollDice} className='px-[18px] sm:px-[21px] py-[8px] sm:py-[6px] border-none bg-[#5035FF] text-white rounded-md text-base sm:text-lg'>
        {gameWon ? 'New Game' : 'Roll'}
      </button>
    </main>
  )
}

export default App