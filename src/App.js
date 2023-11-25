// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState('USD');
  const [toCur, setToCur] = useState('EUR');
  const [converted, setConverted] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
  }, [amount, fromCur, toCur])

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select value={fromCur} onChange={e => setFromCur(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="BRL">BRL</option>
        <option value="MXN">MXN</option>
        <option value="AUD">AUD</option>
        <option value="JPY">JPY</option>
        <option value="CAD">CAD</option>
      </select>
      <select value={toCur} onChange={e => setToCur(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="BRL">BRL</option>
        <option value="MXN">MXN</option>
        <option value="AUD">AUD</option>
        <option value="JPY">JPY</option>
        <option value="CAD">CAD</option>
      </select>
      <p>{converted} {toCur}</p>
    </div>
  );
}
