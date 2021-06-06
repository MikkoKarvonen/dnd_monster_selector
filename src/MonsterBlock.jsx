function MonsterBlock({ monster, showHide, removeMonster }) {
    const speeds = Object.keys(monster.speed).map((key) => {
        return key
    });

    return (
        <div>
            <div>
                <h1 onClick={() => showHide(monster.index)}>
                    {monster.name}
                </h1>
                <button onClick={() => removeMonster(monster.index)}>X</button>
            </div>
            {monster.show ? (
                <>
                    <p>{`${monster.size} ${monster.type}, ${monster.alignment}`}</p>
                    <table>
                        <tbody>
                            <tr>
                                <th>AC</th>
                                <th>HP</th>
                                <th>Speed</th>
                            </tr>
                            <tr>
                                <td>{monster.armor_class}</td>
                                <td>{`${monster.hit_points} (${monster.hit_dice})`}</td>
                                <td>
                                    {speeds.map(speed => {
                                        return <p key={`${monster.index}_${speed}`}>{speed}: {monster.speed[speed]}</p>
                                    })}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr>
                                <th>Str</th>
                                <th>Dex</th>
                                <th>Con</th>
                                <th>Int</th>
                                <th>Wis</th>
                                <th>Cha</th>
                            </tr>
                            <tr>
                                <td>{monster.strength}</td>
                                <td>{monster.dexterity}</td>
                                <td>{monster.constitution}</td>
                                <td>{monster.intelligence}</td>
                                <td>{monster.wisdom}</td>
                                <td>{monster.charisma}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        {monster.special_abilities.map(ability => {
                            return (
                                <div>
                                    <h3>{ability.name}</h3>
                                    <p>{ability.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <h2>Actions</h2>
                        {monster.actions.map(action => {
                            return (
                                <div>
                                    <h3>{action.name}</h3>
                                    <p>{action.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </>
            ) : null}
        </div>
    )
}


export default MonsterBlock