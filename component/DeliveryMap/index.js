import React, { Component } from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet';

export default function DeliveryMap() {
  const area = require('data/area.json');
  return (
    <Map
      zoom={11}
      center={[45.80, 15.9779]}
      style={{
        height: '50vh',
        width: 'auto',
      }}>
      <TileLayer
        attribution={'&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON data={area}/>
    </Map>
  )
}
