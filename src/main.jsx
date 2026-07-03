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
    ["Vision", "#vision"],
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
        <div className="hero-badges" aria-label="Community focus areas">
          {data.hero.badges?.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
        <div className="hero-actions">
          <a className="button button-primary" href="#about">
            {data.hero.primaryAction}
          </a>
          <a className="button button-secondary" href="#events">
            {data.hero.secondaryAction}
          </a>
        </div>
      </div>
      <aside className="hero-panel hero-console" aria-label="Cloud learning console">
        <div className="console-top">
          <span />
          <span />
          <span />
          <strong>GCES x AWS</strong>
        </div>
        <div className="cloud-map" aria-hidden="true">
          <div className="cloud-core">
            <span>GCES</span>
          </div>
          <span className="node node-one">AWS</span>
          <span className="node node-two">AI</span>
          <span className="node node-three">Labs</span>
          <span className="node node-four">Career</span>
        </div>
        <p>{data.brand.tagline}</p>
        <h2>Learn. Build. Lead.</h2>
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

function About({ about }) {
  return (
    <section className="section about-section" id="about">
      <div className="about-copy reveal">
        <p className="eyebrow">About the group</p>
        <h2>{about.title}</h2>
        <p>{about.description}</p>
      </div>
      <div className="about-side reveal">
        <span>Student-led</span>
        <strong>Cloud, AI, industry engagement, and practical learning inside GCES.</strong>
      </div>
    </section>
  );
}

function VisionMission({ about }) {
  return (
    <section className="section vision-section" id="vision">
      <div className="vision-card reveal">
        <p className="eyebrow">Our vision</p>
        <h2>Creating the next generation of technology leaders.</h2>
        <p>{about.vision}</p>
      </div>
      <div className="list-panel reveal">
        <p className="eyebrow">Our mission</p>
        <ul>
          {about.mission.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="list-panel reveal">
        <p className="eyebrow">Objectives</p>
        <ul>
          {about.objectives.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Features({ features }) {
  return (
    <section className="section dark-band" id="focus">
      <div className="section-head reveal">
        <p className="eyebrow">Focus areas</p>
        <h2>Where curiosity turns into capability.</h2>
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
        <img
          src={member.image}
          alt={member.name}
          width="480"
          height="480"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 420px) calc(100vw - 68px), 92px"
        />
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
        <About about={data.about} />
        <VisionMission about={data.about} />
        <Features features={data.features} />
        <Events events={data.events} />
        <Members teams={data.teams} />
        <Join join={data.join} />
      </main>
      <footer>
        <p>{data.brand.name} {data.brand.location}. &nbsp; &nbsp;      Made with ❤️ by Aashik</p>
        <a href="#top">Back to top</a>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
