import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapComponent = ({ evidence, setMap }) => {
  const [mapCenter, setMapCenter] = useState(
    evidence
      ? [evidence[0].geometry.longitude, evidence[0].geometry.latitude]
      : [52, 21]
  )
  const mapRef = useRef(null)

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
    const map = new mapboxgl.Map({
      container: 'map-container', // replace with your HTML container ID
      style: 'mapbox://styles/mapbox/streets-v12',
      center: mapCenter,
      zoom: 10,
    })

    map.addControl(new mapboxgl.NavigationControl())

    evidence.forEach((evidence) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([evidence.geometry.longitude, evidence.geometry.latitude])
        .addTo(map)
    })

    mapRef.current = map

    setMap(map)

    return () => {
      map.remove()
    }
  }, [evidence, setMap])

  return (
    <div id="map-container" style={{ width: '100%', height: '400px' }}></div>
  )
}

export default MapComponent
