export default function Card({ride}){
        const {id, origin_station_code, station_path, date, city, state, lowest} = ride;
        return <div className="ride">
        <div className="ride-img">
            <img className="my-image" src={"/location_image.png"} />
        </div>
        <div className="ride-info">
            <div className="ride-details">
                <p><span className="grey">Ride Id: </span>{id}</p>
                <p><span className="grey">Origin Station: </span>{origin_station_code}</p>
                <p><span className="grey">station_path: </span>[{station_path.map((path, index) => {
                    if (index === station_path.length - 1){
                        return path
                    }
                    return path + ", "
                })}]</p>
                <p><span className="grey">Date: </span>{date}</p>
                <p><span className="grey">Distance: </span>{lowest}</p>
            </div>
            <div className="c-s-name">
                <span>{city}</span>
                <span>{state}</span>
            </div>
        </div>
    </div>
}