import React from 'react';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { useSelector } from 'react-redux';

const MapContainer = props => {
    const users = useSelector(state => state.msg)
    const pins = props.pins
    const icon = new L.Icon({
        iconUrl: '../../public/images/yell_icon.png',
        iconRetinaUrl: '../../public/images/yell_icon.png',
        iconAnchor: [5, 55],
        popupAnchor: [10, -44],
        iconSize: [25, 55],
        shadowSize: [68, 95],
        shadowAnchor: [20, 92],
    })

    return (
        <Map center={[props.lat, props.lng]} zoom={15}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {pins.map(pin => (
                <Marker key={pin.id} icon={icon} position={pin.geoLoc.coordinates}>
                    <Popup>
                        <h1>{pin.title}</h1>
                        {users.filter(user => user.pinId === pin.id).map(inst => inst.users.map(el => <p key={el}>{el}</p>))}
                    </Popup>
                </Marker>
            ))}
        </Map>
    )
}

export default MapContainer;