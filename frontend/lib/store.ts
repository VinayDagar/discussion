import createSagaMiddleware from "@redux-saga/core";
import { configureStore, Tuple } from "@reduxjs/toolkit";

const sagaMiddleware = createSagaMiddleware();

export const store = () =>
  configureStore({
    reducer: {},
    middleware: () => new Tuple(sagaMiddleware),
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// export default store;
