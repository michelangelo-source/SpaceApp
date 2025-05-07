import DateTimePicker, {DateType, useDefaultStyles} from 'react-native-ui-datepicker';
import {TouchableWithoutFeedback, useColorScheme, View} from "react-native";
import {calendarStyles} from "@/components/Calendar/styles/calendarStyles";
import {globalStyles} from "@/globalStyles/globalStyles";

interface CalendarProps {
    Day: string,
    returnDate: (date: string) => void,
    closeScreen: (close: boolean) => void,
    enableDates?: DateType[],
    disabledDates?: DateType[],
    minDate?: Date,
    maxDate?: Date
}

export default function CalendarScreen(props: CalendarProps) {
    const defaultStyles = useDefaultStyles();
    const colorScheme = useColorScheme();
    const themeCalendar =
        colorScheme === 'light' ? globalStyles.childColorLight : globalStyles.childColorDark;


    const calendarDateToString = (date: DateType) => {
        if (date) {
            if (date instanceof Date) {
                if (date.getTimezoneOffset() !== 0) {
                    date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
                }
                const year = date.getUTCFullYear();
                const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
                const day = date.getUTCDate().toString().padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                props.returnDate(formattedDate);
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            props.closeScreen(false)
        }}>

            <View style={calendarStyles.container}>

                <View style={[themeCalendar, calendarStyles.mainCalendar]}>

                    <DateTimePicker
                        mode="single"
                        date={props.Day}
                        minDate={props.minDate}
                        maxDate={props.maxDate ? props.maxDate : new Date()}
                        onChange={({date}) => {
                            calendarDateToString(date)
                            props.closeScreen(false)
                        }}
                        enabledDates={props.enableDates}
                        disabledDates={props.disabledDates}
                        styles={{
                            ...defaultStyles,
                        }}
                    />

                </View>

            </View>
        </TouchableWithoutFeedback>

    )


}