


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function PostComments() {

  return (
    <Card className="shadow-lg">
    <CardHeader>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Comments</h2>
    </CardHeader>
    <CardContent>
      <div className="flex items-start space-x-4 mb-6">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Add a comment..."

            className="w-full resize-none"
            rows={3}
          />
          <Button  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white">
            Post Comment
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        
      </ScrollArea>
    </CardContent>
  </Card>
  )
}
