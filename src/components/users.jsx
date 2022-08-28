import React, { useState } from "react"
import api from "../api"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())    

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user._id !== userId))
    }
    const count = users.length

    let classes = "badge m-1 "
    classes += count === 0 ? "bg-danger" : "bg-primary"

    const handlePhrase = () => {
        return count === 0 ? <h1>Никто с тобой не тусанет сегодня</h1> : <h1>Сколько людей тусанет с тобой сегодня: {count}</h1>
    }
    return (
        <> 
            <span className={classes}>{handlePhrase()}</span>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Качества</th>
                            <th>Профессия</th>
                            <th>Встретились раз</th>
                            <th>Оценка</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{users.map((user) => {
                        return (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>
                                    {user.qualities.map(qual => (
                                        <span className={`badge m-1` + qual.color}>
                                            {qual.name}
                                        </span>
                                    ))}
                                </td>
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{user.rate}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
        </>
    )
}

export default Users