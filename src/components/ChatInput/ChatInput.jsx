import { useState } from "react"
import Chatbot from "../../utils/Chatbot"


export function ChatInput({ chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('')

  function saveInputText(event) {
    setInputText(event.target.value)
  }

  function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ]
    setChatMessages(newChatMessages)

    const response = Chatbot.getResponse(inputText)
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ])

    setInputText('')
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage()
    }
  }


  return (
    <div className="chatInput">
      <input 
        className="chatInput__input" 
        name="input" 
        placeholder="Insert your text here"
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
      />
      <button className="chatInput__button"
        onClick={sendMessage}
      >Send</button>
    </div>
  )
}