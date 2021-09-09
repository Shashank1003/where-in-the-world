import React from "react";
import styled from "styled-components";
import CountryCard from "./CountryCard";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 3rem;
  gap: 5rem;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    margin: 0;
    margin-top: 2rem;
    align-items: center;
    justify-content: center;
    gap: 3rem;
  }
`;

function CardsGrid(props) {
  return (
    <Wrapper>
      {props.data.map((country, index) => {
        return (
          <CountryCard
            key={index}
            flag={country.flag}
            name={country.name}
            population={country.population}
            region={country.region}
            capital={country.capital}
            clickCard={props.clickCard}
          />
        );
      })}
    </Wrapper>
  );
}

export default CardsGrid;
