import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUPModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    challengesCompleted: number;
    currentExperience: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    experienceToNextLevel: number;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
    timerExperience: (experience)=>void;
}
interface ChallengesProviderProps {
    children: ReactNode;
    level: number
    currentExperience: number,
    challengesCompleted:number,
}

export const ChallengeContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({ children, ...rest}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    const[isLevelUpModalOpen, setIsLevelUpModal]=useState(false);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted])


    function timerExperience(experience){
        let finalExperience= currentExperience+experience;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();

            setCurrentExperience(finalExperience);
        }
        else{
            setCurrentExperience(finalExperience);
        }

    }
    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModal(true);

    }
    function closeLevelUpModal(){
        setIsLevelUpModal(false);
    }
    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();
        if (Notification.permission === 'granted') {
            new Notification('Novo desafio ????', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }


    function resetChallenge() {
        setActiveChallenge(null);
    }
    

    function completeChallenge() {
       if (!activeChallenge) {
            return;
        }
        const { amount } = activeChallenge;
    
        let finalExperience = currentExperience + amount;
    
        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();

            setCurrentExperience(finalExperience);
            setActiveChallenge(null);
            setChallengesCompleted(challengesCompleted + 1);
        }
        else{
            setCurrentExperience(finalExperience);
            setActiveChallenge(null);
            setChallengesCompleted(challengesCompleted + 1);
        }
    }


    return (
        <ChallengeContext.Provider
            value={{
                level,
                challengesCompleted,
                currentExperience,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
                closeLevelUpModal,
                timerExperience
            }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengeContext.Provider>
    )
}