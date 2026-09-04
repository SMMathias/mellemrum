import { useEffect, useState } from "react";
import { getRegistrations } from "../lib/service";
import styles from "./RegistrationsPage.module.css";

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function loadRegistrations() {
      try {
        const data = await getRegistrations();
        setRegistrations(data);
        setRegistrationCount(data.length);
      } catch (error) {
        console.error(error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadRegistrations();
  }, []);

  return (
    <>
      <header className={styles.header}>
        <p className="eyebrow">Internt overblik</p>
        <h1>Tilmeldinger</h1>
        <p>{registrationCount} tilmeldinger i alt</p>
      </header>
      <main>
        {isLoading && <p className="state-message">Henter tilmeldinger…</p>}
        {hasError && (
          <p className="state-message">
            Kunne ikke hente tilmeldinger. Prøv igen senere.
          </p>
        )}
        {!isLoading && !hasError && registrations.length === 0 && (
          <p className="state-message">Der er ingen tilmeldinger endnu.</p>
        )}
        <div className={styles.list}>
          <div className={`${styles.row} ${styles.labels}`}>
            <span>Navn</span>
            <span>Event</span>
            <span>Dato</span>
            <span>Status</span>
          </div>
          {registrations.map((registration) => (
            <div className={styles.row} key={registration.id}>
              <div>
                <strong>{registration.name}</strong>
                <small>{registration.email}</small>
              </div>
              <span>{registration.eventTitle}</span>
              <span>
                {new Date(registration.eventDate).toLocaleDateString("da-DK")}
              </span>
              <span className={styles.status}>{registration.status}</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
