import { DataTable } from "../DataTable/data-table";
import { Category, columns } from "./columns";
import { NewCategoryDialogue } from "./NewCategoryDialogue";

type Props = {};

function getData(): Category[] {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Technology",
      channels: ["TypeScript", "AI", "pending"],
    },
    // ...
  ];
}

const CategoryManagement = (props: Props) => {
  const data = getData();

  return (
    <>
      <NewCategoryDialogue />
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default CategoryManagement;
