"use client";

import { useEffect, useState } from "react";

export default function NycInfo({ isMobile = false }: { isMobile?: boolean }) {
  const [time, setTime] = useState("");
  const [temp, setTemp] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(now);

      setTime(`${formatted} EST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function getWeather() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current=temperature_2m&temperature_unit=fahrenheit"
        );
        const data = await res.json();
        setTemp(`${Math.round(data.current.temperature_2m)}°F`);
      } catch {
        setTemp("--°F");
      }
    }

    getWeather();
  }, []);

  return (
    <div
      style={{
        color: "rgba(255,255,255,0.6)",
        fontSize: 12,
        letterSpacing: 0.5,
        fontFamily: "Neue Haas Medium",
        textAlign: isMobile ? "left" : "right",
        width: "100%",
      }}
    >
      <div>new york city</div>
      <div>{time}</div>
      <div>{temp}</div>
    </div>
  );
}