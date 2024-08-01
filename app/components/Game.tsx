"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Game: React.FC = () => {
  const [price, setPrice] = useState<number>(0);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [initialPrice, setInitialPrice] = useState<number | null>(null);

  // Fetch Bitcoin price initially and every 5 seconds
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          "https://coingecko.p.rapidapi.com/simple/price",
          {
            params: { ids: "bitcoin", vs_currencies: "usd" },
            headers: {
              "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
              "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
            },
          }
        );
        console.log("Fetched price:", response.data.bitcoin.usd); // Debug log
        setPrice(response.data.bitcoin.usd);
      } catch (error) {
        console.error("Error fetching the Bitcoin price:", error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrediction = async (direction: string) => {
    console.log("Prediction made:", direction);
    setPrediction(direction);
    setInitialPrice(price);

    try {
      // Fetch the price again immediately
      const response = await axios.get(
        "https://coingecko.p.rapidapi.com/simple/price",
        {
          params: { ids: "bitcoin", vs_currencies: "usd" },
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
          },
        }
      );
      const newPrice = response.data.bitcoin.usd;
      console.log("New price after prediction:", newPrice); // Debug log

      if (initialPrice !== null) {
        if (
          (direction === "moon" && newPrice > initialPrice) ||
          (direction === "doom" && newPrice < initialPrice)
        ) {
          setResult("Correct!");
        } else {
          setResult("Wrong!");
        }
      } else {
        console.error("Initial price is null");
        setResult("Error: Initial price is null");
      }
    } catch (error) {
      console.error("Error fetching the Bitcoin price:", error);
      setResult("Error fetching the price");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">
        Current Bitcoin Price: ${price.toFixed(2)}
      </h1>
      <div className="flex space-x-4">
        <button
          onClick={() => handlePrediction("moon")}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Moon
        </button>
        <button
          onClick={() => handlePrediction("doom")}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Doom
        </button>
      </div>
      {prediction && (
        <p className="mt-4 text-lg">Your prediction: {prediction}</p>
      )}
      {result && <p className="mt-2 text-lg font-bold">Result: {result}</p>}
    </div>
  );
};

export default Game;
