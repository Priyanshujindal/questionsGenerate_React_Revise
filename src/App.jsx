import './App.css'
import Card from './Card'
import Footer from './Footer'
import Header from './Header'
import TopicSelect from './TopicSelect'
import {useState} from 'react'
import generateQuestions from './gemini'
function App() {
  const [topic,setTopic]=useState(null)
  const [qs,setQs]=useState(null)
  const [loading,setLoading]=useState(false)
  const StartWithTopic=async(t)=>{
    setLoading(true)
    try{
      const questions=await generateQuestions(t);
      setTopic(t)
      setQs(questions)
    }catch(e){
      alert("Error generating questions. Try a another topic")
      console.error(e)
    }finally{
      setLoading(false)
    }
  }
  return (
    <>
      <Header/>
      <main className="content">
        {!qs ?(
          <TopicSelect onsubmit={StartWithTopic} loading={loading}></TopicSelect>
        ):
        (
          <Card questionsProp={qs}></Card>
        )}
      </main>
      <Footer/>
    </>
  )
}

export default App