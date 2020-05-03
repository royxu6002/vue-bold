function getFilterArray(arr) {
    return arr.reduce(
      (pre, cur) => (pre.includes(cur) ? pre : [...pre, cur]),
      []
    );
};
export default {
    getFilterArray
};