// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";
import abbreviations from "./utils/currency-abbreviations.json"
import './App.css'
import ApiCall from "./api/ApiCall";
import logo from "./assets/exchange.svg"

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState('USD');
  const [toCur, setToCur] = useState('EUR');
  const [converted, setConverted] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { currencies } = abbreviations;

  useEffect(function () {
    async function convert() {
      setIsLoading(true)
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
      );
      const data = await res.json();
      setConverted(data.rates[toCur]);
      setIsLoading(false);
    }

    if (fromCur === toCur) return setConverted(amount);
    convert();
    ApiCall({ amount, fromCur, toCur });
  }, [amount, fromCur, toCur])

  return (
    <main className="container">
      <header className='header'>
        <h1>Currency Converter</h1>
        <img src={logo} alt="logo" />
      </header>
      <div className="converter">
        <input
          type="text"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          disabled={isLoading}
        />
        <select value={fromCur} onChange={e => setFromCur(e.target.value)} disabled={isLoading}>
          {currencies.map((item) => <option value={item}>{item}</option>)}
        </select>
        <select value={toCur} onChange={e => setToCur(e.target.value)} disabled={isLoading}>
          {currencies.map((item) => <option value={item}>{item}</option>)}
        </select>
      </div>
      <p>{converted} {toCur}</p>
    </main>
  );
}
