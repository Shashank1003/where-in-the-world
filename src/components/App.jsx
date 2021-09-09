import styled, { ThemeProvider } from "styled-components";
import Header from "./Header";
import { darkTheme, lightTheme } from "../themes";
import { useState, useEffect } from "react";
import CardsGrid from "./CardsGrid";
import axios from "axios";
import CountryDetail from "./CountryDetail";
import SearchAndFilter from "./SearchAndFilter";

const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
  transition: all 500ms ease-in-out;
  /* display: none; */
`;

function App() {
  const [theme, setTheme] = useState("dark");
  const [countryData, setCountryData] = useState([]);
  const [country, setCountry] = useState("");
  const [detailsClicked, setDetailsClicked] = useState(false);
  const [closeSearch, setCloseSearch] = useState(false);
  const [regionSearch, setRegionSearch] = useState(false);
  const [region, setRegion] = useState("");

  const themeToggle = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  const cardClickHandler = (Country) => {
    setCountry(Country);
    setDetailsClicked(true);
    setCloseSearch(true);
  };

  const backHandler = () => {
    setDetailsClicked(false);
    setCloseSearch(false);
  };

  const regionSearchHandler = (regionClicked) => {
    if (regionClicked === region) {
      setRegion("");
      setRegionSearch(false);
    } else {
      setRegion(regionClicked);
      setRegionSearch(true);
    }
  };

  useEffect(() => {
    if (!regionSearch) {
      axios
        .get(
          "https://restcountries.eu/rest/v2/all?fields=flag;name;population;region;capital"
        )
        .then((response) => {
          setCountryData(response.data);
        });
    } else {
      let url = new URL(
        String(region),
        "https://restcountries.eu/rest/v2/region/"
      );

      axios.get(url).then((response) => {
        setCountryData(response.data);
      });
    }
  }, [region, regionSearch]);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <Container>
        <Header theme={theme} themeToggle={themeToggle} onClick={backHandler} />

        {!detailsClicked ? (
          <div>
            <SearchAndFilter
              onSearch={cardClickHandler}
              closeSearch={closeSearch}
              onRegionClick={regionSearchHandler}
            />
            <CardsGrid data={countryData} clickCard={cardClickHandler} />
          </div>
        ) : (
          <CountryDetail
            country={country}
            onClick={cardClickHandler}
            onBack={backHandler}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
