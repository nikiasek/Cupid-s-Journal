import React from 'react'
import { useState, useEffect } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async() => {
            try {
                const response = await axiosPrivate.get("/users", {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch(e) {
                console.log(e);
            };
        };

        getUsers();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [])

  return (
    <article>
        <h2>Users list</h2>
        {users?.length
        ? (
            <ul>
                {users.map((user, i) => <li key={i}>{user?.username}</li>)}
            </ul>
        ) :<p> No Users to display</p> }
    </article>
  )
}

export default Users
