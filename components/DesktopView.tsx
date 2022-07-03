import {MotionBox, MotionButton, MotionFlex} from "@components/chakra-motion";
import { GlobalColorConfigs } from "@utils/config";
import { StatusBar } from "./StatusBar/StatusBar";
import {hasChildren, Tappable} from "@utils/utils";
import {FC, useEffect, useState} from "react";
import {Clock} from "@components/StatusBar/Clock";
import {AnimatePresence} from "framer-motion";
import {CalendarWidget} from "@widgets/CalendarWidget/Calendar";
import {Vitals} from "@components/StatusBar/Vitals";
import {SystemStats} from "@components/StatusBar/SystemStats";
import {Box} from "@chakra-ui/react";

interface IDesktopOverlay extends Tappable<void> {
    visible?: boolean
}

const DesktopOverlay: FC<IDesktopOverlay> = ({ visible, onClick }) => {
    return <MotionButton
        p={0}
        borderRadius={0}
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? .5 : 0 }}
        transition={{ ease: [0.88, 0, 0, 1], duration: .5 }}
        gridColumnStart={1}
        gridRowStart={1}
        gridRowEnd={3}
        h={"100%"}
        w={"100%"}
        bg={"#000"}
        zIndex={50}
        _hover={{ bg: "#000" }}
        _active={{ bg: "#000" }}
        onClick={() => onClick ? onClick() : false}
        pointerEvents={visible ? "all" : "none"}
    >

    </MotionButton>
}

export const DesktopView: FC<hasChildren> = ({ children }) => {
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const cb = (ev: KeyboardEvent) => {
            if (ev.key === 'l' && ev.ctrlKey && ev.altKey)
                setIsLoggedIn(false);
        };
        window.addEventListener("keydown", cb)
        return () => {
            window.removeEventListener("keydown", cb)
        }
    }, [calendarVisible])
    const ClockClickCallback = () => {
        if (!calendarVisible)
            setCalendarVisible(true)
    }

    const OverlayOnClick = () => {
        setCalendarVisible(false);
        if (!isLoggedIn)
            setIsLoggedIn(true);
    }

    return <MotionBox
        h={1080}
        w={1920}
        bg={`url(${GlobalColorConfigs.desktopWallpaperURL})`}
        objectFit={"fill"}
        className={"rel grid overflow-hidden"}
        gridTemplateRows={"50px auto"}
        gridTemplateColumns={"100%"}
    >
        <AnimatePresence>
            {isLoggedIn &&
                <StatusBar>
                    <MotionFlex gap={34} h={"100%"} w={"calc((1920px - 145px) / 2)"} flexDir={"row"} alignItems={"center"}>
                        <MotionButton h={"100%"} w={"50px"} p={0}>

                        </MotionButton>
                        <MotionFlex h={38} gap={"10px"}>
                            <MotionButton h={"85%"} w={"85%"}></MotionButton>
                            <MotionButton h={"85%"} w={"85%"}></MotionButton>
                            <MotionButton h={"85%"} w={"85%"}></MotionButton>
                            <MotionButton h={"85%"} w={"85%"}></MotionButton>
                        </MotionFlex>
                    </MotionFlex>
                    <Clock
                        GMTOffset={7}
                        onClick={ClockClickCallback}
                        MTtogglable={calendarVisible}
                    />
                    <MotionFlex h={"100%"} w={"calc((1920px - 145px) / 2)"} flexDir={"row-reverse"} gap={"100px"}>
                        <Vitals/>
                        <SystemStats/>
                    </MotionFlex>
                </StatusBar>
            }
        </AnimatePresence>
        <AnimatePresence>
            {calendarVisible &&
                <CalendarWidget
                    position={"absolute"}
                    inset={"70px calc((1920px - 600px) / 2)"}
                    initial={{ y: -600 }}
                    exit={{ y: -600 }}
                    zIndex={51}
                />}
        </AnimatePresence>
        <DesktopOverlay visible={calendarVisible || !isLoggedIn} onClick={OverlayOnClick}/>
        <Box gridColumnStart={1} gridRowStart={2} gridRowEnd={3} className={"rel"}>
            {children}
        </Box>
    </MotionBox>
}