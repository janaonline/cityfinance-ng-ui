import { AbstractControl, ValidationErrors } from "@angular/forms";

export function awardPeriodValidator(
  control: AbstractControl
): ValidationErrors | null {
  const parent = control.parent;
  const maxControl = parent?.get("max")?.value || "2031";
  const minControl = parent?.get("min")?.value || "2015";

  const value = control.value;
  if (!value) return null;

  // Check format YYYY-YY
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return { awardPeriodInvalid: "Format must be YYYY-YY" };

  // Check if year range is 5 years.
  const startYear = parseInt(match[1], 10);
  const endYear = parseInt(`20${match[2]}`, 10);

  // Start year must be greater than 2015 and less then 2026
  if (startYear < 2015 || startYear > 2026)
    return {
      awardPeriodInvalid: "Award period must be between 2015-20 and 2026-31",
    };

  // Range must be 5 years.
  if (endYear - startYear !== 5)
    return { awardPeriodInvalid: "End year must be 5 years after start year" };

  // Value must be between 2015-20, 2026-31.
  const valueNum = parseInt(`${startYear}${match[2]}`, 10);
  const minValid = { start: +minControl, end: +minControl + 5 };
  const maxValid = { start: +maxControl, end: +maxControl + 5 };

  const minValue = parseInt(
    `${minValid.start}${minValid.end.toString().slice(-2)}`,
    10
  );
  const maxValue = parseInt(
    `${maxValid.start}${maxValid.end.toString().slice(-2)}`,
    10
  );

  if (valueNum < minValue || valueNum > maxValue)
    return {
      awardPeriodInvalid: "Award period must be between 2015-20 and 2026-31",
    };

  return null;
}
