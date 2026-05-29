interface GpaDisplayProps {
  gpa: number;
  size?: "sm" | "lg";
}

export function GpaDisplay({ gpa, size = "sm" }: GpaDisplayProps) {
  const color =
    gpa >= 3.5
      ? "bg-green-100 text-green-700"
      : gpa >= 2.5
        ? "bg-blue-100 text-blue-700"
        : gpa >= 1.5
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700";

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${color} ${size === "lg" ? "px-4 py-2 text-xl" : "px-2 py-0.5 text-xs"}`}
    >
      GPA: {gpa.toFixed(2)}
    </span>
  );
}
