import { AppBar, Toolbar } from '@mui/material';
import Logo from './Shared/Logo';
import { userAuth } from '../context/AuthContext';
import NavigationLink from './Shared/NavigationLink';

const Header = () => {
  const auth = userAuth();
  return (
    <AppBar 
      sx={{
        bgcolor: 'transparent', 
        position: 'static', 
        boxShadow: 'none'
      }}
    >
      <Toolbar sx={{ display: 'flex' }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>  
              <NavigationLink bg='#51538f' to='/' text='Home' textColor='white' />
              <NavigationLink bg='#51538f' to='/chat' text='Go To Chat' textColor='white' />
              <NavigationLink bg='#51538f' to='/' text='Logout' textColor='white' onClick={auth.logout} />
            </>
          ) : (
            <>
              <NavigationLink bg='#51538f' to='/' text='Home' textColor='white' /> 
              <NavigationLink bg='#51538f' to='/login' text='Login' textColor='white' />
              <NavigationLink bg='#51538f' to='/signup' text='Signup' textColor='white' />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
