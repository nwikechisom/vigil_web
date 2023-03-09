import React, { useState, useEffect } from 'react';

const Table = ({ employees, handleEdit, handleDelete, handleDetail }) => {
  employees.forEach((employee, i) => {
    employee.id = i + 1;
  });

  const [logs, setLogs] = useState([]);
   useEffect(() => {
      fetch('https://localhost:7080/api/Vigil/GetChanges')
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setLogs(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>File</th>
            <th>Modifier</th>
            <th>Event</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log, i) => (
              <tr key={log.trackedFileId}>
                <td>{i +1}</td>
                <td>{log.trackedFile.filePath}</td>
                <td>{log.modifier}</td>
                <td>{log.event}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(log.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-right">
                  <button
                    onClick={() => handleDetail(log.id)}
                    className="button muted-button"
                  >
                    Detail
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(log.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Logs</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;