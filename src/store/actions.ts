import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SerializedFile } from '../types';
import { getFilesFromDataTransfer } from '../get-files-from-data-transfer';

/* Reset action */

export const ACTION_RESET = 'RESET';

export interface ActionReset extends Action<typeof ACTION_RESET> { }

export const isActionReset = (action: Action): action is ActionReset => (
  action.type === ACTION_RESET
);

export const reset = (): ActionReset => ({
  type: ACTION_RESET,
});

/* Add files action */

export const ACTION_ADD_FILES = 'ADD_FILES';

export interface ActionAddFiles extends Action<typeof ACTION_ADD_FILES> {
  payload: {
    files: SerializedFile[];
  };
}

export const isActionAddFiles = (action: Action): action is ActionAddFiles => (
  action.type === ACTION_ADD_FILES
);

export const addFiles = (files: File[] | FileList): ActionAddFiles => ({
  type: ACTION_ADD_FILES,
  payload: {
    files: Array.from(files, (file) => ({
      name: file.name,
      size: file.size,
      type: file.type || null,
      last: new Date(file.lastModified).toISOString(),
      blob: URL.createObjectURL(file),
    })),
  },
});

export const addDataTransfer = (dataTransfer: DataTransfer): ThunkAction<Promise<void>, unknown, void, ActionAddFiles> => async (dispatch) => {
  const files = await getFilesFromDataTransfer(dataTransfer);
  if (files.length) {
    dispatch(addFiles(files));
  }
};

/* Remove files action */

export const ACTION_REMOVE_FILES = 'REMOVE_FILES';

export interface ActionRemoveFiles extends Action<typeof ACTION_REMOVE_FILES> {
  payload: {
    blobs: string[];
  };
}

export const isActionRemoveFiles = (action: Action): action is ActionRemoveFiles => (
  action.type === ACTION_REMOVE_FILES
);

export const removeFile = (blob: string): ActionRemoveFiles => ({
  type: ACTION_REMOVE_FILES,
  payload: {
    blobs: [blob],
  },
});

export const removeFiles = (blobs: string[]): ActionRemoveFiles => ({
  type: ACTION_REMOVE_FILES,
  payload: {
    blobs,
  },
});

/* Set placeholders action */

export const ACTION_SET_PLACEHOLDERS = 'SET_PLACEHOLDERS';

export interface ActionSetPlaceholders extends Action<typeof ACTION_SET_PLACEHOLDERS> {
  payload: {
    placeholders: number;
  };
}

export const isActionSetPlaceholders = (action: Action): action is ActionSetPlaceholders => (
  action.type === ACTION_SET_PLACEHOLDERS
);

export const setPlaceholders = (placeholders: number): ActionSetPlaceholders => ({
  type: ACTION_SET_PLACEHOLDERS,
  payload: {
    placeholders,
  },
});

export const clearPlaceholders = (): ActionSetPlaceholders => ({
  type: ACTION_SET_PLACEHOLDERS,
  payload: {
    placeholders: 0,
  },
});
