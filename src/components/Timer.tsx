import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from  '../styles/components/Timer.module.css';

export function Timer(){
    const{set5minutes, set10minutes, set15minutes, set20minutes, set25minutes, set30minutes, set1hour} =useContext(CountdownContext);
    const {TimerSelectorOpen} = useContext(CountdownContext);
    return(
        <div className={styles.overlayTimer}>
            <div className={styles.containerTimer}>
                <p>Quanto tempo você deseja até o próximo desafio?</p>
                <div>
                    <button 
                    className={styles.TimerButton5m}
                    onClick={set5minutes}>5 Minutos <span>+1 xp</span></button>
                    <button className={styles.TimerButton5m} onClick={set10minutes}>10 minutos <span>+3 xp</span></button>
                    <button className={styles.TimerButton5m} onClick={set15minutes}>15 minutos <span>+5 xp</span></button>
                    <button className={styles.TimerButton5m} onClick={set20minutes}>20 minutos <span>+8 xp</span></button>
                    <button className={styles.TimerButton5m} onClick={set25minutes}>25 minutos <span>+10 xp</span></button>
                    <button className={styles.TimerButton5m} onClick={set30minutes}>30 minutos <span>+12 xp</span></button>
                    <button className={styles.TimerButton5m} onClick={set1hour}>1 hora <span>+15 xp</span></button>
                </div>
            </div>
        </div>
    )
}