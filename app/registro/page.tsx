"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/store/auth";

type Step = 1 | 2 | 3;

const SPECIES_OPTIONS = [
  { value: "DOG",     label: "Perro",   emoji: "🐕" },
  { value: "CAT",     label: "Gato",    emoji: "🐈" },
  { value: "BIRD",    label: "Ave",     emoji: "🦜" },
  { value: "RABBIT",  label: "Conejo",  emoji: "🐇" },
  { value: "FISH",    label: "Pez",     emoji: "🐠" },
  { value: "REPTILE", label: "Reptil",  emoji: "🦎" },
  { value: "OTHER",   label: "Otro",    emoji: "🐾" },
];

const ENERGY_OPTIONS = [
  { value: "SEDENTARY", label: "Sedentario",  desc: "Duerme mucho, poco ejercicio" },
  { value: "ACTIVE",    label: "Activo",      desc: "Juega y camina regularmente" },
  { value: "ATHLETE",   label: "Atleta",      desc: "Alta energía, mucho ejercicio" },
];

const FEAR_OPTIONS = [
  { value: "FIREWORKS",     label: "Pirotecnia" },
  { value: "THUNDERSTORMS", label: "Tormentas" },
  { value: "TRAVEL",        label: "Viajes" },
  { value: "STRANGERS",     label: "Extraños" },
  { value: "LOUD_NOISES",   label: "Ruidos fuertes" },
  { value: "OTHER_ANIMALS", label: "Otros animales" },
  { value: "SEPARATION",    label: "Ansiedad por separación" },
];

const STEPS = [
  { n: 1 as Step, label: "Tu cuenta" },
  { n: 2 as Step, label: "Tu mascota" },
  { n: 3 as Step, label: "Personalización" },
];

