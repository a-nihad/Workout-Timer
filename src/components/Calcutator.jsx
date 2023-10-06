import { memo, useState } from "react";

function Calcutator({ workouts }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);

  const duration = number * sets * speed;
  const mins = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

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
        <div>
          <label> Break length </label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(Number(e.target.value))}
          />
          <span> {durationBreak} minutes/break </span>
        </div>
      </form>
      <section>
        <button> - </button>
        <p>
          {mins < 10 && 0}
          {mins}:{seconds < 10 && 0}
          {seconds}
        </p>
        <button> + </button>
      </section>
    </>
  );
}

export default memo(Calcutator);
