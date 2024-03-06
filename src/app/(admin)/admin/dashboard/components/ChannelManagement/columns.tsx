"use client";
import { FiCopy } from "react-icons/fi";
import { ColumnDef } from "@tanstack/react-table";
import ShowCategoriesDialog from "./ShowCategoriesDialog";
import { ModifyChannelDialogue } from "./ModifyChannelDialogue";
import DeleteChannelAlert from "./DeleteChannelAlert";

export type Category = {
  id: string;
  name: string;
  categories: string[];
};

const ActionCell = ({ channel, refreshData }: any) => {
  return (
    <div className="flex gap-x-4">
      <FiCopy
        className="cursor-pointer"
        onClick={() => navigator.clipboard.writeText(channel.id)}
      />

      <ModifyChannelDialogue refreshData={refreshData} channel={channel} />

      <DeleteChannelAlert refreshData={refreshData} channel={channel} />
    </div>
  );
};

export const columns = (refreshData: () => void): ColumnDef<Category>[] => [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  { accessorKey: "description", header: "Description" },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => {
      return <ShowCategoriesDialog channelId={row.original.id} />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const channel = row.original;

      return <ActionCell refreshData={refreshData} channel={channel} />;
    },
  },
];
