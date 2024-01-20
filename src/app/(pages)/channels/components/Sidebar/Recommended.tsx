import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {};

const channels = [
  "Programming",
  "Design",
  "Productivity",
  "Marketing",
  "Music",
  "Gaming",
  "Sports",
  "Movies",
  "Books",
  "Science",
  "Technology",
];

const Recommended = (props: Props) => {
  const rows = [];
  for (let i = 0; i < channels.length; i += 3) {
    rows.push(channels.slice(i, i + 3));
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended</CardTitle>
      </CardHeader>
      <CardContent>
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginBottom: "0.5rem",
            }}
          >
            {row.map((channel) => (
              <Badge
                key={channel}
                className="text-sm py-1 font-thin"
              >{`${channel}`}</Badge>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Recommended;
