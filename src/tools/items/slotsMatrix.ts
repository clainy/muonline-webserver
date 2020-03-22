import { decode } from '.';

const slotsMatrix = (itemsHex: string, itemsDB: any) => {
  const hexArray = itemsHex.toLowerCase().match(/[a-f0-9]{32}/gi);
  const slots: number[][] = [];

  Array(hexArray.length)
    .fill(null)
    .forEach((_, i) => {
      const row = Math.floor(i / 8);
      if (slots[row]) {
        slots[row].push(0);
      } else {
        slots[row] = [0];
      }
    });

  hexArray.forEach((hex, i) => {
    const row = Math.floor(i / 8);
    const column = Math.floor(i - row * 8);

    if (hex.toLowerCase() !== 'f'.repeat(32)) {
      const item = decode(hex);
      const itemData =
        item &&
        itemsDB &&
        itemsDB[item.group] &&
        itemsDB[item.group].items[item.id]
          ? itemsDB[item.group].items[item.id]
          : false;

      if (itemData) {
        for (let x = 0; x < itemData.x; x++) {
          for (let y = 0; y < itemData.y; y++) {
            if (
              slots[y + row] !== undefined &&
              slots[y + row][x + column] !== undefined
            ) {
              slots[y + row][x + column] = 1;
            }
          }
        }
      }
    }
  });

  return slots;
};

export const multidimensionalSum = (array: any) => {
  let sum = 0;
  array.forEach((n: number) => {
    if (typeof n === 'object') {
      sum += multidimensionalSum(n);
    } else {
      sum += n;
    }
  });

  return sum;
};

export default slotsMatrix;
