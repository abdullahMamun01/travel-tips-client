
import ProfileHeader from "@/components/profile/ProfileHeader";

import TabsContentSection from "@/components/profile/TabsContentSection";

import { Card, CardContent } from "@/components/ui/card";

type Props ={
    params: {
        userId: string
    }
}
export default function ProfilePage({params: {userId}}:Props) {
 

  return (
    <div className="container mx-auto py-6 px-4">
    
      <Card className="mb-8">
        <CardContent className="p-6">
          <ProfileHeader  userId={userId}/>
      
        </CardContent>
      </Card>

      <TabsContentSection  userId={userId} />
    </div>
  );
}
