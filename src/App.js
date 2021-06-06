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
    result.data.show = true;
    if (!selectedMonsters.some((e) => e.index === result.data.index))
      setSelectedMonsters((selectedMonsters) => [
        ...selectedMonsters,
        result.data,
      ]);
  };

  const showHide = (index) => {
    let copy = [...selectedMonsters];
    let found = copy.find((x) => x.index === index);
    if (found.show) {
      found.show = false;
    } else {
      found.show = true;
    }
    setSelectedMonsters(copy);
  };

  const removeMonster = (index) => {
    let copy = [...selectedMonsters];
    copy = copy.filter((monster) => {
      return monster.index !== index;
    });
    setSelectedMonsters(copy);
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
          return (
            <MonsterBlock
              key={monster.index}
              monster={monster}
              showHide={showHide}
              removeMonster={removeMonster}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
