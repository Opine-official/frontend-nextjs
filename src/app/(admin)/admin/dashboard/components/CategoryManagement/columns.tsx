"use client";
import { FiCopy, FiTrash2 } from "react-icons/fi";
import { ColumnDef } from "@tanstack/react-table";
import ShowChannelsDialog from "./ShowChannelsDialog";
import { ModifyCategoryDialogue } from "./ModifyCategoryDialogue";
import DeleteCategoryAlert from "./DeleteCategoryAlert";

export type Category = {
  id: string;
  name: string;
  channels: string[];
};

const ActionCell = ({ category, refreshData }: any) => {
  return (
    <div className="flex gap-x-4">
      <FiCopy
        className="cursor-pointer"
        onClick={() => navigator.clipboard.writeText(category.id)}
      />

      <ModifyCategoryDialogue refreshData={refreshData} category={category} />

      <DeleteCategoryAlert refreshData={refreshData} category={category} />
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
    accessorKey: "channels",
    header: "Channels",
    cell: ({ row }) => {
      return <ShowChannelsDialog categoryId={row.original.id} />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;

      return <ActionCell refreshData={refreshData} category={category} />;
    },
  },
];
