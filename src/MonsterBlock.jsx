function MonsterBlock({ monster, showHide }) {
    const speeds = Object.keys(monster.speed).map((key) => {
        return key
    });

    return (
        <div>
            <h1 onClick={() => showHide(monster.index)}>{monster.name}</h1>
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
                </>
            ) : null}
        </div>
    )
}


export default MonsterBlock