import { useState } from 'react';
import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
}

export function RoomCode({ code }: RoomCodeProps) {
  const [copied, setCopied] = useState(false);

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div style={{position: 'relative'}}>
      <button className="room-code" onClick={copyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="copiar_codigo" />
        </div>
        {copied ? <span>Código da sala copiado!</span> : <span>Sala #{code}</span>}
      </button>
    </div>
  )
}