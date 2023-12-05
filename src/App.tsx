import './App.css'
import swamp from './assets/swamp.png'
import tRex from './assets/tRex.png'
import { useState, useEffect } from 'react'

function App() {
  const [score, setScore] = useState(0);
  const [tRexs, settRexs] = useState<boolean[]>(new Array(9).fill(false))


  function showtRex(index: number) {
// introducing callback due to React magic and values becoming stale X_X
    settRexs((curtRexs) => {
      const newtRexs = [...curtRexs];
      newtRexs[index] = true;
      return newtRexs
    });
  }

  function hidetRex(index: number) {
// introducing callback due to React magic and values becoming stale X_X
    settRexs((curtRexs) => {
      const newtRexs = [...curtRexs];
      newtRexs[index] = false;
      return newtRexs;
    });
  }

  function whacktRex(index: number) {
    if (!tRexs[index]) return;
    hidetRex(index)
    setScore((score) => score +1)
  }



  useEffect(()=> {
    const interval = setInterval(()=>{
      const randomIndex = Math.floor(Math.random() * tRexs.length )
      showtRex(randomIndex)
      setTimeout(() => {
        hidetRex(randomIndex)
      }, 800)
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  })

  return (
   <>
  <h1>Score {score}</h1>
    <div className='grid'>
      {tRexs.map((istRex, idx) => (
        <img key={idx} src={istRex ? tRex : swamp } onClick={()=>{
          whacktRex(idx);
        }}></img>
      ))}
    </div>
  </>
  );
}

export default App
