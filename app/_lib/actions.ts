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
  total?: number;
};

type stBud = {
  id: string;
};

export async function editBudget(
  id: number,
  budId: string | undefined,
  newTask: object
) {
  // Fetch the current budgets
  const { data: accountsTrx, error: fetchError } = await supabase
    .from("accountsTrx") // Ensure you're fetching from the correct table
    .select("budgets")
    .eq("id", id)
    .single(); // Fetch a single record by id

  if (fetchError) {
    console.error("Error fetching budgets:", fetchError);
    return;
  }

  // Find the index of the budget to edit
  const budgetIndex = accountsTrx.budgets.findIndex(
    (budg: budType) => budg.id === budId
  );

  if (budgetIndex === -1) {
    console.error("Budget not found");
    return;
  }

  // Update the specific budget in the array
  const updatedBudgets = accountsTrx.budgets.map(
    (budget: budType, index: number) =>
      index === budgetIndex ? { ...budget, ...newTask } : budget
  );

  // Update the budgets array in the accountsTrx table
  const { data, error } = await supabase
    .from("accountsTrx") // Update the correct table
    .update({ budgets: updatedBudgets }) // Update the budgets field
    .eq("id", id); // Ensure the correct record is updated

  if (error) {
    console.error("Error updating budget:", error);
  }

  // Revalidate the page if using a static site generation approach
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

export async function deleteBudget(id: number, budId: string | undefined) {
  // Fetch the current budgets
  const { data: accountsTrx, error: fetchError } = await supabase
    .from("accountsTrx") // Ensure fetching from the correct table
    .select("budgets")
    .eq("id", id)
    .single(); // Fetch a single record by id

  if (fetchError) {
    console.error("Error fetching budgets:", fetchError);
    return;
  }

  // Find the index of the budget to delete
  const budgetIndex = accountsTrx.budgets.findIndex(
    (budg: budType) => budg.id === budId
  );

  if (budgetIndex === -1) {
    console.error("Budget not found");
    return;
  }

  // Remove the specific budget from the array
  const updatedBudgets = accountsTrx.budgets.filter(
    (budget: budType) => budget.id !== budId
  );

  // Update the budgets array in the accountsTrx table
  const { data, error } = await supabase
    .from("accountsTrx") // Update the correct table
    .update({ budgets: updatedBudgets }) // Update with the filtered budgets array
    .eq("id", id); // Ensure the correct record is updated

  if (error) {
    console.error("Error deleting budget:", error);
  } else {
    console.log("Budget deleted successfully:");
  }

  // Revalidate the page if using a static site generation approach
  revalidatePath(`/budgets`);

  return data;
}

// POTS
export async function createPots(id: number, potsData: object) {
  const { data: accountsTrx, error: fetchError } = await supabase
    .from("accountsTrx") // Ensure fetching from the correct table
    .select("pots")
    .eq("id", id)
    .single(); // Fetch a single record by id

  if (fetchError) {
    console.error("Error fetching pots:", fetchError);
    return;
  }

  // Append the new task to the tasks array
  const updatedTrx = [...accountsTrx.pots, potsData];

  // Update the tasks array in the board
  const { data, error } = await supabase
    .from("accountsTrx")
    .update({ pots: updatedTrx })
    .eq("id", id);

  if (error) {
    console.error("Error adding transaction:", error);
  }
  revalidatePath(`/pots`);
  return data;
}

export async function editPot(
  id: number,
  potId: string | undefined,
  newPot: object
) {
  const { data: accountsTrx, error: fetchError } = await supabase
    .from("accountsTrx") // Ensure fetching from the correct table
    .select("pots")
    .eq("id", id)
    .single(); // Fetch a single record by id

  if (fetchError) {
    console.error("Error fetching budgets:", fetchError);
    return;
  }

  // Find the index of the budget to edit
  const budgetIndex = accountsTrx.pots.findIndex(
    (budg: budType) => budg.id === potId
  );

  if (budgetIndex === -1) {
    console.error("Pot not found");
    return;
  }

  // Update the specific budget in the array
  const updatedBudgets = accountsTrx.pots.map((pot: budType, index: number) =>
    index === budgetIndex ? { ...pot, ...newPot } : pot
  );

  // Update the budgets array in the accountsTrx table
  const { data, error } = await supabase
    .from("accountsTrx") // Update the correct table
    .update({ pots: updatedBudgets }) // Update the budgets field
    .eq("id", id); // Ensure the correct record is updated

  if (error) {
    console.error("Error updating budget:", error);
  }

  // Revalidate the page if using a static site generation approach
  revalidatePath(`/pots`);

  return data;
}
export async function deletePots(id: number, potId: string) {
  const { data: accountsTrx, error: fetchError } = await supabase
    .from("accountsTrx") // Ensure fetching from the correct table
    .select("pots")
    .eq("id", id)
    .single(); // Fetch a single record by id

  if (fetchError) {
    console.error("Error fetching budgets:", fetchError);
    return;
  }

  // Find the index of the budget to edit
  const budgetIndex = accountsTrx.pots.findIndex(
    (budg: budType) => budg.id === potId
  );

  if (budgetIndex === -1) {
    console.error("Pot not found");
    return;
  }

  // Remove the specific budget from the array
  const updatedBudgets = accountsTrx.pots.filter(
    (budget: budType) => budget.id !== potId
  );

  // Update the budgets array in the accountsTrx table
  const { data, error } = await supabase
    .from("accountsTrx") // Update the correct table
    .update({ pots: updatedBudgets }) // Update with the filtered budgets array
    .eq("id", id); // Ensure the correct record is updated

  if (error) {
    console.error("Error deleting pots:", error);
  }

  // Revalidate the page if using a static site generation approach
  revalidatePath(`/pots`);

  return data;
}

type pottype = {
  id: string;
  total: number;
};

type BalanceType = {
  current: number;
  income: number;
  expenses: number;
};
// POTS

export async function addMoneyToPot(
  id: number,
  potsId: string,
  amount: number
) {
  try {
    // 1. Fetch the user's account transaction
    const { data: accountsTrx, error: fetchError } = await supabase
      .from("accountsTrx")
      .select("pots, balance")
      .eq("id", id)
      .single(); // Fetch a single record by id

    if (fetchError || !accountsTrx) {
      throw new Error("Error fetching account data or no data found");
    }

    // 2. Find the specific pot to add money to
    const budgetIndex = accountsTrx.pots.findIndex(
      (pot: pottype) => pot.id === potsId
    );

    if (budgetIndex === -1) {
      throw new Error("Pot not found");
    }

    // 3. Update the pot total and the account balance
    const updatedPots = accountsTrx.pots.map((pot: pottype, index: number) =>
      index === budgetIndex ? { ...pot, total: pot.total + amount } : pot
    );

    const updatedBalance: BalanceType = {
      ...accountsTrx.balance,
      current: accountsTrx.balance.current - amount, // Deduct the amount from balance
    };

    // 4. Use a transaction to update both pots and balance
    const { error: updateError } = await supabase
      .from("accountsTrx")
      .update({
        pots: updatedPots,
        balance: updatedBalance,
      })
      .eq("id", id);

    if (updateError) {
      throw new Error("Error updating pots or balance: " + updateError.message);
    }

    console.log("Successfully updated pot and balance.");
  } catch (error) {
    console.error(error || "An unknown error occurred");
  }

  revalidatePath("/pots");
  revalidatePath("/");
}

export async function withdrawFromPot(
  id: number,
  potsId: string,
  amount: number
) {
  try {
    // 1. Fetch the user's account transaction
    const { data: accountsTrx, error: fetchError } = await supabase
      .from("accountsTrx")
      .select("pots, balance")
      .eq("id", id)
      .single(); // Fetch a single record by id

    if (fetchError || !accountsTrx) {
      throw new Error("Error fetching account data or no data found");
    }

    // 2. Find the specific pot to withdraw money from
    const budgetIndex = accountsTrx.pots.findIndex(
      (pot: pottype) => pot.id === potsId
    );

    if (budgetIndex === -1) {
      throw new Error("Pot not found");
    }

    const selectedPot = accountsTrx.pots[budgetIndex];

    // 3. Check if the pot has enough balance for the withdrawal
    if (selectedPot.total < amount) {
      throw new Error(
        `Insufficient funds in pot. Available: ${selectedPot.total}`
      );
    }

    // 4. Update the pot total and the account balance
    const updatedPots = accountsTrx.pots.map((pot: pottype, index: number) =>
      index === budgetIndex ? { ...pot, total: pot.total - amount } : pot
    );

    const updatedBalance: BalanceType = {
      ...accountsTrx.balance,
      current: accountsTrx.balance.current + amount, // Add the amount back to the balance
    };

    // 5. Use a transaction-like behavior to update both pots and balance
    const { error: updateError } = await supabase
      .from("accountsTrx")
      .update({
        pots: updatedPots,
        balance: updatedBalance,
      })
      .eq("id", id);

    if (updateError) {
      throw new Error("Error updating pots or balance: " + updateError.message);
    }

    console.log("Successfully withdrew from pot and updated balance.");
  } catch (error) {
    console.error(error || "An unknown error occurred");
  }

  revalidatePath("/");
  revalidatePath("/pots");
}
