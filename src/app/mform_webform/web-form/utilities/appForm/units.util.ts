import { VALIDATION } from "./constants";

const KM_TO_METER_RATIO = 1000;
const MILE_TO_METER_RATIO = 1609.34;
const FOOT_TO_METER_RATIO = 0.3048;
const YARD_TO_METER_RATIO = 0.9144;
const ACRE_TO_SQM = 4046.86;
const BIGHA_TO_SQM = 202.343;
const KATTHA_TO_SQM = 10.11715;
const DHUR_TO_SQM = 0.5058575;
const SQ_FEET_TO_SQ_METRE = 0.092903;
const SQ_YARD_TO_SQ_METRE = 0.836127;
const MINUTE_TO_SECOND = 60;
const HOUR_TO_SECOND = MINUTE_TO_SECOND * 60;
const GRAM_TO_KG = 0.001;
const METRIC_TON_TO_KG = 1000.0;
const POUND_TO_KG = 0.4536;
const ML_TO_CUBIC_METER = 0.000001;
const LITER_TO_CUBIC_METER = 0.001;
const KMPS_MPS = 18 / 5;

function toFixed(value: any, places = 5) {
  return Number(value).toFixed(places);
}

class Speed {
  static convert(type: any, value: any) {
    if (type === 1) {
      return Length.toFixed(Number(value) * KMPS_MPS);
    } else {
      return value;
    }
  }
}

class Volume {
  static convert(type: any, value: any) {
    switch (type) {
      case 1:
        return Length.toFixed(Number(value) * LITER_TO_CUBIC_METER);
      case 2:
        return Length.toFixed(Number(value) * ML_TO_CUBIC_METER);
      default:
        return value;
    }
  }
}

class Time {
  static convert(type: any, value: any) {
    switch (type) {
      case 1:
        return Length.toFixed(Number(value) * MINUTE_TO_SECOND);
      case 2:
        return Length.toFixed(Number(value) * HOUR_TO_SECOND);
      default:
        return value;
    }
  }
}

class Area {
  static convert(type: any, value: any) {
    switch (type) {
      case 1:
        return Length.toFixed(Number(value) * ACRE_TO_SQM);
      case 2:
        return Length.toFixed(Number(value) * BIGHA_TO_SQM);
      case 3:
        return Length.toFixed(Number(value) * KATTHA_TO_SQM);
      case 4:
        return Length.toFixed(Number(value) * DHUR_TO_SQM);
      case 5:
        return Length.toFixed(Number(value) * SQ_FEET_TO_SQ_METRE);
      case 6:
        return Length.toFixed(Number(value) * SQ_YARD_TO_SQ_METRE);
      default:
        return value;
    }
  }
}

class Mass {
  static convert(type: any, value: any) {
    switch (type) {
      case 1:
        return Length.toFixed(Number(value) * GRAM_TO_KG, 4);
      case 2:
        return Length.toFixed(Number(value) * METRIC_TON_TO_KG, 4);
      case 3:
        return Length.toFixed(Number(value) * POUND_TO_KG, 4);
      default:
        return value;
    }
  }
}

class Temperature {
  static convert(type: any, value: any) {
    if (type === 0) return value;
    if (type === 1) return Number((value - 32) * (5 / 9)).toFixed(2);
  }
}

class Length {
  static toFixed(value: any, place = 6) {
    return Number(value).toFixed(place);
  }

  static convert(type: any, value: any) {
    switch (type) {
      case 1:
        return Length.toFixed(Number(value) * KM_TO_METER_RATIO);
      case 2:
        return Length.toFixed(Number(value) * MILE_TO_METER_RATIO);
      case 3:
        return Length.toFixed(Number(value) * FOOT_TO_METER_RATIO);
      case 4:
        return Length.toFixed(Number(value) * YARD_TO_METER_RATIO);
      default:
        return value;
    }
  }
}

export class UnitConversionStrategy {
  static getStrategy(validationId: any) {
    switch (validationId) {
      case VALIDATION.UNIT_TEMPERATURE:
        return Temperature;
      case VALIDATION.UNIT_LENGTH:
        return Length;
      case VALIDATION.UNIT_AREA:
        return Area;
      case VALIDATION.UNIT_TIME:
        return Time;
      case VALIDATION.UNIT_MASS:
        return Mass;
      case VALIDATION.UNIT_VOLUME:
        return Volume;
      case VALIDATION.UNIT_SPEED:
        return Speed;
      default:
        return Length;
    }
  }
}
