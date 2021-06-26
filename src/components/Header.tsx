import { FC } from "react";
import logoImg from '../assets/images/logo.svg';
import '../styles/header.scss';

export const Header: FC = ({
  children
}) => {
  return (
    <header>
      <div className="content">
        <img src={logoImg} alt="letmeask_logo" />
        {children}
      </div>
    </header>
  );
}