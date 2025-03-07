import DateTimePicker, {DateType, getDefaultStyles} from 'react-native-ui-datepicker';
import {TouchableWithoutFeedback, useColorScheme, View} from "react-native";
import {calendarStyles} from "@/components/Calendar/styles/calendarStyles";
import {APODstyles} from "@/components/AstronomicPictureOfTheDay/styles/APODstyles";

interface CalendarProps {
    Day: string,
    returnDate: (date: DateType) => void
    closeScreen: (close: boolean) => void
}

export default function CalendarScreen(props: CalendarProps) {
    const defaultStyles = getDefaultStyles();
    const colorScheme = useColorScheme();
    const themeCalendar =
        colorScheme === 'light' ? APODstyles.childColorLight : APODstyles.childColorDark;


    return (
        <TouchableWithoutFeedback onPress={()=>{props.closeScreen(false)}}>

        <View  style={calendarStyles.container}>

            <View style={[themeCalendar,calendarStyles.mainCalendar]}>

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
                }}
            />

            </View>

        </View>
        </TouchableWithoutFeedback>

    )


}