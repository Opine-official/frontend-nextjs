import axiosInstance from "@/shared/helpers/axiosInstance";
import { DataTable } from "../DataTable/data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";

type Props = {};

const UserManagement = (props: Props) => {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await axiosInstance.get("/user/reports");

      console.log(response.data);

      const tableData = response.data.reportedUsers.map((usr: any) => {
        return {
          id: usr.userReportId,
          reason: usr.reason,
          reporter: usr.reporterUser.username,
          reported: usr.reportedUser.username,
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
