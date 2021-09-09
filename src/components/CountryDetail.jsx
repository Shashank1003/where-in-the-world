import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  /* margin: 5rem; */
  padding-bottom: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  width: 7.5rem;
  height: 2.5rem;
  margin: 5rem;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 300;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.elements};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  transition: all 500ms ease-in-out;

  p {
    margin-left: 0.8rem;
  }

  &:hover {
    color: ${(props) => props.theme.background};
    background-color: ${(props) => props.theme.text};
    font-weight: 800;
    transition: all 300ms ease-in-out;
  }

  @media (max-width: 768px) {
    margin: 3rem 2rem;
  }
`;

const AllData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.text};
  /* flex-wrap: wrap; */
  margin-left: 5rem;
  margin-right: 2rem;

  @media (max-width: 1020px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    margin-left: 2rem;
  }
`;

const Flag = styled.img`
  width: 32rem;
  height: 22rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 20rem;
    height: 15rem;
  }
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8rem;
  margin-top: 2rem;

  @media (max-width: 1150px) {
    margin-left: 4rem;
  }

  @media (max-width: 768px) {
    margin-left: 0rem;
    justify-content: flex-start;
  }
`;

const Country = styled.h3`
  font-weight: 800;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  justify-self: center;
`;

const DetailSubWrapper = styled.div`
  display: flex;

  @media (max-width: 1020px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const Details1 = styled.div`
  font-size: 0.9rem;
  margin-right: 8rem;
  width: 15rem;

  @media (max-width: 1360px) {
    margin-right: 4rem;
  }

  p {
    font-weight: 300;
    margin-bottom: 0.6rem;
  }

  b {
    font-weight: 600;
  }
`;

const Details2 = styled.div`
  font-size: 0.9rem;

  p {
    font-weight: 300;
    margin-bottom: 0.6rem;
  }

  b {
    font-weight: 600;
  }
`;

const BorderCountries = styled.div`
  display: flex;
  font-weight: 300;
  font-size: 0.9rem;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  min-height: 5rem;
  margin-top: 2rem;
  gap: 1rem;

  p {
    font-weight: 600;

    @media (max-width: 768px) {
      flex-basis: 100%;
    }
  }

  .no-borders {
    margin-left: 1rem;
    font-weight: 300;
  }
`;

const CountryButton = styled.button`
  min-width: 6rem;
  height: 2.1rem;
  background-color: ${(props) => props.theme.elements};
  border: none;
  color: ${(props) => props.theme.text};
  font-weight: 300;
  font-size: 0.9rem;
  transition: all 500ms ease-in-out;
  padding: 0.5rem;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    /* border: 1px solid ${(props) => props.theme.text}; */
    transform: scale(1.1);
    transition: all 220ms ease-in-out;
    color: ${(props) => props.theme.background};
    background-color: ${(props) => props.theme.text};
    font-weight: 800;
  }
`;

function CountryDetail(props) {
  const [currencies, setCurrencies] = useState("");
  const [languages, setLanguages] = useState("");
  const [borders, setBorders] = useState([]);
  const [detailedData, setDetailedData] = useState({});

  useEffect(() => {
    let url = new URL(
      String(props.country),
      "https://restcountries.eu/rest/v2/name/"
    );
    url.searchParams.append("fullText", true);

    axios
      .get(url)
      .then((response) => {
        setDetailedData(response.data[0]);
        currencyFormatter(response.data[0]);
        languageFormatter(response.data[0]);
        getBorders(response.data[0]);
      })
      .catch((E) => {
        console.log(E.response);
      });

    return () => {
      setDetailedData({});
      setCurrencies("");
      setLanguages("");
      setBorders([]);
    };
  }, [props.country]);

  const currencyFormatter = (data) => {
    for (let i = 0; i < data.currencies.length; i++) {
      setCurrencies((preVal) => {
        if (preVal.length > 0) {
          return preVal + ", " + data.currencies[i].code;
        } else {
          return data.currencies[i].code;
        }
      });
    }
  };

  const languageFormatter = (data) => {
    for (let i = 0; i < data.languages.length; i++) {
      setLanguages((preVal) => {
        if (preVal.length > 0) {
          return preVal + ", " + data.languages[i].name;
        } else {
          return data.languages[i].name;
        }
      });
    }
  };

  const getBorders = (data) => {
    for (let i = 0; i < data.borders.length; i++) {
      axios
        .get("https://restcountries.eu/rest/v2/alpha/" + data.borders[i])
        .then((response) => {
          setBorders((preVal) => {
            return [...preVal, response.data.name];
          });
        });
    }
  };

  return (
    <Container>
      <BackButton onClick={props.onBack}>
        <ion-icon name="arrow-back-outline"></ion-icon>
        <p>Back</p>
      </BackButton>

      <AllData>
        <Flag src={detailedData.flag} alt="flag" />

        <DetailWrapper>
          <Country>{detailedData.name}</Country>

          <DetailSubWrapper>
            <Details1>
              <p>
                <b>Native Name: </b>
                {detailedData.nativeName}
              </p>

              <p>
                <b>Population: </b>
                {new Intl.NumberFormat().format(detailedData.population)}
              </p>

              <p>
                <b>Region: </b>
                {detailedData.region}
              </p>

              <p>
                <b>Subregion: </b>
                {detailedData.subregion}
              </p>

              <p>
                <b>Capital: </b>
                {detailedData.capital}
              </p>
            </Details1>

            <Details2>
              <p>
                <b>Top Level Domain: </b>
                {detailedData.topLevelDomain}
              </p>

              <p>
                <b>Currencies: </b>
                {currencies}
              </p>

              <p>
                <b>Languages: </b>
                {languages}
              </p>
            </Details2>
          </DetailSubWrapper>

          <BorderCountries>
            <p>Border Countries: </p>
            {borders.length > 0 ? (
              borders.map((country, index) => {
                return (
                  <CountryButton
                    key={index}
                    onClick={() => {
                      props.onClick(country);
                    }}
                  >
                    {country}
                  </CountryButton>
                );
              })
            ) : (
              <p className="no-borders">
                This country does not share it's borders with any other country.
              </p>
            )}
          </BorderCountries>
        </DetailWrapper>
      </AllData>
    </Container>
  );
}

export default CountryDetail;
