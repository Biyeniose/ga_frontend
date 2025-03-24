import * as React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BDorCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>See All Ballon Dor Rankings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button asChild className="self-start" variant="default">
            <Link href={`/`}>See 2024 Rankings</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
