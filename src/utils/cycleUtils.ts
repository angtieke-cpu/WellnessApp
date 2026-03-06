export const generateCycleMarks = (
  lastPeriod: Date,
  cycleLength: number = 28,
  periodLength: number = 5,
  months: number = 5
) => {
  const marks: any = {};
  let current = new Date(lastPeriod);

  const today = new Date();

  for (let m = 0; m < months; m++) {

    // PERIOD DAYS
    for (let i = 0; i < periodLength; i++) {
      const d = new Date(current);
      d.setDate(d.getDate() + i);

      const key = d.toISOString().split("T")[0];

      marks[key] = {
        selected: true,
        selectedColor: "#ff6b6b",
      };
    }

    // OVULATION
    const ovulation = new Date(current);
    ovulation.setDate(ovulation.getDate() + cycleLength - 14);

    const ovulationKey = ovulation.toISOString().split("T")[0];

    marks[ovulationKey] = {
      selected: true,
      selectedColor: "#4dabf7",
    };

    // FERTILE WINDOW
    for (let i = -3; i <= 2; i++) {
      const fertile = new Date(ovulation);
      fertile.setDate(fertile.getDate() + i);

      const key = fertile.toISOString().split("T")[0];

      marks[key] = {
        selected: true,
        selectedColor: "#f6c343",
      };
    }

    // NEXT PERIOD
    current.setDate(current.getDate() + cycleLength);
  }

  // CURRENT DAY
  const todayKey = today.toISOString().split("T")[0];

  marks[todayKey] = {
    selected: true,
    selectedColor: "#339af0",
  };

  return marks;
};
