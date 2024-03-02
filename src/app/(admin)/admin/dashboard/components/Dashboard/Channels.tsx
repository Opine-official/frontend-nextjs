import { Bar, BarChart } from "recharts";
import { CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { GET_TOP_CHANNELS } from "@/shared/helpers/endpoints";

type Props = {};

const Channels = (props: Props) => {
  const [registrationData, setRegistrationData] = useState([]);

  async function getTopChannels() {
    try {
      const response = await axiosInstance.get(GET_TOP_CHANNELS);
      console.log(response.data.channels);

      const data = response.data.channels.map((data: any) => {
        return {
          name: data.name,
          count: data.subscriberCount,
        };
      });

      console.log(response.data);
      setRegistrationData(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getTopChannels();
  }, []);

  return (
    <div>
      <h1 className="text-center mb-2 font-thin text-xl">Top channels</h1>
      <BarChart width={500} height={250} data={registrationData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="count" />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#000" />
        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
    </div>
  );
};

export default Channels;
