import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({good, neutral, bad}) => {
  let all = good+neutral+bad

  let positive = Number.isNaN(good/all) 
    ? 0
    : (good * 100) / (good+neutral+bad)
   
  let average = Number.isNaN(good/all)
    ? 0
    : (good-bad)/all

  if (all===0) {
    return <p>No feedback given</p>
  }
  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
        <button onClick={() => setGood(good+1)}>good</button>
        <button onClick={() => setNeutral(neutral+1)}>neutral</button>
        <button onClick={() => setBad(bad+1)}>bad</button>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)