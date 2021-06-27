import { useTheme } from "../hooks/useTheme";
import { Button } from "./Button";

export function ThemeControl() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
      isOutlined
      onClick={toggleTheme}
      style={{padding: '0 16px'}}
    >
      {theme === 'light' ? (
        <span>🌜</span>
      ) : (
        <span>🌞</span>
      )}
    </Button>
  );
}