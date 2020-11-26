/* pagenation function */
export const returnPaginationedList = (list, index) => {
  // 페이지네이션 기준 8
  const first = index * 8;
  if (first > list.lenth - 1) {
    // 페이지네이션 불가 케이스
    return [];
  }
  let last = (index + 1) * 8;
  if (last > list.length) {
    last = list.length;
  }
  return list.slice(first, last);
};
