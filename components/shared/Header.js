import React from 'react';
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NAME } from '../../config/config';
import { isAuth, signOut } from '../../utils/browserOperations';
import { logoutFromServer } from '../../utils/apiCall';
import UserRoles from '../../config/UserRoles';

const Header = () => {
  const router = useRouter();
  const user = isAuth();
  const isLogged = user ? true : false;

  const logout = () => {
    signOut(functionAfterLogout);
  };

  const functionAfterLogout = () => {
    logoutFromServer();
    router.push('/login');
  };

  const navigateUser = () => {
    if (user.role == UserRoles.User) router.push('/user');
    else router.push('/admin');
  };

  const navigateToLogin = () => router.push('/login');
  const navigateToRegister = () => router.push('/register');
  const navItemStyle = { cursor: 'pointer' };

  return (
    <div>
      <Navbar color="warning" expand="sm" light>
        <Link href="/">
          <div className="font-weight-bold" style={{ cursor: 'pointer' }}>
            {NAME}
          </div>
        </Link>
        <Nav className="ml-auto">
          {isLogged ? (
            <>
              <NavItem style={navItemStyle} onClick={navigateUser}>
                <NavLink>Dashboard</NavLink>
              </NavItem>
              <NavItem style={navItemStyle} onClick={logout}>
                <NavLink>Logout</NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem style={navItemStyle} onClick={navigateToLogin}>
                <NavLink>Login</NavLink>
              </NavItem>
              <NavItem style={navItemStyle} onClick={navigateToRegister}>
                <NavLink>Register</NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
