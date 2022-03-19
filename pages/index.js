import styles from '../styles/Home.module.css'
import {BsFilterLeft} from "react-icons/bs"
import Card from '../components/Card'
import { useGlobalContext } from '../context'
import { useEffect, useState } from 'react'
export default function Home({myRides}) {
  const {setGlobalRides, globalRides, stateCity, fetchNearestRide, setRides, rides, active, stationCode, fetchUpcomingRides, fetchPastRides} = useGlobalContext()
  
  const [stateValue, setStateValue] = useState("State")
  const [cityValue, setCityValue] = useState("City")

  useEffect(() => {
    setGlobalRides(myRides);
    setRides(globalRides)
  }, [])

  useEffect(() => {
    stateCity.cities = []
    stateCity.states = []
    if (stateValue !== "state"){
      let tempRides = globalRides.filter((ride) => {
        if (ride.state === stateValue){
          return ride;
        }
      })
      
      for (const ride of tempRides){
        stateCity.cities.push(ride.city);
      }
    }
    for (const ride of globalRides){
      stateCity.states.push(ride.state);
    }
  }, [stateValue])

  useEffect(async() => {
    const ridesData = fetchNearestRide(globalRides)
    setRides(ridesData)
    let ridesToSet = await fetchNearestRide(rides);
    setRides(ridesToSet);
  }, [stationCode])

  function fetchStateRides(value){
    setStateValue(value)
    let tempRides = rides.filter((ride) => {
      if (ride.state === value){
        return ride
      }
    })
    for (const ride of tempRides){
      stateCity.cities.push(ride.city)
    }
    setRides(tempRides)
  }

  function fetchCityRides(value){
    setCityValue(value)
    let tempRides = globalRides.filter((ride) => ride.city === value)
    setRides(tempRides)
  }
  return <>
    <div className={styles.home}>
      <div className={styles.filters}>
        <div className={styles.filterOne}>
          <div className={styles.filterName}>
            <span className={styles.verticalAlign} onClick={() => setRides(() => fetchNearestRide(globalRides))} >Nearest Ride</span>
            <div className={`${active.nearest?styles.active:"none"}`}></div>
          </div>
          <div className={styles.filterName}>
            <span onClick={() => setRides(() => fetchUpcomingRides(globalRides))} >Upcoming Rides {`${active.upcoming?`(${rides.length})`:""}`}</span>
            <div className={`${active.upcoming?styles.active:"none"}`}></div>
          </div>
          <div className={styles.filterName}>
            <span onClick={() => setRides(() => fetchPastRides(globalRides))}>Past Rides {`${active.past?`(${rides.length})`:""}`}</span>
            <div className={`${active.past?styles.active:"none"}`}></div>
          </div>
        </div>

        <div className={styles.filterTwo}>
          <div className={styles.dropdown}>
            <BsFilterLeft onClick={(e) => e.currentTarget.nextElementSibling.nextElementSibling.classList.add("displayBlock")} className={`${styles.filterIcon} ${styles.verticalAlign}`} /><span className={`${styles.dropspn} ${styles.verticalAlign}`} onClick={(e) => e.currentTarget.nextElementSibling.classList.add("displayBlock")} >Filters</span>
              <div className={styles.dropdownContent}>
                <select className={styles.select} onChange={(e) => fetchStateRides(e.currentTarget.value)} value={stateValue} name="state" id="state">
                  {stateCity.states.map((state, index) => <option onClick={(e) => setStateValue(e.currentTarget.value)} key={index}>{state}</option>)}
                </select>
                <select className={styles.select} onChange={(e) => fetchCityRides(e.currentTarget.value)} value={cityValue} name="city" id="city" >
                  {stateCity.cities.map((city, index) => <option onClick={(e) => setCityValue(e.currentTarget.value)} key={index} >{city}</option>)}
                </select>
              </div>
          </div>
        </div>
      </div>
      <div className={styles.rides}>
         {rides.map((ride, index) => {
           return <Card key={index} ride={ride}></Card>
          })}
      </div>
    </div>
  </>
}
// https://assessment.api.vweb.app/rides
export async function getStaticProps(){
  const response = await fetch("https://assessment.api.vweb.app/rides");
  const data = await response.json();
  return {
    props:{
      myRides:data
    }
  }
}