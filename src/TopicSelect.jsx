import React from 'react'
import {useState} from 'react'
function TopicSelect({onsubmit,loading}) {
    const [topic,setTopic]=useState("");
  return (
    <>
    <div className="card">
        <h2>Pick a topic</h2>
        <input value={topic} onChange={(e)=>setTopic(e.target.value)} 
        placeholder='e.g. React basics' style={{padding:'10px',width:'100%',borderRadius:8}}/>
        <div style={{marginTop:12}}>
         {/* {setInterval(() => {
            console.log(topic)
          }, 1000)} */}
            <button onClick={()=>onsubmit(topic)} disabled={!topic || loading}> {loading?'Loading...':'Start Quiz'}</button>
        </div>
    </div>
    </>
  )
}

export default TopicSelect
