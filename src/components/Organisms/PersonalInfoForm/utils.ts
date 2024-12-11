
export function required(value: string): string | null {
  return value ? null : "This field is required";
}

    

export function minLength(min: number): (value: string) => string | null {
  return function(value: string): string | null {
    return value.length >= min ? null : `Minimum length is ${min}`;
  };
}

export function emailPattern(value: string): string | null {
  return /\S+@\S+\.\S+/.test(value) ? null : "Invalid email format";
}

export function numberPattern(value: string): string | null {
  const regex = /^\+(\d{1,4})\s?(\d{1,4})\s?(\d{1,4})\s?(\d{1,4})$/;
  return regex.test(value) ? null : "Invalid mobile number format. Example: +1 234 567 890";
}
