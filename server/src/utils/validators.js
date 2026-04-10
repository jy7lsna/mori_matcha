export const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

export const isValidEmail = (value) => {
  if (!isNonEmptyString(value)) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

export const isPositiveNumber = (value) => typeof value === "number" && Number.isFinite(value) && value >= 0;

// Sanitize strings to prevent XSS attacks
export const sanitizeString = (value) => {
  if (!isNonEmptyString(value)) {
    return "";
  }

  return value
    .trim()
    .replace(/[<>]/g, "") // Remove < and > characters
    .substring(0, 1000); // Limit length
};

// Validate image URLs (basic check)
export const isValidImageUrl = (value) => {
  if (!isNonEmptyString(value)) {
    return true; // Allow empty
  }

  try {
    const url = new URL(value);
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url.pathname);
  } catch {
    return false;
  }
};
