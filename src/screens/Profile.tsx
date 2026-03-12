import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
  TextInput,
  Modal,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../components/BottomNav';
import { useNavigation } from '@react-navigation/native';
// import { LogOut } from 'lucide-react-native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function Profile() {
  const [open, setOpen] = useState<string | null>('mother');

  const [user, setUser] = useState<any>(null);
  const [anonymous, setAnonymous] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(false);

  const [sharedProfiles, setSharedProfiles] = useState<any[]>([]);

  const [shareModal, setShareModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [phone, setPhone] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editImage, setEditImage] = useState('');
  const [cycleData, setCycleData] = useState<any>(null);

  /* ================= GET USER ================= */

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(
        'https://her-solace-api.vercel.app/api/user/user-details',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (result.success) {
        setUser(result.data);
        setEditName(result.data.name);
        setEditEmail(result.data.email);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getCycleDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(
        'https://her-solace-api.vercel.app/api/cycle/cycle-details',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (result.success) {
        setCycleData(result);
      }
    } catch (error) {
      console.log('Cycle API Error:', error);
    }
  };

  useEffect(() => {
    getUser();
    getCycleDetails();
  }, []);

  /* ================= TOGGLE CARD ================= */

  const toggleCard = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(open === key ? null : key);
  };

  /* ================= SEARCH USER ================= */

  const searchUser = async () => {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch(
      `https://her-solace-api.vercel.app/api/user/search?phone=${phone}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const result = await response.json();

    if (result.success) {
      setSearchResults(result.data);
    }
  };

  /* ================= SHARE PROFILE ================= */

  const shareProfile = (profile: any) => {
    setSharedProfiles([...sharedProfiles, profile]);

    setShareModal(false);
  };

  /* ================= SAVE PROFILE ================= */

  const saveProfile = async () => {
    const token = await AsyncStorage.getItem('token');

    const body = {
      id: user.id,
      name: editName,
      email: editEmail,
      image_base64: editImage,
      mobile_number: user.mobile_number,
      bleeding_days: user.bleeding_days,
    };

    const response = await fetch(
      'https://her-solace-api.vercel.app/api/user/user-details',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    );

    const result = await response.json();

    if (result.success) {
      setEditModal(false);
      getUser();
    }
  };

  /* ================= PROFILE CARD ================= */

  const renderProfileCard = (
    key: string,
    title: string,
    subtitle: string,
    details: any,
    editable = false,
  ) => {
    const active = open === key;

    return (
      <View style={[styles.card, active && styles.cardActive]}>
        <TouchableOpacity
          style={styles.profileRow}
          onPress={() => toggleCard(key)}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{title?.[0]}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          {editable && (
            <TouchableOpacity onPress={() => setEditModal(true)}>
              <Text style={{ fontSize: 18 }}>✏️</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.arrow}>{active ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {active && (
          <View style={styles.detailsBox}>
            {Object.entries(details).map(([k, v]) => (
              <View key={k} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{k}</Text>
                <Text style={styles.detailValue}>{String(v)}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };
  const navigation = useNavigation<any>();
  const handleLogout = () => {
  Alert.alert('Logout', 'Are you sure you want to logout?', [
    {
      text: 'No',
      style: 'cancel',
    },
    {
      text: 'Yes',
      onPress: async () => {
        await AsyncStorage.clear();
        navigation.replace('Welcome');
      },
    },
  ]);
};

  /* ================= UI ================= */
  const renderToggle = (
    label: string,
    value: boolean,
    setter: (v: boolean) => void,
  ) => (
    <TouchableOpacity style={styles.toggleRow} onPress={() => setter(!value)}>
      <Text>{label}</Text>
      <View
        style={[
          styles.toggleTrack,
          { backgroundColor: value ? '#C2185B' : '#DDD' },
        ]}
      >
        <View
          style={[
            styles.toggleThumb,
            { transform: [{ translateX: value ? 18 : 0 }] },
          ]}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
          {/* HEADER */}

          <View style={styles.headerCard}>
            <Image
              source={require('../assets/well_logo.jpeg')}
              style={styles.logo}
            />

            <Text style={styles.headerTitle}>Her Solace</Text>

            <Text style={styles.headerSubtitle}>
              Decode Hormones — Discover You
            </Text>
          </View>

          {/* MOTHER PROFILE */}

          {user &&
            renderProfileCard(
              'mother',
              user.name ?? 'HS-' + user.mobile_number,
              'Self',
              {
                Mobile: user.mobile_number,
                'Cycle Length': cycleData?.cycleLength
                  ? `🟣 ${cycleData.cycleLength} days`
                  : '-',
                'Last Period': cycleData?.lastPeriodDate
                  ? `🩸 ${formatDate(cycleData.lastPeriodDate)}`
                  : '-',
                Verified: user.is_verified ? 'Yes' : 'No',
              },
              true,
            )}

          {/* SHARE PROFILE BUTTON */}

          <TouchableOpacity
            style={styles.shareBtn}
            onPress={() => setShareModal(true)}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>
              + Share Profile
            </Text>
          </TouchableOpacity>

          {/* SHARED PROFILES */}

          {sharedProfiles.length > 0 && (
            <View>
              <Text style={styles.sharedTitle}>Shared Profiles</Text>

              {sharedProfiles.map(p =>
                renderProfileCard(p.id, p.name ?? p.id, '', {
                  'User ID': p.id,
                }),
              )}
            </View>
          )}

          <View style={styles.settingsCard}>
            <Text style={styles.settingsTitle}>Settings</Text>

            {renderToggle('Anonymous Mode', anonymous, setAnonymous)}
            {renderToggle('Notifications', notifications, setNotifications)}
            {renderToggle('Privacy Mode', privacy, setPrivacy)}
             <TouchableOpacity
    style={styles.logoutRow}
    onPress={handleLogout}
  >
    <Text style={styles.logoutText}>🔒 Logout</Text>
  </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* ================= SHARE POPUP ================= */}

      <Modal visible={shareModal} transparent animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Share Profile</Text>

            <TextInput
              placeholder="Enter phone number"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
            />

            <TouchableOpacity style={styles.searchBtn} onPress={searchUser}>
              <Text style={{ color: '#fff' }}>Search</Text>
            </TouchableOpacity>

            {searchResults.map((item: any) => (
              <View key={item.id} style={styles.resultRow}>
                <Text>{item.id}</Text>

                <TouchableOpacity onPress={() => shareProfile(item)}>
                  <Text>📤</Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity onPress={() => setShareModal(false)}>
              <Text style={{ marginTop: 10 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= EDIT POPUP ================= */}

      <Modal visible={editModal} transparent animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <Text>ID</Text>
            <TextInput value={user?.id} editable={false} style={styles.input} />

            <Text>Mobile</Text>
            <TextInput
              value={user?.mobile_number}
              editable={false}
              style={styles.input}
            />

            <Text>Name</Text>
            <TextInput
              value={editName}
              onChangeText={setEditName}
              style={styles.input}
            />

            <Text>Email</Text>
            <TextInput
              value={editEmail}
              onChangeText={setEditEmail}
              style={styles.input}
            />

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
                <Text style={{ color: '#fff' }}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setEditModal(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ================= BOTTOM NAV ================= */}

      <BottomNav
        active="Profile"
        onChange={route => navigation.navigate(route)}
      />
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  headerCard: {
    backgroundColor: '#e1b8be',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 16,
  },

  logo: { width: 60, height: 60, marginBottom: 10 },

  headerTitle: { color: '#fff', fontWeight: '700', fontSize: 18 },

  headerSubtitle: { color: '#fff', fontSize: 12 },

  card: {
    backgroundColor: '#e1b8be',
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },

  cardActive: { elevation: 6 },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3c9dc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarText: { fontWeight: '700', color: '#c2185b' },

  name: { color: '#fff', fontWeight: '700' },

  subtitle: { fontSize: 12, color: '#fff' },

  arrow: { color: '#fff' },

  detailsBox: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.4)',
    paddingTop: 10,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  detailLabel: { color: '#fff', fontSize: 13 },

  detailValue: { color: '#fff', fontWeight: '600', fontSize: 13 },

  shareBtn: {
    backgroundColor: '#c2185b',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },

  sharedTitle: {
    fontWeight: '700',
    marginBottom: 10,
  },

  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  modalCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },

  modalTitle: { fontWeight: '700', fontSize: 16, marginBottom: 10 },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginTop: 6,
  },

  searchBtn: {
    backgroundColor: '#c2185b',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },

  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  saveBtn: {
    backgroundColor: '#c2185b',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },

  cancelBtn: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
  },
  settingsCard: {
    backgroundColor: '#f4f3f9',
    borderRadius: 20,
    padding: 16,
  },
  settingsTitle: {
    fontWeight: '700',
    marginBottom: 12,
  },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },

  toggleTrack: {
    width: 36,
    height: 18,
    borderRadius: 999,
    justifyContent: 'center',
  },

  toggleThumb: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fff',
    marginLeft: 2,
  },
  logoutRow:{
  marginTop:12,
  paddingVertical:14,
  borderTopWidth:1,
  borderColor:"#eee",
  alignItems:"center"
},

logoutText:{
  color:"#E53935",
  fontWeight:"600",
  fontSize:15
}
});
