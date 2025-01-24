
import '../index.css'
export default function Search( { selectCountry, setSelectCountry, filteredCountries, setCurrentCountry} ){


    function searchCountry(e){
        setSelectCountry(e.target.value)
        if(e.target.value.length > 0){
            setCurrentCountry(null)
        }
    }
    const manyMatches = filteredCountries.length > 3 && filteredCountries.length >= 1 ? <p className="Error-too-many">Too many matches, specify another filter</p> : ""

    return (
        <div className="container">
            <form action="">
                <label htmlFor="country-search"> Search Country </label>
                <input onChange={searchCountry} value={selectCountry  ? selectCountry : selectCountry} type="text" id="country-search" />
                {manyMatches}
            </form>

        </div>
    )
}