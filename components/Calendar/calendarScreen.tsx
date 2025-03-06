import DateTimePicker, {DateType, getDefaultStyles} from 'react-native-ui-datepicker';
import {View} from "react-native";
import {calendarStyles} from "@/components/Calendar/styles/calendarStyles";

interface CalendarProps {
    Day: string,
    returnDate: (date: DateType) => void
    closeScreen: (close: boolean) => void
}

export default function CalendarScreen(props: CalendarProps) {
    const defaultStyles = getDefaultStyles();
    return (
        <View style={calendarStyles.container}>
            <DateTimePicker
                mode="single"
                date={props.Day}
                minDate={new Date(1995, 5, 16)}
                maxDate={new Date()}
                onChange={({date}) => {
                    props.returnDate(date)
                    props.closeScreen(false)
                }}
                styles={{
                    ...defaultStyles,
                    selected: {backgroundColor: 'blue'},
                }}
            />

        </View>

    )


}