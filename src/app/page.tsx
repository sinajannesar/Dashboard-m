import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 text-center">
          Welcome to My Website
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Featured Section</CardTitle>
              <CardDescription>Discover our latest updates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                This is a beautiful card component from shadcn/ui that you can
                use to display important content.
              </p>
              <Button className="mt-4">Learn More</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About Us</CardTitle>
              <CardDescription>Get to know our story</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                We are dedicated to providing the best experience for our users
                through innovative solutions.
              </p>
              <Button variant="outline" className="mt-4">
                Read More
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4">

          <Link href="/login"  >
            <Button variant="default" formMethod='post'>Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="secondary">Sign up</Button>
          </Link>

        </div>
      </div>
    </main>
  );
}





