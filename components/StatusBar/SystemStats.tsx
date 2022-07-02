import {MotionBox, MotionBoxProps, MotionButton, MotionButtonProps, MotionFlex} from "@components/chakra-motion";
import {FC, useEffect, useState} from "react";
import {Forceful} from "@utils/AnimFunc";
import {VitalIcon} from "@components/StatusBar/Vitals";
import {hasChildren} from "@utils/utils";
import {AnimatePresence} from "framer-motion";

interface ISystemStats {
    CPU: number;
    RAM: number;
    GPU: number;
}

const transition = {
    duration: .3,
    ease: Forceful
}

const toPercentageString = (value: number) => (Math.floor(value * 100).toString() + "%").padStart(4, "0");

const SystemStatsPanel = () => {

}

export const SystemStats: FC = () => {
    const [stats, setStats] = useState<ISystemStats>({ CPU: 0, GPU: 0, RAM: 0 });
    const [currentFocus, setCurrentFocus] = useState(0);

    const toggleFocus = (index: number) => {
        setCurrentFocus(() => currentFocus === index ? 0 : index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setStats({
                CPU: Math.random(),
                RAM: Math.random(),
                GPU: Math.random(),
            })
        }, 1000);
        return () => clearInterval(interval);
    });
    return <MotionFlex
            gap={"10px"}
            p={0}
            h={"100%"}
            fontFamily={"JetBrains Mono"}
            color={"#fff"}
            justifyContent={"space-around"}
            alignItems={"center"}
            animate={{ background: "hsla(0, 0%, 12%, 0)" }}
            whileHover={{ background: "hsla(0, 0%, 12%, 1)" }}
            transition={{ duration: .5, ease: Forceful }}
        >
            <SystemStatItem
                icon={"\ue30d"}
                percentage={stats.CPU}
                label={"CPU"}
                panelVisible={currentFocus === 1}
                onClick={() => toggleFocus(1)}
            >
                {/*<h1>CPU</h1>*/}
            </SystemStatItem>
            <SystemStatItem
                icon={"\ue322"}
                percentage={stats.RAM}
                label={"RAM"}
                panelVisible={currentFocus === 2}
                onClick={() => toggleFocus(2)}
            />
                {/*<h1>RAM</h1>*/}
            <SystemStatItem
                icon={"\uea00"}
                percentage={stats.GPU}
                label={"GPU"}
                panelVisible={currentFocus === 3}
                onClick={() => toggleFocus(3)}
            />
                {/*<h1>GPU</h1>*/}
            <MotionButton h={"100%"} w={"20px"}/>
        </MotionFlex>
}

interface ISystemStatItem {
    label?: string;
    icon: string;
    percentage: number;
    percentageVisible?: boolean;
    panelVisible?: boolean;
}
const SystemStatItem: FC<ISystemStatItem & MotionButtonProps & hasChildren> = ({
    label,
    icon,
    percentage,
    percentageVisible = true,
    panelVisible,
    onClick = () => {},
    children,
    ...props
}) => {
    const [isHovering, setIsHovering] = useState(false);
    const percentageString = toPercentageString(percentage);

    const textProps: MotionBoxProps = {
        as: 'p',
        transition,
    }

    useEffect(() => {}, []);
    return <MotionButton
        h={"90%"}
        transition={{ duration: .2, ease: Forceful }}
        animate={{ background: "hsla(0, 0%, 100%, 0%)" }}
        whileHover={{ background: "hsla(0, 0%, 100%, 100%)" }}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        className={"rel"}
        display={"grid"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gridTemplateColumns={"1fr 1fr"}
        gridTemplateRows={"100%"}
        p={0}
        gap={"5px"}
        {...props}
    >
        <MotionBox
            gridRowStart={1}
            gridColumnStart={1}
            gridColumnEnd={2}
            bg={"#fff"}
            animate={{ height: percentageString }}
            transition={transition}
        />
        <VitalIcon gridRowStart={1} gridColumnStart={1} mixBlendMode={'exclusion'}>{icon}</VitalIcon>
        &nbsp;
        <MotionFlex
            gridRowStart={1}
            gridColumnStart={2}
            mixBlendMode={"exclusion"}
            flexDir={"column"}
            overflow={"hidden"}
            h={"100%"}
        >
            <MotionBox animate={{ y: (isHovering && label) ? "7px" : "17px" }} {...textProps} pr={"5px"}>{percentageString}</MotionBox>
            {label && <MotionBox fontWeight={"light"} animate={{ y: isHovering ? "7px" : "37px" }} {...textProps} pr={"7px"}>{label}</MotionBox>}
        </MotionFlex>
        <AnimatePresence>
            {
                panelVisible && <MotionBox
                    className={"abs"}
                    w={"150px"}
                    top={"70px"}
                    left={"0"}
                    bg={"#000"}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 30, opacity: 0 }}
                    transition={Object.assign(transition, { duration: .5 })}
                >
                    {children}
                </MotionBox>
            }
        </AnimatePresence>
    </MotionButton>
}