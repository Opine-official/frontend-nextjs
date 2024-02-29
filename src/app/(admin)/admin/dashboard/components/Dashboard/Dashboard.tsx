import React from "react";
import Registration from "./Registrations";
import Posts from "./Posts";
import Comments from "./Comments";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="grid grid-cols-2 gap-10">
      <Registration />
      <Posts />
      <Comments />
    </div>
  );
};

export default Dashboard;
