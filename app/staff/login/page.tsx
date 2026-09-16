import { Brand } from "@/components/brand";
import { LoginForm } from "@/components/login-form";
import { isDemo } from "@/lib/config";
import { safeReturnPath } from "@/lib/security";
import { party } from "@/lib/event";

export const dynamic = "force-dynamic";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <main className="login-page">
      <section className="login-copy">
        <Brand />
        <div>
          <span className="eyebrow light">MOHAMMED AADIL IS TURNING TEN</span>
          <h1>
            BIG DAY.
            <br />
            LITTLE GIFTS.
            <br />
            <em>HAPPY KIDS.</em>
          </h1>
          <p>
            A little thank-you for every teammate.
            <br />
            Let’s make the handover feel just as special.
          </p>
        </div>
        <p>{party.shortDate} · FOOTBALL · FRIENDS · FUN</p>
      </section>
      <section className="login-form-wrap">
        <div>
          <span className="eyebrow">THE TEAM BEHIND THE PARTY</span>
          <h2>
            Welcome to
            <br />
            the gift club.
          </h2>
          <p>
            All your guests, their invitations, and one special gift each. Ready
            when you are.
          </p>
          <LoginForm next={safeReturnPath(next)} demo={isDemo()} />
        </div>
      </section>
    </main>
  );
}
