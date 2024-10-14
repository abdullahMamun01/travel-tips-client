import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plane, Map, Users } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold text-center">
        About Wanderlust Wisdom
      </h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plane className="mr-2 h-6 w-6 text-blue-500" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            At Wanderlust Wisdom, we are passionate about empowering travelers
            with knowledge and inspiration. Our mission is to provide authentic,
            insightful travel tips and post-destination reflections that help
            you make the most of your journeys, connect with local cultures, and
            create unforgettable memories.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Map className="mr-2 h-6 w-6 text-green-500" />
            Our Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Wanderlust Wisdom is a community-driven platform where seasoned
            travelers and locals share their expertise and experiences. We
            offer:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>In-depth travel guides for destinations worldwide</li>
            <li>
              Practical tips on planning, packing, and navigating new places
            </li>
            <li>
              Cultural insights to help you travel respectfully and meaningfully
            </li>
            <li>Personal stories and reflections from diverse travelers</li>
            <li>A forum for travelers to connect and share advice</li>
          </ul>
        </CardContent>
      </Card>

      <h2 className="mb-6 text-3xl font-semibold text-center">Meet Our Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: "Alex Rivera",
            role: "Founder & Travel Enthusiast",
            avatar: "/placeholder.svg?height=100&width=100",
          },
          {
            name: "Sam Chen",
            role: "Chief Editor & Culture Expert",
            avatar: "/placeholder.svg?height=100&width=100",
          },
          {
            name: "Lena Kowalski",
            role: "Community Manager & Adventurer",
            avatar: "/placeholder.svg?height=100&width=100",
          },
        ].map((member) => (
          <Card key={member.name}>
            <CardHeader>
              <Avatar className="h-20 w-20 mx-auto">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-center mt-4">{member.name}</CardTitle>
              <CardDescription className="text-center">
                {member.role}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-6 w-6 text-purple-500" />
            Join Our Community
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            We are always looking for passionate travelers to contribute their
            knowledge and experiences. If you would like to become a part of
            Wanderlust Wisdom, we would love to hear from you!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
