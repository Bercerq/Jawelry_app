import { SELECT_ITEM } from "../constants/product";

const initialState = {
  selectedProduct:{},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ITEM:
      return {
        ...state,
        selectedProduct: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default productReducer;
