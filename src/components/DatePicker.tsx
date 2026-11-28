import { Calendar } from "react-native-calendars";

type Props = {
  value: string;
  onChange: (date: string) => void;
};
export default function DatePicker({ value, onChange }: Props) {
  return (
    <Calendar
      onDayPress={(day) => onChange(day.dateString)}
      markedDates={{
        [value]: { selected: true },
      }}
    />
  );
}
