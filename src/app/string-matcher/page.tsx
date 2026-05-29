"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import type { StringMatcherResponse } from "@/types";

export default function StringMatcherPage() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [result, setResult] = useState<StringMatcherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/string-matcher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input1, input2, caseSensitive }),
      });
      const json = await res.json();
      setResult(json.data);
    } catch {
      setError("Failed to run string matcher. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold text-zinc-900">String Matcher</h1>
      <p className="mb-6 text-sm text-zinc-500">
        Calculates what percentage of the unique characters in String 1 also
        appear anywhere in String 2.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <Input
          label="String 1"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="e.g. hello"
          required
        />
        <Input
          label="String 2"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="e.g. world"
          required
        />
        <label className="flex items-center gap-2 text-sm text-zinc-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300"
          />
          Case-sensitive comparison
        </label>
        <Button type="submit" disabled={loading} className="self-start">
          {loading ? "Calculating..." : "Match Strings"}
        </Button>
      </form>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {result && (
        <Card className="mb-6">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-5xl font-bold text-blue-600">
              {result.matchPercentage}%
            </span>
            <span className="text-sm text-zinc-500">match</span>
          </div>
          <p className="text-sm text-zinc-600">
            <span className="font-medium text-zinc-800">
              &quot;{result.input1}&quot;
            </span>{" "}
            →{" "}
            <span className="font-medium text-zinc-800">
              &quot;{result.input2}&quot;
            </span>
            {result.caseSensitive ? " (case-sensitive)" : " (case-insensitive)"}
          </p>
        </Card>
      )}

      <Card title="How it works">
        <ol className="list-decimal list-inside text-sm text-zinc-600 flex flex-col gap-2">
          <li>
            Extract all{" "}
            <strong className="text-zinc-800">unique characters</strong> from
            String 1.
          </li>
          <li>
            <strong className="text-zinc-800">Outer loop</strong>: iterate over
            each unique character.
          </li>
          <li>
            <strong className="text-zinc-800">Inner loop</strong>: scan every
            character in String 2.
          </li>
          <li>
            <strong className="text-zinc-800">Nested if</strong>: if a match is
            found, increment the counter and break out of the inner loop.
          </li>
          <li>
            <strong className="text-zinc-800">Result</strong> = (matched unique
            chars ÷ total unique chars) × 100
          </li>
        </ol>
        <div className="mt-4 rounded-md bg-zinc-50 p-3 text-xs text-zinc-500 font-mono">
          <p>
            Example: &quot;hello&quot; → &quot;world&quot; (case-insensitive)
          </p>
          <p>Unique chars in &quot;hello&quot;: h, e, l, o (4 chars)</p>
          <p>
            Found in &quot;world&quot;: o ✓, l ✓ → 2 matches → 2/4 × 100 = 50%
          </p>
        </div>
      </Card>
    </div>
  );
}
