import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { CommonService } from "../common.service";

@Component({
  selector: "app-web-form-view",
  templateUrl: "./web-form-view.component.html",
  styleUrls: ["./web-form-view.component.scss"],
})
export class WebFormViewComponent implements OnInit {
  @Input() title = "";
  @Input() titleDescription = "";
  @Input() template: "template1" | "template2" | "template3" = "template2";

  imagesExtension = ["png", "jpg", "jpeg"];
  @Input() questions = [
    {
      title: "Select Contributing Mahindra Entities?",
      input_type: "4",
      shortKey: "csrId",
      order: "csrId",
      answer_option: [
        {
          _id: "60dedccd1ab11c678e2a4559",
          name: "Kartik",
        },
        {
          _id: "60ec4a455c45a965c53cb5d5",
          name: "Test member ",
        },
        {
          _id: "60ed597d2a008c79f048a026",
          name: "Mahindra member",
        },
        {
          _id: "60ed5a302a008c79f048a0d0",
          name: "member 20",
        },
        {
          _id: "60ed65cd7a55687d9113f117",
          name: "Hosiptality member",
        },
        {
          _id: "60f5238278421e1142a233af",
          name: "fdf",
        },
        {
          _id: "60f523e978421e1142a233da",
          name: "C.CSR 1",
        },
        {
          _id: "60f523e935f7811141591b34",
          name: "hghf02",
        },
        {
          _id: "60f5248835f7811141591b62",
          name: "dsfj",
        },
        {
          _id: "6108c780b1ca821a5254aa2e",
          name: "Real estate",
        },
        {
          _id: "610914dab39e6a7ad47a23a8",
          name: "Test Data CSR",
        },
        {
          _id: "610a65b028b67c17fa8994db",
          name: "CSR ",
        },
        {
          _id: "610a6b2028b67c17fa8998b9",
          name: "CSR 1",
        },
        {
          _id: "61126d3a94d69a4d9f4d31c5",
          name: "Tanya",
        },
        {
          _id: "611a4249045a9b2b22370a52",
          name: "Test CSR",
        },
        {
          _id: "611a42d4e7c7822b234c53ac",
          name: "Mahindra Rise",
        },
        {
          _id: "6124fb793d80f95ea3de6f95",
          name: "kartik test",
        },
        {
          _id: "6126362dea3ca77ce97d49dc",
          name: "Farm CSR01",
        },
        {
          _id: "61264ea61d7bd902b9cd894a",
          name: "Mahindra CSR",
        },
        {
          _id: "61264ef5f80db602ba5fccab",
          name: "Partner CSR",
        },
        {
          _id: "612917834e9fc361ef06ac99",
          name: "Real estate ",
        },
        {
          _id: "614061a092a44c2a610151b3",
          name: "test csr 001",
        },
        {
          _id: "61406221b40615f7acac1ce6",
          name: "test csr 002",
        },
        {
          _id: "61497c87ad37aa4860018dc2",
          name: "Test Member",
        },
        {
          _id: "614daf1c393e05432178f419",
          name: "CSR01",
        },
        {
          _id: "6151769ac1619252e3eadbd5",
          name: "A",
        },
        {
          _id: "61569f3863e0a4237fe8c4fa",
          name: "Farm CSR02",
        },
        {
          _id: "6156a85f4f49d52380afe6bb",
          name: "Farm CSR03",
        },
        {
          _id: "6156bf1763e0a4237fe8d953",
          name: "CSR02",
        },
        {
          _id: "6156bfde4f49d52380aff365",
          name: "ABCCC",
        },
        {
          _id: "615be9cfd2922e0c0020e792",
          name: "Testing new CSR",
        },
        {
          _id: "615bec315a9f5d0c01ce6b16",
          name: "New",
        },
        {
          _id: "615bec6cd2922e0c0020ead9",
          name: "Alpha",
        },
        {
          _id: "615d4592510f019af7f04c39",
          name: "Kartik testing CSR",
        },
        {
          _id: "615d8be2f48fe2a0517aa891",
          name: "csr amit test01",
        },
        {
          _id: "615d8ca0161d75a35c7347fa",
          name: "new@gmail.com",
        },
        {
          _id: "615d8e11161d75a35c734842",
          name: "new11",
        },
        {
          _id: "615ea0ef3ef3f740f532374c",
          name: "Water resource",
        },
        {
          _id: "615ebcf73ef3f740f53244f2",
          name: "T test ",
        },
        {
          _id: "615ebd813ef3f740f5324543",
          name: "t test in mahindra",
        },
        {
          _id: "615ec8de3ef3f740f53250af",
          name: "This will be added",
        },
        {
          _id: "615ed3203ef3f740f53259a2",
          name: "testing twice",
        },
        {
          _id: "615ed788c6ea1340f656fe47",
          name: "testing tushar",
        },
        {
          _id: "615ed859c6ea1340f656fe95",
          name: "testing",
        },
        {
          _id: "615edd2d6732c64860efbcfe",
          name: "testing new",
        },
        {
          _id: "61667e2e2e5caf6759e8a61a",
          name: "Aditya Inc.",
        },
        {
          _id: "6166875b2e5caf6759e8b06c",
          name: "ee",
        },
        {
          _id: "61764e93cb540d024c61f080",
          name: "Tech CSR",
        },
        {
          _id: "619201b8ff081d4d805ec4a4",
          name: "New CSR BB",
        },
        {
          _id: "61b1cb7ff9564152feae2e01",
          name: "satyam",
        },
        {
          _id: "61b82bf6512569159c0b2a3e",
          name: "ssss",
        },
      ],
      width: "25",
      parent: [],
      validation: [
        {
          _id: "1",
          error_msg: "",
          value: "",
        },
        {
          _id: "3",
          error_msg: "",
          value: "",
        },
      ],
      selectedValue: [
        {
          _id: "61fba42891360348ac99e527",
          label: "Kartik",
          textValue: "",
          value: "60dedccd1ab11c678e2a4559",
        },
      ],
    },
    {
      title: "Name of project",
      input_type: "1",
      shortKey: "name",
      order: "name",
      width: "25",
      validation: [
        {
          _id: "1",
          error_msg: "",
          value: "",
        },
        {
          _id: "3",
          error_msg: "",
          value: "",
        },
      ],
      selectedValue: [
        {
          _id: "61fba42891360348ac99e529",
          label: "",
          textValue: "test02",
          value: "",
        },
      ],
    },
    {
      title: "Focus Area",
      input_type: "3",
      shortKey: "focusArea",
      order: "focusArea",
      answer_option: [
        {
          _id: "6114ef7500a48d2048f389e4",
          name: "Healthcare. ",
          code: "2",
        },
        {
          _id: "6114f5b900a48d2048f38a4a",
          name: "Skill Development",
          code: "3",
        },
        {
          _id: "6114f5e7ee52792047b329df",
          name: "Rural Development",
          code: "1",
        },
        {
          _id: "6114f65bee52792047b329f4",
          name: "Education",
          code: "4",
        },
        {
          _id: "6114f96cee52792047b32a57",
          name: "Environment",
          code: "11",
        },
        {
          _id: "6114fa4400a48d2048f38b02",
          name: "Test",
          code: "5",
        },
        {
          _id: "6114fb6900a48d2048f38b73",
          name: "Test 2",
          code: "6",
        },
        {
          _id: "6114fba600a48d2048f38b81",
          name: "Test 3",
          code: "12",
        },
        {
          _id: "611501a2d27f3a6a682c7229",
          name: "kartik13",
          code: "kartik13",
        },
        {
          _id: "611501b94b5e036a6985a67a",
          name: "kartik2",
          code: "kartik2",
        },
        {
          _id: "611cd9d6cdd25406aee9e6f1",
          name: "Assded",
          code: "dedrfr",
        },
        {
          _id: "614826ea3e9e0f2832d740bc",
          name: "focus area with sc7 test-1",
          code: "fa-with-sc7-1",
        },
        {
          _id: "6148284c68ef272a9f64085a",
          name: "focus area with sc7 test-2",
          code: "fa-with-sc7-2",
        },
        {
          _id: "6148286fc17db32a951ba9d6",
          name: "focus area with sc7 test-3",
          code: "fa-with-sc7-3",
        },
        {
          _id: "614828b08089a72a9c959be0",
          name: "focus area with sc7 test-4",
          code: "fa-with-sc7-4",
        },
        {
          _id: "614828c8032bfe2a9bde0dd6",
          name: "focus area with sc7 test-5",
          code: "fa-with-sc7-5",
        },
        {
          _id: "61482e3807a7c732617e4100",
          name: "focus area with sc7 test-6",
          code: "fa-with-sc7-6",
        },
        {
          _id: "61482e42b328203268b5c43f",
          name: "focus area with sc7 test-7",
          code: "fa-with-sc7-7",
        },
        {
          _id: "61482e5a649de3326aef857b",
          name: "focus area with sc7 test-8",
          code: "fa-with-sc7-8",
        },
        {
          _id: "61482e652a57603267064541",
          name: "focus area with sc7 test-9",
          code: "fa-with-sc7-9",
        },
        {
          _id: "61482e7407a7c732617e4108",
          name: "focus area with sc7 test-10",
          code: "fa-with-sc7-10",
        },
        {
          _id: "616697fa2e5caf6759e8bf1f",
          name: "dfdf",
          code: "dfdfd",
        },
        {
          _id: "61adac820fc3684c1c5b2ab9",
          name: "wwewe",
          code: "d",
        },
        {
          _id: "61adb92e0fc3684c1c5b7297",
          name: "erere",
          code: "ree",
        },
      ],
      width: "25",
      validation: [
        {
          _id: "1",
          error_msg: "",
          value: "",
        },
        {
          _id: "3",
          error_msg: "",
          value: "",
        },
      ],
      selectedValue: [
        {
          _id: "61fba42891360348ac99e52b",
          label: "Skill Development",
          textValue: "",
          value: "6114f5b900a48d2048f38a4a",
        },
      ],
    },
    {
      title: "Implementation type",
      input_type: "3",
      validation: [
        {
          _id: "1",
        },
        {
          _id: "3",
          error_msg: "",
          value: "",
        },
      ],
      child: [
        {
          order: "partner",
          value: "^(ngo_esops_indirect|ngo_indirect|ppp_tripartite_ngo)$",
        },
        {
          order: "vendorId",
          value:
            "^(vendor_esops_indirect|vendor_indirect|ppp_tripartite_vendor)$",
        },
        {
          order: "ppptripartiteknowledgepartner",
          value: "^(ppp_tripartite_knowledge_partner)$",
        },
        {
          order: "esopBrand",
          value: "^(esops|vendor_esops_direct|ngo_esops_indirect)$",
        },
        {
          order: "otherEntitiesAddFunds",
          value: "^(ngo_indirect|vendor_direct)$",
        },
      ],
      parent: [],
      answer_option: [
        {
          _id: "ngo_indirect",
          name: "NGO",
        },
        {
          _id: "ngo_esops_indirect",
          name: "NGO + ESOPs",
        },
        {
          _id: "vendor_direct",
          name: "Vendor",
        },
        {
          _id: "vendor_esops_direct",
          name: "Vendor + ESOPs",
        },
        {
          _id: "esops",
          name: "ESOPs",
        },
        {
          _id: "ppp_direct",
          name: "PPP Direct",
        },
        {
          _id: "ppp_tripartite_ngo",
          name: "PPP + NGO",
        },
        {
          _id: "ppp_tripartite_vendor",
          name: "PPP + Vendor",
        },
        {
          _id: "ppp_tripartite_knowledge_partner",
          name: "PPP + Knowledge Partner",
        },
      ],
      shortKey: "implementationType",
      order: "implementationType",
      width: "25",
      selectedValue: [
        {
          _id: "61fba42891360348ac99e52d",
          label: "NGO",
          textValue: "",
          value: "ngo_indirect",
        },
      ],
    },
    {
      title: "ESOP Brand",
      input_type: "3",
      shortKey: "esopBrand",
      order: "esopBrand",
      answer_option: [
        {
          _id: "611a6246e7c7822b234c56c6",
          name: "8: ii",
          code: "8",
        },
        {
          _id: "6125f5d5915e88638e18f78a",
          name: "777: jefeh",
          code: "777",
        },
        {
          _id: "6125f61c915e88638e18f7af",
          name: "22: dkjhjd",
          code: "22",
        },
        {
          _id: "61405e5792a44c2a61014f59",
          name: "88: kkk",
          code: "88",
        },
        {
          _id: "61405f4821bdca2a60e1cc9d",
          name: "65: ndj",
          code: "65",
        },
        {
          _id: "615adcf00c6d306f11f60302",
          name: "1: tu",
          code: "1",
        },
        {
          _id: "6188d87be3b12d15c4a6e4ed",
          name: "34: New Esop Brands",
          code: "34",
        },
      ],
      parent: [
        {
          order: "implementationType",
          value: "^(esops|vendor_esops_direct|ngo_esops_indirect)$",
        },
      ],
      width: "25",
      validation: [
        {
          _id: "1",
          error_msg: "",
          value: "",
        },
        {
          _id: "3",
          error_msg: "",
          value: "",
        },
      ],
      selectedValue: [],
    },
    {
      title: "NGO",
      input_type: "4",
      shortKey: "ngo",
      order: "partner",
      width: "25",
      parent: [
        {
          order: "implementationType",
          value: "^(ngo_esops_indirect|ngo_indirect|ppp_tripartite_ngo)$",
        },
      ],
      validation: [
        {
          _id: "1",
          error_msg: "",
          value: "",
        },
        {
          _id: "3",
          error_msg: "",
          value: "",
        },
      ],
      answer_option: [
        {
          _id: "60ed6d9215141e7d90fcd822",
          name: "sdf",
          code: "new code001",
          associatedCsr: [
            {
              _id: "61a773c065006217599bda8f",
              csrId: "61667e2e2e5caf6759e8a61a",
              code: "A0002",
            },
          ],
        },
        {
          _id: "60ee6b2b15141e7d90fce32d",
          name: "mm",
          code: "892387328",
          associatedCsr: [
            {
              _id: "61a886889874505643192cd5",
              csrId: "61764e93cb540d024c61f080",
              code: "001",
            },
            {
              _id: "61a9f6978276f30609e644a5",
              csrId: "619201b8ff081d4d805ec4a4",
              code: "8753",
            },
            {
              _id: "61aef591b80161458c6368b9",
              csrId: "60dedccd1ab11c678e2a4559",
            },
            {
              _id: "61aef591b80161458c6368ba",
              csrId: "611a4249045a9b2b22370a52",
              code: "123",
            },
          ],
        },
        {
          _id: "60ee71a215141e7d90fce526",
          name: "jj",
          code: "FFRR",
          associatedCsr: [
            {
              _id: "61a9c53a287f4e7f92b017f1",
              csrId: "61764e93cb540d024c61f080",
              code: "890",
            },
          ],
        },
        {
          _id: "61037f1d41dc7507d9774ed9",
          name: "Adding NGO",
          code: "newcode01",
          associatedCsr: [
            {
              _id: "61a9bbe7d782b57dd2ca38c1",
              csrId: "60f5248835f7811141591b62",
              code: "asdf",
            },
            {
              _id: "61a9bd85d782b57dd2ca422a",
              csrId: "6108c780b1ca821a5254aa2e",
              code: "jjjjjj",
            },
            {
              _id: "61a9c5de287f4e7f92b01c18",
              csrId: "61764e93cb540d024c61f080",
              code: "678",
            },
            {
              _id: "61adbae90fc3684c1c5b7bab",
              csrId: "610914dab39e6a7ad47a23a8",
              code: "884488",
            },
            {
              _id: "61adbe1d0fc3684c1c5b8b94",
              csrId: "610a65b028b67c17fa8994db",
              code: "4444",
            },
          ],
        },
        {
          _id: "61149ad397b6a212d8364674",
          name: "NGO",
          code: "C13",
          associatedCsr: [],
        },
        {
          _id: "611525c8ee52792047b33801",
          name: "tessstt",
          code: "bvbvfg",
          associatedCsr: [],
        },
        {
          _id: "611a3259e7c7822b234c521b",
          name: "test ngo",
          code: "ddddd",
          associatedCsr: [
            {
              _id: "61adfab84c5a90520ec5a619",
              csrId: "61764e93cb540d024c61f080",
              code: "1234",
            },
          ],
        },
        {
          _id: "611f6f0c2f2bb55d168ad677",
          name: "test 1234",
          code: "C20",
          associatedCsr: [],
        },
        {
          _id: "6126735e83f0d206527cd6c7",
          name: "NgO",
          code: "C21",
          associatedCsr: [],
        },
        {
          _id: "612673b383f0d206527cd714",
          name: "dshs",
          code: "gfgf",
          associatedCsr: [
            {
              _id: "6193d1f4ad93871827d764d7",
              csrId: "60f523e978421e1142a233da",
              code: "fg",
            },
          ],
        },
        {
          _id: "61271bd0f3fa0d078729c3e5",
          name: "New NGO ",
          code: "hghh",
          associatedCsr: [],
        },
        {
          _id: "61271c55f3fa0d078729c454",
          name: "New Ngo 2",
          code: "C24",
          associatedCsr: [],
        },
        {
          _id: "614c3e3343392d75f370d215",
          name: "AOne",
          code: "11",
          associatedCsr: [],
        },
        {
          _id: "614dacc8d68c283ee3726fd6",
          code: "12",
          name: "A",
          associatedCsr: [],
        },
        {
          _id: "614dad37393e05432178f377",
          code: "98",
          name: "B",
          associatedCsr: [],
        },
        {
          _id: "6156c07e4f49d52380aff3c5",
          code: "55",
          name: "ngo nn",
          associatedCsr: [],
        },
        {
          _id: "615e7d6d2171b1326a16ca93",
          code: "new code002",
          name: "Mahindra NGO",
          associatedCsr: [],
        },
        {
          _id: "61716f78c5538d13a8f101fd",
          code: "NEW NGO",
          name: "NEW NGO",
          associatedCsr: [],
        },
        {
          _id: "6171701ec5538d13a8f102e4",
          code: "new code234",
          name: "new code ",
          associatedCsr: [],
        },
        {
          _id: "617a40544d7fd36ac6045c90",
          code: "TESTINGCOD",
          name: "TESTING CODE 1",
          associatedCsr: [],
        },
        {
          _id: "617eba36a68ed6e0507c3aa1",
          code: "NA001",
          name: "Nritodaya",
          associatedCsr: [
            {
              _id: "61949353d1a97d1aee4f9e90",
              csrId: "60f5238278421e1142a233af",
              code: "rrg",
            },
          ],
        },
        {
          _id: "617eba37a68ed6e0507c3ae4",
          code: "NA002",
          name: "Mahendra Foundation Trust",
          associatedCsr: [],
        },
        {
          _id: "617eba65a68ed6e0507c3bf5",
          code: "NA003",
          name: "Maharogi Sewa Samiti Anandvan",
          associatedCsr: [],
        },
        {
          _id: "619232d238f41f37c74cdde8",
          code: "AB232323",
          name: "AB232323 kartik",
          associatedCsr: [],
        },
        {
          _id: "61933ca8b0fdaa5645f56417",
          code: "12345678",
          name: "BB Ngo",
          associatedCsr: [],
        },
        {
          _id: "6193521910d1a26847a8bf04",
          code: "FFFRFRFRF",
          name: "FRFR",
          associatedCsr: [],
        },
        {
          _id: "6193538c10d1a26847a8c191",
          code: "Ashutosh",
          name: "Ashutosh",
          associatedCsr: [],
        },
        {
          _id: "619355e610d1a26847a8c5b2",
          code: "12345679",
          name: "BB NGOTest",
          associatedCsr: [],
        },
        {
          _id: "619369a683830f0732719666",
          code: "estasoc",
          name: "Associate",
          associatedCsr: [],
        },
        {
          _id: "61936a4983830f0732719732",
          code: "wdwdhgg",
          name: "ssdw",
          associatedCsr: [],
        },
        {
          _id: "61936ded83830f07327199d9",
          code: "gfgfd",
          name: "fdfd",
          associatedCsr: [],
        },
        {
          _id: "61936ef77c736d0904df64b0",
          code: "dgfg",
          name: "dfef",
          associatedCsr: [],
        },
        {
          _id: "61939f003c1bbc6baa56b28d",
          code: "dhgs",
          name: "sjds",
          associatedCsr: [],
        },
        {
          _id: "6193a4999cf815141c76d972",
          code: "dghfgd",
          name: "dhghgd",
          associatedCsr: [],
        },
        {
          _id: "6193a6ee3c1bbc6baa56c3a5",
          code: "fdfddfd",
          name: "ffddfdf",
          associatedCsr: [],
        },
        {
          _id: "6193afd070b51d769cc62599",
          code: "7777",
          name: "approval test001",
          associatedCsr: [],
        },
        {
          _id: "6193c3c140d13916aa4a9526",
          code: "sdeded",
          name: "dddede",
          associatedCsr: [
            {
              _id: "6193c3cb40d13916aa4a956e",
              csrId: "60ec4a455c45a965c53cb5d5",
              code: "DFDF",
            },
          ],
        },
        {
          _id: "6193c8d240d13916aa4a98ec",
          code: "dddcdc",
          name: "huyddfd",
          associatedCsr: [
            {
              _id: "6193c8e440d13916aa4a993b",
              csrId: "60f5238278421e1142a233af",
              code: "DS",
            },
          ],
        },
        {
          _id: "6194c9e87a96170466372e9f",
          code: "rfrr",
          name: "rtrt",
          associatedCsr: [],
        },
        {
          _id: "6194ca537a96170466373000",
          code: "erer",
          name: "erere",
          associatedCsr: [],
        },
        {
          _id: "6194cb4c7a961704663741b5",
          code: "fdddfd",
          name: "dfdf",
          associatedCsr: [],
        },
        {
          _id: "6195f63735d0e20fb661e5f9",
          code: "Asdhgf",
          name: "hfdhfdh",
          associatedCsr: [],
        },
        {
          _id: "6196067e235b6f43d973c5d0",
          code: "ffeeee",
          name: "erererr",
          associatedCsr: [],
        },
        {
          _id: "619b8a1c99814e17c9b98e72",
          code: "asdfadsf",
          name: "asdfadsf",
          associatedCsr: [],
        },
        {
          _id: "619c80aa337c3429d1d37d13",
          code: "6473678",
          name: "TEST NGO Data ",
          associatedCsr: [],
        },
        {
          _id: "61a076783e31da039b5fef4d",
          code: "123409876",
          name: "Test NGO data 0122",
          associatedCsr: [],
        },
        {
          _id: "61a71099817dc92def8e80c0",
          name: "adi test",
          associatedCsr: [
            {
              _id: "61a73a1f6517b31c4e065f6c",
              csrId: "61667e2e2e5caf6759e8a61a",
              code: "A0001",
            },
          ],
        },
        {
          _id: "61a74062432cdc328a761c55",
          code: "ABCDEF001",
          name: "ABCDEF001",
          associatedCsr: [
            {
              _id: "61a74401ade83a3516badffb",
              csrId: "60dedccd1ab11c678e2a4559",
              code: "KARTIK001",
            },
          ],
        },
        {
          _id: "61a750ee03fd153509d3608e",
          name: "adi test 2",
          associatedCsr: [
            {
              _id: "61a9b467c0c38de1c9607047",
              csrId: "60f5248835f7811141591b62",
              code: "AVC",
            },
          ],
        },
        {
          _id: "61ac78f87993af4591f82429",
          name: "TEsting karing",
          associatedCsr: [
            {
              csrId: "61406221b40615f7acac1ce6",
            },
            {
              csrId: "60dedccd1ab11c678e2a4559",
            },
          ],
        },
        {
          _id: "61adef9a4c5a90520ec56792",
          name: "NGO ONE",
          associatedCsr: [],
        },
        {
          _id: "61b07f37cbdb7b4150fd6412",
          name: "adi test - 03",
          associatedCsr: [],
        },
        {
          _id: "61b0a67ddb832a2b8a117e0c",
          name: "sdlkfjlaskdjf",
          associatedCsr: [
            {
              _id: "61b0aafedb832a2b8a1188b0",
              csrId: "610914dab39e6a7ad47a23a8",
              code: "iii",
            },
            {
              _id: "61b0ab0bdb832a2b8a1188da",
              csrId: "6108c780b1ca821a5254aa2e",
              code: "iuoiuoiii",
            },
          ],
        },
        {
          _id: "61b0b2121eb21c720fa56fa5",
          name: "test adi - 4",
          associatedCsr: [
            {
              _id: "61b19acdeab3e5258228ff27",
              csrId: "619201b8ff081d4d805ec4a4",
              code: "T0004",
            },
            {
              _id: "61b1a693e7be8e2f78046ee5",
              csrId: "619201b8ff081d4d805ec4a4",
            },
            {
              _id: "61b1a79f730d9030e59aad4c",
              csrId: "619201b8ff081d4d805ec4a4",
            },
            {
              _id: "61b1a79f730d9030e59aad4d",
              csrId: "61764e93cb540d024c61f080",
              code: "T0001",
            },
            {
              _id: "61b1a989623794340f546c27",
              csrId: "619201b8ff081d4d805ec4a4",
            },
            {
              _id: "61b1a989623794340f546c28",
              csrId: "60dedccd1ab11c678e2a4559",
              code: "T0002",
            },
          ],
        },
        {
          _id: "61b0b8dbacbddba620b395cc",
          name: "alklsdhfk",
          associatedCsr: [
            {
              _id: "61b0b8dbacbddba620b39602",
              csrId: "60dedccd1ab11c678e2a4559",
            },
            {
              _id: "61b0b8dbacbddba620b39603",
              csrId: "60ec4a455c45a965c53cb5d5",
            },
            {
              _id: "61b0b8dbacbddba620b39604",
              csrId: "60ed597d2a008c79f048a026",
            },
            {
              _id: "61b0b8dbacbddba620b39605",
              csrId: "60ed5a302a008c79f048a0d0",
            },
            {
              _id: "61b0b8dbacbddba620b39606",
              csrId: "60ed65cd7a55687d9113f117",
            },
            {
              _id: "61b0b8dbacbddba620b39607",
              csrId: "60f5238278421e1142a233af",
            },
            {
              _id: "61b0b8dbacbddba620b39608",
              csrId: "60f523e978421e1142a233da",
            },
            {
              _id: "61b0b8dbacbddba620b39609",
              csrId: "60f523e935f7811141591b34",
            },
            {
              _id: "61b0b8dbacbddba620b3960a",
              csrId: "60f5248835f7811141591b62",
            },
            {
              _id: "61b0b8dbacbddba620b3960b",
              csrId: "6108c780b1ca821a5254aa2e",
            },
            {
              _id: "61b0b8dbacbddba620b3960c",
              csrId: "610914dab39e6a7ad47a23a8",
            },
            {
              _id: "61b0b8dbacbddba620b3960d",
              csrId: "610a65b028b67c17fa8994db",
            },
            {
              _id: "61b0b8dbacbddba620b3960e",
              csrId: "610a6b2028b67c17fa8998b9",
            },
            {
              _id: "61b0b8dbacbddba620b3960f",
              csrId: "61126d3a94d69a4d9f4d31c5",
            },
            {
              _id: "61b0b8dbacbddba620b39610",
              csrId: "611a4249045a9b2b22370a52",
            },
            {
              _id: "61b0b8dbacbddba620b39611",
              csrId: "611a42d4e7c7822b234c53ac",
            },
            {
              _id: "61b0b8dbacbddba620b39612",
              csrId: "6124fb793d80f95ea3de6f95",
            },
            {
              _id: "61b0b8dbacbddba620b39613",
              csrId: "6126362dea3ca77ce97d49dc",
            },
            {
              _id: "61b0b8dbacbddba620b39614",
              csrId: "61264ea61d7bd902b9cd894a",
            },
            {
              _id: "61b0b8dbacbddba620b39615",
              csrId: "61264ef5f80db602ba5fccab",
            },
            {
              _id: "61b0b8dbacbddba620b39616",
              csrId: "612917834e9fc361ef06ac99",
            },
            {
              _id: "61b0b8dbacbddba620b39617",
              csrId: "614061a092a44c2a610151b3",
            },
            {
              _id: "61b0b8dbacbddba620b39618",
              csrId: "61406221b40615f7acac1ce6",
            },
            {
              _id: "61b0b8dbacbddba620b39619",
              csrId: "61497c87ad37aa4860018dc2",
            },
            {
              _id: "61b0b8dbacbddba620b3961a",
              csrId: "614daf1c393e05432178f419",
            },
            {
              _id: "61b0b8dbacbddba620b3961b",
              csrId: "6151769ac1619252e3eadbd5",
            },
            {
              _id: "61b0b8dbacbddba620b3961c",
              csrId: "61569f3863e0a4237fe8c4fa",
            },
            {
              _id: "61b0b8dbacbddba620b3961d",
              csrId: "6156a85f4f49d52380afe6bb",
            },
            {
              _id: "61b0b8dbacbddba620b3961e",
              csrId: "6156bf1763e0a4237fe8d953",
            },
            {
              _id: "61b0b8dbacbddba620b3961f",
              csrId: "6156bfde4f49d52380aff365",
            },
            {
              _id: "61b0b8dbacbddba620b39620",
              csrId: "615be9cfd2922e0c0020e792",
            },
            {
              _id: "61b0b8dbacbddba620b39621",
              csrId: "615bec315a9f5d0c01ce6b16",
            },
            {
              _id: "61b0b8dbacbddba620b39622",
              csrId: "615bec6cd2922e0c0020ead9",
            },
            {
              _id: "61b0b8dbacbddba620b39623",
              csrId: "615d4592510f019af7f04c39",
            },
            {
              _id: "61b0b8dbacbddba620b39624",
              csrId: "615d8be2f48fe2a0517aa891",
            },
            {
              _id: "61b0b8dbacbddba620b39625",
              csrId: "615d8ca0161d75a35c7347fa",
            },
            {
              _id: "61b0b8dbacbddba620b39626",
              csrId: "615d8e11161d75a35c734842",
            },
            {
              _id: "61b0b8dbacbddba620b39627",
              csrId: "615ea0ef3ef3f740f532374c",
            },
            {
              _id: "61b0b8dbacbddba620b39628",
              csrId: "615ebcf73ef3f740f53244f2",
            },
            {
              _id: "61b0b8dbacbddba620b39629",
              csrId: "615ebd813ef3f740f5324543",
            },
            {
              _id: "61b0b8dbacbddba620b3962a",
              csrId: "615ec8de3ef3f740f53250af",
            },
            {
              _id: "61b0b8dbacbddba620b3962b",
              csrId: "615ed3203ef3f740f53259a2",
            },
            {
              _id: "61b0b8dbacbddba620b3962c",
              csrId: "615ed788c6ea1340f656fe47",
            },
            {
              _id: "61b0b8dbacbddba620b3962d",
              csrId: "615ed859c6ea1340f656fe95",
            },
            {
              _id: "61b0b8dbacbddba620b3962e",
              csrId: "615edd2d6732c64860efbcfe",
            },
            {
              _id: "61b0b8dbacbddba620b3962f",
              csrId: "61667e2e2e5caf6759e8a61a",
            },
            {
              _id: "61b0b8dbacbddba620b39630",
              csrId: "6166875b2e5caf6759e8b06c",
            },
            {
              _id: "61b0b8dbacbddba620b39631",
              csrId: "61764e93cb540d024c61f080",
            },
            {
              _id: "61b0b8dbacbddba620b39632",
              csrId: "619201b8ff081d4d805ec4a4",
            },
          ],
        },
        {
          _id: "61b0b92e386e44a814c151ed",
          name: "alklsdhfk",
          associatedCsr: [
            {
              _id: "61b0b92e386e44a814c15223",
              csrId: "60dedccd1ab11c678e2a4559",
            },
            {
              _id: "61b0b92e386e44a814c15224",
              csrId: "60ec4a455c45a965c53cb5d5",
            },
            {
              _id: "61b0b92e386e44a814c15225",
              csrId: "60ed597d2a008c79f048a026",
            },
            {
              _id: "61b0b92e386e44a814c15226",
              csrId: "60ed5a302a008c79f048a0d0",
            },
            {
              _id: "61b0b92e386e44a814c15227",
              csrId: "60ed65cd7a55687d9113f117",
            },
            {
              _id: "61b0b92e386e44a814c15228",
              csrId: "60f5238278421e1142a233af",
            },
            {
              _id: "61b0b92e386e44a814c15229",
              csrId: "60f523e978421e1142a233da",
            },
            {
              _id: "61b0b92e386e44a814c1522a",
              csrId: "60f523e935f7811141591b34",
            },
            {
              _id: "61b0b92e386e44a814c1522b",
              csrId: "60f5248835f7811141591b62",
            },
            {
              _id: "61b0b92e386e44a814c1522c",
              csrId: "6108c780b1ca821a5254aa2e",
            },
            {
              _id: "61b0b92e386e44a814c1522d",
              csrId: "610914dab39e6a7ad47a23a8",
            },
            {
              _id: "61b0b92e386e44a814c1522e",
              csrId: "610a65b028b67c17fa8994db",
            },
            {
              _id: "61b0b92e386e44a814c1522f",
              csrId: "610a6b2028b67c17fa8998b9",
            },
            {
              _id: "61b0b92e386e44a814c15230",
              csrId: "61126d3a94d69a4d9f4d31c5",
            },
            {
              _id: "61b0b92e386e44a814c15231",
              csrId: "611a4249045a9b2b22370a52",
            },
            {
              _id: "61b0b92e386e44a814c15232",
              csrId: "611a42d4e7c7822b234c53ac",
            },
            {
              _id: "61b0b92e386e44a814c15233",
              csrId: "6124fb793d80f95ea3de6f95",
            },
            {
              _id: "61b0b92e386e44a814c15234",
              csrId: "6126362dea3ca77ce97d49dc",
            },
            {
              _id: "61b0b92e386e44a814c15235",
              csrId: "61264ea61d7bd902b9cd894a",
            },
            {
              _id: "61b0b92e386e44a814c15236",
              csrId: "61264ef5f80db602ba5fccab",
            },
            {
              _id: "61b0b92e386e44a814c15237",
              csrId: "612917834e9fc361ef06ac99",
            },
            {
              _id: "61b0b92e386e44a814c15238",
              csrId: "614061a092a44c2a610151b3",
            },
            {
              _id: "61b0b92e386e44a814c15239",
              csrId: "61406221b40615f7acac1ce6",
            },
            {
              _id: "61b0b92e386e44a814c1523a",
              csrId: "61497c87ad37aa4860018dc2",
            },
            {
              _id: "61b0b92e386e44a814c1523b",
              csrId: "614daf1c393e05432178f419",
            },
            {
              _id: "61b0b92e386e44a814c1523c",
              csrId: "6151769ac1619252e3eadbd5",
            },
            {
              _id: "61b0b92e386e44a814c1523d",
              csrId: "61569f3863e0a4237fe8c4fa",
            },
            {
              _id: "61b0b92e386e44a814c1523e",
              csrId: "6156a85f4f49d52380afe6bb",
            },
            {
              _id: "61b0b92e386e44a814c1523f",
              csrId: "6156bf1763e0a4237fe8d953",
            },
            {
              _id: "61b0b92e386e44a814c15240",
              csrId: "6156bfde4f49d52380aff365",
            },
            {
              _id: "61b0b92e386e44a814c15241",
              csrId: "615be9cfd2922e0c0020e792",
            },
            {
              _id: "61b0b92e386e44a814c15242",
              csrId: "615bec315a9f5d0c01ce6b16",
            },
            {
              _id: "61b0b92e386e44a814c15243",
              csrId: "615bec6cd2922e0c0020ead9",
            },
            {
              _id: "61b0b92e386e44a814c15244",
              csrId: "615d4592510f019af7f04c39",
            },
            {
              _id: "61b0b92e386e44a814c15245",
              csrId: "615d8be2f48fe2a0517aa891",
            },
            {
              _id: "61b0b92e386e44a814c15246",
              csrId: "615d8ca0161d75a35c7347fa",
            },
            {
              _id: "61b0b92e386e44a814c15247",
              csrId: "615d8e11161d75a35c734842",
            },
            {
              _id: "61b0b92e386e44a814c15248",
              csrId: "615ea0ef3ef3f740f532374c",
            },
            {
              _id: "61b0b92e386e44a814c15249",
              csrId: "615ebcf73ef3f740f53244f2",
            },
            {
              _id: "61b0b92e386e44a814c1524a",
              csrId: "615ebd813ef3f740f5324543",
            },
            {
              _id: "61b0b92e386e44a814c1524b",
              csrId: "615ec8de3ef3f740f53250af",
            },
            {
              _id: "61b0b92e386e44a814c1524c",
              csrId: "615ed3203ef3f740f53259a2",
            },
            {
              _id: "61b0b92e386e44a814c1524d",
              csrId: "615ed788c6ea1340f656fe47",
            },
            {
              _id: "61b0b92e386e44a814c1524e",
              csrId: "615ed859c6ea1340f656fe95",
            },
            {
              _id: "61b0b92e386e44a814c1524f",
              csrId: "615edd2d6732c64860efbcfe",
            },
            {
              _id: "61b0b92e386e44a814c15250",
              csrId: "61667e2e2e5caf6759e8a61a",
            },
            {
              _id: "61b0b92e386e44a814c15251",
              csrId: "6166875b2e5caf6759e8b06c",
            },
            {
              _id: "61b0b92e386e44a814c15252",
              csrId: "61764e93cb540d024c61f080",
            },
            {
              _id: "61b0b92e386e44a814c15253",
              csrId: "619201b8ff081d4d805ec4a4",
            },
          ],
        },
        {
          _id: "61b0b9bedb832a2b8a119b73",
          name: "asdfdsaf",
          associatedCsr: [
            {
              _id: "61b0b9bedb832a2b8a119ba9",
              csrId: "60dedccd1ab11c678e2a4559",
            },
            {
              _id: "61b0b9bedb832a2b8a119baa",
              csrId: "60ec4a455c45a965c53cb5d5",
            },
            {
              _id: "61b0b9bedb832a2b8a119bab",
              csrId: "60ed597d2a008c79f048a026",
            },
            {
              _id: "61b0b9bedb832a2b8a119bac",
              csrId: "60ed5a302a008c79f048a0d0",
            },
            {
              _id: "61b0b9bedb832a2b8a119bad",
              csrId: "60ed65cd7a55687d9113f117",
            },
            {
              _id: "61b0b9bedb832a2b8a119bae",
              csrId: "60f5238278421e1142a233af",
            },
            {
              _id: "61b0b9bedb832a2b8a119baf",
              csrId: "60f523e978421e1142a233da",
            },
            {
              _id: "61b0b9bedb832a2b8a119bb0",
              csrId: "60f523e935f7811141591b34",
            },
            {
              _id: "61b0b9bedb832a2b8a119bb1",
              csrId: "60f5248835f7811141591b62",
            },
            {
              _id: "61b0b9bedb832a2b8a119bb2",
              csrId: "6108c780b1ca821a5254aa2e",
            },
            {
              _id: "61b0b9bedb832a2b8a119bb3",
              csrId: "610914dab39e6a7ad47a23a8",
            },
            {
              _id: "61b0b9bedb832a2b8a119bb4",
              csrId: "610a65b028b67c17fa8994db",
            },
            {
              _id: "61b0b9bedb832a2b8a119bb5",
              csrId: "610a6b2028b67c17fa8998b9",
            },
            {
              _id: "61b0b9bedb832a2b8a119bb6",
              csrId: "61126d3a94d69a4d9f4d31c5",
            },
            {
              _id: "61b0b9bedb832a2b8a119bb7",
              csrId: "611a4249045a9b2b22370a52",
            },
            {
              _id: "61b0b9bedb832a2b8a119bb8",
              csrId: "611a42d4e7c7822b234c53ac",
            },
            {
              _id: "61b0b9bedb832a2b8a119bb9",
              csrId: "6124fb793d80f95ea3de6f95",
            },
            {
              _id: "61b0b9bedb832a2b8a119bba",
              csrId: "6126362dea3ca77ce97d49dc",
            },
            {
              _id: "61b0b9bedb832a2b8a119bbb",
              csrId: "61264ea61d7bd902b9cd894a",
            },
            {
              _id: "61b0b9bedb832a2b8a119bbc",
              csrId: "61264ef5f80db602ba5fccab",
            },
            {
              _id: "61b0b9bedb832a2b8a119bbd",
              csrId: "612917834e9fc361ef06ac99",
            },
            {
              _id: "61b0b9bedb832a2b8a119bbe",
              csrId: "614061a092a44c2a610151b3",
            },
            {
              _id: "61b0b9bedb832a2b8a119bbf",
              csrId: "61406221b40615f7acac1ce6",
            },
            {
              _id: "61b0b9bedb832a2b8a119bc0",
              csrId: "61497c87ad37aa4860018dc2",
            },
            {
              _id: "61b0b9bedb832a2b8a119bc1",
              csrId: "614daf1c393e05432178f419",
            },
            {
              _id: "61b0b9bedb832a2b8a119bc2",
              csrId: "6151769ac1619252e3eadbd5",
            },
            {
              _id: "61b0b9bedb832a2b8a119bc3",
              csrId: "61569f3863e0a4237fe8c4fa",
            },
            {
              _id: "61b0b9bedb832a2b8a119bc4",
              csrId: "6156a85f4f49d52380afe6bb",
            },
            {
              _id: "61b0b9bedb832a2b8a119bc5",
              csrId: "6156bf1763e0a4237fe8d953",
            },
            {
              _id: "61b0b9bedb832a2b8a119bc6",
              csrId: "6156bfde4f49d52380aff365",
            },
            {
              _id: "61b0b9bedb832a2b8a119bc7",
              csrId: "615be9cfd2922e0c0020e792",
            },
            {
              _id: "61b0b9bedb832a2b8a119bc8",
              csrId: "615bec315a9f5d0c01ce6b16",
            },
            {
              _id: "61b0b9bedb832a2b8a119bc9",
              csrId: "615bec6cd2922e0c0020ead9",
            },
            {
              _id: "61b0b9bedb832a2b8a119bca",
              csrId: "615d4592510f019af7f04c39",
            },
            {
              _id: "61b0b9bedb832a2b8a119bcb",
              csrId: "615d8be2f48fe2a0517aa891",
            },
            {
              _id: "61b0b9bedb832a2b8a119bcc",
              csrId: "615d8ca0161d75a35c7347fa",
            },
            {
              _id: "61b0b9bedb832a2b8a119bcd",
              csrId: "615d8e11161d75a35c734842",
            },
            {
              _id: "61b0b9bedb832a2b8a119bce",
              csrId: "615ea0ef3ef3f740f532374c",
            },
            {
              _id: "61b0b9bedb832a2b8a119bcf",
              csrId: "615ebcf73ef3f740f53244f2",
            },
            {
              _id: "61b0b9bedb832a2b8a119bd0",
              csrId: "615ebd813ef3f740f5324543",
            },
            {
              _id: "61b0b9bedb832a2b8a119bd1",
              csrId: "615ec8de3ef3f740f53250af",
            },
            {
              _id: "61b0b9bedb832a2b8a119bd2",
              csrId: "615ed3203ef3f740f53259a2",
            },
            {
              _id: "61b0b9bedb832a2b8a119bd3",
              csrId: "615ed788c6ea1340f656fe47",
            },
            {
              _id: "61b0b9bedb832a2b8a119bd4",
              csrId: "615ed859c6ea1340f656fe95",
            },
            {
              _id: "61b0b9bedb832a2b8a119bd5",
              csrId: "615edd2d6732c64860efbcfe",
            },
            {
              _id: "61b0b9bedb832a2b8a119bd6",
              csrId: "61667e2e2e5caf6759e8a61a",
            },
            {
              _id: "61b0b9bedb832a2b8a119bd7",
              csrId: "6166875b2e5caf6759e8b06c",
            },
            {
              _id: "61b0b9bedb832a2b8a119bd8",
              csrId: "61764e93cb540d024c61f080",
            },
            {
              _id: "61b0b9bedb832a2b8a119bd9",
              csrId: "619201b8ff081d4d805ec4a4",
            },
          ],
        },
        {
          _id: "61b0ba50db832a2b8a119d83",
          name: "asdf",
          associatedCsr: [],
        },
        {
          _id: "61b0bb04386e44a814c153dc",
          name: "test12",
          associatedCsr: [],
        },
        {
          _id: "61b0bcad386e44a814c15849",
          name: "test13",
          associatedCsr: [
            {
              _id: "61b0bcad386e44a814c1587f",
              csrId: "60dedccd1ab11c678e2a4559",
            },
            {
              _id: "61b0bcad386e44a814c15880",
              csrId: "61764e93cb540d024c61f080",
            },
            {
              _id: "61b221007f57175f402d6ca0",
              csrId: "610914dab39e6a7ad47a23a8",
              code: "78878",
            },
            {
              _id: "61b221137f57175f402d6cc1",
              csrId: "619201b8ff081d4d805ec4a4",
              code: "888",
            },
            {
              _id: "61b221277f57175f402d6cdc",
              csrId: "6108c780b1ca821a5254aa2e",
              code: "123456789",
            },
          ],
        },
        {
          _id: "61b0c54c5f55d4bee597b85d",
          name: "test14",
          associatedCsr: [
            {
              _id: "61b0c8ca5f55d4bee597c163",
              csrId: "60dedccd1ab11c678e2a4559",
              code: "kjlkjlk",
            },
          ],
        },
        {
          _id: "61b30987a674b271a8bcd4df",
          name: "new ngo champ",
          associatedCsr: [
            {
              _id: "61b30987a674b271a8bcd516",
              csrId: "60dedccd1ab11c678e2a4559",
            },
            {
              _id: "61b30987a674b271a8bcd517",
              csrId: "61764e93cb540d024c61f080",
            },
            {
              _id: "61b30987a674b271a8bcd518",
              csrId: "619201b8ff081d4d805ec4a4",
            },
          ],
        },
        {
          _id: "61b6d80a2cc4bc393147e00c",
          name: "david",
          associatedCsr: [
            {
              _id: "61b6d80a2cc4bc393147e048",
              csrId: "60dedccd1ab11c678e2a4559",
            },
            {
              _id: "61b6d80a2cc4bc393147e049",
              csrId: "61764e93cb540d024c61f080",
            },
            {
              _id: "61b6d80a2cc4bc393147e04a",
              csrId: "619201b8ff081d4d805ec4a4",
            },
            {
              _id: "61b6d80a2cc4bc393147e04b",
              csrId: "61b1cb7ff9564152feae2e01",
            },
          ],
        },
        {
          _id: "61b6eeaa2cc4bc39314813fc",
          name: "sattt",
          associatedCsr: [
            {
              _id: "61b6f54b4e76474e051e7a90",
              csrId: "61b1cb7ff9564152feae2e01",
              code: "456",
            },
            {
              _id: "61b6fc004e76474e051e9412",
              csrId: "61764e93cb540d024c61f080",
              code: "6555",
            },
          ],
        },
        {
          _id: "61c4078a50a6103c851c5286",
          name: "Anup NGO",
          associatedCsr: [],
        },
        {
          _id: "61d2aac6a2c08e156b9a4c81",
          name: "Child home ngo test 2",
          associatedCsr: [
            {
              _id: "61d2aac6a2c08e156b9a4cb5",
              csrId: "60dedccd1ab11c678e2a4559",
            },
            {
              _id: "61d2aac6a2c08e156b9a4cb6",
              csrId: "61764e93cb540d024c61f080",
            },
            {
              _id: "61d2aac6a2c08e156b9a4cb7",
              csrId: "619201b8ff081d4d805ec4a4",
            },
            {
              _id: "61d2aac6a2c08e156b9a4cb8",
              csrId: "61b1cb7ff9564152feae2e01",
            },
          ],
        },
        {
          _id: "61d53a8470d462043f1b09e6",
          name: "NGO DOC TEST",
          associatedCsr: [
            {
              _id: "61d53a8470d462043f1b0a19",
              csrId: "60dedccd1ab11c678e2a4559",
            },
            {
              _id: "61d53a8470d462043f1b0a1a",
              csrId: "61764e93cb540d024c61f080",
            },
            {
              _id: "61d53a8470d462043f1b0a1b",
              csrId: "619201b8ff081d4d805ec4a4",
            },
            {
              _id: "61d53a8470d462043f1b0a1c",
              csrId: "61b1cb7ff9564152feae2e01",
            },
          ],
        },
        {
          _id: "61fba5025d62cb0ee09a3e89",
          name: "Anup Test",
          associatedCsr: [],
        },
        {
          _id: "61fcbd04c73a0a42685d5fe6",
          name: "Anup Ngo Test",
          associatedCsr: [],
        },
      ],
      selectedValue: [
        {
          _id: "61fba42891360348ac99e531",
          label: "sdf",
          textValue: "",
          value: "60ed6d9215141e7d90fcd822",
        },
      ],
    },
    {
      title: "Vendor",
      input_type: "4",
      shortKey: "vendorId",
      order: "vendorId",
      width: "25",
      parent: [
        {
          order: "implementationType",
          value: "^(vendor_esops_direct|vendor_direct|ppp_tripartite_vendor)$",
        },
      ],
      validation: [
        {
          _id: "1",
          error_msg: "",
          value: "",
        },
        {
          _id: "3",
          error_msg: "",
          value: "",
        },
      ],
      answer_option: [
        {
          _id: "60ed908a7a55687d9113f90e",
          name: "testtttt",
          code: "new code01fsaf",
          associatedCsr: [
            {
              _id: "6195f834111f7d40e826872c",
              csrId: "60f5238278421e1142a233af",
              code: "dd",
            },
            {
              _id: "6195f841111f7d40e8268735",
              csrId: "60ed65cd7a55687d9113f117",
              code: "dfdf",
            },
            {
              _id: "61960418111f7d40e8268fa0",
              csrId: "60ed5a302a008c79f048a0d0",
              code: "g",
            },
            {
              _id: "61960462111f7d40e8269015",
              csrId: "60ed597d2a008c79f048a026",
              code: "fff",
            },
            {
              _id: "61960501111f7d40e82690d6",
              csrId: "60ec4a455c45a965c53cb5d5",
              code: "d",
            },
          ],
        },
        {
          _id: "60ed93317a55687d9113fa40",
          name: "test 3",
          code: "dddddddd",
          associatedCsr: [
            {
              _id: "6193d51aad93871827d76750",
              csrId: "60f5238278421e1142a233af",
              code: "fgh",
            },
            {
              _id: "6194cdce7a96170466374650",
              csrId: "60ed5a302a008c79f048a0d0",
              code: "hello",
            },
            {
              _id: "619b34c3a146440c37757c3d",
              csrId: "619201b8ff081d4d805ec4a4",
              code: "hello",
            },
          ],
        },
        {
          _id: "60ed93977a55687d9113fa73",
          name: "test 4",
          code: "new123",
          associatedCsr: [],
        },
        {
          _id: "60f535c778421e1142a2352d",
          name: "test vendor",
          code: "C9",
          associatedCsr: [
            {
              _id: "6194d3f47a961704663759e9",
              csrId: "60f5238278421e1142a233af",
              code: "vb",
            },
            {
              _id: "61a0759c3e31da039b5fed9b",
              csrId: "60dedccd1ab11c678e2a4559",
              code: "asdfsdaf",
            },
            {
              _id: "61a075bd3e31da039b5fee40",
              csrId: "60ed597d2a008c79f048a026",
              code: "cccc",
            },
            {
              _id: "61a08aeb1b82810999274b20",
              csrId: "60ec4a455c45a965c53cb5d5",
              code: "test",
            },
            {
              _id: "61a08ec71b828109992753ed",
              csrId: "60ed5a302a008c79f048a0d0",
              code: "3939",
            },
            {
              _id: "61a08f1f1b82810999275511",
              csrId: "60ed65cd7a55687d9113f117",
              code: "sssss",
            },
            {
              _id: "61a08f5b1b828109992755c2",
              csrId: "60f523e978421e1142a233da",
              code: "wwwww",
            },
            {
              _id: "61ac75b7ac03ee208e6714cc",
              csrId: "60f5248835f7811141591b62",
              code: "sssss",
            },
          ],
        },
        {
          _id: "6103806419ad1807d8214ca9",
          name: "test vendor code 001",
          code: "new code 012",
          associatedCsr: [],
        },
        {
          _id: "611a3163045a9b2b223708bc",
          name: "tanish",
          code: "C11",
          associatedCsr: [],
        },
        {
          _id: "6124bace72ae913a1451cb30",
          name: "web vendor",
          code: "C14",
          associatedCsr: [],
        },
        {
          _id: "61267798f3fa0d078729afa7",
          name: "a",
          code: "C15",
          associatedCsr: [],
        },
        {
          _id: "612679c0f3fa0d078729b033",
          name: "b",
          code: "C16",
          associatedCsr: [],
        },
        {
          _id: "612c9898460d3b61e98f9419",
          name: "new",
          code: "C18",
          associatedCsr: [],
        },
        {
          _id: "6131b826f0fe6f283fe0354a",
          name: "Test vendor",
          code: "C20",
          associatedCsr: [],
        },
        {
          _id: "6139f1df4893ec0f0bb69819",
          name: "ven",
          code: "C22",
          associatedCsr: [],
        },
        {
          _id: "614045ab56dc6810c1cb4ff0",
          name: "new vendor",
          code: "C23",
          associatedCsr: [],
        },
        {
          _id: "61404687d466dfd848febe14",
          name: "new vendor001",
          code: "C24",
          associatedCsr: [],
        },
        {
          _id: "6141b883eced40349e57a35a",
          name: "TT",
          code: "C25",
          associatedCsr: [],
        },
        {
          _id: "6141c0cd0bba8e053d0c2f8a",
          name: "new vendor001",
          code: "C26",
          associatedCsr: [],
        },
        {
          _id: "614469e901ad3ccde4445d3e",
          name: "vendor form",
          code: "C47",
          associatedCsr: [],
        },
        {
          _id: "614d72fa84016b3ee2773326",
          code: "1111",
          name: "dhfj",
          associatedCsr: [],
        },
        {
          _id: "615e80c11b775b32691642d3",
          code: "newcode01fsaf",
          name: "MP",
          associatedCsr: [],
        },
        {
          _id: "6171457d26e24d39485c5957",
          code: "newcode02fsaf",
          name: "new vendor002",
          associatedCsr: [],
        },
        {
          _id: "6171462d04da3031147eb496",
          code: "newcode03fsaf",
          name: "new vendor002",
          associatedCsr: [],
        },
        {
          _id: "61714f3c9c397024a8b0fb4d",
          code: "7474",
          name: "year test vendor",
          associatedCsr: [],
        },
        {
          _id: "6177e7e9ca457dfae8bcad1a",
          code: "Kartik1234",
          name: "ABC DEF1212",
          associatedCsr: [],
        },
        {
          _id: "6177e88de12e26fd4b2504fa",
          code: "Kartik1134",
          name: "ABC DEF1212",
          associatedCsr: [],
        },
        {
          _id: "6177ee7aed1da139640142e2",
          code: "POPOPOPO",
          name: "KARTIK GOYAL",
          associatedCsr: [],
        },
        {
          _id: "6178ef3429c29004e4cc37a2",
          code: "new vendorcode001",
          name: "new vendor001",
          associatedCsr: [],
        },
        {
          _id: "617a8379070b1625b484c1c3",
          code: "new code011",
          name: "test_5",
          associatedCsr: [],
        },
        {
          _id: "6180134098327a3640e700a5",
          code: "new vendorcode004",
          name: "new vendor001",
          associatedCsr: [],
        },
        {
          _id: "6180184d11a38e2d9ce3a508",
          code: "new vendorcode005",
          name: "new vendor001",
          associatedCsr: [
            {
              _id: "61764e93cb540d024c61f080",
            },
            {
              _id: "6166875b2e5caf6759e8b06c",
            },
            {
              _id: "61764e93cb540d024c61f080",
            },
            {
              _id: "6166875b2e5caf6759e8b06c",
            },
            {
              _id: "61764e93cb540d024c61f080",
            },
            {
              _id: "6166875b2e5caf6759e8b06c",
            },
            {
              _id: "60dedccd1ab11c678e2a4559",
            },
            {
              _id: "61764e93cb540d024c61f080",
            },
            {
              _id: "6166875b2e5caf6759e8b06c",
            },
            {
              _id: "60dedccd1ab11c678e2a4559",
            },
            {
              _id: "61764e93cb540d024c61f080",
            },
            {
              _id: "6166875b2e5caf6759e8b06c",
            },
            {
              _id: "60dedccd1ab11c678e2a4559",
            },
            {
              _id: "61764e93cb540d024c61f080",
            },
            {
              _id: "6166875b2e5caf6759e8b06c",
            },
          ],
        },
        {
          _id: "618115ede1367e6f49d06479",
          code: "kartik1234",
          name: "kartik goyla",
          associatedCsr: [
            {
              _id: "6193558f0c1d805c4a5d2ff7",
              csrId: "60dedccd1ab11c678e2a4559",
              code: "ABCSDS3232232",
            },
            {
              _id: "6193a62a3c1bbc6baa56c1f4",
              csrId: "60dedccd1ab11c678e2a4550",
              code: "ABCSDS3232232329999",
            },
          ],
        },
        {
          _id: "6193569210d1a26847a8c71d",
          code: "6193569210d1a26847a8c71f",
          name: "6193569210d1a26847a8c721",
          associatedCsr: [
            {
              _id: "619b3485a146440c37757b5c",
              csrId: "61764e93cb540d024c61f080",
              code: "001",
            },
            {
              _id: "619b348aa146440c37757b76",
              csrId: "619201b8ff081d4d805ec4a4",
              code: "002",
            },
          ],
        },
        {
          _id: "6193b3a3e8bee43794300351",
          code: "8888",
          name: "name 8",
          associatedCsr: [],
        },
        {
          _id: "6194da317a961704663770b3",
          code: "rfuhrfujf",
          name: "Ashutosh ",
          associatedCsr: [],
        },
        {
          _id: "6194db607a9617046637764f",
          code: "ffuh",
          name: "Devesh",
          associatedCsr: [
            {
              _id: "6194db667a9617046637768f",
              csrId: "60ec4a455c45a965c53cb5d5",
              code: "ddd",
            },
          ],
        },
        {
          _id: "6194dc3e7a96170466377880",
          code: "gffg",
          name: "rrrtr",
          associatedCsr: [],
        },
        {
          _id: "6194e2d87a96170466378ef6",
          code: "deeyt",
          name: "TestAs",
          associatedCsr: [
            {
              _id: "6194e2e47a96170466378f39",
              csrId: "60ec4a455c45a965c53cb5d5",
              code: "testCode",
            },
            {
              _id: "6194e3027a96170466378f4d",
              csrId: "60ed597d2a008c79f048a026",
              code: "test",
            },
          ],
        },
        {
          _id: "6196053e111f7d40e8269123",
          code: "sdsds",
          name: "ssds",
          associatedCsr: [],
        },
        {
          _id: "6196059e111f7d40e8269242",
          code: "efer",
          name: "redffdf",
          associatedCsr: [
            {
              _id: "6198f326e0a435d4ee21de3a",
              csrId: "60ed5a302a008c79f048a0d0",
              code: "6786",
            },
            {
              _id: "6198f33be0a435d4ee21de52",
              csrId: "60ed597d2a008c79f048a026",
              code: "56789",
            },
            {
              _id: "6198f5c0e0a435d4ee21df37",
              csrId: "60ec4a455c45a965c53cb5d5",
              code: "fgf",
            },
            {
              _id: "6198f5c5e0a435d4ee21df52",
              csrId: "61667e2e2e5caf6759e8a61a",
              code: "8789",
            },
            {
              _id: "6198f948e0a435d4ee21e1db",
              csrId: "60dedccd1ab11c678e2a4559",
              code: "678",
            },
            {
              _id: "6198f94de0a435d4ee21e1e9",
              csrId: "60ed65cd7a55687d9113f117",
              code: "5678",
            },
          ],
        },
        {
          _id: "619b2596578c8a0a2c229d93",
          code: "619b2596578c8a0a2c229d95",
          name: "619b2596578c8a0a2c229d97",
          associatedCsr: [
            {
              _id: "619b25af578c8a0a2c229e38",
              csrId: "61764e93cb540d024c61f080",
              code: "90909090",
            },
          ],
        },
        {
          _id: "619b279e578c8a0a2c22a4cc",
          code: "83748367",
          name: "VENDOR NEW",
          associatedCsr: [
            {
              _id: "619b2834578c8a0a2c22a5d6",
              csrId: "60ed597d2a008c79f048a026",
              code: "8787",
            },
          ],
        },
        {
          _id: "619b2971578c8a0a2c22aa75",
          code: "989767775",
          name: "GYGHFH",
          associatedCsr: [
            {
              _id: "619b2983578c8a0a2c22ab81",
              csrId: "60dedccd1ab11c678e2a4559",
              code: "8778676",
            },
          ],
        },
        {
          _id: "619b353ca146440c37757ce3",
          code: "4788563",
          name: "New test vendor id",
          associatedCsr: [
            {
              _id: "619b3544a146440c37757d27",
              csrId: "60dedccd1ab11c678e2a4559",
              code: "98908988",
            },
            {
              _id: "619b35b4a146440c37757e30",
              csrId: "60ed597d2a008c79f048a026",
              code: "8788",
            },
            {
              _id: "619b6175c6f8f60e36ec9fcd",
              csrId: "60f5238278421e1142a233af",
              code: "38748",
            },
            {
              _id: "619b61d5c6f8f60e36eca00c",
              csrId: "60ed5a302a008c79f048a0d0",
              code: "5675676",
            },
            {
              _id: "619b61dcc6f8f60e36eca021",
              csrId: "60ec4a455c45a965c53cb5d5",
              code: "63563553",
            },
          ],
        },
        {
          _id: "619c7d51337c3429d1d375bc",
          code: "847567675",
          name: "Vendor test BB",
          associatedCsr: [
            {
              _id: "619c7e09337c3429d1d3765a",
              csrId: "60ec4a455c45a965c53cb5d5",
              code: "63563553",
            },
            {
              _id: "619c7e17337c3429d1d3766e",
              csrId: "60ed65cd7a55687d9113f117",
              code: "28734892",
            },
            {
              _id: "619c7e72337c3429d1d376c5",
              csrId: "60ed597d2a008c79f048a026",
              code: "8734583",
            },
          ],
        },
        {
          _id: "619c7f9c337c3429d1d37978",
          code: "POAPOOP",
          name: "POAPOOP",
          associatedCsr: [],
        },
        {
          _id: "619c7fbb337c3429d1d379e1",
          code: "37478326",
          name: "BB test dsata",
          associatedCsr: [
            {
              _id: "619c8013337c3429d1d37b49",
              csrId: "61764e93cb540d024c61f080",
              code: "3847328",
            },
            {
              _id: "619c801f337c3429d1d37b61",
              csrId: "619201b8ff081d4d805ec4a4",
              code: "28634726",
            },
          ],
        },
        {
          _id: "61a0d81afaf627184ff1ab7e",
          code: "7462",
          name: "new emc vendor",
          associatedCsr: [],
        },
        {
          _id: "61a862082a73ae22e5e36053",
          name: "adi test 1",
          associatedCsr: [
            {
              _id: "61a862262a73ae22e5e360b6",
              csrId: "61667e2e2e5caf6759e8a61a",
              code: "V0001",
            },
          ],
        },
        {
          _id: "61a862bf6e410823658fda33",
          name: "adi test 2",
          associatedCsr: [
            {
              _id: "61a8635a6ca588239eac8e60",
              csrId: "61667e2e2e5caf6759e8a61a",
              code: "V0002",
            },
          ],
        },
        {
          _id: "61b0a384df24ba62b8baece6",
          name: "test vendor adi",
          associatedCsr: [],
        },
        {
          _id: "61b0a8bcdb832a2b8a118376",
          name: "denvor",
          associatedCsr: [],
        },
        {
          _id: "61b1ff397f57175f402d2971",
          name: "test15",
          associatedCsr: [
            {
              _id: "61cb1af620b81061f90c16e0",
              csrId: "6108c780b1ca821a5254aa2e",
              code: "554545",
            },
            {
              _id: "61cb1afe20b81061f90c16fe",
              csrId: "610914dab39e6a7ad47a23a8",
              code: "554545",
            },
            {
              _id: "61cb1b0820b81061f90c1717",
              csrId: "610a6b2028b67c17fa8998b9",
              code: "554545",
            },
          ],
        },
        {
          _id: "61b7004ab0677f51780fd55d",
          name: "fdewf",
          associatedCsr: [
            {
              _id: "61b7004ab0677f51780fd594",
              csrId: "61764e93cb540d024c61f080",
            },
            {
              _id: "61b7004ab0677f51780fd595",
              csrId: "61b1cb7ff9564152feae2e01",
            },
          ],
        },
        {
          _id: "61b748f77a9f765eb45867c9",
          name: "dwqd",
          associatedCsr: [
            {
              _id: "61b748f77a9f765eb45867fe",
              csrId: "61764e93cb540d024c61f080",
            },
            {
              _id: "61b748f77a9f765eb45867ff",
              csrId: "61b1cb7ff9564152feae2e01",
            },
          ],
        },
        {
          _id: "61fcbe1ac73a0a42685d6112",
          name: "Anup Vendor Test",
          associatedCsr: [],
        },
      ],
      selectedValue: [],
    },
    {
      title: "NGO Logo",
      input_type: "11",
      shortKey: "logo",
      order: "logo",
      width: "50",
      validation: [
        {
          error_msg: "",
          _id: "83",
          value: "image/png",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpg",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpeg",
        },
      ],
      selectedValue: [
        {
          _id: "61d53a8470d462043f1b09fd",
          label: "",
          textValue: "",
          //   "value": "https://mform-live.s3.ap-south-1.amazonaws.com/book_fbe6be74-c940-4ac9-b769-17179a0ca35c.png"
          value:
            "https://mform-live.s3.ap-south-1.amazonaws.com/dummy_2-7-2022_1-48-52%20PM.pdf",
        },
      ],
    },
    {
      title: "NGO Logo",
      input_type: "11",
      shortKey: "logo",
      order: "logo",
      width: "50",
      validation: [
        {
          error_msg: "",
          _id: "83",
          value: "image/png",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpg",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpeg",
        },
      ],
      selectedValue: [
        {
          _id: "61d53a8470d462043f1b09fd",
          label: "",
          textValue: "",
          value:
            "https://mform-live.s3.ap-south-1.amazonaws.com/book_fbe6be74-c940-4ac9-b769-17179a0ca35c.png",
        },
      ],
    },
    {
      title: "NGO Logo",
      input_type: "11",
      shortKey: "logo",
      order: "logo",
      width: "50",
      validation: [
        {
          error_msg: "",
          _id: "83",
          value: "image/png",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpg",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpeg",
        },
      ],
      selectedValue: [
        {
          _id: "61d53a8470d462043f1b09fd",
          label: "",
          textValue: "",
          value:
            "https://mform-live.s3.ap-south-1.amazonaws.com/book_fbe6be74-c940-4ac9-b769-17179a0ca35c.jpg",
        },
      ],
    },
    {
      title: "NGO Logo",
      input_type: "11",
      shortKey: "logo",
      order: "logo",
      width: "50",
      validation: [
        {
          error_msg: "",
          _id: "83",
          value: "image/png",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpg",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpeg",
        },
      ],
      selectedValue: [
        {
          _id: "61d53a8470d462043f1b09fd",
          label: "",
          textValue: "",
          value:
            "https://mform-live.s3.ap-south-1.amazonaws.com/book_fbe6be74-c940-4ac9-b769-17179a0ca35c.jpeg",
        },
      ],
    },
    {
      title: "NGO Logo",
      input_type: "11",
      shortKey: "logo",
      order: "logo",
      width: "50",
      validation: [
        {
          error_msg: "",
          _id: "83",
          value: "image/png",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpg",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpeg",
        },
      ],
      selectedValue: [
        {
          _id: "61d53a8470d462043f1b09fd",
          label: "",
          textValue: "",
          value:
            "https://mform-live.s3.ap-south-1.amazonaws.com/book_fbe6be74-c940-4ac9-b769-17179a0ca35c.doc",
        },
      ],
    },
    {
      title: "NGO Logo",
      input_type: "11",
      shortKey: "logo",
      order: "logo",
      width: "50",
      validation: [
        {
          error_msg: "",
          _id: "83",
          value: "image/png",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpg",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpeg",
        },
      ],
      selectedValue: [
        {
          _id: "61d53a8470d462043f1b09fd",
          label: "",
          textValue: "",
          value:
            "https://mform-live.s3.ap-south-1.amazonaws.com/book_fbe6be74-c940-4ac9-b769-17179a0ca35c.docx",
        },
      ],
    },
    {
      title: "NGO Logo",
      input_type: "11",
      shortKey: "logo",
      order: "logo",
      width: "50",
      validation: [
        {
          error_msg: "",
          _id: "83",
          value: "image/png",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpg",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpeg",
        },
      ],
      selectedValue: [
        {
          _id: "61d53a8470d462043f1b09fd",
          label: "",
          textValue: "",
          value:
            "https://mform-live.s3.ap-south-1.amazonaws.com/book_fbe6be74-c940-4ac9-b769-17179a0ca35c.xls",
        },
      ],
    },
    {
      title: "NGO Logo",
      input_type: "11",
      shortKey: "logo",
      order: "logo",
      width: "50",
      validation: [
        {
          error_msg: "",
          _id: "83",
          value: "image/png",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpg",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpeg",
        },
      ],
      selectedValue: [
        {
          _id: "61d53a8470d462043f1b09fd",
          label: "",
          textValue: "",
          value:
            "https://mform-live.s3.ap-south-1.amazonaws.com/book_fbe6be74-c940-4ac9-b769-17179a0ca35c.xlsx",
        },
      ],
    },
    {
      title: "NGO Logo",
      input_type: "11",
      shortKey: "logo",
      order: "logo",
      width: "50",
      validation: [
        {
          error_msg: "",
          _id: "83",
          value: "image/png",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpg",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpeg",
        },
      ],
      selectedValue: [
        {
          _id: "61d53a8470d462043f1b09fd",
          label: "",
          textValue: "",
          value:
            "https://mform-live.s3.ap-south-1.amazonaws.com/book_fbe6be74-c940-4ac9-b769-17179a0ca35c.ppt",
        },
      ],
    },
    {
      title: "NGO Logo",
      input_type: "11",
      shortKey: "logo",
      order: "logo",
      width: "50",
      validation: [
        {
          error_msg: "",
          _id: "83",
          value: "image/png",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpg",
        },
        {
          error_msg: "",
          _id: "83",
          value: "image/jpeg",
        },
      ],
      selectedValue: [
        {
          _id: "61d53a8470d462043f1b09fd",
          label: "",
          textValue: "",
          value:
            "https://mform-live.s3.ap-south-1.amazonaws.com/book_fbe6be74-c940-4ac9-b769-17179a0ca35c.pptx",
        },
      ],
    },
    {
      title: "Name of Knowledge Partner",
      input_type: "1",
      parent: [
        {
          order: "implementationType",
          value: "^(ppptripartiteknowledgepartner)$",
        },
      ],
      shortKey: "ppp_tripartite_knowledge_partner",
      order: "ppptripartiteknowledgepartner",
      width: "25",
      validation: [
        {
          _id: "3",
          error_msg: "",
          value: "",
        },
      ],
      selectedValue: [
        {
          _id: "61fba42891360348ac99e535",
          label: "",
          textValue: "",
          value: "",
        },
      ],
    },
    {
      title: "Project Start Date",
      input_type: "14",
      shortKey: "fromDate",
      order: "fromDate",
      validation: [
        {
          _id: "1",
        },
        {
          _id: "3",
          error_msg: "",
          value: "",
        },
      ],
      answer_option: [],
      width: "25",
      min: "2021-04-01",
      selectedValue: [
        {
          _id: "61fba42891360348ac99e537",
          label: "",
          textValue: "2022-02-03",
          value: "",
        },
      ],
    },
    {
      title: "Project End Date",
      input_type: "14",
      shortKey: "toDate",
      order: "toDate",
      answer_option: [],
      width: "25",
      restrictions: [
        {
          orders: [
            {
              order: "fromDate",
              value: "",
            },
          ],
          type: "6",
        },
      ],
      max: "2022-03-31",
      validation: [
        {
          _id: "3",
          error_msg: "",
          value: "",
        },
      ],
      selectedValue: [
        {
          _id: "61fba42891360348ac99e539",
          label: "",
          textValue: "2022-02-15",
          value: "",
        },
      ],
    },
    {
      title: "Objective",
      input_type: "13",
      shortKey: "objective",
      answer_option: [],
      order: "objective",
      width: "100",
      validation: [
        {
          _id: "3",
          error_msg: "",
          value: "",
        },
      ],
      selectedValue: [
        {
          _id: "61fba42891360348ac99e53b",
          label: "",
          textValue: "testing",
          value: "",
        },
      ],
    },
    {
      title: "Schedule VII",
      input_type: "3",
      shortKey: "scheduleVii",
      order: "scheduleVii",
      answer_option: [
        {
          _id: "60c888cdbb69140438de3f2b",
          name: "Eradicating hunger, poverty and malnutrition, promoting health care including preventinve health care and sanitation, including contribution to the Swach Bharat Kosh set-up by the Central Government for the promotion of sanitation, and making available safe drinking water.",
        },
        {
          _id: "60c847817091c40848c27ede",
          name: "Promoting education, including special education and employment enhancing vocation skills especially among children, women, elderly and the differently abled and livelihood enhancement projects.",
        },
        {
          _id: "60c82ebf8b38e74e78adebee",
          name: "Promoting gender equality, empowering women, setting up homes and hostels for women and orphans; setting up old age homes, day care centres and such other facilities for senior citizens and measures for reducing inequalities faced by socially and economically backward groups.",
        },
        {
          _id: "60c482fafaa9de423cf8fdfc",
          name: "Ensuring environmental sustainability, ecological balance, protection of flora and fauna, animal welfare, agroforestry, conservation of natural resources and maintaining quality of soil, air and water 4[including contribution to the Clean Ganga Fund set-up by the Central Government for rejuvenation of river Ganga",
        },
        {
          _id: "60c1f6fb7607901cfcd90f89",
          name: "Protection of national heritage, art and culture including restoration of buildings and sites of historical importance and works of art; setting up public libraries; promotion and development of traditional art and handicrafts",
        },
        {
          _id: "61039a21c97a06699a987954",
          name: "Measures for the benefit of armed forces veterans, war widows and their dependents, 9[ Central Armed Police Forces (CAPF) and Central Para Military Forces (CPMF) veterans, and their dependents including widows",
        },
        {
          _id: "61039a21c97a06699a987955",
          name: "Training to promote rural sports, nationally recognised sports, paralympic sports and olympic sports",
        },
        {
          _id: "61039a22c97a06699a987956",
          name: "Contribution to the prime minister's national relief fund 8[or Prime Minister’s Citizen Assistance and Relief in Emergency Situations Fund (PM CARES Fund)] or any other fund set up by the central govt. for socio economic development and relief and welfare of the schedule caste, tribes, other backward classes, minorities and women",
        },
        {
          _id: "61039a22c97a06699a987957",
          name: "Contribution to incubators or research and development projects in the field of science, technology, engineering and medicine, funded by the Central Government or State Government or Public Sector Undertaking or any agency of the Central Government or State Government; and Contributions to public funded Universities; Indian Institute of Technology (IITs); National Laboratories and autonomous bodies established under Department of Atomic Energy (DAE); Department of Biotechnology (DBT); Department of Science and Technology (DST); Department of Pharmaceuticals; Ministry of Ayurveda, Yoga and Naturopathy, Unani, Siddha and Homoeopathy (AYUSH); Ministry of Electronics and Information Technology and other bodies, namely Defense Research and Development Organisation (DRDO); Indian Council of Agricultural Research (ICAR); Indian Council of Medical Research (ICMR) and Council of Scientific and Industrial Research (CSIR), engaged in conducting research in science, technology, engineering and medicine aimed at promoting Sustainable Development Goals (SDGs)",
        },
        {
          _id: "61039a22c97a06699a987958",
          name: "Rural development",
        },
        {
          _id: "61039a22c97a06699a987959",
          name: "Slum area development",
        },
        {
          _id: "6130a992c11df369aff40631",
          name: "Disaster management, including relief, rehabilitation and reconstruction activities",
        },
      ],
      width: "50",
      validation: [
        {
          _id: "1",
          error_msg: "",
          value: "",
        },
        {
          _id: "3",
          error_msg: "",
          value: "",
        },
      ],
      selectedValue: [
        {
          _id: "61fba42891360348ac99e53d",
          label:
            "Promoting education, including special education and employment enhancing vocation skills especially among children, women, elderly and the differently abled and livelihood enhancement projects.",
          textValue: "",
          value: "60c847817091c40848c27ede",
        },
      ],
    },
    {
      title: "SDG's",
      input_type: "3",
      shortKey: "sdg",
      order: "sdg",
      answer_option: [
        {
          _id: "5f69d23e007c1e5f335d2380",
          name: "SDG 1: End poverty in all its forms everywhere",
        },
        {
          _id: "5f69d325007c1e5f335d2388",
          name: "SDG 2: End hunger, achieve food security and improved nutrition and promote sustainable agriculture",
        },
        {
          _id: "5f69d3cd007c1e5f335d2391",
          name: "SDG 3: Ensure healthy lives and promote well-being for all at all ages\t",
        },
        {
          _id: "5f69ffa0007c1e5f335d23a4",
          name: "SDG 4: Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all\t",
        },
        {
          _id: "5f6a0047007c1e5f335d23af",
          name: "SDG 5: Achieve gender equality and empower all women and girls\t",
        },
        {
          _id: "5f6ad9c6007c1e5f335d23bb",
          name: "SDG 6: Ensure availability and sustainable management of water and sanitation for all\t",
        },
        {
          _id: "5f6adca0007c1e5f335d23c4",
          name: "SDG 7: Ensure access to affordable, reliable, sustainable and modern energy for all\t",
        },
        {
          _id: "5f6add7f007c1e5f335d23ca",
          name: "SDG 8: Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all\t",
        },
        {
          _id: "5f6ade7c007c1e5f335d23d7",
          name: "SDG 9 Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation\t",
        },
        {
          _id: "5f6adf04007c1e5f335d23e0",
          name: "SDG 10 Reduce inequality within and among countries\t",
        },
        {
          _id: "5f6ae07a6cbf995f327b56f2",
          name: "SDG 11: Make cities and human settlements inclusive, safe, resilient and sustainable\t",
        },
        {
          _id: "5f6ae14d6cbf995f327b56fd",
          name: "SDG 12: Ensure sustainable consumption and production patterns\t",
        },
        {
          _id: "5f6ae2096cbf995f327b5709",
          name: "SDG 13: Take urgent action to combat climate change and its impacts3\t",
        },
        {
          _id: "5f6ae2566cbf995f327b570f",
          name: "SDG 14: Conserve and sustainably use the oceans, seas and marine resources for sustainable development\t",
        },
        {
          _id: "5f6ae3046cbf995f327b571a",
          name: "SDG 15: Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss\t",
        },
        {
          _id: "5f6ae3b56cbf995f327b5727",
          name: "SDG 16: Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels\t",
        },
        {
          _id: "5f6ae4696cbf995f327b5734",
          name: "SDG 17: Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development\t",
        },
      ],
      width: "50",
      validation: [
        {
          _id: "1",
          error_msg: "",
          value: "",
        },
        {
          _id: "3",
          error_msg: "",
          value: "",
        },
      ],
      selectedValue: [
        {
          _id: "61fba42891360348ac99e53f",
          label:
            "SDG 2: End hunger, achieve food security and improved nutrition and promote sustainable agriculture",
          textValue: "",
          value: "5f69d325007c1e5f335d2388",
        },
      ],
    },
    {
      title:
        "At what level is reporting done for commitment, budget, impact, and deliverables?",
      input_type: "5",
      shortKey: "budgetReportLevel",
      order: "budgetReportLevel",
      hint: "When a project fund is not distributed or reported amongst various states/ districts, it is considered as a 'Pan India' project",
      restrictions: [
        {
          type: "11",
          orders: [
            {
              order: "implementationType",
              value: "",
            },
          ],
        },
      ],
      answer_option: [
        {
          _id: "centrally",
          name: "Pan India",
          did: [
            {
              parent_option:
                "^(ngo_indirect|vendor_direct|ppp_direct|ppp_tripartite_ngo|ppp_tripartite_vendor|ppp_tripartite_knowledge_partner)$",
            },
          ],
        },
        {
          _id: "state",
          name: "State",
          did: [
            {
              parent_option:
                "^(ngo_indirect|vendor_direct|ppp_direct|ppp_tripartite_ngo|ppp_tripartite_vendor|ppp_tripartite_knowledge_partner)$",
            },
          ],
        },
        {
          _id: "district",
          name: "District",
          did: [],
        },
      ],
      width: "25",
      validation: [
        {
          _id: "1",
          error_msg: "",
          value: "",
        },
        {
          _id: "3",
          error_msg: "",
          value: "",
        },
      ],
      selectedValue: [
        {
          _id: "61fba42891360348ac99e541",
          label: "Pan India",
          textValue: "",
          value: "centrally",
        },
      ],
    },
    {
      title: "Allow other Mahindra entities to add funds?",
      input_type: "5",
      shortKey: "otherEntitiesAddFunds",
      order: "otherEntitiesAddFunds",
      answer_option: [
        {
          _id: "yes",
          name: "Yes",
        },
        {
          _id: "no",
          name: "No",
        },
      ],
      width: "25",
      parent: [
        {
          order: "implementationType",
          value: "^(ngo_indirect|vendor_direct)$",
        },
      ],
      validation: [
        {
          _id: "1",
          error_msg: "",
          value: "",
        },
        {
          _id: "3",
          error_msg: "",
          value: "",
        },
      ],
      selectedValue: [
        {
          _id: "61fba42891360348ac99e543",
          label: "Yes",
          textValue: "",
          value: "yes",
        },
      ],
    },
    {
      title: "Choose KPI Target Setting Frequency?",
      input_type: "5",
      shortKey: "kpiTargetFrequency",
      order: "kpiTargetFrequency",
      answer_option: [
        {
          _id: "QuarterWise",
          name: "Quarter Wise",
        },
        {
          _id: "Yearly",
          name: "Yearly",
        },
      ],
      width: "25",
      parent: [],
      validation: [
        {
          _id: "1",
          error_msg: "",
          value: "",
        },
        {
          _id: "3",
          error_msg: "",
          value: "",
        },
      ],
      selectedValue: [
        {
          _id: "61fba42891360348ac99e545",
          label: "Quarter Wise",
          textValue: "",
          value: "QuarterWise",
        },
      ],
    },
  ];
  questionResponse:any;
  noDataImg = '../../../../assets/images/no-image.jpg';
  constructor(private commonFunction: CommonService) {}

