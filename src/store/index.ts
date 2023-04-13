import { Reducer } from 'redux';
import { TypedUseSelectorHook, useSelector as useReactReduxSelector } from 'react-redux';
import { SerializedFile } from '../types';
import { isActionReset, isActionAddFiles, isActionRemoveFiles, isActionSetPlaceholders } from './actions';

export interface RootReducerState {
  files: SerializedFile[];
  latest: string | null;
  placeholders: number;
}

export const DEFAULT_STATE: RootReducerState = {
  files: [],
  latest: null,
  placeholders: 0,
};

export const reducer: Reducer<RootReducerState> = (state = DEFAULT_STATE, action) => {
  if (isActionReset(action)) {
    return DEFAULT_STATE;
  }

  if (isActionAddFiles(action)) {
    return {
      ...state,
      files: [
        ...state.files,
        ...action.payload.files,
      ],
      latest: action.payload.files.length === 1 ? action.payload.files[0].blob : null,
    };
  }

  if (isActionRemoveFiles(action)) {
    let { files, latest } = state;
    const toRemove = action.payload.blobs;
    return {
      ...state,
      files: files.filter((file) => (
        toRemove.indexOf(file.blob) < 0
      )),
      latest: latest !== null && toRemove.indexOf(latest) < 0 ? latest : null,
    };
  }

  if (isActionSetPlaceholders(action)) {
    const { placeholders } = action.payload;
    return {
      ...state,
      placeholders,
    };
  }

  return state;
};

export default reducer;

export const useSelector: TypedUseSelectorHook<RootReducerState> = useReactReduxSelector;

export const getFiles = (state: RootReducerState) => state.files;

export const getFileDetailsByBlobURL = (state: RootReducerState, blobURL: string) => (
  state.files.find((file) => file.blob === blobURL) || null
);

export const getLatestBlobURL = (state: RootReducerState) => state.latest;

export const hasFiles = (state: RootReducerState) => state.files.length > 0;

export const getPlaceholders = (state: RootReducerState) => state.placeholders;
