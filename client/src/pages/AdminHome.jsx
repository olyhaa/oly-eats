import React from 'react';
import Header from 'components/Header';
import EditTags from 'components/admin/EditTags';

function AdminHome() {
  return (
    <>
      <Header title="OlyEats: Admin" />
      <EditTags />
    </>
  );
}

export default AdminHome;
