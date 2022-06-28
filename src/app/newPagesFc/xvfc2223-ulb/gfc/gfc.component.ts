import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-gfc",
  templateUrl: "./gfc.component.html",
  styleUrls: ["./gfc.component.scss"],
})
export class GfcComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // console.log(numToWords("999999999999999999999991"));
  }
  amount;
  amount2;
  keyUpN(e, i) {
    if (i == "1") {
      this.amount2 = this.numToWords(e);
    } else {
      this.amount = this.price_in_words(e);
    }
  }
  numToWords(n) {
    console.log(n);
    const arr = (x) => Array.from(x);
    const num = (x) => Number(x) || 0;
    const str = (x) => String(x);
    const isEmpty = (xs) => xs.length === 0;
    const take = (n) => (xs) => xs.slice(0, n);
    const drop = (n) => (xs) => xs.slice(n);
    const reverse = (xs) => xs.slice(0).reverse();
    const comp = (f) => (g) => (x) => f(g(x));
    const not = (x) => !x;
    const chunk = (n) => (xs) =>
      isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))];
    let a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    let b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    let g = [
      "",
      "Thousand",
      "Million",
      "Billion",
      "Trillion",
      "Quadrillion",
      "Quintillion",
      "Sextillion",
      "Septillion",
      "Octillion",
      "Nonillion",
    ];
    // this part is really nasty still
    // it might edit this again later to show how Monoids could fix this up
    let makeGroup = ([ones, tens, huns]) => {
      return [
        num(huns) === 0 ? "" : a[huns] + " Hundred ",
        num(ones) === 0 ? b[tens] : (b[tens] && b[tens] + " ") || "",
        a[tens + ones] || a[ones],
      ].join("");
    };
    // "thousands" constructor; no real good names for this, i guess
    let thousand = (group, i) => (group === "" ? group : `${group} ${g[i]}`);
    // execute !
    if (typeof n === "number") return this.numToWords(String(n));
    if (n === "0") return "zero";
    return comp(chunk(3))(reverse)(arr(n))
      .map(makeGroup)
      .map(thousand)
      .filter(comp(not)(isEmpty))
      .reverse()
      .join(" ");
  }
  price_in_words(price) {
    price = price.toString();
    var sglDigit = [
        "Zero",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
      ],
      dblDigit = [
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
      ],
      tensPlace = [
        "",
        "Ten",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
      ],
      handle_tens = function (dgt, prevDgt) {
        return 0 == dgt
          ? ""
          : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt]);
      },
      handle_utlc = function (dgt, nxtDgt, denom) {
        return (
          (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") +
          (0 != nxtDgt || dgt > 0 ? " " + denom : "")
        );
      };

    var str = "",
      digitIdx = 0,
      digit = 0,
      nxtDigit = 0,
      words = [];
    var re = /(0|([1-9]\d*))(\.\d+)?/g;
    if (re.test(price)) {
      var arr = price.split(".");
      price = arr[0];
      for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) {
        switch (
          ((digit = price[digitIdx] - 0),
          (nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0),
          price.length - digitIdx - 1)
        ) {
          case 0:
            words.push(handle_utlc(digit, nxtDigit, ""));
            break;
          case 1:
            words.push(handle_tens(digit, price[digitIdx + 1]));
            break;
          case 2:
            words.push(
              0 != digit
                ? " " +
                    sglDigit[digit] +
                    " Hundred" +
                    (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2]
                      ? " and"
                      : "")
                : ""
            );
            break;
          case 3:
            words.push(handle_utlc(digit, nxtDigit, "Thousand"));
            break;
          case 4:
            words.push(handle_tens(digit, price[digitIdx + 1]));
            break;
          case 5:
            words.push(handle_utlc(digit, nxtDigit, "Lakh"));
            break;
          case 6:
            words.push(handle_tens(digit, price[digitIdx + 1]));
            break;
          case 7:
            words.push(handle_utlc(digit, nxtDigit, "Crore"));
            break;
          case 8:
            words.push(handle_tens(digit, price[digitIdx + 1]));
            break;

          case 9:
            words.push(handle_utlc(digit, nxtDigit, "Hundred"));
            break;
          case 10:
            words.push(handle_tens(digit, price[digitIdx + 1]));
            break;

          case 11:
            words.push(handle_utlc(digit, nxtDigit, "Ten Thousand"));
            break;
          case 12:
            words.push(handle_tens(digit, price[digitIdx + 1]));
            break;

          case 13:
            words.push(handle_utlc(digit, nxtDigit, "Nil"));
            break;
          case 14:
            words.push(handle_tens(digit, price[digitIdx + 1]));
            break;

          case 15:
            words.push(handle_utlc(digit, nxtDigit, "Padma"));
            break;
          case 16:
            words.push(handle_tens(digit, price[digitIdx + 1]));
            break;

          case 17:
            words.push(handle_utlc(digit, nxtDigit, "Shankh"));
            break;
          case 18:
            words.push(handle_tens(digit, price[digitIdx + 1]));
            break;

          case 19:
            words.push(
              0 != digit
                ? " " +
                    sglDigit[digit] +
                    " Hundred" +
                    (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2]
                      ? " and"
                      : "")
                : ""
            );
            break;
          case 20:
            words.push(handle_utlc(digit, nxtDigit, "Thousand"));
            break;
          case 21:
            words.push(handle_tens(digit, price[digitIdx + 1]));
            break;
          case 22:
            words.push(handle_utlc(digit, nxtDigit, "Lakh"));
            break;
          case 23:
            words.push(handle_tens(digit, price[digitIdx + 1]));
            break;
        }
      }
      str = words.reverse().join("");
      if (arr.length > 1) {
        price = arr[1];
        words = null;
        for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) {
          switch (
            ((digit = price[digitIdx] - 0),
            (nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0),
            price.length - digitIdx - 1)
          ) {
            case 0:
              words.push(handle_utlc(digit, nxtDigit, ""));
              break;
            case 1:
              words.push(handle_tens(digit, price[digitIdx + 1]));
              break;
            case 2:
              words.push(
                0 != digit
                  ? " " +
                      sglDigit[digit] +
                      " Hundred" +
                      (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2]
                        ? " and"
                        : "")
                  : ""
              );
              break;
          }
        }
        str += " Rupees " + words.reverse().join("") + " Paise";
      }
    } else str = "";
    return str;
  }
}
