import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PostCardProps } from '@/types/next-auth'


export function PostCard({ title, body, onViewMore }: PostCardProps) {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-lg font-bold min-h-[3rem] text-blue-500">{title}</h2>
          <p className="text-gray-600 min-h-[6rem]">{body}</p>
        </div>
        <Button className="w-full hover:bg-blue-500/30 mt-4 bg-blue-500" onClick={onViewMore}>
          View More
        </Button>
      </CardContent>
    </Card>
  );
}
