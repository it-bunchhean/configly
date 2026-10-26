import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-bold">404</h1>

      <h2 className="mt-2 text-base font-medium">
        Page Not Found
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        The page you are looking for does not exist.
      </p>

      <Link
        href="/"
         className=' px-3 mt-4 py-2 bg-black border text-white items-center hover:underline text-sm '
      >
        Back to Home
      </Link>
    </main>
  );
}
