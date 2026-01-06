import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { MapPin, Home, Briefcase, HomeIcon, UsersRoundIcon, Armchair, ArmchairIcon, Users, UsersIcon, CarIcon, MapPinHouse, MapPinned } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Map from '../components/Map';

// Mock user profile settings - in real app, this would come from user context/state
const userProfile = {
  isPassengerOnly: false, // Set to true to test passenger-only mode
  homeRadius: 2, // km - only used if user has vehicle
  workRadius: 1, // km - only used if user has vehicle
};

// Default radius for passenger-only users
const PASSENGER_DEFAULT_RADIUS = 3; // km

const allUsers = [
  { id: '1', name: 'Sarah Johnson', homeDistance: 2.3, workDistance: 1.5, hasVehicle: true, vehicle: 'Honda CLS', seats: 3 },
  { id: '2', name: 'Mike Chen', homeDistance: 3.1, workDistance: 2.9, hasVehicle: false },
  { id: '3', name: 'Emma Davis', homeDistance: 1.5, workDistance: 0.9, hasVehicle: true, vehicle: 'Toyota Camry', seats: 2 },
  { id: '4', name: 'John Smith', homeDistance: 5.2, workDistance: 3.7, hasVehicle: true, vehicle: 'Ford Focus', seats: 4 },
  { id: '5', name: 'Alex Brown', homeDistance: 1.8, workDistance: 1.8, hasVehicle: true, vehicle: 'BMW 3 Series', seats: 1 },
  { id: '6', name: 'Lisa Wang', homeDistance: 2.9, workDistance: 2.9, hasVehicle: true, vehicle: 'Mazda CX-5', seats: 3 },
  { id: '7', name: 'Tom Wilson', homeDistance: 3.7, workDistance: 0.8, hasVehicle: false },
  { id: '8', name: 'Kate Miller', homeDistance: 0.9, workDistance: 0.9, hasVehicle: true, vehicle: 'Audi A4', seats: 2 },
];

const allNewUsers = [
  { id: '9', name: 'David Lee', joined: '2 days ago', homeDistance: 2.1, workDistance: 3.5, hasVehicle: true },
  { id: '10', name: 'Sophie Taylor', joined: '3 days ago', homeDistance: 4.8, workDistance: 1.2, hasVehicle: false },
  { id: '11', name: 'Ryan Garcia', joined: '5 days ago', homeDistance: 1.5, workDistance: 2.8, hasVehicle: true },
  { id: '12', name: 'Olivia Martinez', joined: '1 week ago', homeDistance: 6.2, workDistance: 5.5, hasVehicle: false },
  { id: '13', name: 'James Anderson', joined: '1 week ago', homeDistance: 3.9, workDistance: 4.1, hasVehicle: true },
];

