import React from 'react';
import {
  Text,
  View
} from 'react-native';

import MapView from 'react-native-maps';
import supercluster from './components/supercluster';

import Marker from './components/marker';

const Marseille = {
  latitude: 43.2931047,
  longitude: 5.38509780000004,
  latitudeDelta: 0.0922/1.2,
  longitudeDelta: 0.0421/1.2,
}


export default class Map extends React.Component {

  state = {
    mapLock: false,
    region: Marseille,
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const markers  = {
      places: nextProps.mapPoints
    }
    if (markers && Object.keys(markers)) {
      const clusters = {};
      this.setState({
        mapLock: true
      });
      Object.keys(markers).forEach(categoryKey => {
        // Recalculate cluster trees
        const cluster = supercluster({
          radius: 60,
          maxZoom: 16,
        });

        cluster.load(markers[categoryKey]);

        clusters[categoryKey] = cluster;
      });
      this.setState({
        clusters,
        mapLock: false
      });
      // console.log(clusters)
    }

  }

  createMarkersForRegion_Places() {
    const padding = 0.25;

    if (this.state.clusters && this.state.clusters["places"]) {
      const markers = this.state.clusters["places"].getClusters([
        this.state.region.longitude - (this.state.region.longitudeDelta * (0.5 + padding)),
        this.state.region.latitude - (this.state.region.latitudeDelta * (0.5 + padding)),
        this.state.region.longitude + (this.state.region.longitudeDelta * (0.5 + padding)),
        this.state.region.latitude + (this.state.region.latitudeDelta * (0.5 + padding)),
      ], this.getZoomLevel());
      const returnArray = [];
      const { clusters, region } = this.state;
      const onPressMaker = this.onPressMaker.bind(this);
      markers.map(function(element ) {
        returnArray.push(
            <Marker
              key={element.properties._id || element.properties.cluster_id}
              onPress={onPressMaker}
              feature={element}
              clusters={clusters}
              region={region}
            />
        );
      });
      return returnArray;

    }
    return [];
  }

  getZoomLevel(region = this.state.region) {
    const angle = region.longitudeDelta;
    return Math.round(Math.log(360 / angle) / Math.LN2);
  }

  onPressMaker(data) {
    if (data.options.isCluster) {
      if (data.options.region.length > 0) {
        // goToRegion
        this.map.fitToCoordinates(data.options.region, {
          edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
          animated: true,
        });
      } else {
        console.log("We can't move to an empty region");
      }
    } else {

    }
    return;
  }

  onChangeRegionComplete(region) {
    //setRegion
    if(Array.isArray(region)) {
      region.map(function(element) {
        if (element.hasOwnProperty("latitudeDelta") && element.hasOwnProperty("longitudeDelta")) {
          region = element;
          return;
        }
      })
    }
    if (!Array.isArray(region)) {
      this.setState({
        region: region
      });
    } else {
      console.log("We can't set the region as an array");
    }

    this.setState({
      moving: false,
    });
  }

  onChangeRegion(region) {
    this.setState({
      moving: true,
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <MapView
          ref={ref => { this.map = ref; }}
          style={{
            flex: 1,
          }}
          initialRegion={Marseille}
          onRegionChange={this.onChangeRegion.bind(this)}
          onRegionChangeComplete={this.onChangeRegionComplete.bind(this)}
         >
          {
            this.createMarkersForRegion_Places()
          }
         </MapView>
      </View>
    );
  }
}
