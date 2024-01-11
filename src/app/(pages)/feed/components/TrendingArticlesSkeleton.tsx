import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TrendingArticlesSkeleton: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-[250px]" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {[...Array(5)].map((_, index) => (
          <p key={index}>
            <Skeleton className="h-4 w-full" />
          </p>
        ))}
      </CardContent>
    </Card>
  );
};

export default TrendingArticlesSkeleton;
