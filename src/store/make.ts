import { createStore, applyMiddleware, AnyAction } from 'redux';
import rootReducer, { RootReducerState } from './index';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const makeStore = () => (
  createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk),
    ),
  )
);

export type AppState = RootReducerState;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AnyAction
>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = (): AppDispatch => useDispatch();
