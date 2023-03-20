import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Detail = ({ selectedFileId, setIsDetailed}) => {

  const [change, setChanges] = useState([]);
   useEffect(() => {
      fetch(`https://localhost:7080/api/Vigil/GetChangesByFile/${selectedFileId}`)
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setChanges(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

  return (
    <div className="small-container">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>File</th>
            <th>Modifier</th>
            <th>Event</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {change.length > 0 ? (
            change.map((chng, i) => (
              <tr key={chng.id}>
                <td>{i +1}</td>
                <td>{chng.trackedFile.filePath}</td>
                <td>{chng.modifier}</td>
                <td>{chng.event}</td>
                <td>{chng.createdAt}</td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Files found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: '30px' }}>
          {/* <input type="submit" value="Update" /> */}
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Close"
            onClick={() => setIsDetailed(false)}
          />
        </div>
    </div>
  );
};

export default Detail;