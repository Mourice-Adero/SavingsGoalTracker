import React, { useEffect, useState } from "react";
import productService from "../services/productService";
import type { Product } from "../api/api";

function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product[]>([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const resp = await productService.fetchProducts();
        if (mounted) setProducts(resp.products || []);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to load products", err);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  function addProduct(p: Product) {
    if (selected.find((s) => s.id === p.id)) return;
    setSelected((s) => [...s, p]);
  }

  function removeProduct(id: number) {
    setSelected((s) => s.filter((p) => p.id !== id));
  }

  const total = selected.reduce((sum, p) => sum + (p.price || 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Product Details</h2>
        <button className="px-3 py-1 bg-yellow-400 rounded">&lt; Back</button>
      </div>

      <p className="mb-4">
        Inua mkulima wallet balance: <strong>Kes 2,400.00</strong>
      </p>

      <div className="flex gap-6">
        <div className="w-1/2">
          <div className="mb-2 font-semibold">Products</div>
          <div className="border rounded-xl bg-white p-4 min-h-[200px]">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600">
                  <th>Product name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="py-2">{p.title}</td>
                    <td className="py-2">{p.price} kes</td>
                    <td className="py-2 text-right">
                      <button
                        onClick={() => addProduct(p)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                        aria-label={`add-${p.id}`}
                      >
                        +
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-gray-500">
                      No products
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-1/2">
          <div className="mb-2 font-semibold">Selected Products</div>
          <div className="border rounded-xl bg-white p-4 min-h-[200px]">
            {selected.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                Please select a products from the products panel first
              </div>
            ) : (
              <ul>
                {selected.map((s) => (
                  <li
                    key={s.id}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div>
                      <div className="font-medium">{s.title}</div>
                      <div className="text-sm text-gray-500">
                        {s.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm">{s.price} kes</div>
                      <button
                        onClick={() => removeProduct(s.id)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <button className="px-6 py-3 bg-gray-500 text-white rounded">
              Deduct {total.toFixed(2)} KES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
