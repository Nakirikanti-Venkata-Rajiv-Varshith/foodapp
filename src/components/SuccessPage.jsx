import { useState } from "react";
import styles from "./SuccessPage.module.css";

function generateTxnId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "FMPIB";
  for (let i = 0; i < 10; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function formatDateTime(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  return `${day} ${month} ${year} at ${hours}:${minutes} ${ampm}`;
}

export default function SuccessPage({ data, onPayAgain }) {
  const [txnId] = useState(generateTxnId);
  const [payTime] = useState(() => (Math.random() * 1.5 + 0.8).toFixed(2));
  const [txnDate] = useState(() => formatDateTime(new Date()));
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(txnId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className={styles.page}>
      {/* Background */}
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.bgOverlay} aria-hidden="true" />

      {/* Hero — amount + recipient */}
      <section className={styles.hero}>
        <div className={styles.amount}>
          <span className={styles.amountSymbol}>₹</span>
          {data.amount}
        </div>
        <p className={styles.recipientLabel}>
          to <span className={styles.recipientName}>{data.name}</span>
        </p>
        <p className={styles.upiId}>{data.upiId}</p>
        <span className={styles.secureBadge}>Paid securely via FamApp</span>
      </section>

      {/* Lower content */}
      <div className={styles.lowerContent}>
        {/* Success tick */}
        <div className={styles.successTick}>
          <div className={styles.tickCircle}>
            <div className={styles.tickFront}>✓</div>
            <div className={styles.tickBack}>✓</div>
          </div>
        </div>

        {/* Speed pill */}
        <div className={styles.speedPill}>
          <div className={styles.speedPillInner}>
            <span className={styles.lightning}>⚡</span>
            Paid in {payTime} s
          </div>
        </div>

        {/* TXN info */}
        <div className={styles.txnInfo}>
          <p className={styles.txnDate}>{txnDate}</p>
          <div className={styles.txnIdRow}>
            <span className={styles.txnId}>TXN ID: {txnId}</span>
            <button
              className={styles.copyBtn}
              onClick={handleCopy}
              aria-label="Copy transaction ID"
            >
              {copied ? (
                <span className={styles.copiedText}>Copied!</span>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* View Details */}
        <p className={styles.viewDetails}>View Details</p>

        {/* Pay Again card */}
        <div
          className={styles.payAgainCard}
          onClick={onPayAgain}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onPayAgain()}
        >
          <div className={styles.payAgainIcon}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              color="var(--color-orange)"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M12 7v5l4 2" />
            </svg>
          </div>
          <div className={styles.payAgainText}>
            <p className={styles.payAgainTitle}>Pay Again</p>
            <p className={styles.payAgainSub}>Pay Again to {data.name}</p>
          </div>
          <span className={styles.payAgainArrow}>›</span>
        </div>

        {/* Ad cards */}
        <div className={styles.adRow}>
          <div className={styles.adCard}>
            <img
              src="https://images.unsplash.com/photo-1593280405106-e438ebe93f5b?w=200&q=70"
              alt="Fast in-game buys"
            />
            <div className={styles.adCardLabel}>
              Fast in-game buys with GPRC
            </div>
          </div>
          <div className={`${styles.adCard} ${styles.adCardKotak}`}>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&q=70"
              alt="Open zero balance savings bank"
            />
            <div className={styles.adCardLabel}>
              Open zero balance savings bank a/c
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
