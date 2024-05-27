import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCountry } from "../redux/covidSlice";

function CountryOption() {
  const dispatch = useDispatch();

  const countryStatus = useSelector((state) => state.covid.country.status);

  const countryItems = useSelector((state) => state.covid.country.items);

  const handleChange = (e) => {
    dispatch(setCountry(e.target.value));
    // console.log("country **** :" ,country)
  };

  if (countryStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (countryStatus === "failed") {
    return <div>Error</div>;
  }

  return (
    <div>
      <select onChange={(e) => handleChange(e)} name="countries">
        <option value="World">All World</option>

        {countryItems &&
          countryItems.map((country,index) => (
            <option key={index} value={country.country}>{country.country}</option>
          ))}
      </select>
    </div>
  );
}

export default CountryOption;
