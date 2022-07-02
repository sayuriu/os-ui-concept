import {MotionBox, MotionFlex} from "@components/chakra-motion";
import {GlobalColorConfigs} from "@utils/config";
import {FC} from "react";
import {hasChildren} from "@utils/utils";
import {Forceful} from "@utils/AnimFunc";

export const StatusBar: FC<hasChildren> = ({ children }) => {
    return <MotionBox
        w={"100%"}
        bg={GlobalColorConfigs.statusBar}
        animate={{ y: 0, height: "50px" }}
        transition={{ duration: .4, ease: Forceful }}
        exit={{ y: "-70px", height: 0 }}
        initial={{ y: "-70px", height: 0 }}
        zIndex={100}
        gridColumnStart={1}
        gridRowStart={1}
        gridRowEnd={2}
    >
        <MotionBox className={"fw fh rel flex j-flex-space-between"}>
            {children}
        </MotionBox>
    </MotionBox>
}