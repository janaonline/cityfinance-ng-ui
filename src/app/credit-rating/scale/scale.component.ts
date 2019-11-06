import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss']
})
export class ScaleComponent implements OnInit {

  creditScale = {
    "CRISIL": { title: "CRISIL", description: "" },
    "CRISIL_AAA": { title: "CRISIL AAA (Highest Safety)", description: "Instruments with this rating are considered to have the highest degree of safety regarding timely servicing of financial obligations. Such instruments carry lowest credit risk." },
    "CRISIL_AA": { title: "CRISIL AA (High Safety)", description: "Instruments with this rating are considered to have high degree of safety regarding timely servicing of financial obligations. Such instruments carry very low credit risk." },
    "CRISIL_A": { title: "CRISIL A (Adequate Safety)", description: "Instruments with this rating are considered to have adequate degree of safety regarding timely servicing of financial obligations. Such instruments carry low credit risk." },
    "CRISIL_BBB": { title: "CRISIL BBB (Moderate Safety)", description: "Instruments with this rating are considered to have moderate degree of safety regarding timely servicing of financial obligations. Such instruments carry moderate credit risk." },
    "CRISIL_BB": { title: "CRISIL BB (Moderate Risk)", description: "Instruments with this rating are considered to have moderate risk of default regarding timely servicing of financial obligations." },
    "CRISIL_B": { title: "CRISIL B (High Risk)", description: "Instruments with this rating are considered to have high risk of default regarding timely servicing of financial obligations." },
    "CRISIL_C": { title: "CRISIL C (Very High Risk)", description: "Instruments with this rating are considered to have very high risk of default regarding timely servicing of financial obligations." },
    "CRISIL_D": { title: "CRISIL D (Default)", description: "Instruments with this rating are in default or are expected to be in default soon." },
    "CRISIL_Note_1": { title: "Note 1", description: "CRISIL may apply '+' (plus) or '-' (minus) signs for ratings from 'CRISIL AA' to 'CRISIL C' to reflect comparative standing within the category. " },
    "CRISIL_Note_2": { title: "Note 2", description: "CRISIL may assign rating outlooks for ratings from 'CRISIL AAA' to 'CRISIL B'. Ratings on Rating Watch will not carry outlooks. A rating outlook indicates the direction in which a rating may move over a medium-term horizon of one to two years. A rating outlook can be 'Positive', 'Stable', or 'Negative'. A 'Positive' or 'Negative' rating outlook is not necessarily a precursor of a rating change. " },
    "CARE": { title: "CARE", description: "" },
    "CARE_AAA": { title: "CARE AAA", description: "Instruments with this rating are considered to have the highest degree of safety regarding timely servicing of financial obligations. Such instruments carry lowest credit risk." },
    "CARE_AA": { title: "CARE AA", description: "Instruments with this rating are considered to have high degree of safety regarding timely servicing of financial obligations. Such instruments carry very low credit risk." },
    "CARE_A": { title: "CARE A", description: "Instruments with this rating are considered to have high degree of safety regarding timely servicing of financial obligations. Such instruments carry very low credit risk." },
    "CARE_BBB": { title: "CARE BBB", description: "Instruments with this rating are considered to have moderate degree of safety regarding timely servicing of financial obligations. Such instruments carry moderate credit risk." },
    "CARE_BB": { title: "CARE BB", description: "Instruments with this rating are considered to have moderate risk of default regarding timely servicing of financial obligations." },
    "CARE_B": { title: "CARE B", description: "Instruments with this rating are considered to have high risk of default regarding timely servicing of financial obligations." },
    "CARE_C": { title: "CARE C", description: "Instruments with this rating are considered to have very high risk of default regarding timely servicing of financial obligations." },
    "CARE_D": { title: "CARE D", description: "Instruments with this rating are in default or are expected to be in default soon." },
    "Note_1": { title: "Note 1", description: "Modifiers (plus) /  - (minus) can be used with the rating symbols for the categories CARE AA to CARE C. The modifiers reflect the comparative standing within the category." },
    "ICRA": { title: "ICRA", description: "" },
    "ICRA_AAA": { title: "AAA", description: "Issuers with this rating are considered to have the highest degree of safety regarding timely servicing of financial obligations. Such issuers carry lowest credit risk." },
    "ICRA_AA": { title: "AA", description: "Issuers with this rating are considered to have high degree of safety regarding timely servicing of financial obligations. Such issuers carry very low credit risk." },
    "ICRA_A": { title: "A", description: "Issuers with this rating are considered to have adequate degree of safety regarding timely servicing of financial obligations. Such issuers carry low credit risk." },
    "ICRA_BBB": { title: "BBB", description: "Issuers with this rating are considered to have moderate degree of safety regarding timely servicing of financial obligations. Such issuers carry moderate credit risk." },
    "ICRA_BB": { title: "BB", description: "Issuers with this rating are considered to have moderate risk of default regarding timely servicing of financial obligations." },
    "ICRA_B": { title: "B", description: "Issuers with this rating are considered to have high risk of default regarding timely servicing of financial obligations." },
    "ICRA_C": { title: "C", description: "Issuers with this rating are considered to have very high risk of default regarding timely servicing of financial obligations." },
    "ICRA_D": { title: "D", description: "Issuers with this rating are in default or are expected to be in default soon." },
    "ICRA_Note_1": { title: "Note 1", description: "For the rating categories [ICRA]AA through to [ICRA]C, the modifier + (plus) or – (minus) may be appended to the rating symbols to indicate their relative position within the rating categories concerned. Thus, the rating of [ICRA]AA+ is one notch higher than [ICRA]AA, while [ICRA]AA- is one notch lower than [ICRA]AA." },
    "Brickwork": { title: "Brickwork", description: "" },
    "BWR_AAA": { title: "BWR AAA", description: "Issuers with this rating are considered to offer the highest degree of safety and carry lowest credit risk" },
    "BWR_AA": { title: "BWR AA", description: "Issuers with this rating are considered to offer the high degree of safety and carry very low credit risk" },
    "BWR_A": { title: "BWR A", description: "Issuers with this rating are considered to offer the adequate degree of safety and carry low credit risk" },
    "BWR_BBB": { title: "BWR BBB", description: "Issuers with this rating are considered to offer the moderate degree of safety and carry moderate credit risk" },
    "BWR_BB": { title: "BWR BB", description: "Issuers with this rating are considered to offer moderate risk of default" },
    "BWR_B": { title: "BWR B", description: "Issuers with this rating are considered to offer high risk of default" },
    "BWR_C": { title: "BWR C", description: "Issuers with this rating are considered to offer very high risk of default" },
    "BWR_D": { title: "BWR D", description: "Issuers with this rating are in default or are expected to be in default soon." },
    "BWR_Note_1": { title: "Note 1", description: "+ or - modifiers can be used with BWR AA to BWR C. They reflect comparitive standing for the same category" },
    "IRR": { title: "IRR", description: "" },
    "IND_AAA": { title: "IND AAA(SO)", description: "Instruments with this rating are considered to have the highest degree of safety regarding timely servicing of financial obligations. Such instruments carry lowest credit risk." },
    "IND_AA": { title: "IND AA(SO)", description: "Instruments with this rating are considered to have high degree of safety regarding timely servicing of financial obligations. Such instruments carry very low credit risk." },
    "IND_A": { title: "IND A(SO)", description: "Instruments with this rating are considered to have adequate degree of safety regarding timely servicing of financial obligations. Such instruments carry low credit risk." },
    "IND_BBB": { title: "IND BBB(SO)", description: "Instruments with this rating are considered to have moderate degree of safety regarding timely servicing of financial obligations. Such instruments carry moderate credit risk." },
    "IND_BB": { title: "IND BB(SO)", description: "Instruments with this rating are considered to have moderate risk of default regarding timely servicing of financial obligations." },
    "IND_B": { title: "IND B(SO)", description: "Instruments with this rating are considered to have high risk of default regarding timely servicing of financial obligations." },
    "IND_C": { title: "IND C(SO)", description: "Instruments with this rating are considered to have very high likelihood of default regarding timely payment of financial obligations." },
    "IND_D": { title: "IND D(SO)", description: "Instruments with this rating are in default or are expected to be in default soon." },
    "IND_Note_1": { title: "Note 1", description: "Modifiers (plus) / (minus) can be used with the rating symbols for the categories IND AA(SO) to IND C(SO). The modifiers reflect the comparative standing within the category." } 
  }

  constructor() { }


  ngOnInit() {

  }

}
