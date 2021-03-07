import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from '../contexts/ChallengesContext';
import { Timer } from '../components/Timer';
import { CompletedChallenges } from "../components/CompletedChallenges";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    stopCountdown: () => void;
    set5minutes: () => void;
    set10minutes: () => void;
    set15minutes: () => void;
    set20minutes: () => void;
    set25minutes: () => void;
    set30minutes: () => void;
    set1hour: () => void;
    TimerSelectorOpen: boolean;
    OpenTimerSelector: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)
let countdownTimeout: NodeJS.Timeout;


export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge, timerExperience} = useContext(ChallengeContext);

    const [time, setTime] = useState(0 * 60);
    const [isActive, setisActive] = useState(false);
    const [hasFinished, sethasFinished] = useState(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const [TimerSelectorOpen, setTimerSelectorOpen] = useState(true);
    function closeTimerSelector() {
        setTimerSelectorOpen(false);
    }
    function OpenTimerSelector() {
        setTimerSelectorOpen(true);
    }

    function set5minutes() {
        setTime(60 * 0.1);
        closeTimerSelector();
        timerExperience(1);
    }
    function set10minutes() {
        setTime(60 * 0.2);
        closeTimerSelector();
        timerExperience(3);
    }
    function set15minutes() {
        setTime(60 * 0.3);
        closeTimerSelector();
        timerExperience(5);
    }
    function set20minutes() {
        setTime(60 * 0.4);
        closeTimerSelector();
        timerExperience(8);
    }
    function set25minutes() {
        setTime(60 * 0.5);
        closeTimerSelector();
        timerExperience(10);
    }
    function set30minutes() {
        setTime(60 * 0.6);
        closeTimerSelector();
        timerExperience(12);
    }
    function set1hour() {
        setTime(60 * 0.7);
        closeTimerSelector();
        timerExperience(15);
    }
    function startCountdown() {
        setisActive(true);
    }
    function stopCountdown() {
        clearTimeout(countdownTimeout);
        setisActive(false);
        OpenTimerSelector();
        sethasFinished(false);
        
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => { setTime(time - 1) }, 1000)
        }
        else if (isActive && time == 0) {
            sethasFinished(true);
            setisActive(false);
            startNewChallenge();
        }
    }, [isActive, time])



    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            stopCountdown,
            set5minutes,
            set10minutes,
            set15minutes,
            set20minutes,
            set25minutes,
            set30minutes,
            set1hour,
            TimerSelectorOpen,
            OpenTimerSelector
        }}>

            {children}
            {TimerSelectorOpen && <Timer />}
        </CountdownContext.Provider>
    )
}