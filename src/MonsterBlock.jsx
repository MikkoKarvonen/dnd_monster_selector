import { Card, Button, Space, Table, Typography, Tag } from 'antd';
import { CloseOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
const { Column } = Table;
const { Text } = Typography;


function MonsterBlock({ monster, showHide, removeMonster }) {
    const speeds = Object.keys(monster.speed).map((key) => {
        return key
    });

    const senses = Object.keys(monster.senses).map((key) => {
        return key
    });

    const savingThrows = [];
    const skills = [];
    monster.proficiencies.map(proficiency => {
        const obj = { value: proficiency.value }
        if (proficiency.proficiency.index.includes("saving")) {
            obj.name = proficiency.proficiency.name.replace("Saving Throw: ", "")
            savingThrows.push(obj)
        } else if (proficiency.proficiency.index.includes("skill")) {
            obj.name = proficiency.proficiency.name.replace("Skill: ", "")
            skills.push(obj)
        }
    })

    const arrowIcon = monster.show ? <ArrowUpOutlined /> : <ArrowDownOutlined />

    const combatSpeeds = [];
    speeds.map(speed => {
        combatSpeeds.push(`${speed}: ${monster.speed[speed]}`)
    })
    const combatStats = [
        {
            ac: monster.armor_class,
            hp: `${monster.hit_points} (${monster.hit_dice})`,
            speeds: combatSpeeds
        }
    ]

    const monsterStats = [
        {
            str: monster.strength,
            dex: monster.dexterity,
            con: monster.constitution,
            int: monster.intelligence,
            wis: monster.wisdom,
            cha: monster.charisma,
        }
    ]

    const savingThrowsObj = {};
    savingThrows.map(saving => {
        savingThrowsObj[saving.name] = saving.value
    })
    const savingThrowsRender = [savingThrowsObj];

    const skillsObj = {};
    skills.map(skill => {
        skillsObj[skill.name] = skill.value
    })
    const skillsRender = [skillsObj];


    return (
        <Card
            title={monster.name}
            extra={
                <Space>
                    <Button type="primary" icon={arrowIcon} onClick={() => showHide(monster.index)} size={'large'} />
                    <Button type="primary" icon={<CloseOutlined />} onClick={() => removeMonster(monster.index)} size={'large'} />
                </Space>}
            bodyStyle={{ padding: "0" }}
        >
            {monster.show ? (
                <>
                    <p>{`${monster.size} ${monster.type}, ${monster.alignment}`}</p>
                    <Table dataSource={combatStats} pagination={false}>
                        <Column title="AC" dataIndex="ac" key="ac" />
                        <Column title="HP" dataIndex="hp" key="hp" />
                        <Column title="Speeds" dataIndex="speeds" key="speeds" render={speeds => (
                            <>
                                {speeds.map(speed => (
                                    <p>
                                        {speed}
                                    </p>
                                ))}
                            </>
                        )} />
                    </Table>
                    <Table dataSource={monsterStats} pagination={false}>
                        <Column title="STR" dataIndex="str" key="str" />
                        <Column title="DEX" dataIndex="dex" key="dex" />
                        <Column title="CON" dataIndex="con" key="con" />
                        <Column title="INT" dataIndex="int" key="int" />
                        <Column title="WIS" dataIndex="wis" key="wis" />
                        <Column title="CHA" dataIndex="cha" key="cha" />
                    </Table>
                    <div>
                        {savingThrows.length ? (
                            <>
                                <Text strong>Saving Throws</Text>
                                <Table dataSource={savingThrowsRender} pagination={false}>
                                    {savingThrows.map(saving => {
                                        return (
                                            <Column title={saving.name} dataIndex={saving.name} key={saving.name} />
                                        )
                                    })}
                                </Table>
                            </>
                        ) : null}
                        {skills.length ? (
                            <>
                                <Text strong>Skills</Text>
                                <Table dataSource={skillsRender} pagination={false}>
                                    {skills.map(skill => {
                                        return (
                                            <Column title={skill.name} dataIndex={skill.name} key={skill.name} />
                                        )
                                    })}
                                </Table>
                            </>
                        ) : null}
                        {monster.damage_vulnerabilities.length ? (
                            <>
                                <Text type="success">Damage vulnerabilities</Text><br />
                                {monster.damage_vulnerabilities.map(vulnerability => {
                                    return <Tag>{vulnerability}</Tag>
                                })}
                                <br />
                            </>
                        ) : null}
                        {monster.damage_resistances.length ? (
                            <>
                                <Text type="warning">Damage resistances</Text><br />
                                {monster.damage_resistances.map(resistance => {
                                    return <Tag>{resistance}</Tag>
                                })}
                                <br />
                            </>
                        ) : null}
                        {monster.damage_immunities.length ? (
                            <>
                                <Text type="danger">Damage immunities</Text><br />
                                {monster.damage_immunities.map(immunity => {
                                    return <Tag>{immunity}</Tag>
                                })}
                                <br />
                            </>
                        ) : null}
                        {monster.condition_immunities.length ? (
                            <>
                                <Text mark>Condition immunities</Text><br />
                                {monster.condition_immunities.map(immunity => {
                                    return <Tag>{immunity.name}</Tag>
                                })}
                                <br />
                            </>
                        ) : null}
                        {senses.length ? (
                            <div>
                                <p>Senses</p>
                                {senses.map(sense => {
                                    return (
                                        <p>{sense} {monster.senses[sense]}</p>
                                    )
                                })}
                            </div>

                        ) : null}
                        <p>Languages {monster.languages}</p>
                        <p>Challenge {monster.challenge_rating} ({monster.xp}xp)</p>
                    </div>
                    <div>
                        {monster.special_abilities && monster.special_abilities.map(ability => {
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
                        {monster.legendary_actions ? (
                            <div>
                                <h2>Legendary Actions</h2>
                                {monster.legendary_actions.map(action => {
                                    return (<div>
                                        <h3>{action.name}</h3>
                                        <p>{action.desc}</p>
                                    </div>)
                                })}
                            </div>
                        ) : null}
                    </div>
                </>
            ) : null}
        </Card>
    )
}


export default MonsterBlock