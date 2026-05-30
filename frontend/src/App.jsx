import { useEffect, useState } from "react";
import { api } from "./api";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await api.get("/weather");
    setData(res.data);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        Weather Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">

        {data.map(item => (
          <div
            key={item.id}
            className="bg-zinc-900 p-5 rounded-xl"
          >

            <h2 className="text-2xl font-bold">
              {item.city}
            </h2>

            <p className="text-4xl mt-3">
              {item.temperature}°C
            </p>

            <p className="text-sm text-zinc-400 mt-1">
              {item.weather_description}
            </p>

            <div className="mt-4 text-sm text-zinc-400">
              <p>Umidade: {item.humidity}%</p>
              <p>Vento: {item.wind_speed} m/s</p>
              <p>Pressão: {item.pressure}</p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}