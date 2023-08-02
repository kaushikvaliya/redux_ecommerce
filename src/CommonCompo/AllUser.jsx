import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, updateUser, deleteUser } from '../actions/userActions';

const AllUser = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleUpdateUser = (userId, newData) => {
        dispatch(updateUser(userId, newData));
    };

    const handleDeleteUser = (userId) => {
        dispatch(deleteUser(userId));
    };

    return (
        <div>
            <h1>All Users</h1>
            {users.loading ? (
                <p>Loading users...</p>
            ) : users.error ? (
                <p>Error: {users.error}</p>
            ) : (
                <ul>
                    {users.data.map((user) => (
                        <li key={user.id}>
                            {user.name} - {user.email}
                            <button onClick={() => handleUpdateUser(user.id, { name: 'Updated Name' })}>
                                Update
                            </button>
                            <button onClick={() => handleDeleteUser(user.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AllUser;
