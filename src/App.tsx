import { Button } from "@/components/ui/button";
import "./App.css";
import { Card, CardHeader, CardTitle } from "./components/ui/card";

function App() {
  return (
    <div className="h-screen p-4 flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Hello world!</CardTitle>
          <Button>Click me</Button>
        </CardHeader>
      </Card>
    </div>
  );
}

export default App;
