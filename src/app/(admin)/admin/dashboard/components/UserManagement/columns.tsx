"use client";
import { ColumnDef } from "@tanstack/react-table";
import BanUserAlert from "./BanUserAlert";

export type Category = {
  id: string;
  name: string;
  channels: string[];
};

const ActionCell = ({ report, refreshData }: any) => {
  return <BanUserAlert refreshData={refreshData} report={report} />;
};

export const columns = (refreshData: () => void): ColumnDef<Category>[] => [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "reported",
    header: "User",
  },
  { accessorKey: "reporter", header: "Reported By" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const report = row.original;

      return <ActionCell refreshData={refreshData} report={report} />;
    },
  },
];