const MAX_NEW_USER_DISTANCE = 5; // km

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleUserPress = (user: any) => {
    navigation.navigate('UserDetail' as never, { user } as never);
  };

  // Filter users based on radius and passenger-only mode
  const getRecommendedUsers = () => {
    const radius = userProfile.isPassengerOnly ? PASSENGER_DEFAULT_RADIUS : Math.max(userProfile.homeRadius, userProfile.workRadius);
    
    return allUsers.filter(user => {
      const withinHomeRadius = user.homeDistance <= (userProfile.isPassengerOnly ? PASSENGER_DEFAULT_RADIUS : userProfile.homeRadius);
      const withinWorkRadius = user.workDistance <= (userProfile.isPassengerOnly ? PASSENGER_DEFAULT_RADIUS : userProfile.workRadius);
      
      if (userProfile.isPassengerOnly) {
        // Passenger-only: show only drivers within radius
        return user.hasVehicle && (withinHomeRadius || withinWorkRadius);
      } else {
        // Driver: show all users within radius
        return withinHomeRadius || withinWorkRadius;
      }
    });
  };

  const recommendedUsers = getRecommendedUsers();

  // Filter new users within 5km of home or work
  const newUsers = allNewUsers.filter(user => 
    user.homeDistance <= MAX_NEW_USER_DISTANCE || user.workDistance <= MAX_NEW_USER_DISTANCE
  );

  const renderNearbyUserCard = ({ item }: any) => {
    const displayVehicle = item.hasVehicle ? item.vehicle : 'Passenger';
    const homeRadius = userProfile.isPassengerOnly ? PASSENGER_DEFAULT_RADIUS : userProfile.homeRadius;
    const workRadius = userProfile.isPassengerOnly ? PASSENGER_DEFAULT_RADIUS : userProfile.workRadius;
    return (
      <TouchableOpacity onPress={() => handleUserPress(item)}>
      <View style={{ justifyContent: "flex-end", alignItems: "flex-start", marginHorizontal: 5, paddingBottom: 10, backgroundColor: '#fff', borderRadius: 14, position: 'relative', padding: 4 }}>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'absolute', top: 0, right: 4, bottom: 32, zIndex:2, gap: 16, padding: 6, borderTopRightRadius: 8, borderBottomRightRadius: 8 }}>
          <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <MapPinHouse size={28} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 12 }}>{homeRadius} km</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <MapPinned size={28} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 12 }}>{workRadius} km</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            {item.hasVehicle && item.seats && (
              <>
                <ArmchairIcon size={28} color="#fff" />
                <Text style={{ color: '#fff', fontSize: 12 }}>{item.seats}</Text>
              </>
              )}
          </View>
        </View>
        <Image source={require('../assets/profile-image.jpg')} style={{ width: 250, height: 300, borderRadius: 10 }} />
        <View style={{ position: 'absolute', bottom: 40, left: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <CarIcon size={16} color="#fff" style={{display: item.hasVehicle ? 'flex' : 'none'}} />
          <Text style={{ fontSize: 14, fontWeight: 'normal', marginTop: 5, paddingHorizontal: 5, color: '#fff' }}>{displayVehicle}</Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 5, paddingHorizontal: 10 }}>{item.name}</Text>
      </View>
      </TouchableOpacity>
    )
  }

  const renderUserCard = ({ item }: any) => {
    const displayVehicle = item.hasVehicle ? item.vehicle : 'Passenger';
    const homeRadius = userProfile.isPassengerOnly ? PASSENGER_DEFAULT_RADIUS : userProfile.homeRadius;
    const workRadius = userProfile.isPassengerOnly ? PASSENGER_DEFAULT_RADIUS : userProfile.workRadius;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardImage}>
            <Text style={styles.cardImageText}>{item.name.charAt(0)}</Text>
          </View>
          <View style={styles.cardHeaderInfo}>
            <Text style={styles.cardName}>{item.name}</Text>
            <View style={styles.vehicleRow}>
              <Text style={styles.vehicleText}>{displayVehicle}</Text>
              {item.hasVehicle && item.seats && (
                <View style={styles.seatBadge}>
                  <Text style={styles.seatBadgeText}>{item.seats}</Text>
                </View>
              )}
            </View>
          </View>
          <TouchableOpacity style={styles.viewButton} onPress={() => handleUserPress(item)}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.routeContainer}>
          <View style={styles.routeRow}>
            <View style={styles.routeDot} />
            <Text style={styles.routeText}>Home Radius</Text>
            <Text style={styles.routeDistance}>{homeRadius} km</Text>
          </View>
          <View style={styles.routeLine} />
          <View style={styles.routeRow}>
            <MapPin size={16} color="#12211c" fill="#12211c" />
            <Text style={styles.routeText}>Work Radius</Text>
            <Text style={styles.routeDistance}>{workRadius} km</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderNewUser = ({ item }: any) => (
    <TouchableOpacity style={styles.newUserCard} onPress={() => handleUserPress(item)}>
      <View style={styles.newUserImage}>
        <Text style={styles.newUserImageText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.newUserInfo}>
        <Text style={styles.newUserName}>{item.name}</Text>
        <Text style={styles.newUserJoined}>{item.joined}</Text>
        <View style={styles.newUserDistances}>
          <View style={styles.newUserDistanceItem}>
            <Home size={12} color="#999" />
            <Text style={styles.newUserDistanceText}>{item.homeDistance} km</Text>
          </View>
          <View style={styles.newUserDistanceItem}>
            <Briefcase size={12} color="#999" />
            <Text style={styles.newUserDistanceText}>{item.workDistance} km</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
    <View style={{ flex: 1}}>
      <Map />
    </View>
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Nearby you</Text>
        {recommendedUsers.length > 0 ? (
          <FlatList
            data={recommendedUsers}
            renderItem={renderNearbyUserCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.horizontalList}
          />
        ) : (
          <Text style={styles.emptyText}>No users found within your radius</Text>
        )}
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#0000009a',
    position: 'absolute',
    justifyContent: 'flex-end',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'normal',
    marginTop: 60,
    marginBottom: 20,
    paddingHorizontal: 20,
    color: '#fff',
  },
  section: {
    // display: 'flex',
    marginBottom: 16,
    // flex: 1,
    justifyContent: 'flex-end',
    position: 'relative',
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    paddingHorizontal: 20,
    color: '#12211c',
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
  card: {
    width: 320,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#1f7a5c4d',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardImageText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardHeaderInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#12211c',
    marginBottom: 4,
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  vehicleText: {
    fontSize: 14,
    color: '#666',
  },
  seatBadge: {
    backgroundColor: '#12211c',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  seatBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  viewButton: {
    backgroundColor: '#12211c',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  routeContainer: {
    marginLeft: 8,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#12211c',
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: 'transparent',
    borderLeftWidth: 2,
    borderLeftColor: '#12211c',
    borderStyle: 'dashed',
    marginLeft: 3,
    marginVertical: 4,
  },
  routeText: {
    fontSize: 14,
    color: '#12211c',
    flex: 1,
  },
  routeDistance: {
    fontSize: 14,
    color: '#666',
  },
  distancesContainer: {
    gap: 4,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  cardDistance: {
    fontSize: 12,
    color: '#12211c',
  },
  emptyText: {
    fontSize: 14,
    color: '#12211c',
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
  newUserCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1f7a5c4d',
  },
  newUserImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  newUserImageText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  newUserInfo: {
    flex: 1,
  },
  newUserName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
    color: '#12211c',
  },
  newUserJoined: {
    fontSize: 14,
    color: '#12211c',
    marginBottom: 6,
  },
  newUserDistances: {
    flexDirection: 'row',
    gap: 12,
  },
  newUserDistanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  newUserDistanceText: {
    fontSize: 12,
    color: '#12211c',
  },
});
