import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-gfc",
  templateUrl: "./gfc.component.html",
  styleUrls: ["./gfc.component.scss"],
})
export class GfcComponent implements OnInit {
  isGFC: boolean = true;

  apiData = [
    {
      "label" : "1",
      "shortKey" : "order1",
      "information" : "",
      "viewSequence" : "1",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfd421fb787c1175a6668c",
      "order" : "1",
      "answer_option" : [
        {
          "_id" : "1",
          "name" : "2020-21",
          "did" : [ ],
          "viewSequence" : "1",
          "coordinates" : [ ]
        },
        {
          "_id" : "2",
          "name" : "2022-23",
          "did" : [ ],
          "viewSequence" : "2",
          "coordinates" : [ ]
        }
      ],
      "title" : "Select Financial Year",
      "hint" : "Single-select",
      "resource_urls" : [ ],
      "validation" : [
        {
          "_id" : "1",
          "error_msg" : ""
        }
      ],
      "restrictions" : [ ],
      "input_type" : "3",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "2",
      "shortKey" : "order2",
      "information" : "",
      "viewSequence" : "2",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfd46ace5ef01174b4baa1",
      "order" : "2",
      "answer_option" : [
        {
          "_id" : "1",
          "name" : "GJ007",
          "did" : [ ],
          "viewSequence" : "1",
          "coordinates" : [ ]
        },
        {
          "_id" : "2",
          "name" : "GJ002",
          "did" : [ ],
          "viewSequence" : "2",
          "coordinates" : [ ]
        },
        {
          "_id" : "3",
          "name" : "GJ024",
          "did" : [ ],
          "viewSequence" : "3",
          "coordinates" : [ ]
        },
        {
          "_id" : "4",
          "name" : "GJ026",
          "did" : [ ],
          "viewSequence" : "4",
          "coordinates" : [ ]
        }
      ],
      "title" : "ULB Code",
      "hint" : "Single-select",
      "resource_urls" : [ ],
      "validation" : [
        {
          "_id" : "1",
          "error_msg" : ""
        }
      ],
      "restrictions" : [ ],
      "input_type" : "3",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "3",
      "shortKey" : "order3",
      "information" : "",
      "viewSequence" : "4",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfd4e9764284117b7d45fe",
      "order" : "3",
      "answer_option" : [ ],
      "title" : "Coverage of water supply connections - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "4",
      "shortKey" : "order4",
      "information" : "",
      "viewSequence" : "5",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfd5dd8407cf117c62ba97",
      "order" : "4",
      "answer_option" : [ ],
      "title" : "Coverage of water supply connections - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "5",
      "shortKey" : "order5",
      "information" : "",
      "viewSequence" : "6",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfd66b2850a5118eab46ce",
      "order" : "5",
      "answer_option" : [ ],
      "title" : "Per capita supply of water(lpcd) - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "6",
      "shortKey" : "order6",
      "information" : "",
      "viewSequence" : "7",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfd6de8407cf117c62baa2",
      "order" : "6",
      "answer_option" : [ ],
      "title" : "Per capita supply of water(lpcd) - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "7",
      "shortKey" : "order7",
      "information" : "",
      "viewSequence" : "8",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfd7412850a5118eab46db",
      "order" : "7",
      "answer_option" : [ ],
      "title" : "Extent of metering of water connections - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "8",
      "shortKey" : "order8",
      "information" : "",
      "viewSequence" : "9",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfd7798407cf117c62bab1",
      "order" : "8",
      "answer_option" : [ ],
      "title" : "Extent of metering of water connections - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "9",
      "shortKey" : "order9",
      "information" : "",
      "viewSequence" : "10",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfd7df2850a5118eab46ec",
      "order" : "9",
      "answer_option" : [ ],
      "title" : "Extent of non-revenue water (NRW) - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "10",
      "shortKey" : "order10",
      "information" : "",
      "viewSequence" : "11",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfd80e8407cf117c62bac4",
      "order" : "10",
      "answer_option" : [ ],
      "title" : "Extent of non-revenue water (NRW) - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "11",
      "shortKey" : "order11",
      "information" : "",
      "viewSequence" : "12",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfd8602850a5118eab4701",
      "order" : "11",
      "answer_option" : [ ],
      "title" : "Continuity of water supply - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "12",
      "shortKey" : "order12",
      "information" : "",
      "viewSequence" : "13",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfd8828407cf117c62badb",
      "order" : "12",
      "answer_option" : [ ],
      "title" : "Continuity of water supply - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "13",
      "shortKey" : "order13",
      "information" : "",
      "viewSequence" : "14",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfd8dc2850a5118eab471a",
      "order" : "13",
      "answer_option" : [ ],
      "title" : "Efficiency in redressal of customer complaints - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "14",
      "shortKey" : "order14",
      "information" : "",
      "viewSequence" : "15",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfd8ff8407cf117c62baf6",
      "order" : "14",
      "answer_option" : [ ],
      "title" : "Efficiency in redressal of customer complaints - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "15",
      "shortKey" : "order15",
      "information" : "",
      "viewSequence" : "16",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfd95c2850a5118eab4737",
      "order" : "15",
      "answer_option" : [ ],
      "title" : "Quality of water supplied - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "16",
      "shortKey" : "order16",
      "information" : "",
      "viewSequence" : "17",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfd98c8407cf117c62bb15",
      "order" : "16",
      "answer_option" : [ ],
      "title" : "Quality of water supplied - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "17",
      "shortKey" : "order17",
      "information" : "",
      "viewSequence" : "18",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfd9ec2850a5118eab4758",
      "order" : "17",
      "answer_option" : [ ],
      "title" : "Cost recovery in water supply service - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "18",
      "shortKey" : "order18",
      "information" : "",
      "viewSequence" : "19",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfda0c8407cf117c62bb38",
      "order" : "18",
      "answer_option" : [ ],
      "title" : "Cost recovery in water supply service - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "19",
      "shortKey" : "order19",
      "information" : "",
      "viewSequence" : "20",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfda822850a5118eab477d",
      "order" : "19",
      "answer_option" : [ ],
      "title" : "Efficiency in collection of water supply-related charges - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "20",
      "shortKey" : "order20",
      "information" : "",
      "viewSequence" : "21",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfdaaf8407cf117c62bb5f",
      "order" : "20",
      "answer_option" : [ ],
      "title" : "Efficiency in collection of water supply-related charges - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "21",
      "shortKey" : "order21",
      "information" : "",
      "viewSequence" : "23",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfdb122850a5118eab47a6",
      "order" : "21",
      "answer_option" : [ ],
      "title" : "Coverage of toilets - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "22",
      "shortKey" : "order22",
      "information" : "",
      "viewSequence" : "24",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfdb368407cf117c62bb8a",
      "order" : "22",
      "answer_option" : [ ],
      "title" : "Coverage of toilets - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "23",
      "shortKey" : "order23",
      "information" : "",
      "viewSequence" : "25",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfdb9c2850a5118eab47d3",
      "order" : "23",
      "answer_option" : [ ],
      "title" : "Coverage of waste water network services - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "24",
      "shortKey" : "order24",
      "information" : "",
      "viewSequence" : "26",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfdbc08407cf117c62bbb9",
      "order" : "24",
      "answer_option" : [ ],
      "title" : "Coverage of waste water network services - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "25",
      "shortKey" : "order25",
      "information" : "",
      "viewSequence" : "27",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfdc412850a5118eab4804",
      "order" : "25",
      "answer_option" : [ ],
      "title" : "Collection efficiency of waste water network - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "26",
      "shortKey" : "order26",
      "information" : "",
      "viewSequence" : "28",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfdc6a8407cf117c62bbec",
      "order" : "26",
      "answer_option" : [ ],
      "title" : "Collection efficiency of waste water network - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "27",
      "shortKey" : "order27",
      "information" : "",
      "viewSequence" : "29",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfdd1f2850a5118eab4839",
      "order" : "27",
      "answer_option" : [ ],
      "title" : "Adequacy of waste water treatment capacity - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "28",
      "shortKey" : "order28",
      "information" : "",
      "viewSequence" : "30",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfdd508407cf117c62bc23",
      "order" : "28",
      "answer_option" : [ ],
      "title" : "Adequacy of waste water treatment capacity - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "29",
      "shortKey" : "order29",
      "information" : "",
      "viewSequence" : "31",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfde242850a5118eab4872",
      "order" : "29",
      "answer_option" : [ ],
      "title" : "Extent of reuse and recycling of waste water - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "30",
      "shortKey" : "order30",
      "information" : "",
      "viewSequence" : "32",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfde4a8407cf117c62bc5e",
      "order" : "30",
      "answer_option" : [ ],
      "title" : "Extent of reuse and recycling of waste water - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "31",
      "shortKey" : "order31",
      "information" : "",
      "viewSequence" : "33",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfdea62850a5118eab48af",
      "order" : "31",
      "answer_option" : [ ],
      "title" : "Quality of waste water treatment - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "32",
      "shortKey" : "order32",
      "information" : "",
      "viewSequence" : "34",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfded38407cf117c62bc9d",
      "order" : "32",
      "answer_option" : [ ],
      "title" : "Quality of waste water treatment - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "33",
      "shortKey" : "order33",
      "information" : "",
      "viewSequence" : "35",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfdf212850a5118eab48f0",
      "order" : "33",
      "answer_option" : [ ],
      "title" : "Efficiency in redressal of customer complaints - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "34",
      "shortKey" : "order34",
      "information" : "",
      "viewSequence" : "36",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfdf508407cf117c62bce0",
      "order" : "34",
      "answer_option" : [ ],
      "title" : "Efficiency in redressal of customer complaints - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "35",
      "shortKey" : "order35",
      "information" : "",
      "viewSequence" : "37",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfdfa72850a5118eab4935",
      "order" : "35",
      "answer_option" : [ ],
      "title" : "Extent of cost recovery in waste water management - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "36",
      "shortKey" : "order36",
      "information" : "",
      "viewSequence" : "38",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfdfc98407cf117c62bd27",
      "order" : "36",
      "answer_option" : [ ],
      "title" : "Extent of cost recovery in waste water management - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "37",
      "shortKey" : "order37",
      "information" : "",
      "viewSequence" : "39",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe0162850a5118eab497e",
      "order" : "37",
      "answer_option" : [ ],
      "title" : "Efficiency in collection of waste water charges - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "38",
      "shortKey" : "order38",
      "information" : "",
      "viewSequence" : "40",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe035fb787c1175a666b2",
      "order" : "38",
      "answer_option" : [ ],
      "title" : "Efficiency in collection of waste water charges - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "39",
      "shortKey" : "order39",
      "information" : "",
      "viewSequence" : "42",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe08d2850a5118eab49ce",
      "order" : "39",
      "answer_option" : [ ],
      "title" : "Household level coverage of solid waste management services - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "40",
      "shortKey" : "order40",
      "information" : "",
      "viewSequence" : "43",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe1148407cf117c62bd75",
      "order" : "40",
      "answer_option" : [ ],
      "title" : "Household level coverage of solid waste management services - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "41",
      "shortKey" : "order41",
      "information" : "",
      "viewSequence" : "44",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe16a2850a5118eab4a1f",
      "order" : "41",
      "answer_option" : [ ],
      "title" : "Efficiency of collection of municipal solid waste - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "42",
      "shortKey" : "order42",
      "information" : "",
      "viewSequence" : "45",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe18b2850a5118eab4a74",
      "order" : "42",
      "answer_option" : [ ],
      "title" : "Efficiency of collection of municipal solid waste - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "43",
      "shortKey" : "order43",
      "information" : "",
      "viewSequence" : "46",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe2018407cf117c62bdcb",
      "order" : "43",
      "answer_option" : [ ],
      "title" : "Extent of segregation of municipal solid waste - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "44",
      "shortKey" : "order44",
      "information" : "",
      "viewSequence" : "47",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe2713c014d1188b8d07c",
      "order" : "44",
      "answer_option" : [ ],
      "title" : "Extent of segregation of municipal solid waste - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "45",
      "shortKey" : "order45",
      "information" : "",
      "viewSequence" : "48",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe2c58407cf117c62be24",
      "order" : "45",
      "answer_option" : [ ],
      "title" : "Extent of municipal solid waste recovered -Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "46",
      "shortKey" : "order46",
      "information" : "",
      "viewSequence" : "49",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe2e73c014d1188b8d0d7",
      "order" : "46",
      "answer_option" : [ ],
      "title" : "Extent of municipal solid waste recovered - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "47",
      "shortKey" : "order47",
      "information" : "",
      "viewSequence" : "50",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe38a8f99801187c09f8b",
      "order" : "47",
      "answer_option" : [ ],
      "title" : "Extent of scientific disposal of municipal solid waste  -Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "48",
      "shortKey" : "order48",
      "information" : "",
      "viewSequence" : "51",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe3acfb787c1175a66707",
      "order" : "48",
      "answer_option" : [ ],
      "title" : "Extent of scientific disposal of municipal solid waste - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "49",
      "shortKey" : "order49",
      "information" : "",
      "viewSequence" : "52",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe44efb787c1175a6676b",
      "order" : "49",
      "answer_option" : [ ],
      "title" : "Extent of cost recovery in SWM services - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "50",
      "shortKey" : "order50",
      "information" : "",
      "viewSequence" : "53",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe470fb787c1175a667d0",
      "order" : "50",
      "answer_option" : [ ],
      "title" : "Extent of cost recovery in SWM services - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "51",
      "shortKey" : "order51",
      "information" : "",
      "viewSequence" : "54",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe4b8fb787c1175a66839",
      "order" : "51",
      "answer_option" : [ ],
      "title" : "Efficiency in collection of SWM related user related charges - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "52",
      "shortKey" : "order52",
      "information" : "",
      "viewSequence" : "55",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe4e5fb787c1175a668a4",
      "order" : "52",
      "answer_option" : [ ],
      "title" : "Efficiency in collection of SWM related user related charges - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "53",
      "shortKey" : "order53",
      "information" : "",
      "viewSequence" : "56",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe59f8407cf117c62bee9",
      "order" : "53",
      "answer_option" : [ ],
      "title" : "Efficiency in redressal of customer complaints - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "54",
      "shortKey" : "order54",
      "information" : "",
      "viewSequence" : "57",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe5b8ce5ef01174b4babb",
      "order" : "54",
      "answer_option" : [ ],
      "title" : "Efficiency in redressal of customer complaints - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "55",
      "shortKey" : "order55",
      "information" : "",
      "viewSequence" : "59",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe600e79dfd118f00eec1",
      "order" : "55",
      "answer_option" : [ ],
      "title" : "Coverage of storm water drainage network - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "56",
      "shortKey" : "order56",
      "information" : "",
      "viewSequence" : "60",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe61c2850a5118eab4b77",
      "order" : "56",
      "answer_option" : [ ],
      "title" : "Coverage of storm water drainage network -Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "57",
      "shortKey" : "order57",
      "information" : "",
      "viewSequence" : "61",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe659e79dfd118f00ef32",
      "order" : "57",
      "answer_option" : [ ],
      "title" : "Incidence of water logging - Actual Indicator 2021-22",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "58",
      "shortKey" : "order58",
      "information" : "",
      "viewSequence" : "62",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfe6742850a5118eab4bea",
      "order" : "58",
      "answer_option" : [ ],
      "title" : "Incidence of water logging - Target Indicator 2022-23",
      "hint" : "Range(0-9999)",
      "resource_urls" : [ ],
      "validation" : [
        {
          "error_msg" : "",
          "_id" : "1"
        },
        {
          "error_msg" : "",
          "_id" : "2"
        },
        {
          "_id" : "14",
          "error_msg" : "",
          "value" : "0.00"
        }
      ],
      "restrictions" : [ ],
      "min" : 1,
      "max" : 7,
      "pattern" : "^((?:^((?:[0-9]|[1-9][0-9]{1,2}|[1-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-8]))(?:\\.\\d{1,3})?|9999))$",
      "input_type" : "2",
      "weightage" : [ ],
      "editable" : false
    },
    {
      "label" : "",
      "shortKey" : "order59",
      "information" : "",
      "viewSequence" : "3",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62dfec2e8f99801187c0a07d",
      "order" : "59",
      "answer_option" : [ ],
      "title" : "Water Supply",
      "hint" : "",
      "resource_urls" : [ ],
      "validation" : [
        {
          "_id" : "54",
          "error_msg" : ""
        }
      ],
      "restrictions" : [ ],
      "input_type" : "10",
      "editable" : false,
      "weightage" : [ ]
    },
    {
      "label" : "",
      "shortKey" : "order60",
      "information" : "",
      "viewSequence" : "22",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62e0c9ce8407cf117c62c03c",
      "order" : "60",
      "answer_option" : [ ],
      "title" : "Sanitation\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t",
      "hint" : "",
      "resource_urls" : [ ],
      "validation" : [
        {
          "_id" : "54",
          "error_msg" : ""
        }
      ],
      "restrictions" : [ ],
      "input_type" : "10",
      "editable" : false,
      "weightage" : [ ]
    },
    {
      "label" : "",
      "shortKey" : "order61",
      "information" : "",
      "viewSequence" : "41",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62e0caaace5ef01174b4bc39",
      "order" : "61",
      "answer_option" : [ ],
      "title" : "Solid waste\t\t\t\t\t\t\t\t\t\t\t\t\t\t",
      "hint" : "",
      "resource_urls" : [ ],
      "validation" : [
        {
          "_id" : "54",
          "error_msg" : ""
        }
      ],
      "restrictions" : [ ],
      "input_type" : "10",
      "editable" : false,
      "weightage" : [ ]
    },
    {
      "label" : "",
      "shortKey" : "order62",
      "information" : "",
      "viewSequence" : "58",
      "child" : [ ],
      "parent" : [ ],
      "_id" : "62e0cbc8ce5ef01174b4bd5d",
      "order" : "62",
      "answer_option" : [ ],
      "title" : "Storm Water\t",
      "hint" : "",
      "resource_urls" : [ ],
      "validation" : [
        {
          "_id" : "54",
          "error_msg" : ""
        }
      ],
      "restrictions" : [ ],
      "input_type" : "10",
      "editable" : false,
      "weightage" : [ ]
    }
  ]


  constructor() {}

  ngOnInit(): void {
    this.initializeForm();  
  }
  initializeForm() {
// let element = document.createElement('web-form');
   let element = document.getElementById('form-one');
    element.setAttribute('questionresponse', JSON.stringify(this.apiData));
    element.addEventListener('submitQuestion', (event) => {
      console.log('submitQuestion', event);
    })
  }
//   initForm('form-one', apiData, false, (event)=>{
//     console.log("WEBFORM:", event.detail);
// });
  
}
