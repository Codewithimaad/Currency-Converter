const apiKey = "46621de091ee5c0056843b5e";

const finalUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromDropdowns = document.querySelector("#from-currency-select");
const toDropdowns = document.querySelector("#to-currency-select");
const result = document.querySelector("#result");

let currencies = [
    "USD", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD",
    "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP",
    "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP",
    "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP",
    "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD",
    "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR",
    "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP",
    "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE",
    "SLL", "SOS", "SRD", "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TVD", "TWD",
    "TZS", "UAH", "UGX", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR",
    "ZMW", "ZWL"
];

// Populate dropdown menus
currencies.forEach((currency) => {
    const optionFrom = document.createElement("option");
    optionFrom.value = currency;
    optionFrom.text = currency;
    fromDropdowns.add(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = currency;
    optionTo.text = currency;
    toDropdowns.add(optionTo);
});

// Set default dropdown values
fromDropdowns.value = "USD";
toDropdowns.value = "PKR";

// Convert currency function
let convertCurrency = () => {
    const amount = document.querySelector(".input");  // Access the input field
    const fromCurrency = fromDropdowns.value;
    const toCurrency = toDropdowns.value;

    if (amount.value.length != 0) {  // Check if there's a value in the input field
        fetch(finalUrl)
            .then((resp) => resp.json())
            .then((data) => {
                let fromExchangeRate = data.conversion_rates[fromCurrency];
                let toExchangeRate = data.conversion_rates[toCurrency];
                const convertedAmount = (amount.value / fromExchangeRate) * toExchangeRate;  // Use amount.value

                // Display the result
                result.innerHTML = `${amount.value} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;

                document.querySelector("#last-updated").innerHTML = data.time_last_update_utc;
                document.querySelector("#next-update").innerHTML = data.time_next_update_utc;


                console.log(result.innerHTML);
            })
            .catch((error) => {
                console.error("Error fetching exchange rates:", error);
            });
    } else {
        alert("Please fill in the amount");
    }
};

// Add event listener to convert button
const convertBtn = document.querySelector("#convert-button");
convertBtn.addEventListener("click", convertCurrency);