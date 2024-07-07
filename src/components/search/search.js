import "./search.css";
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

function SearchBar({ onSearchChange }) {
    const [search, setSearch] = useState("");
    const [searchedCity, setSearchedCity] = useState(null);
    const [inputWidth, setInputWidth] = useState("500px"); // Initial width of the input

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);

        if (searchData) {
            const city = searchData.label.split(',')[0]; // Extract city name from label
            setSearchedCity(city);
        } else {
            setSearchedCity(null);
        }
    };

    const handleInputFocus = () => {
        setInputWidth("500px"); // Adjust width on focus
    };

    const handleInputBlur = () => {
        setInputWidth("300px"); // Reset width on blur
    };

    const loadOptions = (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
            geoApiOptions
        )
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => ({
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    })),
                };
            });
    };

    return (
        <nav className="navBar">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img style={{ width: "5em" }} src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" alt="" />
                <p style={{ margin: "0", padding: "0", fontWeight: 700 }} >Weather</p>
            </div>
            <h2>{searchedCity}</h2>
            <AsyncPaginate
                placeholder="Search for city"
                debounceTimeout={600}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadOptions}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                styles={{ width: inputWidth }} // Dynamically set width based on inputWidth state
            />
        </nav>
    );
}

export default SearchBar;
