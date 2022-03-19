import { useEffect } from "react"
import { useGlobalContext } from "../context"

export default function Navbar(){
    const { user, setStationCode, setUser } = useGlobalContext()
    useEffect(async() => {
        // setting Initial User
            const userResponse = await fetch("https://assessment.api.vweb.app/user")
            const userData = await userResponse.json()
            setUser(userData)
            setStationCode(user.station_code)
    }, [])
    return <>
        <nav className="navbar">
            <div className="logo">
                <h1 className="edvora-logo">Edvora</h1>
            </div>
            <div className="user-info">
                <span className="user-name vertical-align">{user.name}</span>
                <img className="user-img vertical-align" width={"20px"} height={"20px"} src={user.url} />
            </div>
        </nav>
    </>
}