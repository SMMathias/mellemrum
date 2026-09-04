import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getEventById, createRegistration } from "../lib/service";
import styles from "./EventPage.module.css";

export default function EventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    async function loadEvent() {
      try {
        setEvent(await getEventById(eventId));
      } catch (error) {
        console.error(error);
      }
    }
    loadEvent();
  }, [eventId]);

  async function handleSubmit(eventSubmit) {
    eventSubmit.preventDefault();
    setStatus("saving");

    try {
      await createRegistration({
        name,
        email,
        eventTitle: event.title,
        eventDate: event.date,
        eventLocation: event.venueName,
      });
      setName("");
      setEmail("");
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  if (!event) {
    return null;
  }

  const date = new Date(event.date);

  return (
    <>
      <main className={styles.page}>
        <Link className={styles.backLink} to="/">
          ← Alle events
        </Link>

        <section className={styles.detail}>
          <img src={event.image} alt="" />
          <div className={styles.detailContent}>
            <p className="event-category">{event.category}</p>
            <h1>{event.title}</h1>
            <p className="lead">{event.summary}</p>
            <div className={styles.detailList}>
              <p>
                <strong>Dato</strong>
                {date.toLocaleDateString("da-DK", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}{" "}
                kl.{" "}
                {date.toLocaleTimeString("da-DK", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>
                <strong>Sted</strong>
                <span>
                  {event.venueName}
                  <br />
                  {event.venueAddress}, {event.venuePostalCode}{" "}
                  {event.venueCity}
                  {event.venueWebsite && (
                    <>
                      <br />
                      <a href={event.venueWebsite}>Besøg venue</a>
                    </>
                  )}
                </span>
              </p>
              <p>
                <strong>Pris</strong>
                {event.price === 0 ? "Gratis" : `${event.price} kr.`}
              </p>
            </div>
            <p>{event.description}</p>
          </div>
        </section>

        <section className={styles.signup}>
          <div>
            <p className="eyebrow dark">Tilmelding</p>
            <h2>Reserver din plads</h2>
            <p>
              Udfyld formularen, så sender vi din tilmelding til arrangøren.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Navn
              <input
                required
                value={name}
                onChange={(inputEvent) => setName(inputEvent.target.value)}
              />
            </label>
            <span>E-mail</span>
            <input
              required
              type="email"
              value={email}
              onChange={(inputEvent) => setEmail(inputEvent.target.value)}
              placeholder="dig@example.com"
            />
            <button type="submit" disabled={status === "saving"}>
              Tilmeld mig
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
