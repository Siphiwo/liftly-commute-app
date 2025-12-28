import { Image, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { User2Icon } from 'lucide-react-native';

export default function FullMap() {
  const [locations, setLocation] = useState({
    latitude: -33.6914 - 0.002,
    longitude: 18.9950,
    latitudeDelta: 0.005,
    longitudeDelta: 0.05,
  });
const [statusGranted, setStatusGranted] = useState<string | null>('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
        setStatusGranted(status);
      if (statusGranted == 'granted') {
        return;
      }

    let locations = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locations.coords.latitude,
        longitude: locations.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, [statusGranted]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: locations.latitude,
          longitude: locations.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        followsUserLocation={true}
      >
        <Marker
            coordinate={{ latitude: locations.latitude + 0.0012, longitude: locations.longitude - 0.0006 }}
            title="John Snow"
        >
            <View
                style={{
                width: 48,
                height: 48,
                borderRadius: 25,
                borderWidth: 2,
                borderColor: '#ffffffff',
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
                }} >
            <Image
                source={require('../assets/profile-image.jpg')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
                />
            </View>
        </Marker>
        <Marker
            coordinate={{ latitude: locations.latitude - 0.0005, longitude: locations.longitude + 0.0008 }}
            title="John Snow"
        >
            <View
                style={{
                width: 48,
                height: 48,
                borderRadius: 25,
                borderWidth: 2,
                borderColor: '#ffffffff',
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
                }} >
            <Image
                source={require('../assets/profile-image.jpg')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
                />
            </View>
        </Marker>
        <Marker
            coordinate={{ latitude: locations.latitude, longitude: locations.longitude }}
            title="John Snow"
        >
            <View
                style={{
                width: 48,
                height: 48,
                borderRadius: 25,
                borderWidth: 2,
                borderColor: '#ffffffff',
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
                }} >
            <Image
                source={require('../assets/profile-image.jpg')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
                />
            </View>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,          // REQUIRED
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
