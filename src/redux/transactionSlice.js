import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

// Fetch transactions
export const fetchTransactions = createAsyncThunk(
  'transactions/fetch',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth?.user?.token; // Ensure token exists

      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      };

      const response = await axios.get('https://moneytracker-backend-unuq.onrender.com/api/transactions', config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error fetching transactions");
    }
  }
);

// Delete transaction
export const deleteTransactionAsync = createAsyncThunk(
  'transactions/delete',
  async (transactionId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth?.user?.token; // Ensure token exists

      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      };

      console.log("Deleting transaction with token:", token);

      await axios.delete(`https://moneytracker-backend-unuq.onrender.com/api/transactions/${transactionId}`, config);
      return transactionId; // Return deleted transaction ID to update state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error deleting transaction");
    }
  }
);

// Create slice
const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
      state.loading = false;
      state.error = null;
    },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete transaction
      .addCase(deleteTransactionAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTransactionAsync.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteTransactionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  setTransactions,
  addTransaction,
  setLoading,
  setError,
} = transactionSlice.actions;

export default transactionSlice.reducer;
