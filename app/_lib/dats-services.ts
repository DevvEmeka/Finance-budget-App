export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export function formatDateTime(dateString: string): string {
  // Create a new Date object from the ISO date string
  const date = new Date(dateString);

  // Use Intl.DateTimeFormat to format the date and time
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
    // timeZoneName: "short",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}
