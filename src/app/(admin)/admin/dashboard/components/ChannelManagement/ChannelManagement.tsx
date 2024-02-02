import axiosInstance from "@/shared/helpers/axiosInstance";
import { DataTable } from "../DataTable/data-table";
import { columns } from "./columns";
import { NewChannelDialogue } from "./NewChannelDialogue";
import { useEffect, useState } from "react";

type Props = {};

const ChannelManagement = (props: Props) => {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await axiosInstance.get("/channel/channels");

      const tableData = response.data.channels.map((chan: any) => {
        return {
          id: chan.channelId,
          name: chan.name,
          description: chan.description,
        };
      });

      setData(tableData);
    } catch (e) {}
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <NewChannelDialogue />
      <DataTable columns={columns(getData)} data={data} />
    </>
  );
};

export default ChannelManagement;
