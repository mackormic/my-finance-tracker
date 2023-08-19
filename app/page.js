"use client";

import ExpensesItem from "@/components/ExpensesItem";

import { currencyFormatter } from "@/libs/utils";

import { finaceContext } from "@/libs/store/finance-context";

import { authContext } from "@/libs/store/auth-context";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState, useContext, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import SignIn from "@/components/SignIn";
import Link from "next/link";

ChartJS.register(ArcElement, Tooltip, Legend);

// const DUMMY_DATA = [
//   {
//     id: 1,
//     title: "Entertainment",
//     color: "#000",
//     total: 500,
//   },
//   {
//     id: 2,
//     title: "Gass",
//     color: "#009",
//     total: 200,
//   },
//   {
//     id: 3,
//     title: "Fuel",
//     color: "#998",
//     total: 1200,
//   },
//   {
//     id: 4,
//     title: "Movies",
//     color: "#522",
//     total: 800,
//   },
//   {
//     id: 5,
//     title: "Holiday",
//     color: "#245",
//     total: 2000,
//   },
// ];

export default function Home() {
  const [openIncomeModal, setOpenIncomeModal] = useState(false);
  const [openExpensesModal, setOpenExpensesModal] = useState(false);

  const { expenses, income } = useContext(finaceContext);
  const { user } = useContext(authContext);

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => {
        return total + i.amount;
      }, 0) -
      expenses.reduce((total, e) => {
        return total + e.total;
      }, 0);
    setBalance(newBalance);
  }, [income, expenses]);

  // const [income, setIncome] = useState([]);
  // console.log(income);

  // const amountRef = useRef();
  // const descriptionRef = useRef();

  // // handler function

  // const addHandlerFuncion = async (e) => {
  //   e.preventDefault();
  //   const newIncome = {
  //     amount: amountRef.current.value,
  //     description: descriptionRef.current.value,
  //     createdAt: new Date(),
  //   };

  //   // связываем с firebse
  //   const collectionRef = collection(db, "income");

  //   try {
  //     const docSnap = await addDoc(collectionRef, newIncome);

  //     //update funcrion
  //     setIncome((prevState) => {
  //       return [
  //         ...prevState,
  //         {
  //           id: docSnap.id,
  //           ...newIncome,
  //         },
  //       ];
  //     });

  //     amountRef.current.value = "";
  //     descriptionRef.current.value = "";
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // // handler delete function

  // const deleteIncomeHandker = async (incomeId) => {
  //   const docRef = doc(db, "income", incomeId);

  //   try {
  //     await deleteDoc(docRef);

  //     //update

  //     setIncome((prevState) => {
  //       return prevState.filter((i) => i.id !== incomeId);
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   const getIncomeData = async () => {
  //     const collectionRef = collection(db, "income");
  //     const docsSnap = await getDocs(collectionRef);

  //     const data = docsSnap.docs.map((doc) => {
  //       return {
  //         id: doc.id,
  //         ...doc.data(), //??
  //         createdAt: new Date(doc.data().createdAt.toMillis()),
  //       };
  //     });

  //     setIncome(data);
  //   };
  //   getIncomeData();
  // }, []);

  if (!user) {
    return <SignIn />;
  }

  return (
    //income Modal
    <>
      {/* <Modal show={openIncomeModal} onClose={setOpenIncomeModal}>
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
                    deleteIncomeHandker(singleIncome.id);
                  }}
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            );
          })}
        </div>
      </Modal> */}

      <AddIncomeModal
        show={openIncomeModal}
        onClose={setOpenIncomeModal}
      ></AddIncomeModal>

      <AddExpensesModal
        show={openExpensesModal}
        onClose={setOpenExpensesModal}
      ></AddExpensesModal>

      <main className="container max-w-2xl  px-6 mx-auto ">
        <section className="py-3">
          <small className="text-gray-400 text-md">My balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => {
              setOpenExpensesModal(true);
            }}
            className="btn btn-primary"
          >
            + expenses
          </button>
          <button
            onClick={() => {
              setOpenIncomeModal(true);
            }}
            className="btn btn-primary-outline"
          >
            + income
          </button>
        </section>

        {/* <section className="py-6">
          <h3 className="text-2xl">My expenses</h3>
          <div className="flex flex-col gap-2 mt-6">
            {expenses.map((expense) => {
              return (
                <ExpensesItem
                  key={expense.id}
                  // color={item.color}
                  // title={item.title}
                  // total={item.total}
                  expense={expense}
                />
              );
            })}
          </div>
        </section> */}

        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses.map((expense) => {
              return <ExpensesItem key={expense.id} expense={expense} />;
            })}
          </div>
        </section>

        <section className="py-6">
          {/* <a id="stats" /> */}

          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "expenses",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: expenses.map((expense) => expense.color),
                    borderColor: ["#18181b"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
