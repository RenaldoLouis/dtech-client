import { format } from "date-fns";

const dateFormatting = {
  shortMonthDateYear: (date: Date | number) => format(new Date(date), "MMM d, yyyy"),
  numericYearMonthDate: (date: Date | number) => format(new Date(date), "yyyy-MM-dd"),
};

export default dateFormatting;
