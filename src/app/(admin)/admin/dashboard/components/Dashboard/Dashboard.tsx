import React from "react";
import Registration from "./Registrations";
import Posts from "./Posts";
import Comments from "./Comments";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <>
      <Registration />
      <Posts />
      <Comments />
    </>
  );
};

export default Dashboard;
