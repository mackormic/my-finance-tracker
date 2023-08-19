import { currencyFormatter } from "@/libs/utils";
import React from "react";
import ViewExpenseModal from "./modals/ViewExpenseModal";
import { useState } from "react";

export default function ExpensesItem({ expense }) {
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);

  return (
    <>
      <ViewExpenseModal
        show={showViewExpenseModal}
        onClose={setShowViewExpenseModal}
        expense={expense}
      />
      <button
        onClick={() => {
          setShowViewExpenseModal(true);
        }}
      >
        <div className="flex items-center justify-between p-4 bg-slate-700 rounded-3xl">
          <div className="flex gap-2">
            <div
              className="w-[25px] h-[25px] rounded-full"
              style={{ backgroundColor: expense.color }}
            />
            <h4 className="capitalize">{expense.title}</h4>
          </div>

          <p>{currencyFormatter(expense.total)}</p>
        </div>
      </button>
    </>
  );
}
