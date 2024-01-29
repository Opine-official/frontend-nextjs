import { DataTable } from "../DataTable/data-table";
import { NewChannelDialogue } from "./NewChannelDialogue";
import { Channel, columns } from "./columns";

type Props = {};

function getData(): Channel[] {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "TypeScript",
      description: "TypeScript related content",
      categories: ["Technology", "AI", "pending"],
    },
    // ...
  ];
}

const ChannelManagement = (props: Props) => {
  const data = getData();

  return (
    <>
      <NewChannelDialogue />
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default ChannelManagement;
