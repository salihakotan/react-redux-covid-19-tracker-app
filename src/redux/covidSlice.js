import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getTotalData = createAsyncThunk(
  "covid/getTotalData",
  async () => {
    const res = await axios(`https://api.collectapi.com/corona/totalData`, {
      headers: {
        "content-type": "application/json",
        authorization: "apikey 7teILa7hdGTvlgUwSKVBW8:3aF2sMSFlGiIUMsLjLDR3o",
      },
    });
    return await res.data.result;
  }
);



export const getCountriesData = createAsyncThunk(
  "covid/getCountriesData",
  async () => {
    const res = await axios(`https://api.collectapi.com/corona/countriesData`, {
      headers: {
        "content-type": "application/json",
        authorization: "apikey 7teILa7hdGTvlgUwSKVBW8:3aF2sMSFlGiIUMsLjLDR3o",
      },
    });
    return await res.data.result;
  }
);


export const covidSlice = createSlice({
  name: "covid",
  initialState: {
    status: "idle",
    lastUpdated:"07/21/2021",
    items:[], //total data results (deaths,cases and recovered)
    country: {
      name:"World",
      items:[],
      status:"idle",

    }

  },
  reducers: {
    setCountry: (state, action) => {
      state.country.name = action.payload;
      console.log("secountry reducer: country name: ",state.country.name)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalData.pending, (state, action) => {
        console.log("loading");
        state.status = "loading";
      })
      .addCase(getTotalData.fulfilled, (state, action) => {
        console.log("success");
        state.status = "succeeded";
        state.items = action.payload
        console.log(state.items)
      
      })
      .addCase(getTotalData.rejected, (state, action) => {
        console.log("failed",action.error.message);
        state.status = "failed";
      })

      ////////////!SECTION //////////////////////////////////////////////////////////////////////////////
      .addCase(getCountriesData.pending, (state, action) => {
        console.log("loading");
        state.country.status = "loading";
      })
      .addCase(getCountriesData.fulfilled, (state, action) => {
        console.log("success");
        state.country.status = "succeeded";
       
          state.country.items = action.payload
          console.log(state.country.items)

      })
      .addCase(getCountriesData.rejected, (state, action) => {
        console.log("failed",action.error.message);
        state.country.status = "failed";
      });
  },
});


export const {setCountry} = covidSlice.actions



export default covidSlice.reducer;