export default function RegistroPage() {
  const { setUser, setPet } = useAuth();
  const [step, setStep]   = useState<Step>(1);
  const [done, setDone]   = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Campos cuenta
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  // Campos mascota
  const [petName, setPetName]           = useState("");
  const [species, setSpecies]           = useState("");
  const [breed, setBreed]               = useState("");
  const [birthDate, setBirthDate]       = useState("");
  const [adoptionDate, setAdoptionDate] = useState("");
  const [weight, setWeight]             = useState("");
  const [gender, setGender]             = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64]   = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Campos personalización
  const [energyLevel, setEnergyLevel]   = useState("");
  const [allergies, setAllergies]       = useState("");
  const [preferences, setPreferences]   = useState("");
  const [fears, setFears]               = useState<string[]>([]);
  const [neutered, setNeutered]         = useState(false);

  const toggleFear = (v: string) =>
    setFears((prev) => prev.includes(v) ? prev.filter((f) => f !== v) : [...prev, v]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen no puede superar 5 MB");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPhotoPreview(result);
      setPhotoBase64(result);
    };
    reader.readAsDataURL(file);
  };

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/registro", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, password,
          petName, species, breed, birthDate, adoptionDate,
          weight, gender, energyLevel, allergies, preferences,
          fears, neutered,
          photoUrl: photoBase64 ?? undefined,
        }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error ?? "Error al crear la cuenta");
        return;
      }
      setUser({ id: json.data.userId, name, email, role: "CLIENT" });
      setPet({
        id: json.data.petId,
        name: petName,
        species,
        breed: breed || undefined,
        birthDate: birthDate || undefined,
        adoptionDate: adoptionDate || undefined,
        energyLevel: energyLevel || "ACTIVE",
        foodAllergies: allergies ? allergies.split(",").map((s) => s.trim()).filter(Boolean) : [],
        foodPreferences: preferences ? preferences.split(",").map((s) => s.trim()).filter(Boolean) : [],
        fears,
        photoUrl: photoBase64 ?? null,
        isNeutered: neutered,
      });
      setDone(true);
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
        <div className="bg-white rounded-4xl shadow-card-hover border border-cream-200 p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-forest-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-forest-500" />
          </div>
          <h2 className="font-display text-2xl font-bold text-forest-700 mb-3">
            ¡Bienvenido a PetUniverse, {petName}! 🐾
          </h2>
          <p className="text-forest-400 mb-8">
            El perfil de {petName} ha sido creado. Tu tienda personalizada ya está lista.
          </p>
          <Link href="/dashboard" className="btn-terra w-full justify-center">
            Ver la tienda de {petName}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-4xl shadow-card-hover border border-cream-200 overflow-hidden">
        {/* Header */}
        <div className="gradient-forest p-6 text-white text-center">
          <h1 className="font-display text-2xl font-bold">Crear tu cuenta</h1>
          <p className="text-white/70 text-sm mt-1">En 3 pasos tendrás tu tienda personalizada</p>

          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {STEPS.map(({ n, label }) => (
              <div key={n} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                      step > n
                        ? "bg-terra text-white"
                        : step === n
                        ? "bg-white text-forest-700"
                        : "bg-white/20 text-white/50"
                    )}
                  >
                    {step > n ? "✓" : n}
                  </div>
                  <span className={`text-[10px] mt-1 ${step === n ? "text-white" : "text-white/50"}`}>
                    {label}
                  </span>
                </div>
                {n < 3 && (
                  <div className={`w-12 h-0.5 mb-4 ${step > n ? "bg-terra" : "bg-white/20"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contenido del paso */}
        <div className="p-8">
          {/* PASO 1 — Cuenta */}
          {step === 1 && (
            <form
              onSubmit={(e) => { e.preventDefault(); setStep(2); }}
              className="space-y-4"
            >
              <h2 className="font-display text-xl font-bold text-forest-700 mb-6">Tu información</h2>

              <div>
                <label className="block text-sm font-medium text-forest-600 mb-1.5">Nombre completo</label>
                <input
                  type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="César Andrés García"
                  className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-sm text-forest-700 placeholder:text-forest-300 focus:outline-none focus:border-forest-400 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-forest-600 mb-1.5">Correo electrónico</label>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-sm text-forest-700 placeholder:text-forest-300 focus:outline-none focus:border-forest-400 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-forest-600 mb-1.5">Contraseña</label>
                <input
                  type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-sm text-forest-700 placeholder:text-forest-300 focus:outline-none focus:border-forest-400 focus:bg-white transition-all"
                />
              </div>

              <button type="submit" className="btn-terra w-full py-3.5 mt-2">
                Continuar
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* PASO 2 — Mascota */}
          {step === 2 && (
            <form
              onSubmit={(e) => { e.preventDefault(); if (!species) { setError("Selecciona la especie"); return; } setError(""); setStep(3); }}
              className="space-y-5"
            >
              <h2 className="font-display text-xl font-bold text-forest-700 mb-6">Tu mascota</h2>

              {/* Foto de mascota */}
              <div className="flex flex-col items-center gap-3">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-24 h-24 rounded-2xl overflow-hidden cursor-pointer
                             border-2 border-dashed border-cream-300 hover:border-forest-400
                             bg-cream-50 flex items-center justify-center transition-all group"
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Foto de mascota" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-forest-300 group-hover:text-forest-500 transition-colors">
                      <Camera className="w-6 h-6" />
                      <span className="text-[10px] font-medium">Subir foto</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <p className="text-xs text-forest-300 text-center">
                  Foto opcional · JPG, PNG, WEBP · Máx. 5 MB
                </p>
                {error && <p className="text-xs text-red-500">{error}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-forest-600 mb-1.5">Nombre de tu mascota</label>
                <input
                  type="text" required value={petName} onChange={(e) => setPetName(e.target.value)}
                  placeholder="Copérnico, Luna, Max..."
                  className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-sm text-forest-700 placeholder:text-forest-300 focus:outline-none focus:border-forest-400 focus:bg-white transition-all"
                />
              </div>

              {/* Especie */}
              <div>
                <label className="block text-sm font-medium text-forest-600 mb-2">Especie</label>
                <div className="grid grid-cols-4 gap-2">
                  {SPECIES_OPTIONS.map((s) => (
                    <button
                      key={s.value} type="button"
                      onClick={() => setSpecies(s.value)}
                      className={cn(
                        "flex flex-col items-center gap-1 p-3 rounded-xl border text-xs font-medium transition-all",
                        species === s.value
                          ? "border-forest bg-forest-50 text-forest-700"
                          : "border-cream-200 text-forest-400 hover:border-forest-200"
                      )}
                    >
                      <span className="text-2xl">{s.emoji}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-forest-600 mb-1.5">Raza (opcional)</label>
                  <input
                    type="text" value={breed} onChange={(e) => setBreed(e.target.value)}
                    placeholder="Golden Retriever"
                    className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-sm text-forest-700 placeholder:text-forest-300 focus:outline-none focus:border-forest-400 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest-600 mb-1.5">Peso (kg, opcional)</label>
                  <input
                    type="number" step="0.1" min="0" value={weight} onChange={(e) => setWeight(e.target.value)}
                    placeholder="28.5"
                    className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-sm text-forest-700 placeholder:text-forest-300 focus:outline-none focus:border-forest-400 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-forest-600 mb-1.5">Fecha de nacimiento</label>
                  <input
                    type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-sm text-forest-700 focus:outline-none focus:border-forest-400 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest-600 mb-1.5">
                    Fecha de adopción 🎂
                  </label>
                  <input
                    type="date" value={adoptionDate} onChange={(e) => setAdoptionDate(e.target.value)}
                    className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-sm text-forest-700 focus:outline-none focus:border-forest-400 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Género */}
              <div>
                <label className="block text-sm font-medium text-forest-600 mb-2">Género</label>
                <div className="flex gap-3">
                  {[
                    { value: "MALE", label: "♂ Macho" },
                    { value: "FEMALE", label: "♀ Hembra" },
                  ].map((g) => (
                    <button
                      key={g.value} type="button"
                      onClick={() => setGender(g.value)}
                      className={cn(
                        "flex-1 py-3 rounded-xl border text-sm font-medium transition-all",
                        gender === g.value
                          ? "border-forest bg-forest-50 text-forest-700"
                          : "border-cream-200 text-forest-400 hover:border-forest-200"
                      )}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox" checked={neutered} onChange={(e) => setNeutered(e.target.checked)}
                  className="w-4 h-4 rounded accent-forest"
                />
                <span className="text-sm text-forest-600">Mi mascota está esterilizada</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1 py-3">
                  <ArrowLeft className="w-4 h-4" />
                  Atrás
                </button>
                <button type="submit" className="btn-terra flex-1 py-3">
                  Continuar
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* PASO 3 — Personalización */}
          {step === 3 && (
            <form onSubmit={handleFinish} className="space-y-5">
              <h2 className="font-display text-xl font-bold text-forest-700 mb-6">
                Personalización de {petName || "tu mascota"}
              </h2>

              {/* Nivel de energía */}
              <div>
                <label className="block text-sm font-medium text-forest-600 mb-2">
                  Nivel de energía y estilo de vida
                </label>
                <div className="space-y-2">
                  {ENERGY_OPTIONS.map((e) => (
                    <button
                      key={e.value} type="button"
                      onClick={() => setEnergyLevel(e.value)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all",
                        energyLevel === e.value
                          ? "border-forest bg-forest-50"
                          : "border-cream-200 hover:border-forest-200"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                        energyLevel === e.value ? "border-forest bg-forest" : "border-cream-300"
                      )}>
                        {energyLevel === e.value && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-forest-700">{e.label}</p>
                        <p className="text-xs text-forest-400">{e.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Alergias */}
              <div>
                <label className="block text-sm font-medium text-forest-600 mb-1.5">
                  Alergias alimentarias (separadas por coma)
                </label>
                <input
                  type="text" value={allergies} onChange={(e) => setAllergies(e.target.value)}
                  placeholder="pollo, gluten, lactosa..."
                  className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-sm text-forest-700 placeholder:text-forest-300 focus:outline-none focus:border-forest-400 focus:bg-white transition-all"
                />
                <p className="text-xs text-forest-300 mt-1">
                  El catálogo filtrará automáticamente productos con estos ingredientes
                </p>
              </div>

              {/* Preferencias */}
              <div>
                <label className="block text-sm font-medium text-forest-600 mb-1.5">
                  Preferencias alimentarias
                </label>
                <input
                  type="text" value={preferences} onChange={(e) => setPreferences(e.target.value)}
                  placeholder="grain-free, orgánico, raw..."
                  className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-3 text-sm text-forest-700 placeholder:text-forest-300 focus:outline-none focus:border-forest-400 focus:bg-white transition-all"
                />
              </div>

              {/* Miedos */}
              <div>
                <label className="block text-sm font-medium text-forest-600 mb-2">
                  Miedos y fobias (para campañas de productos calmantes)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {FEAR_OPTIONS.map((f) => (
                    <button
                      key={f.value} type="button"
                      onClick={() => toggleFear(f.value)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium text-left transition-all",
                        fears.includes(f.value)
                          ? "border-amber-300 bg-amber-50 text-amber-700"
                          : "border-cream-200 text-forest-400 hover:border-amber-200"
                      )}
                    >
                      <span>{fears.includes(f.value) ? "⚠" : "○"}</span>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(2)} className="btn-outline flex-1 py-3" disabled={loading}>
                  <ArrowLeft className="w-4 h-4" />
                  Atrás
                </button>
                <button type="submit" className="btn-terra flex-1 py-3 disabled:opacity-70" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Creando cuenta...
                    </span>
                  ) : (
                    <>Crear mi cuenta <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Link a login */}
          <p className="text-center text-sm text-forest-400 mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-terra font-semibold hover:text-terra-500 transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
