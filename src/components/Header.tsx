import { FC } from "react";
import { ThemeControl } from "./ThemeControl";
import { RoomCode } from "./RoomCode";
import { Logo } from "./Logo";
import '../styles/header.scss';
import { useParams } from "react-router-dom";

type RoomParams = {
  id: string;
}

export const Header: FC = ({
  children
}) => {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  return (
    <header>
      <div className="content">
        <Logo />
        <div className="room-controls">
          <RoomCode code={roomId} />
          <ThemeControl />
          {children}
        </div>
      </div>
    </header>
  );
}