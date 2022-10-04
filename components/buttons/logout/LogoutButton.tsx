import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-tailwind/react';

export interface ILogoutButton {
  text?: string;
}

const LogoutButton: React.FC<ILogoutButton> = ({ text = 'Logout' }) => {
  const { logout } = useAuth0();
  return (
    <Button
      className="capitalize "
      variant="outlined"
      size="sm"
      color="red"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      {text}
    </Button>
  );
};

export default LogoutButton;
