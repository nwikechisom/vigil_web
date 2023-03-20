import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';

import Detail from './Detail';

const Dashboard = ({ setIsAuthenticated }) => {
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [isDetailed, setIsDetailed] = useState(false);

  const handleDetail = id => {
    setSelectedFileId(id);
    setIsDetailed(true);
  };

  return (
    <div className="container">
      {!isDetailed && (
        <>
          <Header
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            handleDetail={handleDetail}
          />
        </>
      )}
      {isDetailed && (
        <Detail
          selectedFileId={selectedFileId}
          setIsDetailed={setIsDetailed}
        />
      )}
    </div>
  );
};

export default Dashboard;