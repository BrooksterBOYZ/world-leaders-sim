"use client";

import { useState } from "react";

const countries = ["USA", "Germany", "India", "Russia", "Brazil"];

const events = [
  { name: "Economic Boom", approval: 5, economy: 5 },
  { name: "Recession", approval: -6, economy: -8 },
  { name: "Political Scandal", approval: -10, economy: 0 },
  { name: "Foreign Conflict", approval: -4, economy: -2 },
  { name: "Healthcare Reform Success", approval: 4, economy: 2 }
];

// 🇺🇸 Congress system (USA)
const congress = {
  support: 55
};

// 🇷🇺 Russia system (power structure)
const russiaBase = {
  military: 70,
  oligarchs: 60,
  regions: 65,
  security: 80
};

export default function Home() {
  const [country, setCountry] = useState<string | null>(null);
  const [year, setYear] = useState(2009);
  const [approval, setApproval] = useState(50);
  const [economy, setEconomy] = useState(50);
  const [log, setLog] = useState<string[]>([]);

  const [russiaState, setRussiaState] = useState({ ...russiaBase });

  // ----------------------------
  // START GAME
  // ----------------------------
  function startGame(c: string) {
    setCountry(c);
    setYear(2009);
    setApproval(50);
    setEconomy(50);
    setLog([]);

    if (c === "Russia") {
      setRussiaState({ ...russiaBase });
    }
  }

  // ----------------------------
  // RANDOM EVENT SYSTEM
  // ----------------------------
  function triggerEvent() {
    const event = events[Math.floor(Math.random() * events.length)];

    setApproval(a => a + event.approval);
    setEconomy(e => e + event.economy);

    setLog(l => [`🗞️ ${event.name}`, ...l.slice(0, 6)]);
  }

  // ----------------------------
  // NEXT YEAR
  // ----------------------------
  function nextYear() {
    setYear(y => y + 1);
    triggerEvent();
  }

  // ----------------------------
  // USA SYSTEM (Congress Vote)
  // ----------------------------
  function proposeBill() {
    if (country !== "USA") return;

    const result = Math.random() * 100;

    if (result < congress.support) {
      setApproval(a => a + 4);
      setEconomy(e => e + 3);
      setLog(l => ["🏛️ Congress passed a bill", ...l.slice(0, 6)]);
    } else {
      setApproval(a => a - 3);
      setLog(l => ["🏛️ Congress rejected the bill", ...l.slice(0, 6)]);
    }
  }

  // ----------------------------
  // RUSSIA SYSTEM (Power stability)
  // ----------------------------
  function updateRussia() {
    if (country !== "Russia") return;

    const avg =
      (russiaState.military +
        russiaState.oligarchs +
        russiaState.regions +
        russiaState.security) / 4;

    if (avg < 40) {
      setApproval(a => a - 8);
      setLog(l => ["⚠️ Political instability rising", ...l.slice(0, 6)]);
    }
  }

  function strengthenSecurity() {
    if (country !== "Russia") return;

    setRussiaState(r => ({ ...r, security: r.security + 5 }));
    setApproval(a => a + 2);

    setLog(l => ["🔒 Security services strengthened", ...l.slice(0, 6)]);
  }

  function controlOligarchs() {
    if (country !== "Russia") return;

    setRussiaState(r => ({
      ...r,
      oligarchs: r.oligarchs - 5,
      military: r.military + 2
    }));

    setLog(l => ["💰 Oligarch influence reduced", ...l.slice(0, 6)]);
  }

  // ----------------------------
  // UI: COUNTRY SELECT
  // ----------------------------
  if (!country) {
    return (
      <main style={{ padding: 40 }}>
        <h1>World Leaders Simulator</h1>
        <h2>Select Country</h2>

        {countries.map(c => (
          <button key={c} onClick={() => startGame(c)} style={{ margin: 5 }}>
            {c}
          </button>
        ))}
      </main>
    );
  }

  // ----------------------------
  // UI: GAME SCREEN
  // ----------------------------
  return (
    <main style={{ padding: 40 }}>
      <h1>{country} Simulator</h1>

      <p><b>Year:</b> {year}</p>
      <p><b>Approval:</b> {approval}%</p>
      <p><b>Economy:</b> {economy}</p>

      {/* Russia stats */}
      {country === "Russia" && (
        <div style={{ marginTop: 10 }}>
          <h3>Russia Stability System</h3>
          <p>Military: {russiaState.military}</p>
          <p>Oligarchs: {russiaState.oligarchs}</p>
          <p>Regions: {russiaState.regions}</p>
          <p>Security: {russiaState.security}</p>
        </div>
      )}

      {/* Buttons */}
      <div style={{ marginTop: 20 }}>
        <button onClick={nextYear}>Next Year</button>

        <button onClick={triggerEvent}>
          Trigger Event
        </button>

        {country === "USA" && (
          <button onClick={proposeBill}>
            Propose Bill (Congress)
          </button>
        )}

        {country === "Russia" && (
          <>
            <button onClick={strengthenSecurity}>
              Strengthen Security
            </button>

            <button onClick={controlOligarchs}>
              Control Oligarchs
            </button>
          </>
        )}
      </div>

      {/* LOG / NEWS FEED */}
      <h3 style={{ marginTop: 20 }}>News</h3>
      <ul>
        {log.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
