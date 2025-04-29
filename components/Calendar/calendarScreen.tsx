import DateTimePicker, {DateType, useDefaultStyles} from 'react-native-ui-datepicker';
import {TouchableWithoutFeedback, useColorScheme, View} from "react-native";
import {calendarStyles} from "@/components/Calendar/styles/calendarStyles";
import {APODstyles} from "@/components/AstronomicPictureOfTheDay/styles/APODstyles";

interface CalendarProps {
    Day: string,
    returnDate: (date: string) => void
    closeScreen: (close: boolean) => void,
    enableDates?: DateType[]
    minDate?:Date,
    maxDate?:Date
}

export default function CalendarScreen(props: CalendarProps) {
    const defaultStyles = useDefaultStyles();
    const colorScheme = useColorScheme();
    const themeCalendar =
        colorScheme === 'light' ? APODstyles.childColorLight : APODstyles.childColorDark;


    const calendarDateToString=(date:DateType)=>{
        if (date) {
            if(date instanceof Date){

                const year = date.getUTCFullYear();
                const month = date.getUTCMonth() + 1;
                let day = date.getUTCDate();
                if(date.getTimezoneOffset()!==0){
                    day++;
                }
                const formattedMonth = month.toString().padStart(2, '0');
                const formattedDay = day.toString().padStart(2, '0');
                const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
                props.returnDate(formattedDate)
            }

        }

    }

    return (
        <TouchableWithoutFeedback onPress={()=>{props.closeScreen(false)}}>

        <View  style={calendarStyles.container}>

            <View style={[themeCalendar,calendarStyles.mainCalendar]}>

            <DateTimePicker
                mode="single"
                date={props.Day}
                minDate={props.minDate}
                maxDate={props.maxDate?props.maxDate:new Date()}
                onChange={({date}) => {
                    calendarDateToString(date)
                    props.closeScreen(false)
                }}
                enabledDates={props.enableDates}
                styles={{
                    ...defaultStyles,
                }}
            />

            </View>

        </View>
        </TouchableWithoutFeedback>

    )


}