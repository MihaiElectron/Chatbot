import { ChatInput } from './components/ChatInput/ChatInput'
import { ChatMessages } from './components/ChatMessages/ChatMessages'
import './App.css'
import { useState } from "react"

function App() {

  const [chatMessages, setChatMessages] = useState([{
    message: 'hello',
    sender: 'user',
    id:'id1'
  }, {
    message: 'Yo !',
    sender: 'robot',
    id:'id2'
  }, {
    message: 'tu vas tu bien ?',
    sender: 'user',
    id:'id3'
  }, {
      message: 'ouais je va je bien !!',
      sender: 'robot',
      id:'id4' 
  }
])

  return (
    <>
      
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
      <ChatMessages 
        chatMessages={chatMessages}
      />
      
    </>
  )
}

export default App
