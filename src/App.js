import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import MonsterBlock from "./MonsterBlock";

function App() {
  const [monsters, setMonsters] = useState([]);
  const [selectedMonsters, setSelectedMonsters] = useState([]);

  useEffect(() => {
    const fetchMonsters = async () => {
      const result = await axios.get(`https://www.dnd5eapi.co/api/monsters/`);
      setMonsters(result.data.results);
    };
    fetchMonsters();
  }, []);

  const selectMonster = async (index) => {
    const result = await axios.get(
      `https://www.dnd5eapi.co/api/monsters/${index}`
    );
    if (!selectedMonsters.some((e) => e.index === result.data.index))
      setSelectedMonsters((selectedMonsters) => [
        ...selectedMonsters,
        result.data,
      ]);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <ul>
          {monsters.map((monster) => {
            return (
              <li
                key={monster.index}
                onClick={() => selectMonster(monster.index)}
              >
                {monster.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="content">
        {selectedMonsters.map((monster) => {
          return <MonsterBlock key={monster.index} monster={monster} />;
        })}
      </div>
    </div>
  );
}

export default App;
