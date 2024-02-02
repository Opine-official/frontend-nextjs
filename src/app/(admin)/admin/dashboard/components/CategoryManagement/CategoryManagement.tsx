import axiosInstance from "@/shared/helpers/axiosInstance";
import { DataTable } from "../DataTable/data-table";
import { columns } from "./columns";
import { NewCategoryDialogue } from "./NewCategoryDialogue";
import { useEffect, useState } from "react";

type Props = {};

const CategoryManagement = (props: Props) => {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await axiosInstance.get("/channel/categories");

      const tableData = response.data.categories.map((cat: any) => {
        return {
          id: cat.categoryId,
          name: cat.name,
          description: cat.description,
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
      <NewCategoryDialogue />
      <DataTable columns={columns(getData)} data={data} />
    </>
  );
};

export default CategoryManagement;
