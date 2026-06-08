"use client";

import { useState } from "react";

export default function Home() {
  const [country, setCountry] = useState<string | null>(null);
  const [year, setYear] = useState(2009);
  const [approval, setApproval] = useState(50);

  function startGame(selected: string) {
    setCountry(selected);
    setApproval(50);
    setYear(2009);
  }

  function passPolicy() {
    setApproval(approval + 3);
    setYear(year + 1);
  }

  if (!country) {
    return (
      <main style={{ padding: 40 }}>
        <h1>World Leaders Simulator</h1>

        <h2>Choose Country</h2>

        <button onClick={() => startGame("USA")}>USA</button>
        <button onClick={() => startGame("Germany")}>Germany</button>
        <button onClick={() => startGame("India")}>India</button>
        <button onClick={() => startGame("Russia")}>Russia</button>
        <button onClick={() => startGame("Brazil")}>Brazil</button>
      </main>
    );
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>{country} Simulator</h1>

      <p>Year: {year}</p>
      <p>Approval: {approval}%</p>

      <button onClick={passPolicy}>Pass Policy</button>
      <button onClick={() => setApproval(approval - 5)}>Scandal</button>
      <button onClick={() => setYear(year + 1)}>Next Year</button>
    </main>
  );
}
