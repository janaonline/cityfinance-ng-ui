/**
 * @description These are the rating that will be assigned to all the ULBs.
 * If any new rating is added or any old rating is removed from the application,
 * it must be done here as well as in the ulb data also.
 *
 * NOTE: Do not change the order of the rating. The order is used in calculation of
 * total rating for any given rating.
 * For Ex: If we need to calculate total no of ulbs whose rating is A and above, then we calculate it
 * by adding all the ulbs whose rating falls betweeb AAA+ and A.
 */
export const ULBRatings = [
  "AAA+",
  "AAA",
  "AAA-",
  "AA+",
  "AA",
  "AA-",
  "A+",
  "A",
  "A-",
  "BBB+",
  "BBB",
  "BBB-",
  "BB+",
  "BB",
  "BB-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "D-",
];

export type ULBRatingTypes = typeof ULBRatings[number];
