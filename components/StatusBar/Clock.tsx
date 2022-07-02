import {MotionBox, MotionBoxProps, MotionButton, MotionFlex} from "@components/chakra-motion";
import {AnimationProps} from "framer-motion";
import {FC, ReactNode, useEffect, useState} from "react";
import {Tappable} from "@utils/utils";
import {Forceful} from "@utils/AnimFunc";
import {useAtom} from "jotai";
import {SystemPref} from "@states/Global";

interface ITime {
    hr: string;
    h12: string;
    mn: string;
    sc: string;
}

const transition = {
    duration: .3,
    ease: Forceful
}

function formatTime(time: string): ITime {
    const [hr, mn, sc] = time.match(/(.{2}):(.{2}):(.{2})/gm)![0].split(':');
    return { hr, h12: hr, mn, sc };
}

interface IClockDigit {
    digit: string,
    fadable?: boolean,
    color?: string,
    light?: boolean
}
const ClockDigit: FC<IClockDigit> = ({ digit, fadable = false, color, light = false }) => {
    return <MotionBox
        as={"span"}
        initial={{ color: "#dddddd" }}
        animate={{
            color: digit === "0" && fadable ? "#444444" : (Boolean(color) ? color : "#dddddd")
        }}
        fontWeight={light ? "light" : "normal"}
        transition={transition}
    >
        {digit}
    </MotionBox>
}

const ClockLabel: FC<{ children: ReactNode }> = ({ children }) =>
    <MotionBox layout={"position"} as={"p"} fontFamily={"Jetbrains Mono"} fontSize={46} fontWeight={"light"}>{children}</MotionBox>
const ClockLabelMinor: FC<{ children: ReactNode } & MotionBoxProps> = ({ children, ...props }) =>
    <MotionBox
        layout={"position"}
        as={"p"}
        fontFamily={"Jetbrains Mono"}
        fontSize={18}
        transition={transition}
        {...props}
    >{children}</MotionBox>

interface IClockConfig extends Tappable<void> {
    MTtogglable?: boolean;
    defadeZerosOnHover?: boolean;
    forceDefade?: boolean;
    GMTOffset?: number;
}

export const Clock: FC<IClockConfig> = ({
    onClick,
    MTtogglable,
    forceDefade,
    GMTOffset = 0,
}) => {
    const [useMT, setUseMT] = useAtom(SystemPref.Time.UseMilitary);
    const [blinkAnim] = useAtom(SystemPref.Clock.BlinkAnimation);
    const [defadeZerosOnHover] = useAtom(SystemPref.Clock.DefadeZerosOnHover);

    const [currentTime, setCurrentTime] = useState(formatTime("//://://"));
    const [isAM, setIsAM] = useState(false);
    const [fadable, setFadable] = useState(true);
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            const formatted = formatTime(new Date(Date.now() + GMTOffset * 3600000).toISOString());
            if (!useMT)
            {
                const hr = Number(formatted.hr) - 12;
                if (hr > 0)
                    formatted.hr = hr.toString().padStart(2, '0');
                if (hr == -12)
                    formatted.hr = "12";
                setIsAM(hr < 0)
            }
            setCurrentTime(formatted);
            if (blinkAnim)
                setBlink(b => !b);
            else {
                if (!blink)
                    setBlink(true);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [useMT, GMTOffset]);

    const clickCallback = () =>{
        if (MTtogglable)
            setUseMT(!useMT)
        if (onClick)
            onClick();
    }

    const hoverCallback = (newState: boolean) => {
        if (defadeZerosOnHover)
            setFadable(newState);
    }

    const _fadable = fadable || forceDefade;

    return <MotionButton
        h={"100%"}
        w={"145px"}
        p={0}
        bg={"transparent"}
        onClick={clickCallback}
        onHoverStart={() => hoverCallback(false)}
        onHoverEnd={() => hoverCallback(true)}
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        overflow={"hidden"}
        borderRadius={0}
    >
        <MotionFlex
            h={"100%"}
            w={"100%"}
            justifyContent={"space-around"}
            alignItems={"center"}
        >
            <ClockLabel>
                <ClockDigit digit={currentTime.hr[0]} fadable={_fadable}/>
                <ClockDigit digit={currentTime.hr[1]}/>
            </ClockLabel>
            <MotionBox as={"p"} fontSize={30} animate={{ color: blink ? "#dddddd" : "#555555" }} transition={transition}>◦</MotionBox>
            <ClockLabel>
                <ClockDigit digit={currentTime.mn[0]} fadable={_fadable}/>
                <ClockDigit digit={currentTime.mn[1]}/>
            </ClockLabel>
            {'∙'}
            <MotionFlex layout={"size"} flexDir={"column"} justifyContent={"center"} gap={"0px"}>
                <ClockLabelMinor animate={{ y: useMT ? "10px" : 0}}>
                    <ClockDigit digit={currentTime.sc[0]} fadable={_fadable}/>
                    <ClockDigit digit={currentTime.sc[1]}/>
                </ClockLabelMinor>
                <ClockLabelMinor
                    initial={{ y: useMT ? undefined : "30px" }}
                    animate={{ y: useMT ? "30px" : 0 }}
                    // transition={Object.assign(transition,  { delay: useMT ? 0 : .5 })}
                >
                    <ClockDigit digit={currentTime.hr[0] === "░" ? "░░" : (isAM ? "AM" : "PM")} color={isAM ? '#3ba4fa' : "#5cbc6b"}/>
                </ClockLabelMinor>
            </MotionFlex>
        </MotionFlex>
    </MotionButton>
}