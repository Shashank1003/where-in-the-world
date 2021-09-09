import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 16rem;
  background-color: ${(props) => props.theme.elements};
  color: ${(props) => props.theme.text};
  padding-bottom: 1.2rem;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  transition: all 500ms ease-in-out;
  min-height: 21rem;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.background};
    background-color: ${(props) => props.theme.text};
    transform: scale(1.1);
    transition: all 300ms ease-in-out;
  }
`;

const Flag = styled.img`
  width: 16rem;
  height: 10.5rem;
  border-radius: 5px 5px 0 0;
`;

const Country = styled.h2`
  font-size: 1.1rem;
  margin: 1rem;
  margin-left: 1.5rem;
  font-weight: 800;
`;

const Details = styled.div`
  font-size: 0.8rem;
  margin: 1rem;
  margin-left: 1.5rem;

  p {
    margin-bottom: 0.3rem;
    font-weight: 300;
  }

  b {
    font-weight: 600;
  }
`;

function CountryCard(props) {
  return (
    <Card
      onClick={() => {
        props.clickCard(props.name);
      }}
    >
      <Flag src={props.flag} alt="flag" />
      <Country>{props.name}</Country>
      <Details>
        <p>
          <b>Population:</b> {new Intl.NumberFormat().format(props.population)}
        </p>

        <p>
          <b>Region:</b> {props.region}
        </p>

        <p>
          <b>Capital:</b> {props.capital}
        </p>
      </Details>
    </Card>
  );
}

export default CountryCard;
