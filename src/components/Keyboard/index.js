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

const restrictedKeys = [
  "Escape",
  "CapsLock",
  "Shift",
  "Control",
  "Alt",
  "Meta",
  "Tab",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "PageUp",
  "PageDown",
  "Backspace",
  "Enter",
  " ",
  "Delete",
  "Insert",
  "Home",
  "End",
  "PrintScreen",
  ...Array.from({ length: 12 }, (_, i) => `F${i + 1}`),
];

function Keyboard(set) {
  const {
    allowedKeys,
    amountKeys,
    timer: initialTime,
    timerSwitch,
    setTimerSwitch,
    statsSwitch,
    theme,
  } = set;

  const [callReset, setCallReset] = useState(false);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [keys, setKeys] = useState("");
  const [failedKeys, setFailedKeys] = useState([]);
  const [keysPressed, setKeysPressed] = useState([]);
  const [locked, setLocked] = useState(false);
  const [showSuccessText, setShowSuccessText] = useState(false);
  const [showFailureText, setShowFailureText] = useState(false);
  const [countdown, setCountdown] = useState(initialTime);
  const [scores, setScores] = useState([]);

  const reset = useCallback(() => {
    if (!allowedKeys || allowedKeys.length === 0) return;

    const maxKeys = Math.min(amountKeys, 15);
    const newKeys = Array.from(
      { length: maxKeys },
      () => allowedKeys[Math.floor(Math.random() * allowedKeys.length)]
    ).join("");

    setCurrentKeyIndex(0);
    setShowSuccessText(false);
    setShowFailureText(false);
    setKeys(newKeys);
    setFailedKeys([]);
    setKeysPressed([]);
    setCountdown(initialTime);
    setLocked(false);
  }, [allowedKeys, amountKeys, initialTime]);

  // Initial Reset to Start the Game
  useEffect(() => reset(), [reset]);

  // Button Game Reset
  useEffect(() => {
    if (callReset) {
      setScores([]);
      reset();
    }
    setCallReset(false);
  }, [callReset, reset]);

  // Update Countdown
  useEffect(() => {
    if (showSuccessText || showFailureText) return;
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

  /*
  Key being a parameter circumvents the state timing issues. Only solution I've found so far.
  "key != undefined" avoids stats graph page passing through undefined values.
  */
  const recordScore = (success, failedKey = null, key) => {
    const elapsedTime = (initialTime - countdown).toFixed(1);
    setScores((prev) => [
      ...prev,
      {
        time: elapsedTime,
        success,
        keysPressed:
          key != undefined ? [...keysPressed, key] : [...keysPressed],
        amountKeys,
        initialTime,
        countdown,
        failedKey,
      },
    ]);
  };

  const success = useCallback(
    (key) => {
      playSound(successSound);
      recordScore(true, null, key);
      setShowSuccessText(true);
      setLocked(true);

      setTimeout(() => {
        reset();
        setLocked(false);
      }, 1000);
    },
    [countdown, initialTime, keysPressed, reset]
  );

  const failure = useCallback(
    (key) => {
      const failedKey = keys[currentKeyIndex].toUpperCase();
      playSound(failSound);
      recordScore(false, failedKey, key);
      setFailedKeys((prev) => [...prev, currentKeyIndex]);
      setShowFailureText(true);
      setLocked(true);

      setTimeout(() => {
        reset();
        setLocked(false);
      }, 1000);
    },
    [currentKeyIndex, keys, keysPressed, reset]
  );

  const useKeyPress = useCallback(
    (e) => {
      if (locked || restrictedKeys.includes(e.key)) return;

      const key = e.key.toUpperCase();

      if (currentKeyIndex >= keys.length || !allowedKeys.includes(key)) {
        failure(key);
        return;
      }

      setKeysPressed((prev) => [...prev, key]);

      if (key === keys[currentKeyIndex].toUpperCase(key)) {
        setCurrentKeyIndex((prev) => prev + 1);
        playSound(keySound);

        if (currentKeyIndex === keys.length - 1) success(key);
      } else {
        failure(key);
      }
    },
    [allowedKeys, currentKeyIndex, keys, locked, success, failure]
  );

  useEffect(() => {
    window.addEventListener("keydown", useKeyPress);
    return () => window.removeEventListener("keydown", useKeyPress);
  }, [useKeyPress]);

  const progressWidth = `${Math.min((countdown / initialTime) * 100, 100)}%`;

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
          <div className="button-container">
            <button
              className={`timer-button ${timerSwitch ? "active" : ""}`}
              onClick={() => setTimerSwitch((prev) => !prev)}
            >
              {timerSwitch ? "Timer" : "Timer"}
            </button>
            <button className="reset-button" onClick={() => setCallReset(true)}>
              Reset
            </button>
          </div>
        </div>
      </div>
      {statsSwitch && (
        <div className="stats-content">
          <Stats scores={scores} />
        </div>
      )}
    </div>
  );
}

export default Keyboard;
