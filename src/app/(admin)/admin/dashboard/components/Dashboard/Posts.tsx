import { Bar, BarChart } from "recharts";
import { CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { GET_POSTS_ANALYTICS } from "@/shared/helpers/endpoints";

type Props = {};

const Posts = (props: Props) => {
  const [postData, setPostData] = useState([]);

  async function getPostAnalytics() {
    try {
      const response = await axiosInstance.get(GET_POSTS_ANALYTICS);

      console.log(response.data);
      const data = response.data.postAnalytics.map((data: any) => {
        let date = new Date(data.date);
        return {
          date: date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          count: data.count,
        };
      });

      setPostData(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getPostAnalytics();
  }, []);

  return (
    <div>
      <h1 className="text-center mb-2 font-thin text-xl">Posts / day</h1>
      <BarChart width={500} height={250} data={postData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="count" />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#000" />
        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
    </div>
  );
};

export default Posts;
