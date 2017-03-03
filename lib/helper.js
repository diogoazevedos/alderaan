const { is, complement } = require('ramda');
const { isMoment } = require('moment');

const isNumber = is(Number);

const isNotNumber = complement(isNumber);
const isNotMoment = complement(isMoment);

module.exports = {
  isNumber,
  isNotNumber,
  isNotMoment,
};
