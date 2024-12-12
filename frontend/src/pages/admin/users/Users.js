import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Users.css";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Users = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [selectedUsers, setSelectedUsers] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const handleUserSelection = (e, user) => {
        if (e.target.checked) {
            setSelectedUsers([...selectedUsers, user]);
        } else {
            setSelectedUsers(selectedUsers.filter((u) => u.username !== user.username));
        }
    };
    const handleDeleteSelectedUsers = () => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (!confirmed) {
            return;
        }

        axios
            .delete("http://localhost:5000/api/users/delete/users", {
                data: { usernames: selectedUsers.map((user) => user.username) },
            })
            .then((response) => {
                console.log(response.data);
                setUsers(users.filter((user) => !selectedUsers.includes(user)));
                setSelectedUsers([]);
                toast.success('deleted successfully!');
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };



    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                        <h1 className="heading-section">Users</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-wrap">
                            <table className="table table-responsive-xl">
                                <thead>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Image</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Banned</th>
                                        <th>Address</th>
                                        <th>Birthday</th>
                                        <th>Details</th>

                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map(user => (
                                        <tr key={user.username} className="alert" role="alert">
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUsers.includes(user)}
                                                    onChange={(e) => handleUserSelection(e, user)}
                                                />

                                            </td>
                                            <td className="d-flex align-items-center">
                                                <img
                                                    src={`http://localhost:5000/uploads/${user.img}`}
                                                    className="pfp me-3"
                                                    alt=""
                                                />
                                                <div className="pl-3 email">


                                                </div>
                                            </td>

                                            <td>{user.firstname}</td>
                                            <td>{user.lastname}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            {user.role !== "admin" && (
                                                <td className="status">
                                                    <span className={user.banned === "banned" ? "waiting" : "active" + (user.banned === "banned" && user.banduration === "permanent" ? " permanent" : "")}>
                                                        {user.banned === "banned" ? "Banned" : "Active"}
                                                    </span>
                                                </td>
                                            )}

                                            {user.role === "admin" && <td></td>}
                                            <td>{user.address}</td>
                                            <td>{new Date(user.birthday).toLocaleDateString()}</td>
                                            <td>
                                                <Link to={`user/${user.username}`}>
                                                    <img src='/imgs/employee.png' alt='View details' />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button
                            className="btn btn-danger"
                            disabled={selectedUsers.length === 0}
                            onClick={handleDeleteSelectedUsers}
                        >
                            Delete Selected
                        </button>

                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={users.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => paginate(number)} className="page-link">{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Users;