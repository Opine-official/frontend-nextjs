import axiosInstance from "@/shared/helpers/axiosInstance";
import { DataTable } from "../DataTable/data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";

type Props = {};

const ArticleManagement = (props: Props) => {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await axiosInstance.get("/post/reports");

      console.log(response.data);

      const tableData = response.data.reportedPosts.map((post: any) => {
        return {
          id: post.postReportId,
          reason: post.reason,
          reporter: post.reporterUser.username,
          reported: post.reportedPost.title,
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

export default ArticleManagement;
