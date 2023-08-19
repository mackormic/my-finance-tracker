import React from "react";
import { useContext, useRef } from "react";
import Modal from "@/components/Modal";
import { currencyFormatter } from "@/libs/utils";
import { finaceContext } from "@/libs/store/finance-context";
import { authContext } from "@/libs/store/auth-context";

import { toast } from "react-toastify";

// Icons
import { FaRegTrashAlt } from "react-icons/fa";

function AddIncomeModal({ show, onClose }) {
  const amountRef = useRef();
  const descriptionRef = useRef();

  const { income, addIncomeItem, removeIncomeItem } = useContext(finaceContext);

  const { user } = useContext(authContext);

  // handler function

  const addHandlerFuncion = async (e) => {
    e.preventDefault();
    const newIncome = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
      uid: user.uid,
    };
    try {
      await addIncomeItem(newIncome);

      amountRef.current.value = "";
      descriptionRef.current.value = "";

      toast.success("Income Added Successifully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // handler delete function

  const deleteIncomeHandler = async (incomeId) => {
    try {
      await removeIncomeItem(incomeId);

      toast.success("Income Deleted Successifully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={addHandlerFuncion} className="income-group">
        <div className="income-group">
          <label htmlFor="amount">Income Amount</label>
          <input
            ref={amountRef}
            name="amount"
            type="number"
            min={0.01}
            step={0.01}
            placeholder="Enter income amount"
            required
          />
        </div>
        <div className="income-group">
          <label htmlFor="description">Description</label>
          <input
            ref={descriptionRef}
            name="description"
            type="string"
            placeholder="Enter income description"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Entry
        </button>
      </form>

      <div className="flex flex-col gap-2 mt-6">
        <h3 className="text-2xl font bold">Income history</h3>
        {income.map((singleIncome) => {
          return (
            <div
              className="flex items-center justify-between"
              key={singleIncome.id}
            >
              <div>
                <p className="font-semibold">{singleIncome.description}</p>
                <small className="text-xs">
                  {singleIncome.createdAt.toISOString()}
                </small>
              </div>
              <p className="flex items-center gap-2">
                {currencyFormatter(singleIncome.amount)}
              </p>
              <button
                onClick={() => {
                  deleteIncomeHandler(singleIncome.id);
                }}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default AddIncomeModal;
