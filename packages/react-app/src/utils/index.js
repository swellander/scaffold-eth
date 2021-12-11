import humanizeDuration from "humanize-duration";
const { utils } = require("ethers");

export const parseRawBalance = balance => {
  if (balance) {
    const etherBalance = utils.formatEther(balance);
    parseFloat(etherBalance).toFixed(2);
    const floatBalance = parseFloat(etherBalance);
    return floatBalance.toFixed(2);
  }
  return '0'
}

export const getTimeLeftString = durationMS => {
  if (durationMS == undefined) return 'Loading...';
  return durationMS > 0 ? humanizeDuration(durationMS, {
    round: true,
    delimiter: ": ",
    language: "shortEn",
    languages: {
      shortEn: {
        y: () => "",
        mo: () => "",
        w: () => "",
        d: () => "",
        h: () => "",
        m: () => "",
        s: () => "",
        ms: () => "",
      },
  },
  }) : "Zilch!";
}