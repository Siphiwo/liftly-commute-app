import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MapPin, Car, Users, Phone, Mail, Clock } from 'lucide-react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function UserDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = route.params as any;

  const handleSendMessage = () => {
    navigation.navigate('ChatDetail' as never, {
      userName: user?.name || 'User',
      userId: user?.id
    } as never);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.profileImage}>
          <Text style={styles.profileImageText}>{user?.name?.charAt(0) || 'U'}</Text>
        </View>
        <Text style={styles.name}>{user?.name || 'User Name'}</Text>
        {user?.distance && (
          <View style={styles.distanceContainer}>
            <MapPin size={16} color="#666" />
            <Text style={styles.distance}>{user.distance}</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <View style={styles.infoRow}>
          <Mail size={20} color="#007AFF" />
          <Text style={styles.infoText}>user@example.com</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Phone size={20} color="#007AFF" />
          <Text style={styles.infoText}>+1 234 567 8900</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Locations</Text>
        
        <View style={styles.locationCard}>
          <Text style={styles.locationLabel}>Home</Text>
          <Text style={styles.locationText}>123 Main Street, City</Text>
          <Text style={styles.radiusText}>Radius: 5 km</Text>
        </View>
        
        <View style={styles.locationCard}>
          <Text style={styles.locationLabel}>Work</Text>
          <Text style={styles.locationText}>456 Business Ave, City</Text>
          <Text style={styles.radiusText}>Radius: 3 km</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Work Schedule</Text>
        
        <View style={styles.scheduleCard}>
          <View style={styles.infoRow}>
            <Clock size={20} color="#007AFF" />
            <View>
              <Text style={styles.scheduleLabel}>Start Time</Text>
              <Text style={styles.scheduleTime}>08:00 AM</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Clock size={20} color="#007AFF" />
            <View>
              <Text style={styles.scheduleLabel}>End Time</Text>
              <Text style={styles.scheduleTime}>05:00 PM</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vehicle Information</Text>
        
        <View style={styles.vehicleCard}>
          <View style={styles.infoRow}>
            <Car size={20} color="#007AFF" />
            <Text style={styles.infoText}>Toyota Camry 2020</Text>
          </View>
          
          <View style={styles.vehicleDetails}>
            <Text style={styles.vehicleDetailText}>Color: Silver</Text>
            <Text style={styles.vehicleDetailText}>Plate: ABC 123</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Users size={20} color="#007AFF" />
            <Text style={styles.infoText}>4 available seats</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.messageButton} onPress={handleSendMessage}>
        <Text style={styles.messageButtonText}>Send Message</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImageText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  locationCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  locationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  radiusText: {
    fontSize: 14,
    color: '#666',
  },
  scheduleCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
    gap: 15,
  },
  scheduleLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  scheduleTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  vehicleCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
  },
  vehicleDetails: {
    paddingLeft: 32,
    marginVertical: 10,
  },
  vehicleDetailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  messageButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  messageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
