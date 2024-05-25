import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCountryCovidData = createAsyncThunk(
  "covid/getCountryCovidData",
  async (country) => {
    const res = await axios(
      `https://api.covidtracking.com/v1/states/${country}/current.json`
    );
    return await res.data;
  }
);

export const covidSlice = createSlice({
  name: "covid",
  initialState: {
    country: "ca",
    items: [],
    status:"idle"
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountryCovidData.pending, (state, action) => {
        console.log("loading");
        state.status = "loading"
      })
      .addCase(getCountryCovidData.fulfilled, (state, action) => {
        console.log("success");
        state.items = action.payload
        state.status = "succeeded"
      })
      .addCase(getCountryCovidData.rejected, (state, action) => {
        console.log("failed");
        state.status = "failed"
      });
  },
});

export const itemsSelector = (state) => state.covid.items
export const statusSelector = (state) => state.covid.status


// export const {sampleReducer} = covidSlice.actions

export default covidSlice.reducer;
