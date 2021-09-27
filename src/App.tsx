import "./styles.css";
//import { LatLng } from "leaflet";
import React from "react";
import { Map, TileLayer, Popup, Marker } from "react-leaflet";
import Search from "react-leaflet-search";

class SimpleExample extends React.Component<any, any> {
  provider: any;
  state: Record<string, any>;
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
      //search: new LatLng(4.623946395077813, -74.17036560150284),
      maxZoom: 17,
      maxBounds: [
        [-90, -180],
        [90, 180]
      ],
      bounds: [
        {
          lat: 4.612182989435825,
          lng:  -74.16581657501223
        }   
      ]
    };
  }

  customPopup(SearchInfo: any) {
    return (
      <Popup>
        <div>
          <p>I am a custom popUp</p>
          <p>
            latitude and longitude from search component:{" "}
            {SearchInfo.latLng.toString().replace(",", " , ")}
          </p>
          <p>Info from search component: {SearchInfo.info}</p>
          <p>
            {SearchInfo.raw &&
              SearchInfo.raw.place_id &&
              JSON.stringify(SearchInfo.raw.place_id)}
          </p>
        </div>
      </Popup>
    );
  }

  render() {
    return (
      <Map
        className="simpleMap"
        scrollWheelZoom={true}
        bounds={this.state.bounds}
        maxZoom={this.state.maxZoom}
        maxBounds={this.state.maxBounds}
      >
        <TileLayer
          noWrap={true}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Search
          position="topleft"
          inputPlaceholder="Custom placeholder"
          search={this.state.search}
          showMarker={false}
          zoom={17}
          closeResultsOnClick={true}
          openSearchOnLoad={false}
          
          providerOptions={{
            
            region: "co"
          }}
          >
          {(info) => (
            <Marker position={info?.latLng}>{this.customPopup(info)}</Marker>
          )}
        </Search>
      </Map>
    );
  }
}

function App() {
  return (
    <div className="App">
      <SimpleExample />
    </div>
  );
}

export default App;
