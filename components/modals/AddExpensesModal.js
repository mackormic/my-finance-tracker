import { useState, useContext, useRef } from "react";
import { finaceContext } from "@/libs/store/finance-context";
import Modal from "../Modal";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-toastify";

function AddExpensesModal({ show, onClose }) {
  const [expensesAmount, setExpensesAmount] = useState("");
  const [selectedCategoty, setSelectedCategory] = useState(null);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const { expenses, addExpenseItem, addCategory } = useContext(finaceContext);

  const titleRef = useRef();
  const colorRef = useRef();

  const addExpenseItemHandler = async () => {
    const expense = expenses.find((e) => {
      return e.id === selectedCategoty;
    });

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expensesAmount,
      items: [
        ...expense.items,
        {
          amount: +expensesAmount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    try {
      await addExpenseItem(selectedCategoty, newExpense);

      setExpensesAmount("");
      setSelectedCategory(null);
      onClose();

      toast.success("Expense Item Added");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const addCategoryHandler = async () => {
    const title = titleRef.current.value;
    const color = colorRef.current.value;

    try {
      addCategory({ title, color, total: 0 });
      setShowAddExpense(false);

      toast.success("Category created");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <label>Entry amount</label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter expenses amount"
          value={expensesAmount}
          onChange={(e) => {
            setExpensesAmount(e.target.value);
          }}
        />
      </div>

      {/* expense category */}
      {expensesAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl capitalize">Select expenses category</h3>
            <button
              onClick={() => {
                setShowAddExpense(true);
              }}
              className="text-lime-400 capitalize"
            >
              + add new category
            </button>
          </div>

          {showAddExpense && (
            <div className="flex  items-center justify-between max-sm:flex-col ">
              <input type="text" placeholder="Enter Title" ref={titleRef} />
              <label>Pick color</label>
              <input className="w-24 h-10" type="color" ref={colorRef} />
              <button
                onClick={addCategoryHandler}
                className="btn btn-primary-outline max-sm:self-center max-sm:mt-2"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowAddExpense(false);
                }}
                className="btn btn-sign max-sm:self-center max-sm:mt-2"
              >
                Cancel
              </button>
            </div>
          )}

          {expenses.map((expense) => {
            return (
              <button
                key={expense.id}
                onClick={() => {
                  setSelectedCategory(expense.id);
                }}
              >
                <div
                  style={{
                    boxShadow:
                      expense.id === selectedCategoty ? "2px 2px 4px" : "none",
                  }}
                  className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-[25px] h-[25px] rounded-full"
                      style={{ backgroundColor: expense.color }}
                    ></div>
                    <h4 className="capitalize">{expense.title}</h4>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {expensesAmount > 0 && selectedCategoty && (
        <div className="mt-6">
          <button onClick={addExpenseItemHandler} className="btn btn-primary">
            add expense
          </button>
        </div>
      )}
    </Modal>
  );
}

export default AddExpensesModal;