  ngOnInit(): void {
    // this.questionResponse = this.prepareQuestionData(this.questions);
    console.log("questionResponse", this.questionResponse);
    if (this.template != "template1" && this.template != "template2") {
      this.template = "template2";
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.questions && changes.questions.currentValue ) {
      this.questionResponse = this.prepareQuestionData(changes.questions.currentValue);
    }
    if(changes && changes.title && changes.title.currentValue){
      this.title = changes.title.currentValue;
    }
    if(changes && changes.titleDescription && changes.titleDescription.currentValue){
      this.titleDescription = changes.titleDescription.currentValue;
    }
  }

  prepareQuestionData(data: any[]) {
    let copy = JSON.parse(JSON.stringify(data));
    if (copy && copy.length) {
      copy.forEach((item:any) => {
        let value = this.getSelectedValue(item);
        item[`answerValue`] = value;
        item["fileTypeExt"] = this.commonFunction.getFileExtensionFromURL(item?.input_type == "11" || item?.input_type == "link" ? item?.answerValue : "");
        item["fileIcon"] = this.commonFunction.getFileTypeIcon(item?.fileTypeExt);
        item["input_type"] = this.getInputType(item);
      });
      return copy;
    } else {
      // return [{ title: "Error", answerValue: "Got Empty Data" }];
      return [];
    }
  }

  getSelectedValue(question:any) {
    let value = "";
    let selectedArray: any[] = question.selectedValue;
    if (selectedArray.length && selectedArray.length == 1) {
      // console.log(selectedArray[0]);
      if (selectedArray[0].label) {
        value = selectedArray[0].label;
      } else if (selectedArray[0].textValue) {
        value = selectedArray[0].textValue;
      } else if (selectedArray[0].value) {
        value = selectedArray[0].value;
      } else {
        value = "---";
      }
    } else if (selectedArray.length && selectedArray.length > 1) {
      value = selectedArray.map((el) => el.label).join(", ");
    } else {
      value = "---";
    }
    return value;
  }

  getInputType(itemValue: any) {
    if (itemValue && itemValue.hasOwnProperty("input_type")) {
      switch (itemValue?.input_type) {
        case "date":
            return "14";
        case "link":
            return "11";
        default:
            return itemValue?.input_type;
      }
    }
  }
}
