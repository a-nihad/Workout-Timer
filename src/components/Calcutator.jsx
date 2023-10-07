import { memo, useEffect, useState } from "react";
import Sound from "../assets/ClickSound.wav";

function Calcutator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [duration, setDuration] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setDuration(number * sets * speed);
  }, [number, sets, speed]);

  const mins = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  useEffect(() => {
    const id = setInterval(() => {
      if (duration === 0) {
        setIsActive(false);
      }

      setDuration(
        isActive && duration > 0 ? (duration) => duration - 1 : duration
      );
    }, 1000);

    return () => clearInterval(id);
  }, [duration, isActive]);

  useEffect(() => {
    const playSound = function () {
      if (!allowSound) return;
      if (isActive && duration > 0) {
        const sound = new Audio(Sound);
        sound.play();
      }
    };

    playSound();
  }, [isActive, allowSound, duration]);

  function handleInc() {
    setDuration((duration) => duration + 60);
  }

  function handleDec() {
    setDuration(duration > 60 ? (duration) => duration - 60 : 0);
  }

  return (
    <>
      <form>
        <div>
          <label> Type of workout </label>
          <select
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
          >
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label> How many sets </label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
          />
          <span> {sets} </span>
        </div>
        <div>
          <label> How fast are you </label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span> {speed} sec/exercises </span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsActive((isActive) => !isActive);
          }}
        >
          {duration === 0 ? "Finished" : isActive ? "Pause" : "Active"}
        </button>
      </form>
      <section>
        <button onClick={handleDec}> - </button>
        <p>
          {mins < 10 && 0}
          {mins}:{seconds < 10 && 0}
          {seconds}
        </p>
        <button onClick={handleInc}> + </button>
      </section>
    </>
  );
}

export default memo(Calcutator);
