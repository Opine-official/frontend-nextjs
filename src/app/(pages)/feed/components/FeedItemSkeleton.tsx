import { Avatar } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FeedItemSkeleton = () => {
  return (
    <Card className="w-[800px]">
      <CardHeader>
        <div className="flex gap-x-2 items-center mb-4">
          <Avatar>
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </Avatar>
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
    </Card>
  );
};

export default FeedItemSkeleton;
