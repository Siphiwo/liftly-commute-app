import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, useWindowDimensions, Platform, Switch } from 'react-native';
import { useState } from 'react';
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Clock, MapPin } from 'lucide-react-native';

export default function ProfileScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [isPassengerOnly, setIsPassengerOnly] = useState(false);
  
  const routes = isPassengerOnly 
    ? [{ key: 'personal', title: 'Personal' }]
    : [
        { key: 'personal', title: 'Personal' },
        { key: 'vehicle', title: 'Vehicle' },
      ];

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [homeLocation, setHomeLocation] = useState('');
  const [homeRadius, setHomeRadius] = useState(1);
  const [workLocation, setWorkLocation] = useState('');
  const [workRadius, setWorkRadius] = useState(1);
  const [workStartTime, setWorkStartTime] = useState(new Date());
  const [workEndTime, setWorkEndTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [workDays, setWorkDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);

  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [seats, setSeats] = useState(4);
  const [vehicleImage, setVehicleImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const pickVehicleImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setVehicleImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    Alert.alert('Success', 'Profile updated successfully');
  };

  const PersonalRoute = () => (
    <ScrollView style={styles.tabContent}>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>
      
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      
      <View style={styles.divider} />
      
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Passenger Only</Text>
        <Switch
          value={isPassengerOnly}
          onValueChange={setIsPassengerOnly}
          trackColor={{ false: '#ddd', true: '#007AFF' }}
          thumbColor="#fff"
        />
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.locationContainer}>
        <View style={styles.locationDots}>
          <View style={styles.dotSmall} />
          <View style={styles.dottedLine} />
          <MapPin size={20} color="#333" />
        </View>
        
        <View style={styles.locationInputs}>
          <View style={styles.locationInputWrapper}>
            <TextInput
              style={styles.locationInput}
              placeholder="Home Location"
              value={homeLocation}
              onChangeText={setHomeLocation}
            />
            <MapPin size={20} color="#666" />
          </View>
          
          <View style={styles.locationInputWrapper}>
            <TextInput
              style={styles.locationInput}
              placeholder="Work Location"
              value={workLocation}
              onChangeText={setWorkLocation}
            />
            <MapPin size={20} color="#666" />
          </View>
        </View>
      </View>
      
      <Text style={styles.label}>Work Days</Text>
      <View style={styles.daysContainer}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              workDays.includes(day) && styles.dayButtonActive
            ]}
            onPress={() => {
              setWorkDays(prev =>
                prev.includes(day)
                  ? prev.filter(d => d !== day)
                  : [...prev, day]
              );
            }}
          >
            <Text style={[
              styles.dayButtonText,
              workDays.includes(day) && styles.dayButtonTextActive
            ]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.label}>Work Start Time</Text>
      <TouchableOpacity style={styles.timeInput} onPress={() => setShowStartPicker(true)}>
        <Clock size={20} color="#666" />
        <Text style={styles.timeText}>{workStartTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          value={workStartTime}
          mode="time"
          display="default"
          onChange={(event, date) => {
            setShowStartPicker(Platform.OS === 'ios');
            if (date) setWorkStartTime(date);
          }}
        />
      )}
      
      <Text style={styles.label}>Work End Time</Text>
      <TouchableOpacity style={styles.timeInput} onPress={() => setShowEndPicker(true)}>
        <Clock size={20} color="#666" />
        <Text style={styles.timeText}>{workEndTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          value={workEndTime}
          mode="time"
          display="default"
          onChange={(event, date) => {
            setShowEndPicker(Platform.OS === 'ios');
            if (date) setWorkEndTime(date);
          }}
        />
      )}
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const VehicleRoute = () => (
    <ScrollView style={styles.tabContent}>
      <TouchableOpacity style={styles.vehicleImageContainer} onPress={pickVehicleImage}>
        {vehicleImage ? (
          <Image source={{ uri: vehicleImage }} style={styles.vehicleImage} />
        ) : (
          <View style={styles.placeholderVehicleImage}>
            <Text style={styles.placeholderText}>Add Vehicle Photo</Text>
          </View>
        )}
      </TouchableOpacity>
      
      <Text style={styles.label}>Make</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Toyota"
        value={vehicleMake}
        onChangeText={setVehicleMake}
      />
      
      <Text style={styles.label}>Model</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Camry"
        value={vehicleModel}
        onChangeText={setVehicleModel}
      />
      
      <Text style={styles.label}>Year</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 2020"
        value={vehicleYear}
        onChangeText={setVehicleYear}
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Color</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Silver"
        value={vehicleColor}
        onChangeText={setVehicleColor}
      />
      
      <Text style={styles.label}>License Plate</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., ABC 123"
        value={licensePlate}
        onChangeText={setLicensePlate}
        autoCapitalize="characters"
      />
      
      <Text style={styles.seatsTitle}>Seats Available</Text>
      <View style={styles.seatsSliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={7}
          step={1}
          value={seats}
          onValueChange={setSeats}
          minimumTrackTintColor="#333"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#fff"
        />
        <View style={styles.seatsNumbers}>
          {[1, 2, 3, 4].map((num) => (
            <Text key={num} style={styles.seatNumber}>{num}</Text>
          ))}
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <Text style={styles.sectionTitle}>Pickup Radius</Text>
      
      <Text style={styles.seatsTitle}>Home Radius</Text>
      <View style={styles.seatsSliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={3}
          step={1}
          value={homeRadius}
          onValueChange={setHomeRadius}
          minimumTrackTintColor="#333"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#fff"
        />
        <View style={styles.seatsNumbers}>
          {[1, 2, 3].map((num) => (
            <Text key={num} style={styles.seatNumber}>{num} km</Text>
          ))}
        </View>
      </View>
      
      <Text style={styles.seatsTitle}>Work Radius</Text>
      <View style={styles.seatsSliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={3}
          step={1}
          value={workRadius}
          onValueChange={setWorkRadius}
          minimumTrackTintColor="#333"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#fff"
        />
        <View style={styles.seatsNumbers}>
          {[1, 2, 3].map((num) => (
            <Text key={num} style={styles.seatNumber}>{num} km</Text>
          ))}
        </View>
      </View>
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderScene = SceneMap({
    personal: PersonalRoute,
    vehicle: VehicleRoute,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.tabIndicator}
            style={styles.tabBar}
            labelStyle={styles.tabLabel}
            activeColor="#007AFF"
            inactiveColor="#999"
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6f4',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
    paddingHorizontal: 20,
    color: '#12211c',
  },
  tabBar: {
    backgroundColor: '#f0f6f4',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabIndicator: {
    backgroundColor: '#007AFF',
  },
  tabLabel: {
    fontWeight: '600',
    fontSize: 14,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f6f4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1f7a5c4d',
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: '#12211c',
    fontSize: 14,
  },
  vehicleImageContainer: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  vehicleImage: {
    width: 280,
    height: 210,
    borderRadius: 12,
  },
  placeholderVehicleImage: {
    width: 280,
    height: 210,
    borderRadius: 12,
    backgroundColor: '#f0f6f4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1f7a5c4d',
    borderStyle: 'dashed',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 15,
    color: '#12211c',
  },
  label: {
    fontSize: 14,
    color: '#12211c',
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#1f7a5c4d',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f0f6f4',
    color: '#12211c',
  },
  timeInput: {
    borderWidth: 2,
    borderColor: '#1f7a5c4d',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f0f6f4',
  },
  timeText: {
    fontSize: 16,
    color: '#12211c',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  seatsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  seatsSliderContainer: {
    marginBottom: 20,
  },
  seatsNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: -8,
  },
  seatNumber: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  locationContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  locationDots: {
    alignItems: 'center',
    paddingTop: 20,
  },
  dotSmall: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333',
    marginBottom: 8,
  },
  dottedLine: {
    width: 2,
    height: 60,
    borderLeftWidth: 2,
    borderLeftColor: '#333',
    borderStyle: 'dashed',
    marginBottom: 8,
  },
  locationInputs: {
    flex: 1,
    gap: 16,
  },
  locationInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f6f4',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: '#1f7a5c4d',
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    color: '#12211c',
    paddingVertical: 14,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1f7a5c4d',
    backgroundColor: '#f0f6f4',
  },
  dayButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  dayButtonText: {
    fontSize: 14,
    color: '#12211c',
    fontWeight: '500',
  },
  dayButtonTextActive: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
