import { ClassStatsTable } from "@/components/stats/ClassStatsTable";
import { GpaLeaderboard } from "@/components/stats/GpaLeaderboard";
import { StudentService } from "@/lib/services/StudentService";

export default async function StatsPage() {
  const service = new StudentService();
  const stats = await service.getClassStats();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold text-zinc-900">
        Class Statistics
      </h1>
      <p className="mb-8 text-sm text-zinc-500">
        Total students enrolled:{" "}
        <span className="font-semibold text-zinc-700">
          {stats.totalStudents}
        </span>
      </p>

      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-zinc-800">
          Average Score by Subject
        </h2>
        {stats.subjectAverages.length === 0 ? (
          <p className="text-zinc-400 text-sm">No subject data yet.</p>
        ) : (
          <ClassStatsTable subjectAverages={stats.subjectAverages} />
        )}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-zinc-800">
          GPA Leaderboard
        </h2>
        <GpaLeaderboard
          highest={stats.highestGpaStudent}
          lowest={stats.lowestGpaStudent}
        />
      </section>
    </div>
  );
}
