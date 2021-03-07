import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile(){
    const {level}=useContext(ChallengeContext)

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/ighorfmelo.png" alt="Ighor Melo"/>
            <div>
                <strong>Ighor Melo</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}