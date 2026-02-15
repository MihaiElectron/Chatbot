import { ChatMessage } from "../ChatMessage/ChatMessage"

export function ChatMessages() {
  const chatMessages = [{
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
  }]


return (
  <>
    {chatMessages.map((chatMessage) => {
      return (
        <ChatMessage 
          message={chatMessage.message}
          sender={chatMessage.sender}
          key={chatMessage.id}
        />
      )
    })}
  </>
)
}