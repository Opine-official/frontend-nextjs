import React from "react";
import BanDialog from "./BanDialog";

type Props = {
  report: any;
};

const ReportDetails = ({ report }: Props) => {
  return (
    <div className="px-6">
      <h2 className="text-2xl font-bold mb-10">Report Summary</h2>
      <div className="space-y-2">
        <p>
          <b>Reported by:</b> {report.reporter}
        </p>
        <p>
          <b>Reason:</b> {report.reason}
        </p>
        <p>
          <b>Reported on:</b> {report.createdAt}
        </p>
        <BanDialog report={report} />
      </div>
    </div>
  );
};

export default ReportDetails;
