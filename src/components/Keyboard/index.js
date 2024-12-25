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
  "Space",
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
    statsSwitch,
    theme,
  } = set;

  const [callReset, setCallReset] = useState(false);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [keys, setKeys] = useState("");
  const [failedKeys, setFailedKeys] = useState([]);
  const [locked, setLocked] = useState(false);
  const [showSuccessText, setShowSuccessText] = useState(false);
  const [showFailureText, setShowFailureText] = useState(false);
  const [countdown, setCountdown] = useState(initialTime);
  const [scores, setScores] = useState([]);

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
    setFailedKeys([]);
    setCountdown(initialTime);
    setLocked(false);
  }, [allowedKeys, amountKeys, initialTime]);

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

  const success = useCallback(() => {
    playSound(successSound);
    const elapsedTime = initialTime - countdown;
    const timeInSeconds = elapsedTime.toFixed(1);
    setScores((prev) => [
      ...prev,
      {
        time: timeInSeconds,
        success: true,
        keysPressed: currentKeyIndex + 1,
        amountKeys: amountKeys,
        initialTime: initialTime,
        countdown: countdown,
      },
    ]);
    setShowSuccessText(true);
    setLocked(true);
    setTimeout(() => {
      reset();
      setLocked(false);
    }, 1000);
  }, [currentKeyIndex, countdown, initialTime, reset]);

  const failure = useCallback(() => {
    playSound(failSound);
    const elapsedTime = initialTime - countdown;
    const timeInSeconds = elapsedTime.toFixed(1);
    setFailedKeys((prev) => [...prev, currentKeyIndex]);
    setScores((prev) => [
      ...prev,
      {
        time: timeInSeconds,
        success: false,
        keysPressed: currentKeyIndex + 1,
        amountKeys: amountKeys,
        initialTime: initialTime,
        countdown: countdown,
      },
    ]);
    setShowFailureText(true);
    setLocked(true);
    setTimeout(() => {
      reset();
      setLocked(false);
    }, 1000);
  }, [currentKeyIndex, countdown, initialTime, reset]);

  const useKeyPress = useCallback(
    (e) => {
      if (locked) return;

      if (restrictedKeys.includes(e.key)) {
        return;
      }

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
    [allowedKeys, currentKeyIndex, failedKeys, keys, locked, success, failure]
  );

  const progressWidth = `${Math.min((countdown / initialTime) * 100, 100)}%`;

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
          <Stats scores={scores} />
        </div>
      )}
    </div>
  );
}

export default Keyboard;
