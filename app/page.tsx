"use client";

import { useState } from "react";

const countries = ["USA", "Germany", "India", "Russia", "Brazil"];

const presidents: Record<string, any[]> = {
  USA: [
    { name: "Barack Obama", year: 2009, approvalBoost: 3 },
    { name: "Donald Trump", year: 2017, approvalBoost: -1 },
    { name: "Joe Biden", year: 2021, approvalBoost: 2 }
  ],
  Germany: [
    { name: "Angela Merkel", year: 2005, approvalBoost: 2 }
  ],
  India: [
    { name: "Narendra Modi", year: 2014, approvalBoost: 2 }
  ],
  Russia: [
    { name: "Vladimir Putin", year: 2000, approvalBoost: 1 }
  ],
  Brazil: [
    { name: "Lula da Silva", year: 2003, approvalBoost: 2 }
  ]
};

const events = [
  { name: "Economic Boom", approval: 5, economy: 5 },
  { name: "Recession", approval: -6, economy: -8 },
  { name: "Political Scandal", approval: -10, economy: 0 },
  { name: "Foreign Conflict", approval: -4, economy: -2 },
  { name: "Healthcare Reform Success", approval: 4, economy: 1 }
];

export default function Home() {
  const [country, setCountry] = useState<string | null>(null);
  const [year, setYear] = useState(2009);
  const [approval, setApproval] = useState(50);
  const [economy, setEconomy] = useState(50);
  const [currentPresident, setCurrentPresident] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);

  function startGame(selected: string) {
    setCountry(selected);
    setYear(2009);
    setApproval(50);
    setEconomy(50);
    setLog([]);
  }

  function nextYear() {
    setYear(year + 1);

    const event = events[Math.floor(Math.random() * events.length)];

    setApproval(prev => prev + event.approval);
    setEconomy(prev => prev + event.economy);

    setLog(prev => [
      `${event.name} occurred`,
      ...prev.slice(0, 4)
    ]);
  }

  function passPolicy() {
    setApproval(approval + 3);
    setEconomy(economy + 2);

    setLog(prev => ["Policy passed", ...prev.slice(0, 4)]);
  }

  function scandal() {
    setApproval(approval - 8);

    setLog(prev => ["Scandal hits administration", ...prev.slice(0, 4)]);
  }

  function selectPresident() {
    if (!country) return;

    const list = presidents[country];
    const p = list[Math.floor(Math.random() * list.length)];

    setCurrentPresident(p.name);
    setApproval(prev => prev + p.approvalBoost);

    setLog(prev => [`${p.name} becomes leader`, ...prev.slice(0, 4)]);
  }

  // 🔹 COUNTRY SELECT SCREEN
  if (!country) {
    return (
      <main style={{ padding: 40 }}>
        <h1>World Leaders Simulator</h1>
        <h2>Choose a Country</h2>

        {countries.map(c => (
          <button
            key={c}
            onClick={() => startGame(c)}
            style={{ margin: 5 }}
          >
            {c}
          </button>
        ))}
      </main>
    );
  }

  // 🔹 GAME SCREEN
  return (
    <main style={{ padding: 40 }}>
      <h1>{country} Political Simulator</h1>

      <p><b>Year:</b> {year}</p>
      <p><b>President:</b> {currentPresident ?? "Not selected"}</p>
      <p><b>Approval:</b> {approval}%</p>
      <p><b>Economy:</b> {economy}</p>

      <div style={{ marginTop: 20 }}>
        <button onClick={passPolicy}>Pass Policy</button>
        <button onClick={scandal}>Scandal</button>
        <button onClick={nextYear}>Next Year</button>
        <button onClick={selectPresident}>Change Leader</button>
      </div>

      <h3 style={{ marginTop: 20 }}>Event Log</h3>
      <ul>
        {log.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
    </main>
  );
}
