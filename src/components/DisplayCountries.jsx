import SingleCountry from "./SingleCountry"

export default function displayCountries( { filteredCountries, selectCountry, currentCountry, setCurrentCountry } ){


    return (
        <>
            <SingleCountry selectCountry={selectCountry}
            filteredCountries={filteredCountries}
            currentCountry={currentCountry}
            setCurrentCountry={setCurrentCountry}
            />
        </>
    )
}