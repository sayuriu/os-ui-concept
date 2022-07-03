import {MotionBox, MotionButton, MotionFlex, MotionImage} from "@components/chakra-motion";
import {
    FC, PointerEventHandler, useCallback,
    useEffect, useLayoutEffect,
    useRef,
    useState
} from "react";
import {hasChildren, Optional, waitAsync} from "@utils/utils";
import {Forceful} from "@utils/AnimFunc";
import { useAnimation, useDragControls, useMotionValue } from "framer-motion";
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

    const windowAnimController = useAnimation();
    const positionX = useMotionValue(positionBeforeFS.x);
    const positionY = useMotionValue(positionBeforeFS.y);

    let resizeDebounce = false;

    // useLayoutEffect(() => {
    //     if (isFullScreen && fullScreenTransition) return;
    //         setPositionBeforeFS(windowRef.current.getBoundingClientRect());
    // }, [])

    useEffect(() => {
        const _ref = windowRef.current;
        const resizeListener = new ResizeObserver(([ev]) => {
            if (resizeDebounce || fullScreenTransition) return;
            // console.log(ev.borderBoxSize[0]);
            const [{ inlineSize, blockSize }] = ev.borderBoxSize
            // setSizeBeforeFS({
            //     width: inlineSize,
            //     height: blockSize,
            // })
        });
        resizeListener.observe(_ref);

        const listener = (ev: PointerEvent) => {
            if (!isDragging) return;
            setSnapPosition(() => ({ x: ev.clientX, y: ev.clientY }));
        }
        window.addEventListener('pointermove', listener)
        return () => {
            resizeListener.unobserve(_ref);
            window.removeEventListener('pointermove', listener);
            windowAnimController.stop();
        };
    }, []);

    const determineTransition = useCallback((condition: boolean) => ({
        duration: condition ? .5 : .2,
        ease: condition ? Forceful : "linear",
    }), [])

    const toggleFullScreen = async (_isDragging = false) => {
        if (!isFullScreen)
        {
            setSizeBeforeFS(windowRef.current.getBoundingClientRect());
            setPositionBeforeFS({ x: positionX.get(), y: positionY.get() });
        }
        setIsFullScreen((wasFullScreen) => {
            (async () => {
                const positionTransitionDef = determineTransition(!_isDragging);
                setFullScreenTransition(true);
                await windowAnimController.start({
                    width: wasFullScreen ? sizeBeforeFS.width : 1920,
                    height: wasFullScreen ? sizeBeforeFS.height: 1030,
                    x: !_isDragging && wasFullScreen ?
                        (wasFullScreen ? positionBeforeFS.x : 0) :
                        (snapPosition.x! + sizeBeforeFS.width / 2),
                        // undefined,
                    y: !_isDragging && wasFullScreen ?
                        (wasFullScreen ? positionBeforeFS.y : 0) :
                        (snapPosition.y! + 30 / 2),
                        // undefined,
                }, {
                    ...determineTransition(true),
                    x: positionTransitionDef,
                    y: positionTransitionDef,
                });
                setFullScreenTransition(false);
                windowAnimController.set({
                    x: undefined,
                    y: undefined
                });
                setSnapPosition(() => ({ x: undefined, y: undefined }));
            })();
            return !wasFullScreen;
        })
    }

    const dragControls = useDragControls();
    const startDrag: PointerEventHandler<HTMLDivElement> =(event) => {
        dragControls.start(event);
    }

    const onDragStart = () => {
        setIsDragging(() => {
            if (isFullScreen)
                toggleFullScreen(true);
            return true;
        });
    }

    return <MotionFlex
        position={"absolute"}
        ref={windowRef}
        initial={false}
        animate={windowAnimController}
        style={{
            x: positionX,
            y: positionY,
        }}
        bg={"red"}
        flexDir={"column"}
        transition={{
            duration: .2,
            ease: "linear"
        }}
        onLayoutAnimationStart={console.log}
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
                (isFullScreen && !isDragging) ? 0 :
                (1920 - sizeBeforeFS.width),
            bottom:
                (isFullScreen && !isDragging) ? 0 :
                (1030 - sizeBeforeFS.height),
        }}
        dragControls={dragControls}
        dragListener={false}
        onDragStart={onDragStart}
        onDragEnd={() => setIsDragging(() => false)}
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

            <MotionButton onClick={() => toggleFullScreen()}/>
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