import {MotionBox, MotionBoxProps, MotionButton, MotionFlex} from "@components/chakra-motion";
import { FC } from "react";
import {hasChildren} from "@utils/utils";
import {BoxProps} from "@chakra-ui/react";
import {AnimationProps} from "framer-motion";

interface IVitals {
    wifiStrength: number;
    satelliteStrength: number;
    batteryLevel: number;
}

export const Vitals = () => {
    return (
        <MotionButton
            h={"100%"}
            pr={"25px"}
            animate={{ background: "hsla(0, 0%, 12%, 0)" }}
            whileHover={{ background: "hsla(0, 0%, 12%, 1)" }}
        >
            <MotionFlex
                h={"100%"}
                flexDir={"row"}
                alignContent={"center"}
                gap={"10px"}
            >
                <VitalIcon key={"vital-broadcast"} pt={"10px"}>&#xe0ce;</VitalIcon>
                <VitalIcon key={"vital-wifi"} pt={"10px"}>&#xe1d8;</VitalIcon>
                <VitalIcon key={"vital-sat"} pt={"10px"}>&#xe1d0;</VitalIcon>
                <VitalIcon key={"vital-batt"} pt={"10px"}>&#xe1a3;</VitalIcon>
            </MotionFlex>
        </MotionButton>
    );
}

interface StatusBarIcon extends hasChildren {
    template?: string;
    icon?: string;
}

export const VitalIcon: FC<StatusBarIcon & MotionBoxProps> = ({children, ...props }) => {
    return <MotionBox
        color={"#fff"}
        as={"span"}
        fontFamily={"Material Icons"}
        className="material-icons-outlined"
        fontSize={"27px"}
        fontWeight={"100"}
        {...props}
    >
        {children}
    </MotionBox>
}