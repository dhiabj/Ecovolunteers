import React from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import './leaderboard.scss';
import { Link } from 'react-router-dom';

const Leaderboard = ({ club, setClub }) => {
  const data = club.members.map((member) => {
    return {
      id: member.userId._id,
      img: member.userId.img,
      name: member.userId.firstname + ' ' + member.userId.lastname,
      events: member.userId.eventsAttended,
      points: member.userId.points,
    };
  });

  const columns = [
    {
      name: '',
      selector: 'img',
      width: '80px',
      cell: (d) => (
        <Link to={`/profile/${d.id}`}>
          <img
            src={`http://localhost:5000/uploads/${d.img}`}
            className="round-member-pfp"
            alt=""
          />
        </Link>
      ),
    },
    {
      name: 'Name',
      selector: 'name',
    },
    {
      name: 'Events Attended',
      selector: 'events',
    },
    {
      name: 'Total Points',
      selector: 'points',
      sortable: true,
    },
  ];
  const tableData = {
    columns,
    data,
  };

  return (
    <DataTableExtensions {...tableData}>
      <DataTable
        title="Leaderboard"
        columns={columns}
        pagination
        defaultSortField="points"
        highlightOnHover
      />
    </DataTableExtensions>
  );
};

export default Leaderboard;
