import userImg from '../../assets/user.png'
import robotImg from '../../assets/robot.png'

export function ChatMessage({ message, sender }) {
  return (
    <div className={`chatMessage ${sender === 'robot' ? 'chatMessage--robot' : 'chatMessage--user'}`}>
      {sender === 'robot' && <img className="chatMessage__robotImg" src={robotImg} alt="robot" />}
      <span>{message}</span>
      {sender === 'user' && <img className="chatMessage__userImg" src={userImg} alt="user" />}
    </div>
  );
}
