import { headers } from "@/next.config";

export default async function handler(req, res) {
  fetchCryptoData();
  fetchExchangeRate();
  fetchStockData();
  res.status(200).json(1);
}

//Crypto data
async function fetchCryptoData() {
  const res = await fetch(
    "https://api.binance.com/api/v3/ticker/price?" +
      new URLSearchParams({
        symbol: "ETHBTC",
      })
  );

  const data = await res.text();
  const price = JSON.parse(data).price;
  console.log(`crypto: ${price}`);
}

//Exchange rate
async function fetchExchangeRate() {
  const res = await fetch(
    "https://api.apilayer.com/exchangerates_data/latest?" +
      new URLSearchParams({
        symbols: ["SGD"],
        base: "KRW",
      }),
    {
      headers: new Headers({ apiKey: "RBoXgCgIpOwVLNRVpnsJy9Bykqw6Kll7" }),
    }
  );

  const data = await res.text();
  const rate = JSON.parse(data).rates.SGD;
  console.log(`Exchange Rate: ${rate}`);
}

//Stock data
async function fetchStockData() {
  const res = await fetch(
    "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=AMD",
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "0f0b98d0a6msh744ecc9f904d485p13b236jsn685a98749e46",
        "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
    }
  );

  const data = await res.text();
  const price = JSON.parse(data).quoteResponse.result[0].regularMarketPrice;

  console.log(`Stock price:${price}`);
}
