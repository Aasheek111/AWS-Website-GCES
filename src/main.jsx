import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const defaultDataUrl = "/data/site.json";

function getDataUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("data") || defaultDataUrl;
}

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Header({ brand }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["About", "#about"],
    ["Events", "#events"],
    ["Members", "#members"],
    ["Join", "#join"]
  ];

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={`${brand.name} home`}>
        <span className="brand-mark" aria-hidden="true" />
        <span>
          <strong>{brand.name}</strong>
          <small>{brand.location}</small>
        </span>
      </a>
      <button
        className="nav-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={open ? "site-nav is-open" : "site-nav"}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero({ data }) {
  return (
    <section className="hero reveal" id="top">
      <div className="hero-lines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-copy">
        <p className="eyebrow">{data.hero.eyebrow}</p>
        <h1>{data.hero.title}</h1>
        <p>{data.hero.description}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#events">
            {data.hero.primaryAction}
          </a>
          <a className="button button-secondary" href="#members">
            {data.hero.secondaryAction}
          </a>
        </div>
      </div>
      <aside className="hero-panel" aria-label="Community highlights">
        <p>{data.brand.tagline}</p>
        <div className="cloud-symbol" aria-hidden="true">
          <span />
        </div>
        <h2>Come find out.</h2>
        <div className="stat-grid">
          {data.stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}

function Features({ features }) {
  return (
    <section className="section dark-band" id="about">
      <div className="section-head reveal">
        <p className="eyebrow">What we do</p>
        <h2>Cloud learning that feels practical from day one.</h2>
      </div>
      <div className="feature-grid">
        {features.map((feature, index) => (
          <article className="feature-card reveal" key={feature.title} style={{ "--delay": `${index * 90}ms` }}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Events({ events }) {
  return (
    <section className="section events-section" id="events">
      <div className="section-head reveal">
        <p className="eyebrow">Events</p>
        <h2>Sessions, workshops, and community moments.</h2>
      </div>
      <div className="events-grid">
        {events.map((event, index) => (
          <article className="event-card reveal" key={`${event.title}-${index}`}>
            <div className="event-status">{event.status}</div>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <dl>
              <div>
                <dt>Date</dt>
                <dd>{event.date}</dd>
              </div>
              <div>
                <dt>Day</dt>
                <dd>{event.day}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{event.time}</dd>
              </div>
              <div>
                <dt>Venue</dt>
                <dd>{event.venue}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

function MemberCard({ member, index }) {
  return (
    <article className="member-card reveal" style={{ "--delay": `${(index % 6) * 60}ms` }}>
      {member.image ? (
        <img src={member.image} alt={member.name} loading="lazy" />
      ) : (
        <div className="avatar-fallback" role="img" aria-label={member.name}>
          {initials(member.name)}
        </div>
      )}
      <div>
        <h4>{member.name}</h4>
        <p>{member.role}</p>
      </div>
    </article>
  );
}

function Members({ teams }) {
  return (
    <section className="section" id="members">
      <div className="section-head reveal">
        <p className="eyebrow">Members</p>
        <h2>The team behind AWS Builders Group GCES.</h2>
      </div>
      {teams.map((team) => (
        <div className="team-section" key={team.title}>
          <div className="team-title reveal">
            <h3>{team.title}</h3>
            <span>{team.members.length} members</span>
          </div>
          <div className="member-grid">
            {team.members.map((member, index) => (
              <MemberCard key={`${team.title}-${member.name}`} member={member} index={index} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function Join({ join }) {
  return (
    <section className="join-section reveal" id="join">
      <div>
        <p className="eyebrow">Join us</p>
        <h2>{join.title}</h2>
        <p>{join.description}</p>
      </div>
      <a className="button button-primary" href="#events">
        {join.action}
      </a>
    </section>
  );
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  });
}

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const dataUrl = useMemo(getDataUrl, []);

  useEffect(() => {
    let active = true;
    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load ${dataUrl}`);
        }
        return response.json();
      })
      .then((json) => {
        if (active) setData(json);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, [dataUrl]);

  useReveal();

  if (error) {
    return (
      <main className="load-state">
        <h1>Content file could not load.</h1>
        <p>{error}</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="load-state">
        <div className="loader" aria-label="Loading website content" />
      </main>
    );
  }

  return (
    <>
      <Header brand={data.brand} />
      <main>
        <Hero data={data} />
        <Features features={data.features} />
        <Events events={data.events} />
        <Members teams={data.teams} />
        <Join join={data.join} />
      </main>
      <footer>
        <p>{data.brand.name} {data.brand.location}</p>
        <a href="#top">Back to top</a>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
