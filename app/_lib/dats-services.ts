import json from "@/public/data.json";
import { supabase } from "./supabase";

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

type DateItem = {
  dateString: string;
  itsDate?: boolean;
};

export function formatDateTime(
  dateString: string,
  itsDate?: boolean
): string | number {
  // Create a new Date object from the ISO date string
  const date = new Date(dateString);

  // Use Intl.DateTimeFormat to format the date and time
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return itsDate ? date.getDate() : formattedDate;
}

export function calculatePercentage(part: number, total: number) {
  if (total === 0) {
    return 0; // Avoid division by zero
  }
  return (part / total) * 100;
}

export function getData() {
  try {
    return json;
  } catch (error) {
    console.error("Failed to fetch data:", error);

    return null;
  }
}

// export async function getTransactions() {
//   const { data: transactions, error } = await supabase
//     .from("transactions")
//     .select("*");

//   if (error) {
//     console.error("Error fetching transactions:", error);
//     throw new Error("Error fetching transactions");
//   }

//   const theTrx = transactions.find((trx) => trx.id === 5);

//   console.log(transactions);
//   return transactions[0];
// }
