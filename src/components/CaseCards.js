import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesData, getTotalData } from "../redux/covidSlice";

function CaseCards() {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.covid.status);
  const countryStatus = useSelector((state) => state.covid.country.status);

  const items = useSelector((state) => state.covid.items); //just total datas

  const countryItems = useSelector((state) => state.covid.country.items);

  const countryName = useSelector((state) => state.covid.country.name);
  const lastUpdated = useSelector((state) => state.covid.lastUpdated);

  const filteredItems = countryItems.find(
    (item) => item.country.toLowerCase() === countryName.toLowerCase()
  ); //just country datas

  let activeItems = [];

  console.log("filtered items", filteredItems);
  console.log("country items", countryItems);

  console.log("country name", countryName);

  if (countryName === "" || countryName.toLowerCase() === "world") {
    activeItems = items;
  } else {
    activeItems = filteredItems;
  }

  useEffect(() => {
    if (status === "idle" && countryStatus === "idle") {
      dispatch(getTotalData());
      dispatch(getCountriesData());
    }
  }, [dispatch, status, countryStatus]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div>
      <div>
        {/* <h2>World Datas</h2>
      <code>{activeItems.totalCases} - {activeItems.totalDeaths} - {activeItems.totalRecovered}</code>
    */}

        {/* <h2>Special Country Data</h2>
      <code>{filteredItems.totalCases} - {filteredItems.totalDeaths} - {filteredItems.totalRecovered}</code>
      */}
        {/* <h2>Country Names Data</h2>
      <code>{countryItems.map((item)=> item.country)}</code> */}
      </div>

      <div className="cardsGrid">
        {/* infected - total cases */}
        <div className="card">
          <p className="titleInfo">Infected</p>
          <p className="countInfo">{activeItems.totalCases}</p>
          <p className="dateInfo">Last updated at: {lastUpdated}</p>
          <p className="footerInfo">Number of active cases of COVID-19</p>
          <p className="countryInfo">{countryName}</p>
        </div>

        {/* recovered */}
        <div className="card">
          <p className="titleInfo">Recovered</p>
          <p className="countInfo">{activeItems.totalRecovered}</p>
          <p className="dateInfo">Last updated at: {lastUpdated}</p>
          <p className="footerInfo">Number of recover cases of COVID-19</p>
          <p className="countryInfo">{countryName}</p>
        </div>

        {/* deaths */}
        <div className="card">
          <p className="titleInfo">Deaths</p>
          <p className="countInfo">{activeItems.totalDeaths}</p>
          <p className="dateInfo">Last updated at: {lastUpdated}</p>
          <p className="footerInfo">Number of death cases of COVID-19</p>
          <p className="countryInfo">{countryName}</p>
        </div>

        {/* active cases - positive cases */}
        <div className="card">
          <p className="titleInfo">Active</p>
          <p className="countInfo">{activeItems.totalCases}</p>
          <p className="dateInfo">Last updated at: {lastUpdated}</p>
          <p className="footerInfo">Number of active cases of COVID-19</p>
          <p className="countryInfo">{countryName}</p>
        </div>
      </div>
    </div>
  );
}

export default CaseCards;
