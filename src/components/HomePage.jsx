import { useState, useRef } from "react";
import styles from "./HomePage.module.css";
import sound from "/sound.mp3";

export default function HomePage({ onSubmit }) {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [upiId, setUpiId] = useState("");
  const audioRef = useRef(null);

  const isValid =
    amount.trim() !== "" && name.trim() !== "" && upiId.trim() !== "";

  function playSound() {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(sound);
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.log("Audio failed:", err);
      });
    } catch (_) {}
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;

    playSound();

    onSubmit({
      amount: amount.trim(),
      name: name.trim().toUpperCase(),
      upiId: upiId.trim(),
    });
  }

  // Quick Pay Buttons
  function quickPay(amountValue, nameValue, upiValue) {
    playSound();

    onSubmit({
      amount: amountValue,
      name: nameValue.toUpperCase(),
      upiId: upiValue,
    });
  }

  return (
    <div className={styles.page}>
      {/* Background */}
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.bgOverlay} aria-hidden="true" />

      {/* Main content */}
      <main className={styles.content}>
        <div className={styles.titleArea}>
          <p className={styles.titleMain}>Send Money</p>
          <p className={styles.titleSub}>Fast &amp; secure payments</p>
        </div>

        <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
          {/* Amount */}
          <div className={styles.amountRow}>
            <span className={styles.currencySymbol}>₹</span>
            <input
              className={styles.amountInput}
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              aria-label="Amount in rupees"
            />
          </div>

          <div className={styles.divider} />

          {/* Recipient Name */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="rec-name">
              Recipient Name
            </label>
            <input
              id="rec-name"
              className={styles.fieldInput}
              type="text"
              placeholder="e.g. GOKULKNAIR"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* UPI ID */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="upi-id">
              UPI ID
            </label>
            <input
              id="upi-id"
              className={styles.fieldInput}
              type="text"
              placeholder="name@okhdfcbank"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Pay button */}
          <button className={styles.payBtn} type="submit" disabled={!isValid}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22 11 13 2 9l20-7z" />
            </svg>
            Send ₹{amount || "0"}
          </button>

          {/* Quick Pay Buttons */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "14px",
            }}
          >
            <button
              type="button"
              className={styles.payBtn}
              style={{
                background: "transparent",
                border: "1px solid #999",
                color: "#fff",
              }}
              onClick={() =>
                quickPay(
                  "45",
                  "FOODSUTRA ART OF SPI",
                  "q860738916@ybl"
                )
              }
            >
              No Fill Pay 1
            </button>

            <button
              type="button"
              className={styles.payBtn}
              style={{
                background: "transparent",
                border: "1px solid #999",
                color: "#fff",
              }}
              onClick={() =>
                quickPay(
                  "45",
                  "IITH CANTEEN 3",
                  "Q860738916@ybl"
                )
              }
            >
              No Fill Pay 2
            </button>
          </div>
        </form>

        <p className={styles.secureNote}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5L12 1z" />
          </svg>
          Paid securely via FamApp
        </p>
      </main>
    </div>
  );
}