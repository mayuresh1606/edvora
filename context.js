import React, { useContext, useState, useEffect } from "react";
const AppContext = React.createContext()

export const AppProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [stationCode, setStationCode] = useState(0);
    const [rides, setRides] = useState([])
    const [active, setActive] = useState({})
    const [globalRides, setGlobalRides] = useState([])
    const [stateCity, setStateCity] = useState({cities:[], states:[]});
    
    // useEffect to set rides and user
    useEffect(async function(){
        const ridesData = fetchNearestRide(globalRides)
        setCitiesAndStates(globalRides)
        setRides(ridesData);
    }, [globalRides])
    
    // useEffect to set new stationCode if user changes
    useEffect(() => {
        setStationCode(user.station_code)
        console.log(user, "user");
        setRides(globalRides)
        setCitiesAndStates(globalRides)
    }, [user])

    const setCitiesAndStates = (rides) => {
        setStateCity(() =>{
            if (stateCity.states.length <= 0 || stateCity.cities.length <= 0 ){
                for (const ride of rides){
                    stateCity.states.push(ride.state)
                    stateCity.cities.push(ride.city)
                }
            }
            console.log(stateCity);
            return stateCity;
        })
    }
    // fetching nearest rides function
    const fetchNearestRide = (myRides) => {
        let tempRides = [];
        tempRides = myRides.map((ride) => {
            let difference = []
            ride.station_path = ride.station_path.map((station_code) => {
                if (stationCode - station_code < 0){
                    difference.push(Number(String(stationCode - station_code).split("-")[1]))
                }
                else{
                    difference.push(stationCode - station_code)
                }
                ride.difference = difference;
                return station_code;
            })
            let largest = 0
            for(const num of ride.difference){
                if (num > largest){
                    largest = num;
                }
            }
            let lowest = largest;
            ride.difference.map((num) => {
                if (num < lowest){
                    lowest = num;
                }
            })
            ride.lowest = lowest;
            return ride;
        })
        setActive({
            nearest:true,
            upcoming:false,
            past:false
        })
        // after having the lowest distance sort our list based on the lowest distance we got
        tempRides = tempRides.sort(function (a, b){
            return a.lowest - b.lowest
        })
        return tempRides;
    }

    // fetching upcoming rides function
    const fetchUpcomingRides = (rides) => {
        let tempRides = []
        tempRides = rides.filter((ride) => {
            let newDate = new Date(ride.date)
            newDate = newDate.toString()
            newDate = Date.parse(newDate)
            let nowDate = Date.now();
            if (nowDate < newDate){
                return ride;
            }
        })
        setActive({
            nearest:false,
            upcoming:true,
            past:false
        })
        return tempRides
    }

    // fetching past rides function
    const fetchPastRides = (rides) => {
        let tempRides = []
        tempRides = rides.filter((ride) => {
            let newDate = new Date(ride.date)
            newDate = newDate.toString()
            newDate = Date.parse(newDate)
            let nowDate = Date.now();
            if (nowDate > newDate){
                return ride;
            }
        })
        setActive({
            nearest:false,
            upcoming:false,
            past:true
        })
        return tempRides
    }

    return <AppContext.Provider value={{user,setCitiesAndStates, setGlobalRides, setStationCode, setRides, rides, stationCode, fetchNearestRide, fetchUpcomingRides, fetchPastRides, active, globalRides, stateCity, setUser}}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}