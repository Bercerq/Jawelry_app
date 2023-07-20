import { SELECT_ITEM } from "../constants/product";

export const selectItems = (payload) => ({
  type: SELECT_ITEM,
  payload,
});
