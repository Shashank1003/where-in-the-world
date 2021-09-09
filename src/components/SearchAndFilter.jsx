import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.text};
  margin-top: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-top: 1.5rem;
  }
`;

const SearchArea = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SearchBarWrapper = styled.div`
  margin-left: 5rem;
  width: 25rem;
  display: flex;
  padding: 1rem;
  background-color: ${(props) => props.theme.elements};
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  transition: all 500ms ease-in-out;
  transition: all 500ms ease-in-out;

  @media (max-width: 768px) {
    width: 80vw;
    margin-left: 0;
    padding: 0.8rem;
  }

  ion-icon {
    font-size: 1.2rem;
    margin-left: 1rem;
  }

  &:hover {
    transition: all 300ms ease-in-out;
    background-color: ${(props) => props.theme.text};
    color: ${(props) => props.theme.background};
    transition: all 300ms ease-in-out;

    input {
      color: ${(props) => props.theme.background};
      transition: all 500ms ease-in-out;

      &::placeholder {
        color: ${(props) => props.theme.background};
        font-weight: 800;
      }
    }
  }
`;

const SearchBar = styled.input`
  background-color: transparent;
  width: 18rem;
  margin-left: 1.5rem;
  border: none;
  color: ${(props) => props.theme.text};
  font-weight: 800;
  cursor: pointer;
  transition: all 500ms ease-in-out;

  @media (max-width: 768px) {
    width: 60vw;
    margin-left: 1rem;
  }

  &:focus {
    border: none;
    outline: none;
  }

  &::placeholder {
    color: ${(props) => props.theme.input};
    outline: none;
    border: none;
    font-weight: 300;
    font-size: 0.8rem;
    transition: all 300ms ease-in-out;
  }
`;

const SearchResults = styled.div`
  max-height: 12.8rem;
  overflow: scroll;
  overflow-x: hidden;
  width: 25rem;
  margin-left: 5rem;
  background-color: ${(props) => props.theme.elements};
  color: ${(props) => props.theme.text};
  transition: all 500ms ease-in-out;
  border-radius: 5px;
  position: absolute;
  top: 4rem;
  text-align: center;
  font-weight: 600;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
  transition: all 500ms ease-in-out;

  &::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
  }

  @media (max-width: 768px) {
    width: 80vw;
    margin-left: 0;
    z-index: 3;
    top: 3.3rem;
  }

  p {
    margin: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 5px;
    padding: 0.3rem;
    transition: all 500ms ease-in-out;

    &:hover {
      background-color: ${(props) => props.theme.text};
      color: ${(props) => props.theme.background};
      transition: all 300ms ease-in-out;
    }

    @media (max-width: 768px) {
      font-size: 0.8rem;
      padding: 0.2rem;
    }
  }
`;

const FilterByRegionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const FilterByRegion = styled.div`
  display: flex;
  margin-right: 5rem;
  justify-content: space-between;
  align-items: center;
  width: 12rem;
  font-weight: 300;
  font-size: 0.9rem;
  background-color: ${(props) => props.theme.elements};
  padding: 1rem 1.5rem;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  font-weight: 600;
  cursor: pointer;
  transition: all 500ms ease-in-out;

  @media (max-width: 768px) {
    margin-top: 2rem;
    margin-right: 0;
    width: 12rem;
    font-size: 0.8rem;
    padding: 0.8rem 1.2rem;
  }

  &:hover {
    color: ${(props) => props.theme.background};
    background-color: ${(props) => props.theme.text};
    font-weight: 600;
    transition: all 300ms ease-in-out;
    font-weight: 800;
  }
`;

const RegionsWrapper = styled.div`
  background-color: ${(props) => props.theme.elements};
  width: 12rem;
  position: absolute;
  top: 4rem;
  padding: 1rem 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  transition: all 500ms ease-in-out;
  z-index: 2;
  box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    top: 5rem;
    padding: 0.8rem;
    font-size: 0.8rem;
  }

  p {
    margin-bottom: 0.5rem;
    padding: 0.2rem;

    &:hover {
      background-color: ${(props) => props.theme.text};
      color: ${(props) => props.theme.background};
      border-radius: 5px;
      font-weight: 800;
      transition: all 300ms ease-in-out;
    }
  }
`;

function SearchAndFilter(props) {
  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [expand, setExpand] = useState(false);
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const searchHandler = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    let url = new URL(String(value), "https://restcountries.eu/rest/v2/name/");

    if (props.closeSearch) {
      setSearchData([]);
      setSearchValue("");
    }

    if (value === "") {
      setSearchData([]);
    } else {
      axios
        .get(url)
        .then((response) => {
          setSearchData(response.data);
        })
        .catch((e) => {
          setSearchData([{ name: "No country found" }]);
        });
    }
  };

  const openClose = () => {
    setExpand(!expand);
  };

  return (
    <Wrapper>
      <SearchArea>
        <SearchBarWrapper>
          <ion-icon name="search-outline"></ion-icon>
          <SearchBar
            type="text"
            onChange={searchHandler}
            placeholder="Search for a country..."
            value={searchValue}
          />
        </SearchBarWrapper>

        <SearchResults>
          {searchData.map((name, index) => {
            return (
              <p
                key={index}
                onClick={() => {
                  props.onSearch(name.name);
                }}
              >
                {name.name}
              </p>
            );
          })}
        </SearchResults>
      </SearchArea>

      <FilterByRegionWrapper>
        <FilterByRegion onClick={openClose}>
          <p>Filter by Region</p>
          {!expand ? (
            <p>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </p>
          ) : (
            <p>
              {" "}
              <ion-icon name="chevron-up-outline"></ion-icon>
            </p>
          )}
        </FilterByRegion>

        {expand ? (
          <RegionsWrapper>
            {regions.map((region, index) => {
              return (
                <p key={index} onClick={() => props.onRegionClick(region)}>
                  {region}
                </p>
              );
            })}
          </RegionsWrapper>
        ) : (
          ""
        )}
      </FilterByRegionWrapper>
    </Wrapper>
  );
}

export default SearchAndFilter;
