import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import * as parkDate from './data/Vantaan_kaupunkipyöräasemat.json'
import * as nousijanMaarat from './data/nousijamäärät.json'

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 60.2499102,
    longitude: 24.808892,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });

  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/artb/ck39pr1xc0eys1cprubvhmyxc"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {parkDate.features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
              <img src="/bicicle.svg" alt="Bike Park Icon" />
            </button>
          </Marker>
        ))}

        {nousijanMaarat.features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
              <img src="/bicicle.svg" alt="Bike Park Icon" />
            </button>
          </Marker>
        ))}

      </ReactMapGL>
    </div>
  )
}
