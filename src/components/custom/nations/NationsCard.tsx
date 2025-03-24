import * as React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function NationsCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>See Highest GoalScorers of different nations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button asChild className="self-start" variant="destructive">
            <Link href={`/`}>Go to European countries</Link>
          </Button>

          <Button asChild className="self-start" variant="default">
            <Link href={`/`}>Go to African countries</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
