import React, { useState, useEffect } from 'react';

const Table = ({ handleDetail }) => {

  const [files, setFiles] = useState([]);
   useEffect(() => {
      fetch('https://localhost:7080/api/Vigil/GetTrackedFiles')
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setFiles(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Author</th>
            <th>File</th>
            <th>Hash</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {files.length > 0 ? (
            files.map((file, i) => (
              <tr key={file.id}>
                <td>{i +1}</td>
                <td>{file.author}</td>
                <td>{file.filePath}</td>
                <td>{file.initiationHash}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleDetail(file.id)}
                    className="button muted-button"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Files found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;