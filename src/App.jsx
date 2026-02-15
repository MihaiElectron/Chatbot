import { ChatInput } from './components/ChatInput/ChatInput'
import { ChatMessage } from './components/ChatMessage/ChatMessage'

import './App.css'

function App() {


  return (
    <>
      
      <ChatInput />
      <ChatMessage 
        message="dsf" 
        sender="user"
      />
      <ChatMessage 
        message="dsf"
        sender="robot"
      />

    </>
  )
}

export default App
