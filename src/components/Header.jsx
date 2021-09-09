import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  background-color: ${(props) => props.theme.elements};
  color: ${(props) => props.theme.text};
  display: flex;
  height: 5rem;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  transition: all 500ms ease-in-out;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  margin-left: 3rem;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-left: 1rem;
    font-size: 1rem;
  }
`;

const ThemeButton = styled.button`
  height: 3rem;
  width: 8.2rem;
  border: none;
  margin-right: 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem;
  background-color: transparent;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  transition: all 250ms ease-in-out;

  &:hover {
    border: 2px solid;
    border-color: ${(props) => props.theme.text};
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    margin-right: 1rem;
    width: 7rem;
    font-size: 0.9rem;


  }
`;

const ThemeText = styled.p`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

function Header(props) {
  return (
    <HeaderWrapper>
      <Heading onClick={props.onClick}>Where in the world?</Heading>
      <ThemeButton onClick={props.themeToggle}>
        {props.theme === "dark" ? (
          <ThemeText>
            <ion-icon name="sunny"></ion-icon> <span>Light Mode</span>
          </ThemeText>
        ) : (
          <ThemeText>
            <ion-icon name="moon"></ion-icon> <span>Dark Mode</span>
          </ThemeText>
        )}
      </ThemeButton>
    </HeaderWrapper>
  );
}

export default Header;
