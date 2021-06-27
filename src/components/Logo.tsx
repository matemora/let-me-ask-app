import { useTheme } from "../hooks/useTheme";
import logoImgSvg from '../assets/images/logo.svg';
import logoImgSvgDark from '../assets/images/logo-dark.svg';

export function Logo() {
  const {theme} = useTheme();
  return (
    <img src={theme === 'light' ? logoImgSvg : logoImgSvgDark} alt="logo_letmeask" />
  );
}