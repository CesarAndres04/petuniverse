"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { formatCurrency } from "@/lib/utils";
import { CATEGORY_EMOJIS } from "@/lib/mock-data";

const SHIPPING_THRESHOLD = 800;
const SHIPPING_COST      = 99;
const COUPONS: Record<string, number> = {
  ADOPTA20:   0.2,
  PETUNIVERSE: 0.1,
  BIENVENIDO:  0.15,
};

export default function CheckoutPage() {
  const router  = useRouter();
  const cart    = useCart();
  const [mounted, setMounted] = useState(false);

  // — Formulario de envío —
  const [form, setForm] = useState({
    name: "", street: "", city: "", state: "", zip: "", phone: "",
  });
  const [couponInput,   setCouponInput]   = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; pct: number } | null>(null);
  const [couponError,   setCouponError]   = useState("");
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState("");

  // Evita hidratación mismatch con localStorage
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const items    = cart.items;
  const subtotal = cart.subtotal();
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discount = appliedCoupon ? Math.round(subtotal * appliedCoupon.pct) : 0;
  const total    = subtotal + shipping - discount;

  const handleField = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    const pct  = COUPONS[code];
    if (!pct) {
      setCouponError("Código no válido");
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon({ code, pct });
    setCouponError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId:   "user_1",
          items:    items.map((i) => ({
            productId:   i.product.id,
            productName: i.product.name,
            quantity:    i.quantity,
            unitPrice:   i.product.price,
          })),
          subtotal,
          shipping,
          discount,
          total,
          shippingAddress: form,
          couponCode: appliedCoupon?.code,
        }),
      });

      const json = await res.json();

      if (!json.success) {
        setError(json.error ?? "Error al procesar el pedido");
        return;
      }

      cart.clearCart();
      router.push(
        `/pedido-confirmado?orderNumber=${json.data.orderNumber}&delivery=${encodeURIComponent(json.data.estimatedDelivery)}`
      );
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Carrito vacío ────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center mx-auto text-4xl">
            🛒
          </div>
          <h1 className="font-display text-2xl font-bold text-forest-700">
            Tu carrito está vacío
          </h1>
          <p className="text-forest-400">
            Agrega productos desde la tienda para continuar con tu compra.
          </p>
          <Link href="/" className="btn-terra inline-flex">
            <ShoppingBag className="w-4 h-4" />
            Ir a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-cream-200 px-4 py-4">
        <div className="section-wrapper flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold text-forest-600">
            Pet<span className="text-terra">Universe</span>
          </Link>
          <p className="text-sm text-forest-400">Pago seguro 🔒</p>
        </div>
      </div>

      <div className="section-wrapper py-8">
        <h1 className="font-display text-3xl font-bold text-forest-700 mb-8">
          Finalizar compra
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* ─── Columna izquierda: carrito + cupón ─── */}
            <div className="lg:col-span-3 space-y-6">

              {/* Items */}
              <div className="bg-white rounded-3xl border border-cream-200 shadow-card-base overflow-hidden">
                <div className="px-6 py-4 border-b border-cream-200">
                  <h2 className="font-display font-bold text-forest-700">
                    Tu pedido ({cart.itemCount()} {cart.itemCount() === 1 ? "producto" : "productos"})
                  </h2>
                </div>

                <div className="divide-y divide-cream-100">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center gap-4 p-5">
                      {/* Emoji */}
                      <div className="w-14 h-14 rounded-xl bg-cream-100 flex items-center justify-center text-3xl flex-shrink-0">
                        {CATEGORY_EMOJIS[product.category] ?? "🐾"}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-forest-700 text-sm truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-forest-400 mt-0.5">
                          {formatCurrency(product.price)} c/u
                        </p>
                      </div>

                      {/* Controles de cantidad */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => cart.updateQty(product.id, quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-cream-100 flex items-center justify-center
                                     hover:bg-cream-200 text-forest-500 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-forest-700">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => cart.updateQty(product.id, quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-cream-100 flex items-center justify-center
                                     hover:bg-cream-200 text-forest-500 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Subtotal + eliminar */}
                      <div className="text-right flex-shrink-0 min-w-[80px]">
                        <p className="font-bold text-forest-700 text-sm">
                          {formatCurrency(product.price * quantity)}
                        </p>
                        <button
                          type="button"
                          onClick={() => cart.removeItem(product.id)}
                          className="text-xs text-red-400 hover:text-red-600 transition-colors mt-0.5 flex items-center gap-0.5 ml-auto"
                        >
                          <Trash2 className="w-3 h-3" />
                          Quitar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cupón */}
              <div className="bg-white rounded-3xl border border-cream-200 shadow-card-base p-6">
                <h3 className="font-semibold text-forest-700 mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-terra" />
                  Código de descuento
                </h3>
                {appliedCoupon ? (
                  <div className="flex items-center gap-3 bg-forest-50 rounded-xl px-4 py-3">
                    <span className="text-forest-600 font-mono font-bold">{appliedCoupon.code}</span>
                    <span className="text-forest-500 text-sm">— {Math.round(appliedCoupon.pct * 100)}% de descuento aplicado ✓</span>
                    <button
                      type="button"
                      onClick={() => setAppliedCoupon(null)}
                      className="ml-auto text-forest-400 hover:text-red-500 text-xs"
                    >
                      Quitar
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Ej. ADOPTA20"
                      className="flex-1 bg-cream-50 border border-cream-200 rounded-xl px-4 py-2.5
                                 text-sm text-forest-700 placeholder:text-forest-300 font-mono
                                 focus:outline-none focus:border-forest-400 transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleCoupon}
                      className="btn-forest text-sm px-5 py-2.5"
                    >
                      Aplicar
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-red-500 text-xs mt-2">{couponError}</p>
                )}
                <p className="text-xs text-forest-300 mt-2">
                  Prueba: ADOPTA20, BIENVENIDO, PETUNIVERSE
                </p>
              </div>

              {/* Envío */}
              <div className="bg-white rounded-3xl border border-cream-200 shadow-card-base p-6">
                <h3 className="font-semibold text-forest-700 mb-5 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-terra" />
                  Dirección de entrega
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "name",   label: "Nombre completo",    placeholder: "César Andrés García",   col: 2 },
                    { name: "street", label: "Calle y número",      placeholder: "Av. Insurgentes Sur 1234 Int. 5A", col: 2 },
                    { name: "city",   label: "Ciudad",              placeholder: "Ciudad de México",      col: 1 },
                    { name: "state",  label: "Estado",              placeholder: "CDMX",                  col: 1 },
                    { name: "zip",    label: "Código postal",       placeholder: "06600",                 col: 1 },
                    { name: "phone",  label: "Teléfono de contacto", placeholder: "55 1234 5678",         col: 1 },
                  ].map(({ name, label, placeholder, col }) => (
                    <div key={name} className={col === 2 ? "sm:col-span-2" : ""}>
                      <label className="block text-xs font-medium text-forest-500 mb-1.5">
                        {label}
                      </label>
                      <input
                        type="text"
                        name={name}
                        required
                        value={(form as any)[name]}
                        onChange={handleField}
                        placeholder={placeholder}
                        className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-2.5
                                   text-sm text-forest-700 placeholder:text-forest-300
                                   focus:outline-none focus:border-forest-400 focus:bg-white transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── Columna derecha: resumen ─── */}
            <div className="lg:col-span-2">
              <div className="sticky top-6 bg-white rounded-3xl border border-cream-200 shadow-card-base p-6 space-y-4">
                <h2 className="font-display font-bold text-forest-700">Resumen del pedido</h2>

                {/* Desglose */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-forest-500">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-forest-500">
                    <span>Envío</span>
                    <span className={shipping === 0 ? "text-forest-600 font-semibold" : ""}>
                      {shipping === 0 ? "Gratis 🎉" : formatCurrency(shipping)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-terra">
                      <span>Descuento ({appliedCoupon?.code})</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  {subtotal < SHIPPING_THRESHOLD && (
                    <p className="text-xs text-forest-400 bg-cream-50 rounded-xl p-3">
                      Agrega {formatCurrency(SHIPPING_THRESHOLD - subtotal)} más para obtener envío gratis
                    </p>
                  )}
                </div>

                <div className="border-t border-cream-200 pt-4 flex justify-between">
                  <span className="font-bold text-forest-700">Total</span>
                  <span className="font-display text-xl font-bold text-forest-700">
                    {formatCurrency(total)}
                  </span>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-terra w-full py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Procesando...
                    </span>
                  ) : (
                    <>
                      Confirmar pedido
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-forest-300">
                  🔒 Pago cifrado · Sin cargos ocultos
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
