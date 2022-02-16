export const ATTENDANCE_START_HOUR = 4;
export const ATTENDANCE_END_HOUR = 8;

export const BONUS_START_HOUR = 20;
export const BONUS_END_HOUR = 24;

export const BONUS_DAYS = [16, 23];

export const IS_COMPLETE = (attendanceYn) => {
  if (attendanceYn === "Y") {
    return "COMPLETE";
  } else if (attendanceYn === "B") {
    return "BONUS";
  } else {
    return false;
  }
};

export const IS_NOT_COMPLETE = (index, today) => {
  switch (index) {
    case 0:
      return today === 14 ? "DAY1" : "SOON";
    case 1:
      return today === 15 ? "DAY2" : "SOON";
    case 2:
      return today === 16 ? "DAY3" : "SOON";
    case 3:
      return today === 17 ? "DAY4" : "SOON";
    case 4:
      return today === 18 ? "DAY5" : "SOON";
    case 5:
      return today === 19 ? "DAY6" : "SOON";
    case 6:
      return today === 21 ? "DAY7" : "SOON";
    case 7:
      return today === 22 ? "DAY8" : "SOON";
    case 8:
      return today === 23 ? "DAY9" : "SOON";
    case 9:
      return today === 24 ? "DAY10" : "SOON";
    case 10:
      return today === 25 ? "DAY11" : "SOON";
    case 11:
      return today === 26 ? "DAY12" : "SOON";

    default:
      return false;
  }
};

export const IS_BONUS = (index, today) => {
  switch (index) {
    case 0:
      return today >= 14 ? "DAY1" : "SOON";
    case 1:
      return today >= 15 ? "DAY2" : "SOON";
    case 2:
      return today >= 16 ? "DAY3" : "SOON";
    case 3:
      return today >= 17 ? "DAY4" : "SOON";
    case 4:
      return today >= 18 ? "DAY5" : "SOON";
    case 5:
      return today >= 19 ? "DAY6" : "SOON";
    case 6:
      return today >= 21 ? "DAY7" : "SOON";
    case 7:
      return today >= 22 ? "DAY8" : "SOON";
    case 8:
      return today >= 23 ? "DAY9" : "SOON";
    case 9:
      return today >= 24 ? "DAY10" : "SOON";
    case 10:
      return today >= 25 ? "DAY11" : "SOON";
    case 11:
      return today >= 26 ? "DAY12" : "SOON";

    default:
      return false;
  }
};
