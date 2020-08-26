import React from 'react';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import iconImage from '../chat_icon.png'

const MapContainer = props => {
    const users = useSelector(state => state.msg)
    const pins = props.pins
    const icon = new L.Icon({
        iconUrl: iconImage,
        iconRetinaUrl: iconImage,
        iconAnchor: [5, 65],
        popupAnchor: [27, 0],
        iconSize: [65, 65],
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
                        <Link className="hero-title" to={{ pathname: `/pins/${pin.id}`, title: `${pin.title}` }} >{pin.title}</Link>
                        {users.filter(user => user.pinId === pin.id).map(inst => inst.users.map(el => <p key={el}>{el}</p>))}
                    </Popup>
                </Marker>
            ))}
        </Map>
    )
}

export default MapContainer;
