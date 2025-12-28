import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Users, MapPin, Clock, X, Car } from 'lucide-react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

interface ClubMember {
  id: string;
  name: string;
  hasVehicle: boolean;
  role: 'driver' | 'passenger';
}

interface Club {
  id: string;
  driverName: string;
  route: string;
  departureTime: string;
  availableSeats: number;
  totalSeats: number;
  distance: string;
  members: ClubMember[];
}

const mockClubs: Club[] = [
  {
    id: '1',
    driverName: 'John Smith',
    route: 'Sandton → Rosebank',
    departureTime: '07:30 AM',
    availableSeats: 2,
    totalSeats: 4,
    distance: '2.1 km from you',
    members: [
      { id: 'm1', name: 'John Smith', hasVehicle: true, role: 'driver' },
      { id: 'm2', name: 'Alice Brown', hasVehicle: false, role: 'passenger' },
    ],
  },
  {
    id: '2',
    driverName: 'Sarah Johnson',
    route: 'Midrand → Sandton',
    departureTime: '08:00 AM',
    availableSeats: 1,
    totalSeats: 3,
    distance: '1.5 km from you',
    members: [
      { id: 'm3', name: 'Sarah Johnson', hasVehicle: true, role: 'driver' },
      { id: 'm4', name: 'Tom Wilson', hasVehicle: false, role: 'passenger' },
    ],
  },
  {
    id: '3',
    driverName: 'Mike Davis',
    route: 'Centurion → Pretoria CBD',
    departureTime: '07:45 AM',
    availableSeats: 3,
    totalSeats: 4,
    distance: '3.0 km from you',
    members: [
      { id: 'm5', name: 'Mike Davis', hasVehicle: true, role: 'driver' },
    ],
  },
];

export default function ClubScreen() {
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const navigation = useNavigation();

  const handleMemberPress = (member: ClubMember) => {
    setSelectedClub(null);
    navigation.navigate('UserDetail' as never, { 
      user: { id: member.id, name: member.name, hasVehicle: member.hasVehicle }
    } as never);
  };

  const renderMember = ({ item }: { item: ClubMember }) => (
    <TouchableOpacity
      style={styles.memberCard}
      onPress={() => handleMemberPress(item)}
    >
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberRole}>{item.role}</Text>
      </View>
      {item.hasVehicle && (
        <View style={styles.vehicleBadge}>
          <Car size={16} color="#007AFF" />
        </View>
      )}
    </TouchableOpacity>
  );

  const renderClub = ({ item }: { item: Club }) => (
    <TouchableOpacity style={styles.clubCard} onPress={() => setSelectedClub(item)}>
      <View style={styles.clubHeader}>
        <Text style={styles.driverName}>{item.driverName}</Text>
        <View style={styles.seatsContainer}>
          <Users size={16} color="#007AFF" />
          <Text style={styles.seatsText}>
            {item.availableSeats}/{item.totalSeats} seats
          </Text>
        </View>
      </View>
      
      <View style={styles.routeContainer}>
        <MapPin size={16} color="#666" />
        <Text style={styles.routeText}>{item.route}</Text>
      </View>
      
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Clock size={16} color="#666" />
          <Text style={styles.detailText}>{item.departureTime}</Text>
        </View>
        <Text style={styles.distanceText}>{item.distance}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Clubs</Text>
      <FlatList
        data={mockClubs}
        renderItem={renderClub}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={!!selectedClub}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedClub(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Club Members</Text>
              <TouchableOpacity onPress={() => setSelectedClub(null)}>
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {selectedClub && (
              <>
                <View style={styles.clubInfo}>
                  <Text style={styles.clubRoute}>{selectedClub.route}</Text>
                  <Text style={styles.clubTime}>{selectedClub.departureTime}</Text>
                </View>

                <FlatList
                  data={selectedClub.members}
                  renderItem={renderMember}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.membersList}
                />
              </>
            )}
          </View>
        </View>
      </Modal>
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
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  clubCard: {
    backgroundColor: '#f0f6f4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#1f7a5c4d',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  clubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#12211c',
  },
  seatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  seatsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  routeText: {
    fontSize: 16,
    color: '#12211c',
    flex: 1,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#12211c',
  },
  distanceText: {
    fontSize: 14,
    color: '#12211c',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#f0f6f4',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#12211c',
  },
  clubInfo: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f7a5c4d',
  },
  clubRoute: {
    fontSize: 18,
    fontWeight: '600',
    color: '#12211c',
    marginBottom: 4,
  },
  clubTime: {
    fontSize: 14,
    color: '#12211c',
  },
  membersList: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  memberCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  vehicleBadge: {
    backgroundColor: '#F0F7FF',
    padding: 8,
    borderRadius: 8,
  },
});
