// src/utils/getPrizeName.js

import { PRIZE_DICTIONARY } from '@app/utils/constants'

/**
 * 根據 prizeLevel 數字獲取對應的獎品名稱
 * @param {number} prizeLevel - 獎品等級數字
 * @returns {string} - 獎品名稱
 */
export function getPrizeViewLevel(prizeLevel) {
  return PRIZE_DICTIONARY[prizeLevel] || "未知獎品";
}
