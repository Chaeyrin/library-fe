import { FC, ReactNode } from "react";
import { Button } from "./ui/button";

interface GoogleButtonProps {
  children: ReactNode;
}

const GoogleButton: FC<GoogleButtonProps> = ({ children }) => {
  const loginWithGoogle = () => console.log("click login with google");

  return (
    <Button onClick={loginWithGoogle} className="w-full mb-2">
      {children}
    </Button>
  );
};

export default GoogleButton;
