export default (cash, amount) => {
  let remainAmount = cash-amount;
  if (remainAmount < 0) return new Error('not enough money');
  let change = [];
  [1000, 500, 100, 50, 20, 10, 5, 2, 1].map( banknote => {
    const num = Math.floor(remainAmount/banknote);
    remainAmount = remainAmount%banknote;
    let i;
    for(i = 0; i < num; i++) {
      change = [...change, banknote];
    }
    return { banknote, num };
  });
  return change;
}