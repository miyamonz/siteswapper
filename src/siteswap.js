const isUnique = arr => arr.every(i => arr.indexOf(i) === arr.lastIndexOf(i));
export default function(numArr) {
  const arr = numArr.map((n, i) => (n + i) % numArr.length);
  return isUnique(arr);
}
