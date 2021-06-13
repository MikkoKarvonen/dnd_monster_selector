import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import MonsterBlock from "./MonsterBlock";
import { Layout, Input, List } from "antd";
import "antd/dist/antd.css";

const { Sider, Content } = Layout;
require("dotenv").config();

function App() {
  const [monsters, setMonsters] = useState([]);
  const [selectedMonsters, setSelectedMonsters] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredMonsters, setFilteredMonsters] = useState([]);

  useEffect(() => {
    const fetchMonsters = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/monsters/`
      );
      setMonsters(result.data);
      setFilteredMonsters(result.data);
    };
    fetchMonsters();
  }, []);

  const selectMonster = async (index) => {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/monsters/${index}`
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

  const filterMonsters = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setFilteredMonsters(monsters);
    } else {
      let copy = [...monsters];
      copy = copy.filter((monster) => {
        return monster.name.toLowerCase().includes(inputValue.toLowerCase());
      });
      setFilteredMonsters(copy);
    }
    setFilter(inputValue);
  };

  return (
    <Layout>
      <Sider theme="light">
        <List
          size="small"
          header={<Input value={filter} onChange={(e) => filterMonsters(e)} />}
          bordered
          dataSource={filteredMonsters}
          renderItem={(monster) => (
            <List.Item
              key={monster.index}
              onClick={() => selectMonster(monster.index)}
            >
              {monster.name}
            </List.Item>
          )}
        />
      </Sider>
      <Content>
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
      </Content>
    </Layout>
  );
}

export default App;
