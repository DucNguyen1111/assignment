import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface IConfigState {
  isChange: boolean;
}

const initialState: IConfigState = {
  isChange: false,
};

export const userDetail = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setChangeDataState: (state, action: PayloadAction<boolean>) => {
      state.isChange = action.payload;
    },
  },
});

export const { setChangeDataState } = userDetail.actions;
export const userDetailReducer = userDetail.reducer;
