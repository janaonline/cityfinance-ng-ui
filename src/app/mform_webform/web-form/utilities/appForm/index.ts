/**
 *
 * @param twentyFourHourTime it should be in the format HH:MM
 * @returns {string} Returns 12 hour time in the format HH:MM am or pm
 */
export const convert24HourTimeFormatTo12Hour = (twentyFourHourTime: any) => {
  if (!twentyFourHourTime) {
    return "";
  }
  let hours = Number(twentyFourHourTime?.split(":")[0]);
  let minutes = twentyFourHourTime?.split(":")[1];
  const amOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours < 10 ? "0" + hours : hours}:${minutes} ${amOrPm}`;
};

function validateAadhaar(aadhaarString: any) {
  if (aadhaarString.length !== 12) {
    return false;
  }
  let aadhaarArray = aadhaarString.split("");
  let toCheckChecksum = aadhaarArray.pop();
  if (generateCheckSum([...aadhaarArray]) === parseInt(toCheckChecksum)) {
    return true;
  }
  return false;
}

function generateCheckSum(aadhaarArray: any) {
  // The multiplication table
  let multiplicationTable = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  ];
  // permutation table p
  let permutationTable = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
  ];
  // inverse table inv
  let inverseTable = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

  let c = 0;
  let invertedAadharArray = aadhaarArray.reverse();
  for (let i = 0; i < invertedAadharArray.length; i++) {
    c =
      multiplicationTable[c][
        permutationTable[(i + 1) % 8][invertedAadharArray[i]]
      ];
  }
  return inverseTable[c];
}

const checkIfObjectIsEmpty = (obj: any) => !obj || !Object.keys(obj)?.length;

const getUserLanguage = () => {
  let temp = localStorage.getItem("user");
  if (temp) {
    return JSON.parse(temp)?.userLanguage;
  }
};

const getProjectRegionalName = ({ projectEnglishName, regionalNames }: any) => {
  const userLanguage = getUserLanguage();
  return (
    regionalNames?.find((nameObj: any) => nameObj?.lng == userLanguage)
      ?.title || projectEnglishName
  );
};

export {
  validateAadhaar,
  checkIfObjectIsEmpty,
  getUserLanguage,
  getProjectRegionalName,
};
