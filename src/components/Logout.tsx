import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./Button";

export function Logout() {
  const { user, signOut } = useAuth();
  const history = useHistory();
  const handleSignOut = useCallback(async () => {
    await signOut();
    history.push('/');
  }, [history, signOut]);

  if (!user) {
    return null;
  }
  
  return (
    <Button
      isOutlined
      onClick={handleSignOut}
    >
      Logout
    </Button>
  );
}