import Card from '../components/Card';
import BottomNav from '../components/BottomNav';
import Header from '../components/Header';
// import { theme } from "@/theme";
import { StyleSheet } from 'react-native';
import { theme } from '../theme';

type Props = {
  onTab: (tab: string) => void;
};

export default function Calendar({ onTab }: Props) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  //   const route = useRoute();
  // const navigation = useNavigation();

  return (
    <div style={styles.container}>
      <Header title="April 2024" />

      <Card>
        <div style={styles.grid}>
          {days.map(day => (
            <div
              key={day}
              style={{
                ...styles.cell,
                background: day === 25 ? theme.primary : 'transparent',
                color: day === 25 ? '#fff' : theme.text,
              }}
            >
              {day}
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ marginTop: 16 }}>
        <h4>April 10 Details</h4>
        <p>Period: Medium Flow</p>
        <p>Symptoms: Cramps, Headache</p>
        <p>Note: Feeling tired</p>
      </Card>

      <BottomNav active="Cycle" onChange={onTab} />
      {/* <BottomNav
  active={route.name}
  onChange={(screen) => navigation.navigate(screen)}
/> */}
    </div>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.bg,
    flex: 1, // instead of minHeight: "100vh"
    padding: 16,
    paddingBottom: 80,
    maxWidth: 420,
    alignSelf: 'center', // instead of margin: "0 auto"
  },

  grid: {
    flexDirection: 'row', // RN doesn't support display: grid
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  cell: {
    width: '13%', // approx 7 columns
    padding: 10,
    borderRadius: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});
