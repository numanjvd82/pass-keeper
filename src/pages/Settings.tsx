import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Settings() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-full lg:w-[300px]">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>This is a simple card component</CardDescription>
        </CardHeader>

        <CardContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            sagittis, nunc nec placerat auctor, metus libero tincidunt eros, nec
            luctus nulla eros sed odio. Nullam auctor, mi nec fermentum
            condimentum, erat libero lacinia mi, nec luctus nulla eros sed odio.
            Nullam auctor, mi nec fermentum condimentum, erat libero lacinia mi,
            nec luctus nulla eros sed odio.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
