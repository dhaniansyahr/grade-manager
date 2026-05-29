import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { NavUser } from "@/components/auth/NavUser";
import { verifyToken } from "@/lib/auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student Grade Manager",
  description: "Manage student grades, GPA, and class statistics",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  let user: { name: string } | null = null;
  if (token) {
    try {
      const payload = verifyToken(token);
      user = { name: payload.name };
    } catch {
      // invalid token — treat as unauthenticated
    }
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50">
        <nav className="border-b border-zinc-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
            <Link
              href="/"
              className="font-bold text-zinc-900 text-lg tracking-tight"
            >
              GradeManager
            </Link>
            {user && (
              <>
                <Link
                  href="/students"
                  className="text-sm text-zinc-600 hover:text-zinc-900 font-medium"
                >
                  Students
                </Link>
                <Link
                  href="/stats"
                  className="text-sm text-zinc-600 hover:text-zinc-900 font-medium"
                >
                  Class Stats
                </Link>
                <Link
                  href="/string-matcher"
                  className="text-sm text-zinc-600 hover:text-zinc-900 font-medium"
                >
                  String Matcher
                </Link>
              </>
            )}
            {user ? (
              <NavUser name={user.name} />
            ) : (
              <div className="ml-auto flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-sm text-zinc-600 hover:text-zinc-900 font-medium"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
