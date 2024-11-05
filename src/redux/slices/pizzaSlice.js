import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async params => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get(
        `https://671924ac7fc4c5ff8f4c9c00.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
});

const initialState = {
    items: [],
    status: 'loading',
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPizzas.pending, state => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, state => {
                state.status = 'error';
                state.items = [];
            });
    },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
