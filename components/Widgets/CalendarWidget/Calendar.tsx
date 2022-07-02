import {MotionBox} from "@components/chakra-motion";
import {Forceful} from "@utils/AnimFunc";

export const CalendarWidget = ({ ...props }) => {
    return <MotionBox
        w={600}
        h={500}
        bg={"#000"}
        animate={{ y: 0 }}
        transition={{ duration: .7, ease: Forceful }}
        {...props}
    >

    </MotionBox>
}