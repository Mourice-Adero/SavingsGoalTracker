import React, { useEffect, useState } from "react";
import productService from "../services/productService";
import type { Product } from "../api/api";
import PaymentModal from "../components/PaymentModal";
import { useNavigate } from "react-router";

type SelectedItem = {
  product: Product;
  qty: number;
};

function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<SelectedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const resp = await productService.fetchProducts();
        if (mounted) setProducts(resp.products || []);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  function addProduct(p: Product) {
    setSelected((prev) => {
      const found = prev.find((s) => s.product.id === p.id);
      if (found) {
        return prev.map((s) =>
          s.product.id === p.id ? { ...s, qty: s.qty + 1 } : s,
        );
      }
      return [...prev, { product: p, qty: 1 }];
    });
  }

  function decreaseProduct(id: number) {
    setSelected((prev) =>
      prev
        .map((s) =>
          s.product.id === id ? { ...s, qty: Math.max(0, s.qty - 1) } : s,
        )
        .filter((s) => s.qty > 0),
    );
  }

  function removeProduct(id: number) {
    setSelected((s) => s.filter((p) => p.product.id !== id));
  }

  function setQuantity(id: number, value: string) {
    const digits = value.replace(/[^0-9]/g, "");
    const qty = digits === "" ? 0 : parseInt(digits, 10);
    if (qty <= 0) {
      removeProduct(id);
      return;
    }
    setSelected((prev) =>
      prev.map((s) => (s.product.id === id ? { ...s, qty } : s)),
    );
  }

  const total = selected.reduce(
    (sum, s) => sum + (s.product.price || 0) * s.qty,
    0,
  );
  const walletBalance = 2400.0;
  const remainingBalance = walletBalance - total;

  async function submitPayment() {
    setProcessing(true);
    try {
      const payload = {
        products: selected.map((s) => ({ id: s.product.id, quantity: s.qty })),
        total,
      };
      const token = localStorage.getItem("token");
      const resp = await fetch("https://dummyjson.com/carts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error(`Failed to submit: ${resp.status}`);
      await resp.json();
      setModalOpen(false);
      setSelected([]);
      navigate("/dashboard");
      alert("Payment successful");
    } catch (err) {
      console.error("Payment failed", err);
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Product Details</h2>
        <button className="px-3 py-1 bg-yellow-400 rounded">&lt; Back</button>
      </div>

      <p className="mb-4">
        Inua mkulima wallet balance:{" "}
        <strong>Kes {walletBalance.toFixed(2)}</strong>
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
                {loading && (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-gray-500">
                      Loading products...
                    </td>
                  </tr>
                )}
                {!loading &&
                  products.map((p) => (
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
                {!loading && products.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-gray-500">
                      No products available
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
                Please select a product from the products panel first
              </div>
            ) : (
              <ul>
                {selected.map((s) => (
                  <li
                    key={s.product.id}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div>
                      <div className="font-medium">{s.product.title}</div>
                      <div className="text-sm text-gray-500">
                        {s.product.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm">{s.product.price} kes</div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseProduct(s.product.id)}
                          className="px-2 py-1 border rounded"
                        >
                          -
                        </button>
                        <input
                          value={String(s.qty)}
                          onChange={(e) =>
                            setQuantity(s.product.id, e.target.value)
                          }
                          className="w-12 text-center border rounded px-1"
                          inputMode="numeric"
                        />
                        <button
                          onClick={() => addProduct(s.product)}
                          className="px-2 py-1 border rounded"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeProduct(s.product.id)}
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

          <div className="mt-6 flex flex-col items-center gap-3">
            <div>
              Deduction: <strong>{total.toFixed(2)} KES</strong>
            </div>
            <div>
              Remaining balance:{" "}
              <strong>{remainingBalance.toFixed(2)} KES</strong>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              disabled={total <= 0 || processing}
              className="px-6 py-3 bg-gray-500 text-white rounded disabled:opacity-60"
            >
              Deduct {total.toFixed(2)} KES
            </button>
          </div>
        </div>
      </div>
      <PaymentModal
        open={modalOpen}
        amount={total}
        title={processing ? "Processing Payment" : "Confirm Deduction"}
        onClose={() => setModalOpen(false)}
        onConfirm={() => submitPayment()}
      />
    </div>
  );
}

export default Dashboard;
