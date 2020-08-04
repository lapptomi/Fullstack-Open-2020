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
      <StatisticLine text={'good'} value={good} />
      <StatisticLine text={'neutral'} value={neutral} />
      <StatisticLine text={'bad'} value={bad} />
      <StatisticLine text={'all'} value={all} />
      <StatisticLine text={'average'} value={average} />
      <StatisticLine text={'positive'} value={positive} />
    </>
  )
}

const Button = ({name, handleClick}) => {
  return <button onClick={handleClick}>{name}</button>
}

const StatisticLine = ({text, value}) => {
  if (text==='positive') {
    return <p>{text} {value} %</p>
  } else {
    return <p>{text} {value}</p> 
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
        <Button name={'good'} value={good} handleClick={() => setGood(good+1)} />
        <Button name={'neutral'} value={neutral} handleClick={() => setNeutral(neutral+1)} />
        <Button name={'bad'} value={bad} handleClick={() => setBad(bad+1)} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)