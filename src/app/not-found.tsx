import Link from "next/link";

/** Custom 404 without inline styles, so the strict style-src policy holds on every page. */
export default function NotFound() {
  return (
    <main className="container-x flex min-h-dvh flex-col justify-center py-20">
      <p className="kicker">404</p>
      <h1 className="mt-4 text-4xl font-bold">Cette page n&apos;existe pas</h1>
      <p className="text-muted mt-2">This page does not exist.</p>
      <Link href="/" className="btn-primary mt-8 w-fit">
        Retour à l&apos;accueil / Back home
      </Link>
    </main>
  );
}
