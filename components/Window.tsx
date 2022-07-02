import {MotionBox, MotionButton, MotionFlex, MotionImage} from "@components/chakra-motion";
import {
    FC, PointerEventHandler,
    useEffect, useLayoutEffect,
    useRef,
    useState
} from "react";
import {hasChildren, Optional, waitAsync} from "@utils/utils";
import {Forceful} from "@utils/AnimFunc";
import {useDragControls, useMotionValue} from "framer-motion";
import {Box, Flex} from "@chakra-ui/react";
import {IApplication} from "@states/Task";

interface IWindow {
    title: string;
    iconURL?: string;
    minimized?: boolean;
    scrollableX?: boolean;
    scrollableY?: boolean;
    initialSize?: Dimension;
}

export type IApplicationWindow = FC<IWindow & hasChildren>

interface Position {
    x: number;
    y: number;
}

interface Dimension {
    height: number,
    width: number
}

const windowBoundaries = [
    [0, 50],
    [1920, 1080],
]

export const Application: FC<hasChildren & IApplication> = ({
    children,
    instances,
    appId,
    iconURL,
}) => {
    return <>
        {}
    </>
}

export const Window: IApplicationWindow = ({
    title,
    children,
    minimized = false,
    iconURL,
    initialSize= {width: 1000, height: 500},
    scrollableX = false,
    scrollableY = false
}) => {
    const windowRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
    const [isFocused, setIsFocused] = useState(true);

    const [isDragging, setIsDragging] = useState(false);
    const [positionBeforeFS, setPositionBeforeFS] = useState<Position>({ x: 0, y: 60 });
    const [snapPosition, setSnapPosition] = useState<Optional<Position>>({ x: undefined, y: undefined })
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [fullScreenTransition, setFullScreenTransition] = useState(false);

    const [sizeBeforeFS, setSizeBeforeFS] = useState<Dimension>({ width: 1000, height: 500 });

    const _x = useMotionValue(positionBeforeFS.x);
    const _y = useMotionValue(positionBeforeFS.y);

    useLayoutEffect(() => {
        if (isFullScreen) return;
        const { width, height } = windowRef.current.getBoundingClientRect();
        setSizeBeforeFS(() => ({
           width,
           height
        }));
    }, [isDragging]);

    useEffect(() => {
        const _ref = windowRef.current;
        const listener = (ev: PointerEvent) => {
            if (!isDragging) return;
            setSnapPosition(() => ({ x: ev.clientX, y: ev.clientY }));
        }
        window.addEventListener('pointermove', listener)
        _ref.addEventListener('resize', console.log);
        return () => {
            _ref.removeEventListener('resize', console.log);
            window.removeEventListener('pointermove', listener);
        };
    }, []);

    const toggleFullScreen = () => {
        if (!isFullScreen)
            setPositionBeforeFS(() => ({ x: _x.get(), y: _y.get() }));

        setIsFullScreen(() => !isFullScreen);
        setFullScreenTransition(() => true);
        waitAsync(200).then(() => {
            setSnapPosition(() => ({ x: undefined, y: undefined }));
        })
    }

    const dragControls = useDragControls();
    const startDrag: PointerEventHandler<HTMLDivElement> =(event) => {
        dragControls.start(event);
    }

    const evaluatePositionX = () => {
        if (fullScreenTransition && !isDragging)
        {
            if (isFullScreen)
                return 0;
            return positionBeforeFS.x;
        }
        if (snapPosition.x)
            return snapPosition.x - sizeBeforeFS.width / 2;
        return undefined;
    }
    const evaluatePositionY = () => {
        if (fullScreenTransition && !isDragging)
        {
            if (isFullScreen)
                return 0;
            return positionBeforeFS.y;
        }
        if (snapPosition.y)
            return snapPosition.y - windowRef.current.clientHeight / 2;
        return undefined;
    }

    const evaluateHeight = () => {
        return undefined;
    }

    function evaluateWidth() {
        return undefined;
    }

    const onTransitionEnd = () => {
        setFullScreenTransition(false);
    };

    return <MotionFlex
        position={"absolute"}
        ref={windowRef}
        initial={false}
        animate={{
            x: evaluatePositionX(),
            y: evaluatePositionY(),
            width: evaluateWidth(),
            height: evaluateHeight(),
        }}
        style={{
            x: _x,
            y: _y,
        }}
        bg={"red"}
        flexDir={"column"}
        transition={{
            duration: fullScreenTransition ? .5 : .2,
            ease: fullScreenTransition ? Forceful : "linear"
        }}
        onLayoutAnimationStart={console.log}
        onTransitionEnd={onTransitionEnd}
        zIndex={isFocused ? 45 : 2}
        minH={"200px"}
        minW={"300px"}
        maxH={"1030px"}
        maxW={"1920px"}
        resize={isFullScreen ? "none" : "both"}
        overflow={"hidden"}
        drag
        dragConstraints={{
            left: 0,
            top: 0,
            right:
                (isFullScreen) ? 0 :
                (1920 - sizeBeforeFS.width),
            bottom:
                (isFullScreen) ? 0 :
                (1030 - sizeBeforeFS.height)
        }}
        dragControls={dragControls}
        dragListener={false}
        onDragStart={() => {
            setIsDragging(true);
            if (isFullScreen)
                toggleFullScreen();
        }}
        onDragEnd={() => setIsDragging(false)}
        layout
    >
        <Flex
            w={"100%"}
            h={"40px"}
            bg={"#000"}
            alignItems={"center"}
            className={"rel"}
            justifyContent={"space-between"}
            onPointerDown={startDrag}
        >
            <Flex>
                {iconURL && <MotionImage userSelect={"none"} className={"no-pointer"} height={'35px'} width={'35px'} src={iconURL} alt={''}/>}
                <Box className={"no-pointer"} as={"p"} userSelect={"none"} fontFamily={"Jetbrains Mono"} color={"#fff"}>{title}</Box>
            </Flex>

            <MotionButton onClick={toggleFullScreen}/>
        </Flex>
        <MotionBox
            overflowX={scrollableX ? "auto" : "hidden"}
            overflowY={scrollableY ? "auto" : "hidden"}
            flexGrow={1}
            bg={"blue"}
        >
            {children}
        </MotionBox>
    </MotionFlex>
};