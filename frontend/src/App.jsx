import { useEffect, useState } from "react";
import { api } from "./api";
import { Droplets, Wind, Gauge, Sun, Thermometer, CalendarDays, MapPin } from "lucide-react";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, []);

  async function load() {
    try {
      const res = await api.get("/weather");
      setWeather(res.data[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return "--:--";
    return new Date(timestamp * 1000).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Carregando clima...</div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
        <div className="text-white">Nenhum dado disponível. Execute o workflow no n8n.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-slate-900 to-black flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full">
        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500">
          <div className="text-center border-b border-white/10 pb-6 mb-6">
            <div className="flex justify-center items-center gap-2 text-white/80 text-sm mb-2">
              <MapPin size={16} />
              <span>Última medição</span>
              <CalendarDays size={14} />
              <span>{new Date(weather.created_at).toLocaleString("pt-BR")}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-white tracking-tight">{weather.city}</h1>
            <p className="text-zinc-400 text-lg mt-1">{weather.country}</p>
          </div>

          <div className="text-center my-8">
            <div className="flex justify-center items-baseline gap-2">
              <span className="text-8xl md:text-9xl font-light text-white">{Math.round(weather.temperature)}</span>
              <span className="text-3xl text-zinc-300">°C</span>
            </div>
            <p className="text-zinc-300 text-xl capitalize mt-3">{weather.weather_description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
            <div className="bg-black/30 rounded-2xl p-4 text-center">
              <Droplets size={28} className="mx-auto text-cyan-400 mb-2" />
              <p className="text-zinc-400 text-xs uppercase">Umidade</p>
              <p className="text-white text-2xl font-semibold">{weather.humidity}%</p>
            </div>
            <div className="bg-black/30 rounded-2xl p-4 text-center">
              <Wind size={28} className="mx-auto text-teal-400 mb-2" />
              <p className="text-zinc-400 text-xs uppercase">Vento</p>
              <p className="text-white text-2xl font-semibold">{weather.wind_speed} m/s</p>
            </div>
            <div className="bg-black/30 rounded-2xl p-4 text-center">
              <Gauge size={28} className="mx-auto text-purple-400 mb-2" />
              <p className="text-zinc-400 text-xs uppercase">Pressão</p>
              <p className="text-white text-2xl font-semibold">{weather.pressure} hPa</p>
            </div>
            <div className="bg-black/30 rounded-2xl p-4 text-center">
              <Sun size={28} className="mx-auto text-amber-400 mb-2" />
              <p className="text-zinc-400 text-xs uppercase">Nascer sol</p>
              <p className="text-white text-xl font-semibold">{formatTime(weather.sunrise)}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 pt-5 border-t border-white/10 text-sm">
            <div className="text-center flex-1">
              <p className="text-zinc-500">Mínima</p>
              <p className="text-white text-xl font-semibold">{Math.round(weather.temp_min)}°</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-zinc-500">Máxima</p>
              <p className="text-white text-xl font-semibold">{Math.round(weather.temp_max)}°</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-zinc-500">Sensação</p>
              <p className="text-white text-xl font-semibold">{Math.round(weather.feels_like)}°</p>
            </div>
          </div>
        </div>
        <p className="text-zinc-600 text-center text-xs mt-8">
          Dados fornecidos por OpenWeatherMap • Atualização automática a cada 1 minuto
        </p>
      </div>
    </div>
  );
}