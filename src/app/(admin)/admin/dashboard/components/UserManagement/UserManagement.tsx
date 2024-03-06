import axiosInstance from "@/shared/helpers/axiosInstance";
import { DataTable } from "../DataTable/data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { GET_REPORTS } from "@/shared/helpers/endpoints";

type Props = {};

const UserManagement = (props: Props) => {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await axiosInstance.get(GET_REPORTS);

      console.log(response.data);

      const tableData = response.data.reportedUsers.map((usr: any) => {
        return {
          id: usr.userReportId,
          reason: usr.reason,
          reporter: usr.reportedUser.username,
          reported: usr.reportedUser.username,
          date: new Date(usr.createdAt).toLocaleDateString(),
          status: usr.isUserBanned ? "Banned" : "Not Banned",
        };
      });

      setData(tableData);
    } catch (e) {}
  }

  const refetchData = () => getData();

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <DataTable columns={columns(getData)} data={data} />
    </>
  );
};

export default UserManagement;
