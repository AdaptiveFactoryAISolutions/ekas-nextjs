interface OurApproachSectionProps {
  background: string;
}

const cards = [
  {
    title: "Discovery",
    subhead: "60–90 minute conversation",
    body: "Structured fit assessment. Four conditions for EKAS success: data quality baseline, executive sponsor, operations–finance alignment opportunity, IATF 16949 compliance posture.",
  },
  {
    title: "Pilot Readiness Assessment",
    subhead: "8-week structured engagement",
    body: "Data quality assessment. Three-priority initiative identification. Documented value model in dollar terms. Output is a gating decision: proceed to pilot or do not proceed.",
  },
  {
    title: "60-Day Pilot",
    subhead: "Live deployment",
    body: "Three Horizon-1 capabilities deployed: shift handoff intelligence, downtime root cause, cost variance attribution. Weekly progress reviews against documented success criteria.",
  },
  {
    title: "Ongoing Subscription",
    subhead: "Quarterly portfolio governance",
    body: "Subscription begins after pilot success gates trigger. Quarterly portfolio reviews. Continuous initiative scoring. New capabilities activated only after prior horizon generates documented returns.",
  },
];

const OurApproachSection = ({ background }: OurApproachSectionProps) => {
  return (
    <section className="section-padding" style={{ background }}>
      <div className="container max-w-[1100px]">
        <div className="text-center mb-6">
          <span className="section-label">Our Approach</span>
          <h2 className="text-h2 text-primary-text mt-3 mb-6">
            Our Approach
          </h2>
        </div>

        <div className="max-w-[860px] mx-auto mb-12">
          <p className="text-body-base text-secondary-text text-center">
            SME manufacturers have been burned before — by six-month MES implementations, six-figure consulting fees, and dashboards that never quite matched what was actually happening on the floor. EKAS is built to not be that. Here's what working with us looks like.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card) => (
            <div key={card.title} className="premium-card">
              <h3 className="text-h4 text-primary-text mb-1">{card.title}</h3>
              <p className="text-fine text-accent mb-3">{card.subhead}</p>
              <p className="text-body-sm text-secondary-text">{card.body}</p>
            </div>
          ))}
        </div>

        <p className="text-body-base text-secondary-text text-center max-w-[760px] mx-auto">
          No six-figure implementation. No data science team required. No waiting six months to see whether it works.
        </p>
      </div>
    </section>
  );
};

export default OurApproachSection;
