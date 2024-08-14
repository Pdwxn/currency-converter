// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";
import abbreviations from "./utils/currency-abbreviations.json";
import "./App.css";
import logo from "./assets/exchange.svg";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { currencies } = abbreviations;

  useEffect(() => {
    let isMounted = true;

    async function fetchConversion() {
      if (amount === 0) {
        setConverted(0);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        if (data.rates && data.rates[toCur] !== undefined) {
          if (isMounted) {
            setConverted(data.rates[toCur]);
          }
        } else {
          if (isMounted) {
            setConverted("Error: Invalid currency");
          }
        }
      } catch (error) {
        console.error("Error fetching currency data:", error);
        if (isMounted) {
          setConverted("Error: Unable to fetch data");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchConversion();

    return () => {
      isMounted = false;
    };
  }, [amount, fromCur, toCur]);

  return (
    <main className="container">
      <header className="header">
        <h1>Currency Converter</h1>
        <img src={logo} alt="logo" />
      </header>
      <div className="converter">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <select value={fromCur} onChange={(e) => setFromCur(e.target.value)}>
          {currencies.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
          {currencies.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (<p>Loading...</p>) : (<p>{converted} {toCur}</p>)}
    </main>
  );
}
