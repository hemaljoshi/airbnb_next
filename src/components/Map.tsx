import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
import "mapbox-gl/dist/mapbox-gl.css";
import { SearchProps } from "@/pages/search";
import { MapPinIcon } from "@heroicons/react/24/solid";

interface Props {
  searchResults: SearchProps[];
}

const MapBox = ({ searchResults }: Props) => {
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));
  const center = getCenter(coordinates);
  const [domLoaded, setDomLoaded] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: center ? center.longitude : -100,
    latitude: center ? center.latitude : 40,
    zoom: 10,
  });
  const [selectedLocation, setSelectedLocation] = useState<SearchProps | null>(
    null
  );

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded && (
        <Map
          mapStyle="mapbox://styles/hemaljoshi/clotw3rw300up01qo9qxah7u5"
          mapboxAccessToken={process.env.mapbox_key}
          {...viewState}
          onMove={(e) => setViewState(e.viewState)}
          touchZoomRotate
        >
          {searchResults.map((result, index) => (
            <div key={index}>
              <Marker longitude={result.long} latitude={result.lat}>
                <p
                  onMouseEnter={() => setSelectedLocation(result)}
                  onMouseLeave={() => setSelectedLocation(null)}
                  aria-label="push-pin"
                >
                  <MapPinIcon className="h-8 w-8 animate-bounce cursor-pointer text-airbnb drop-shadow-sm text-red-400" />
                </p>
              </Marker>
              {selectedLocation?.long === result.long && (
                <Popup
                  onClose={() => setSelectedLocation(null)}
                  longitude={result.long}
                  latitude={result.lat}
                >
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">{result.title}</p>
                    <p className="text-xs">{result.price}</p>
                  </div>
                </Popup>
              )}
            </div>
          ))}
        </Map>
      )}
    </>
  );
};

export default MapBox;
