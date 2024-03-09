import { enableES5, produce } from 'immer';

const customProduce = (...args) => {
  enableES5();
  return produce(...args);
};
export default customProduce;
