import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountryCovidData, itemsSelector, statusSelector } from '../redux/covidSlice'

function CaseCards() {

    const dispatch = useDispatch()
    
    const status = useSelector(statusSelector)
    const data = useSelector(itemsSelector)


  


    useEffect(()=> {
        if(status ==="idle") {
            dispatch(getCountryCovidData("ak"))
        }
    },[dispatch,status])


    if(status ==="loading") {
        return <div>Loading...</div>
    }

    if(status ==="error") {
        return <div>Error</div>
    }


  return (
    <div>
        <code>
        
        { status==="succeeded" && JSON.stringify(data)}
        </code>
    </div>
  )
}

export default CaseCards