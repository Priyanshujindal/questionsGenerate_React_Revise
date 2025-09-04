import React from 'react'
import { useState } from 'react'
function Card({questionsProp}) {
  const questions=questionsProp;
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);
    const q=questions[current]

    const handleSelect=(i)=>setSelected(i);

    const commitAnswer = () => {
        if (selected === null) return;
        const isCorrect = selected === q.correctIndex;
        const prev = answers.find(a => a.questionId === q.id);
        let nextScore = score;
        if (!prev && isCorrect) nextScore += 1;
        if (prev && prev.isCorrect && !isCorrect) nextScore -= 1;
        if (prev && !prev.isCorrect && isCorrect) nextScore += 1;

        const nextAnswers = [
            ...answers.filter(a => a.questionId !== q.id),
            { questionId: q.id, chosenIndex: selected, isCorrect }
        ];
        setAnswers(nextAnswers);
        setScore(nextScore);
    }
    const next = () => {
      commitAnswer();
      if (current < questions.length - 1) {
        const nextIndex = current + 1;
        setCurrent(nextIndex);
        const prev = answers.find(a => a.questionId === questions[nextIndex].id);
        setSelected(prev ? prev.chosenIndex : null);
      } else {
        setDone(true);
      }
    }
    const prev = () => {
      commitAnswer();
      if (current > 0) {
        const prevIndex = current - 1;
        setCurrent(prevIndex);
        const prevAns = answers.find(a => a.questionId === questions[prevIndex].id);
        setSelected(prevAns ? prevAns.chosenIndex : null);
      }
    }
    const restart=()=>{
      setCurrent(0);
      setAnswers([]);
      setSelected(null);
      setScore(0);
      setDone(false);
    }
    if(done){
      return(
        <div className='card'>
          <h2>Results</h2>
          <p>Score: {score} / {questions.length}</p>
          <ol  style={{textAlign:'left',listStyle:'none',listStyleType:'decimal'}}>
            {questions.map((qq)=>{
              const a=answers.find(x=>x.questionId===qq.id)
              const status=a?a.isCorrect?'correct':'Wrong':'';
              return(
                <li key={qq.id} style={{marginBottom:8,color:status==='correct'?'green':'red'}}>
                  Your Answer: {a?qq.options[a.chosenIndex]:'Not answered'} <br/>
                  Correct Answer: {qq.options[qq.correctIndex]}
                </li>
              )
            })}
          </ol>
          <button onClick={restart}>Restart</button>
        </div>
      )
    }
  return (
    <>
    <div className='card'>
       <div style={{opacity:0.8,marginBottom:10}}>Question {current+1}/{questions.length}</div>
       <h2 style={{marginTop:0}}>{q.text}</h2>

       <div style={{display:'grid',gap:10,margin:'16px 0'}}>
        {q.options.map((opt,i)=>{
          return(
          <button key={i} onClick={()=>handleSelect(i)} 
          style={{
            padding:'10px 12px',
            borderRadius:8,
            border: selected === i ? '2px solid #1db954' : '1px solid #444',
            background: selected === i ? 'rgba(29,185,84,0.15)' : '#222',
            color:'#fff',
            textAlign:'left',
            cursor:'pointer'
          }}>{opt}</button>
          )
        })}
       </div>
        <div style={{display:'flex',gap:8,justifyContent:'center'}}>
          <button onClick={prev} disabled={current===0}>Previous</button>
          <button onClick={next}>{current===questions.length-1 ? 'Finish' : 'Next'}</button>
        </div>
    </div>
    </>
  )
}

export default Card
