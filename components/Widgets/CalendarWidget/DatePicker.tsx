import {MotionBox} from "@components/chakra-motion";

export const DatePicker = () => {
    return <MotionBox
        className={"grid"}
        gridRow={5}
        gridTemplateColumns={"repeat(7, 1fr)"}
        gridTemplateRows={"repeat(5, 1fr)"}
    >
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]}
    </MotionBox>
};