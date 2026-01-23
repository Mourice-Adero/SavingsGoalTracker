import React from "react";

type Props = {
  open?: boolean;
  title?: string;
  amount?: number;
  onClose?: () => void;
  onConfirm?: () => void;
};

function PaymentModal({
  open = false,
  title = "Confirm Payment",
  amount,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="mb-6">
          <p>You're about to deduct:</p>
          <p className="text-2xl font-bold">
            {amount ? `${amount.toFixed(2)} KES` : "0.00 KES"}
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded border">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-yellow-500 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
