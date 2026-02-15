import { useState } from "react"


export function ChatInput({ chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('')

  function saveInputText(event) {
    setInputText(event.target.value)
  }

  function sendMessage() {
    setChatMessages([
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ])
    setInputText('')
  }

  return (
    <div className="chatInput">
      <input 
        className="chatInput__input" 
        name="input" 
        placeholder="Insert your text here"
        onChange={saveInputText}
        value={inputText}
      />
      <button className="chatInput__button"
        onClick={sendMessage}
      >Send</button>
    </div>
  )
}