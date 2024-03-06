import axiosInstance from "@/shared/helpers/axiosInstance";
import { DataTable } from "../DataTable/data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { GET_POST_REPORTS } from "@/shared/helpers/endpoints";

type Props = {};

const ArticleManagement = (props: Props) => {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await axiosInstance.get(GET_POST_REPORTS);

      console.log(response.data.reportedPosts);

      const tableData = response.data.reportedPosts.map((post: any) => {
        console.log(post);
        return {
          id: post.postReportId,
          reason: post.reason,
          reporter: post.reporterUser.username,
          title: post.reportedPost.title,
          slug: post.reportedPost.slug,
        };
      });

      console.log(tableData);

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
