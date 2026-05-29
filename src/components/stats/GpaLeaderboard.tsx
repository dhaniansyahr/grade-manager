import { GpaDisplay } from "@/components/grades/GpaDisplay";
import { Card } from "@/components/ui/Card";
import type { StudentResponse } from "@/types";

interface GpaLeaderboardProps {
  highest: StudentResponse | null;
  lowest: StudentResponse | null;
}

export function GpaLeaderboard({ highest, lowest }: GpaLeaderboardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card title="Highest GPA">
        {highest ? (
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-zinc-900">{highest.name}</p>
            <p className="text-sm text-zinc-500">{highest.studentId}</p>
            <GpaDisplay gpa={highest.gpa} size="lg" />
          </div>
        ) : (
          <p className="text-zinc-400">No data</p>
        )}
      </Card>
      <Card title="Lowest GPA">
        {lowest ? (
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-zinc-900">{lowest.name}</p>
            <p className="text-sm text-zinc-500">{lowest.studentId}</p>
            <GpaDisplay gpa={lowest.gpa} size="lg" />
          </div>
        ) : (
          <p className="text-zinc-400">No data</p>
        )}
      </Card>
    </div>
  );
}
