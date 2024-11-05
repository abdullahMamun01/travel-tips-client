import ProfileHeader from "@/components/profile/ProfileHeader";

import TabsContentSection from "@/components/profile/TabsContentSection";

import { Card, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <Card className="mb-8">
        <CardContent className="p-6">
          <ProfileHeader />
        </CardContent>
      </Card>

      <TabsContentSection />
    </div>
  );
}
