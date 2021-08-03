import styled from 'styled-components/macro';
import {Link} from 'react-router-dom'

export const RegisterPageContainer = styled.div`
  height: calc(100vh - var(--navbar-height));
  background-color: var(--purple);
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RegisterH1 = styled.h1`
  font-size: 30px;
`;

export const RegisterH2 = styled.h2`
  
`;

export const RegisterLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: pink;
  width: 100%;
`;

export const RegisterLink = styled(Link)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 30px;
  margin-left: 50px;
  text-decoration: none;
  background: #fff;
`;

export const GoogleRegisterLink = styled(RegisterLink)`
  background-color: var(--google);
`;

export const RegisterLinkIcon = styled.img`
  width: 28px;
  height: 28px;
  background: #fff;
  margin: 1px;
`;

export const RegisterLinkText = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const RegisterLabel = styled.label`
  
`;

export const RegisterInput = styled.input`
  
`;