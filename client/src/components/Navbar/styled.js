import styled from 'styled-components/macro';
import {Link} from 'react-router-dom'

export const Nav = styled.nav`
  height: var(--navbar-height);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  padding: 0 20px;
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: var(--navbar-height);
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
  height: var(--navbar-height);
  background-color: var(--background);
`;

export const NavLogo = styled(Link)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-left: 24px;
  text-decoration: none;
`;

export const NavBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavBtnLink = styled(Link)`
  white-space: nowrap;
  padding: 10px 20px;
  color: #010606;
  cursor: pointer;
  text-decoration: none;
  font-size: 22px;
  outline: none;
  border: none;
`;

