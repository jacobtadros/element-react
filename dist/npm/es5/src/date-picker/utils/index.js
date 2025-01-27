"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOffsetToWeekOrigin = getOffsetToWeekOrigin;
exports.getDateOfISOWeek = getDateOfISOWeek;
exports.hasClass = hasClass;
exports.deconstructDate = deconstructDate;
exports.SELECTION_MODES = exports.limitRange = exports.getRangeHours = exports.nextMonth = exports.prevMonth = exports.getWeekNumber = exports.getStartDateOfMonth = exports.DAY_DURATION = exports.getFirstDayOfMonth = exports.getDayCountOfMonth = exports.parseDate = exports.formatDate = exports.isDate = exports.toDate = exports.equalDate = void 0;

var _utils = require("../../../libs/utils");

var _locale = _interopRequireDefault(require("../../locale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var t = _locale["default"].t;
var weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
_utils.DateUtils.i18n = {
  dayNamesShort: weeks.map(function (week) {
    return t("el.datepicker.weeks.".concat(week));
  }),
  dayNames: weeks.map(function (week) {
    return t("el.datepicker.weeks.".concat(week));
  }),
  monthNamesShort: months.map(function (month) {
    return t("el.datepicker.months.".concat(month));
  }),
  monthNames: months.map(function (month, index) {
    return t("el.datepicker.month".concat(index + 1));
  })
};

var newArray = function newArray(start, end) {
  var result = [];

  for (var i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
};

var equalDate = function equalDate(dateA, dateB) {
  return dateA === dateB || new Date(dateA).getTime() === new Date(dateB).getTime();
};

exports.equalDate = equalDate;

var toDate = function toDate(date) {
  return isDate(date) ? new Date(date) : null;
};

exports.toDate = toDate;

var isDate = function isDate(date) {
  if (date === null || date === undefined) return false;
  if (isNaN(new Date(date).getTime())) return false;
  return true;
};

exports.isDate = isDate;

var formatDate = function formatDate(date, format) {
  date = toDate(date);
  if (!date) return '';
  return _utils.DateUtils.format(date, format || 'yyyy-MM-dd');
};

exports.formatDate = formatDate;

var parseDate = function parseDate(string, format) {
  return _utils.DateUtils.parse(string, format || 'yyyy-MM-dd');
};

exports.parseDate = parseDate;

var getDayCountOfMonth = function getDayCountOfMonth(year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  }

  if (month === 1) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  }

  return 31;
};

exports.getDayCountOfMonth = getDayCountOfMonth;

var getFirstDayOfMonth = function getFirstDayOfMonth(date) {
  var temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
};

exports.getFirstDayOfMonth = getFirstDayOfMonth;
var DAY_DURATION = 86400000; // return date corresponding to the first cell on datetable 

exports.DAY_DURATION = DAY_DURATION;

var getStartDateOfMonth = function getStartDateOfMonth(year, month) {
  var offsetWeek = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var result = new Date(year, month, 1);
  var day = result.getDay();

  if (day === offsetWeek) {
    result.setTime(result.getTime() - DAY_DURATION * 7);
  } else {
    var offset = getOffsetToWeekOrigin(day, offsetWeek);
    result.setTime(result.getTime() - DAY_DURATION * offset);
  }

  return result;
};
/**
 * 
 * @export
 * @param {any} day , first day of current month, 0 - 6
 * @param {number} [offsetWeek=0, 0-6, 0 sunday, 6 saturday] 
 * @returns 
 */


exports.getStartDateOfMonth = getStartDateOfMonth;

function getOffsetToWeekOrigin(day) {
  var offsetWeek = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var offset = day >= offsetWeek ? day - offsetWeek : 7 + day - offsetWeek;
  offset = offset === 0 ? 7 : offset; // if the two days collide, we force 7 days padding

  return offset;
}

var getWeekNumber = function getWeekNumber(src) {
  var date = new Date(src.getTime());
  date.setHours(0, 0, 0, 0); // Thursday in current week decides the year.

  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7); // January 4 is always in week 1.

  var week1 = new Date(date.getFullYear(), 0, 4); // Adjust to Thursday in week 1 and count number of weeks from date to week 1.

  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}; // http://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number


exports.getWeekNumber = getWeekNumber;

function getDateOfISOWeek(w, y) {
  var simple = new Date(y, 0, 1 + (w - 1) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
}

var prevMonth = function prevMonth(src) {
  var year = src.getFullYear();
  var month = src.getMonth();
  var date = src.getDate();
  var newYear = month === 0 ? year - 1 : year;
  var newMonth = month === 0 ? 11 : month - 1;
  var newMonthDayCount = getDayCountOfMonth(newYear, newMonth);

  if (newMonthDayCount < date) {
    src.setDate(newMonthDayCount);
  }

  src.setMonth(newMonth);
  src.setFullYear(newYear);
  return new Date(src.getTime());
};

exports.prevMonth = prevMonth;

var nextMonth = function nextMonth(src) {
  var clone = new Date(src.getTime());
  var year = clone.getFullYear();
  var month = clone.getMonth();
  var date = clone.getDate();
  var newYear = month === 11 ? year + 1 : year;
  var newMonth = month === 11 ? 0 : month + 1;
  var newMonthDayCount = getDayCountOfMonth(newYear, newMonth);

  if (newMonthDayCount < date) {
    clone.setDate(newMonthDayCount);
  }

  clone.setMonth(newMonth);
  clone.setFullYear(newYear);
  return clone;
};

exports.nextMonth = nextMonth;

var getRangeHours = function getRangeHours(ranges) {
  var hours = [];
  var disabledHours = [];
  (ranges || []).forEach(function (range) {
    var value = range.map(function (date) {
      return date.getHours();
    });
    disabledHours = disabledHours.concat(newArray(value[0], value[1]));
  });

  if (disabledHours.length) {
    for (var i = 0; i < 24; i++) {
      hours[i] = disabledHours.indexOf(i) === -1;
    }
  } else {
    for (var _i = 0; _i < 24; _i++) {
      hours[_i] = false;
    }
  }

  return hours;
};

exports.getRangeHours = getRangeHours;

var limitRange = function limitRange(date, ranges) {
  var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'yyyy-MM-dd HH:mm:ss';
  if (!ranges || !ranges.length) return date;
  var len = ranges.length;
  date = _utils.DateUtils.parse(_utils.DateUtils.format(date, format), format);

  for (var i = 0; i < len; i++) {
    var range = ranges[i];

    if (date >= range[0] && date <= range[1]) {
      return date;
    }
  }

  var maxDate = ranges[0][0];
  var minDate = ranges[0][0];
  ranges.forEach(function (range) {
    minDate = new Date(Math.min(range[0], minDate));
    maxDate = new Date(Math.max(range[1], maxDate));
  });
  return date < minDate ? minDate : maxDate;
};

exports.limitRange = limitRange;

function hasClass(target, classname) {
  return target.classList.contains(classname);
}

var SELECTION_MODES = {
  YEAR: 'year',
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day',
  RANGE: 'range'
};
exports.SELECTION_MODES = SELECTION_MODES;

function deconstructDate(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    week: getWeekNumber(date)
  };
}