"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import DeletePostAlert from "./DeletePostAlert";

export type Category = {
  id: string;
  name: string;
  channels: string[];
};

const ActionCell = ({ report, refreshData }: any) => {
  console.log(report);
  return (
    <div className="flex">
      <Button
        onClick={() => window.open(`https://opine/${report.slug}`)}
        variant="link"
      >
        View
      </Button>
      <DeletePostAlert refreshData={refreshData} report={report} />
    </div>
  );
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
    accessorKey: "title",
    header: "Title",
  },
  { accessorKey: "reporter", header: "Reported By" },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const report = row.original;

      return <ActionCell refreshData={refreshData} report={report} />;
    },
  },
];
