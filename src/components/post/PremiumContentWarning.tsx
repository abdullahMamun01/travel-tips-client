import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function PremiumContentWarning() {
  return (
    <div className="max-w-full mx-auto px-4 py-8">
      <div className="space-y-8">
        <h1 className="text-red-500 text-center uppercase my-4 font-semibold">This Content Only for Premium member!</h1>
        <Card className="bg-muted">
          <CardHeader>
            
            <CardTitle className="text-2xl font-bold">
              Unlock Full Access to Premium Content
            </CardTitle>
            <CardDescription>
              Upgrade your account to continue reading this premium article and
              access all our exclusive content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Unlimited access to all premium articles</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Exclusive in-depth travel guides</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Ad-free reading experience</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Support quality journalism</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full sm:w-auto">
              Upgrade to Premium
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <div className="prose max-w-none">
          <h2>Why Choose Our Premium Service?</h2>
          <p>
            Our premium service offers an unparalleled travel content
            experience. With in-depth articles, stunning photography, and expert
            insights, you willl gain access to a wealth of information to plan your
            next adventure. From hidden gems to insider tips, our premium
            content is designed to inspire and inform the discerning traveler.
          </p>
          <p>
            By upgrading, you arre not just unlocking content – you are investing
            in quality journalism and supporting our team of dedicated travel
            writers and photographers. Join our community of passionate
            travelers and start exploring the world through our premium lens.
          </p>
        </div>
      </div>
    </div>
  );
}
