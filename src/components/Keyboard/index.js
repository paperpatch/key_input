import { useCallback, useEffect, useState } from "react";
import KeyIndex from "../KeyIndex";
import { Stats } from "../Stats";

// import utils
import keySoundSrc from "../../assets/sound/keySound.mp3";
import failSoundSrc from "../../assets/sound/tile_break.wav";
import successSoundSrc from "../../assets/sound/successSound.mp3";
import css from "../../assets/scss/Main.module.scss";
import "./Keyboard.css";

// Preload sounds
const keySound = new Audio(keySoundSrc);
const failSound = new Audio(failSoundSrc);
const successSound = new Audio(successSoundSrc);

// Set playback rates and volume
keySound.playbackRate = 2;
failSound.playbackRate = 1.5;
failSound.volume = 0.2;
successSound.playbackRate = 1.1;

const playSound = (audio) => {
  try {
    audio.currentTime = 0; // Reset to start
    audio.play();
  } catch (err) {
    console.error("Audio playback failed:", err);
  }
};

function Keyboard(set) {
  const {
    allowedKeys,
    amountKeys,
    timerSwitch,
    statsSwitch,
    timer: countdownTime,
    theme,
  } = set;

  const [callReset, setCallReset] = useState(false);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [showSuccessText, setShowSuccessText] = useState(false);
  const [showFailureText, setShowFailureText] = useState(false);
  const [keys, setKeys] = useState("");
  const [countdown, setCountdown] = useState(countdownTime);
  const [timer, setTimer] = useState(Date.now());
  const [scores, setScores] = useState([]);
  const [failedKeys, setFailedKeys] = useState([]);

  const reset = useCallback(() => {
    if (!allowedKeys || allowedKeys.length === 0) return;

    let newKeys = "";
    const maxKeys = Math.min(amountKeys, 15);
    for (let i = 0; i < maxKeys; i++) {
      newKeys += allowedKeys[Math.floor(Math.random() * allowedKeys.length)];
    }

    setCurrentKeyIndex(0);
    setShowSuccessText(false);
    setShowFailureText(false);
    setKeys(newKeys);
    setTimer(Date.now());
    setFailedKeys([]);
    setCountdown(countdownTime);
  }, [allowedKeys, amountKeys, countdownTime]);

  // Initial Reset to Start the Game
  useEffect(() => {
    reset();
  }, [reset]);

  // Button Game Reset
  useEffect(() => {
    if (callReset) {
      reset();
    }
    setCallReset(false);
  }, [allowedKeys, callReset, reset]);

  // Update Countdown
  useEffect(() => {
    if (countdown <= 0) {
      setCountdown(0.0);
      failure();
      return;
    }

    const timerId = setInterval(() => {
      if (timerSwitch) {
        setCountdown((prev) => parseFloat((prev - 0.1).toFixed(1)));
      }
    }, 100);

    // Clear interval to avoid memory leaks
    return () => clearInterval(timerId);
  }, [countdown, timerSwitch]);

  const success = useCallback(() => {
    playSound(successSound);
    const elapsedTime = countdownTime - countdown;
    setScores((prev) => [...prev, { time: elapsedTime * 1000, success: true }]);
    setShowSuccessText(true);
    setTimeout(reset, 1000);
  }, [countdown, countdownTime, reset]);

  const failure = useCallback(() => {
    playSound(failSound);
    const elapsedTime = countdownTime - countdown;
    setFailedKeys((prev) => [...prev, currentKeyIndex]);
    setScores((prev) => [
      ...prev,
      { time: elapsedTime * 1000, success: false },
    ]);
    setShowFailureText(true);
    setTimeout(reset, 1000);
  }, [currentKeyIndex, countdown, countdownTime, reset]);

  const useKeyPress = useCallback(
    (e) => {
      if (
        !allowedKeys.includes(e.key.toUpperCase()) ||
        failedKeys.length ||
        currentKeyIndex >= keys.length
      ) {
        failure();
        return;
      }

      if (e.key.toUpperCase() === keys[currentKeyIndex].toUpperCase()) {
        setCurrentKeyIndex((prev) => prev + 1);
        if (currentKeyIndex < keys.length - 1) {
          playSound(keySound);
        } else {
          success();
        }
      } else {
        failure();
      }
    },
    [allowedKeys, currentKeyIndex, failedKeys, keys, success, failure]
  );

  const progressWidth = `${Math.min((countdown / countdownTime) * 100, 100)}%`;

  useEffect(() => {
    window.addEventListener("keydown", useKeyPress);
    return () => window.removeEventListener("keydown", useKeyPress);
  }, [useKeyPress]);

  return (
    <div className={`main-container ${statsSwitch ? "show-stats" : ""}`}>
      <div className="keyboard-wrapper">
        {showSuccessText && (
          <>
            <div className="text-glow success-text">SUCCESS</div>
            <div className="success-glow"></div>
          </>
        )}
        {showFailureText && (
          <>
            <div className="text-glow failure-text">FAILURE</div>
            <div className="failure-glow"></div>
          </>
        )}
        <div className="keyboard-content">
          <KeyIndex
            keys={keys}
            css={css}
            failedKeys={failedKeys}
            currentKeyIndex={currentKeyIndex}
          />
          {/* Progress Bar */}
          <div className="progress-bar-container">
            <div className="progress-bar-background">
              <div
                className="progress-bar-fill"
                style={{ width: progressWidth }}
              >
                <span className="progress-bar-text">{`${countdown}s`}</span>
              </div>
            </div>
          </div>
          {/* Reset Button */}
          <div className="reset-button-container">
            <button className="reset-button" onClick={() => setCallReset(true)}>
              Reset
            </button>
          </div>
        </div>
      </div>
      {statsSwitch && (
        <div className="stats-content">
          <Stats
            scores={scores}
            amountKeys={amountKeys}
            countdownTime={countdownTime}
          />
        </div>
      )}
    </div>
  );
}

export default Keyboard;
