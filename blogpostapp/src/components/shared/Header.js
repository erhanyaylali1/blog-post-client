import React from 'react';
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import { Link, useNavigate} from "react-router-dom";
import { NAME } from '../../config/config';
import { isAuth, signOut } from '../../utils/browserOperations';
import { logoutFromServer } from '../../utils/apiCall';
import UserRoles from '../../config/UserRoles';

const Header = () => {
  const navigate = useNavigate();
  const user = isAuth();
  const isLogged = user ? true : false;
  const isAdmin = isLogged && user.role === UserRoles.Admin;

  const logout = () => {
    signOut(functionAfterLogout);
  };

  const functionAfterLogout = () => {
    logoutFromServer();
    navigate('/login');
  };

  const navigateUser = () => {
    if (isLogged) {
      navigate(`/user/${user._id}`);
    }
  };

  const navigateToAdmin = () => {
    if (isAdmin) {
      navigate('/admin');
    }
  };

  const navigateToLogin = () => navigate('/login');
  const navigateToRegister = () => navigate('/register');
  const navItemStyle = { cursor: 'pointer' };

  return (
    <div>
      <Navbar color="warning" expand="sm" light>
        <Link to="/">
          <div className="font-weight-bold" style={{ cursor: 'pointer' }}>
            {NAME}
          </div>
        </Link>
        <Nav className="ml-auto">
          {isLogged ? (
            <>
              <NavItem style={navItemStyle} onClick={navigateUser}>
                <NavLink>Profile</NavLink>
              </NavItem>
              {isAdmin ? (
                <NavItem style={navItemStyle} onClick={navigateToAdmin}>
                  <NavLink>Admin Dashboard</NavLink>
                </NavItem>
              ) : null}
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
