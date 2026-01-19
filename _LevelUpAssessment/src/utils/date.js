const parseLocalDate = (value) => {
  if (!value) {
    return null;
  }
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};
export const formatDate = (value) => {
  if (!value) {
    return "N/A";
  }

  const date = parseLocalDate(value);
  if (!date) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

export const formatDateInput = (value) => {
  if (!value) {
    return "";
  }
  const date = parseLocalDate(value);
  if (!date) {
    return value;
  }
  return date.toISOString().slice(0, 10);
};

export const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) {
    return "N/A";
  }
  const birth = parseLocalDate(dateOfBirth);
  if (!birth) {
    return "N/A";
  }
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const month = today.getMonth() - birth.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
};

