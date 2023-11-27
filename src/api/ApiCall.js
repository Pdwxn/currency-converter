export default function ApiCall({ amount, fromCur, toCur, }) {
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${amount}&from=${fromCur}&to=${toCur}`)
        .then(resp => resp.json())
        .then((data) => {
            // alert(`${amount} ${fromCur} = ${data.rates.[toCur]} ${toCur}`);
            console.log(data.rates[toCur])
        });
}