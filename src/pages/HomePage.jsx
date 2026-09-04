import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getEvents } from "../lib/service";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alle");

  useEffect(() => {
    async function loadEvents() {
      try {
        setEvents(await getEvents());
      } catch (error) {
        console.error(error);
      }
    }
    loadEvents();
  }, []);

  const categories = [
    "Alle",
    ...new Set(events.map((event) => event.category)),
  ];

  const filteredEvents = events.filter((event) => {
    const searchText =
      `${event.title} ${event.summary} ${event.venueName}`.toLowerCase();
    const matchesSearch = searchText.includes(search.toLowerCase());
    const matchesCategory = category === "Alle" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  function formatEventDate(eventDate) {
    const date = new Date(eventDate);
    const formattedDate = date.toLocaleDateString("da-DK", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return (
    <>
      <header className={styles.hero}>
        <p className="eyebrow">Kultur i Aarhus</p>
        <h1>Find plads til noget nyt.</h1>
        <p className={styles.heroCopy}>
          Koncerter, talks og workshops samlet ét sted. Find dit næste event, og
          tilmeld dig på få minutter.
        </p>
        <a className={styles.heroLink} href="#events">
          Se kommende events ↓
        </a>
      </header>

      <main id="events">
        <section className={styles.sectionHeading}>
          <div>
            <p className="eyebrow dark">Det sker</p>
            <h2>Kommende events</h2>
          </div>
          <p>Kuraterede oplevelser i byen – fra små scener til store idéer.</p>
        </section>

        <section className={styles.filters}>
          <label>
            Søg
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Søg efter titel eller sted"
            />
          </label>
          <label>
            Kategori
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </section>

        <section className={styles.grid}>
          {filteredEvents.map((event) => (
            <article className={styles.card} key={event.id}>
              <img src={event.image} alt="" />
              <div className={styles.cardContent}>
                <p className="event-category">{event.category}</p>
                <h3>{event.title}</h3>
                <p>{event.summary}</p>
                <div className={styles.meta}>
                  <span>{formatEventDate(event.date)}</span>
                  <span>{event.venueName}</span>
                </div>
                <Link className={styles.cardLink} to={`/events/${event.id}`}>
                  Læs mere
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
