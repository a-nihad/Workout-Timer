import { useEffect, useMemo, useState } from "react";
import Calcutator from "./components/Calcutator";
import ToggleSounds from "./components/ToggleSounds";

function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

function App() {
  const [time, setTime] = useState(formatTime(new Date()));
  const [allowSound, setAllowSound] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const partOfDay = time.slice(-2);
  const workouts = useMemo(() => {
    return [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8,
      },
      {
        name: "Arms + Legs",
        numExercises: 6,
      },
      {
        name: "Arms only",
        numExercises: 3,
      },
      {
        name: "Legs only",
        numExercises: 4,
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4,
      },
    ];
  }, [partOfDay]);

  return (
    <main>
      <h1> Workout timer </h1>
      <time> for your workout on {time} </time>
      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calcutator workouts={workouts} allowSound={allowSound} />
    </main>
  );
}

export default App;
