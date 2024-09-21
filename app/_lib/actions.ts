"use server";

import { revalidatePath } from "next/cache";
import { getData } from "./dats-services";
import { supabase } from "./supabase";

export async function createDummyData() {
  const dataRaw = getData();
  const sendAbleData = {
    owners_id: "",
    transactions: dataRaw?.transactions,
    budgets: dataRaw?.budgets,
    balance: dataRaw?.balance,
    pots: dataRaw?.pots,
  };
  const { data, error } = await supabase
    .from("transactions")
    .insert([sendAbleData])
    .select();

  if (error) {
    console.error("Error inserting data:", error);
  }

  return data;
}

export async function getTransactions() {
  const { data: transactions, error } = await supabase
    .from("accountsTrx")
    .select("*");

  if (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Error fetching transactions");
  }

  const theTrx = transactions.find((trx) => trx.id === 5);

  return theTrx;
}

export async function createTrx(id: number, newTrx: object) {
  // Fetch the current tasks
  const { data: accountsTrx, error: fetchError } = await supabase
    .from("accountsTrx")
    .select("transactions")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Error fetching tasks:", fetchError);
    return;
  }

  // Append the new task to the tasks array
  const updatedTrx = [...accountsTrx.transactions, newTrx];

  // Update the tasks array in the board
  const { data, error } = await supabase
    .from("accountsTrx")
    .update({ transactions: updatedTrx })
    .eq("id", id);

  if (error) {
    console.error("Error adding transaction:", error);
  } else {
    console.log("Transaction added successfully:", data);
  }
  // revalidatePath(`/boards/${board.name}`);
  return data;
}

type budType = {
  id: string;
};

export async function editBudget(id: number, budId: string, newTask: object) {
  // Fetch the current tasks
  const { data: accountsTrx, error: fetchError } = await supabase
    .from("accountsTrx")
    .select("budgets")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Error fetching tasks:", fetchError);
    return;
  }

  // Find the index of the task to edit
  const taskIndex = accountsTrx.budgets.findIndex(
    (budg: budType) => budg.id === budId
  );

  if (taskIndex === -1) {
    console.error("Trx not found");
    return;
  }

  // Update the specific task in the array
  const updatedTasks = accountsTrx.budgets.map(
    (budget: budType, index: number) =>
      index === taskIndex ? { ...budget, ...newTask } : budget
  );

  // Update the tasks array in the board
  const { data, error } = await supabase
    .from("boards")
    .update({ tasks: updatedTasks })
    .eq("id", id);

  if (error) {
    console.error("Error updating task:", error);
  } else {
    console.log("Task updated successfully:");
  }

  revalidatePath(`/budgets`);

  return data;
}

export async function createBudget(id: number, newTrx: object) {
  // Fetch the current tasks
  const { data: accountsTrx, error: fetchError } = await supabase
    .from("accountsTrx")
    .select("budgets")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Error fetching tasks:", fetchError);
    return;
  }

  // Append the new task to the tasks array
  const updatedTrx = [...accountsTrx.budgets, newTrx];

  // Update the tasks array in the board
  const { data, error } = await supabase
    .from("accountsTrx")
    .update({ budgets: updatedTrx })
    .eq("id", id);

  if (error) {
    console.error("Error adding transaction:", error);
  } else {
    console.log("Budgets added successfully:");
  }
  revalidatePath(`/budgets`);
  return data;
}
