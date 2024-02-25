import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { GET_REGISTRATION_ANALYTICS } from "@/shared/helpers/endpoints";

type Props = {};

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];

const Registration = (props: Props) => {
  const [registrationData, setRegistrationData] = useState([]);

  async function getRegistrationAnalytics() {
    try {
      const response = await axiosInstance.get(GET_REGISTRATION_ANALYTICS);

      const data = response.data.registrationAnalytics.map((data: any) => {
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

      console.log(response.data);
      setRegistrationData(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getRegistrationAnalytics();
  }, []);

  return (
    <div>
      <BarChart width={500} height={250} data={registrationData}>
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

export default Registration;
