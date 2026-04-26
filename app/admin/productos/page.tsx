import { MOCK_PRODUCTS, CATEGORY_EMOJIS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Package } from "lucide-react";

export const metadata = { title: "Productos — Admin PetUniverse" };

const CATEGORY_LABELS: Record<string, string> = {
  FOOD: "Alimentos", TREATS: "Premios", TOYS: "Juguetes",
  ACCESSORIES: "Accesorios", HEALTH: "Salud", CALMING: "Relajación",
  SUPPLEMENTS: "Suplementos", APPAREL: "Ropa", GROOMING: "Grooming",
};

export default function AdminProductosPage() {
  const totalSales = MOCK_PRODUCTS.reduce((s, p) => s + (p.salesCount ?? 0), 0);
  const lowStock = MOCK_PRODUCTS.filter((p) => p.stock <= 10).length;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Catálogo de productos</h1>
          <p className="text-forest-300 text-sm">{MOCK_PRODUCTS.length} productos activos</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-terra text-white
                           text-sm font-semibold hover:bg-terra-500 transition-colors">
          <Package className="w-4 h-4" />
          Nuevo producto
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-forest-800 rounded-2xl p-5 border border-forest-600">
          <p className="text-forest-300 text-xs mb-1">Ventas totales</p>
          <p className="text-2xl font-bold text-white">{totalSales.toLocaleString("es-MX")}</p>
        </div>
        <div className="bg-forest-800 rounded-2xl p-5 border border-forest-600">
          <p className="text-forest-300 text-xs mb-1">Stock bajo (≤10 unidades)</p>
          <p className="text-2xl font-bold text-amber-400">{lowStock}</p>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-forest-800 rounded-2xl border border-forest-600 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-forest-600">
              <th className="text-left p-4 text-forest-300 font-medium">Producto</th>
              <th className="text-left p-4 text-forest-300 font-medium hidden md:table-cell">Categoría</th>
              <th className="text-right p-4 text-forest-300 font-medium">Precio</th>
              <th className="text-right p-4 text-forest-300 font-medium hidden sm:table-cell">Stock</th>
              <th className="text-right p-4 text-forest-300 font-medium hidden lg:table-cell">Ventas</th>
              <th className="text-right p-4 text-forest-300 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PRODUCTS.map((product) => (
              <tr
                key={product.id}
                className="border-b border-forest-700 hover:bg-forest-700 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{CATEGORY_EMOJIS[product.category]}</span>
                    <div>
                      <p className="font-medium text-white text-sm">{product.name}</p>
                      {product.isFeatured && (
                        <span className="text-[10px] bg-terra text-white px-1.5 py-0.5 rounded">
                          Destacado
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell text-forest-300">
                  {CATEGORY_LABELS[product.category]}
                </td>
                <td className="p-4 text-right text-white font-semibold">
                  {formatCurrency(product.price)}
                </td>
                <td className="p-4 text-right hidden sm:table-cell">
                  <span className={product.stock <= 10 ? "text-red-400 font-semibold" : "text-forest-300"}>
                    {product.stock}
                  </span>
                </td>
                <td className="p-4 text-right hidden lg:table-cell">
                  <div className="flex items-center justify-end gap-1 text-forest-300">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    {(product.salesCount ?? 0).toLocaleString("es-MX")}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    product.isActive
                      ? "bg-green-900 text-green-400"
                      : "bg-red-900 text-red-400"
                  }`}>
                    {product.isActive ? "Activo" : "Inactivo"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
