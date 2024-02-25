import React from "react";
import Registration from "./Registrations";
import Posts from "./Posts";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <>
      <Registration />
      <Posts />
    </>
  );
};

export default Dashboard;
