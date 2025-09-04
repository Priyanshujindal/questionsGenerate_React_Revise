import React from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
const genAI=new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY)
const model=genAI.getGenerativeModel({model:'gemini-2.0-flash',
  generationConfig: {
    responseMimeType: 'application/json',
  }
})

async function generateQuestions(topic) {
    const prompt=`
        Generate exactly 5 multiple-choice questions about "${topic}".
        Return ONLY valid JSON matching:
        {
        "questions": [
            { "id": number,
              "text": string,
            "options": [string, string, string, string],
            "correctIndex": 0|1|2|3
            }
        ]
        }
        No backticks, no extra text.`
        const res=await model.generateContent(prompt);
        let text=res.response.text().trim();
        text=text.replaceAll(/```json/g,'').trim();
        // const start=text.indexOf('{')
        // const end=text.indexOf('}')
        // const json=start!=-1 && end!=-1 ?text.slice(start,end+1):text;
        // console.log("JSON:",json)
        const data=JSON.parse(text)
        console.log(data)
        return data.questions
}

export default generateQuestions
