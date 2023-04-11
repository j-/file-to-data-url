import * as React from 'react';
import { addDataTransfer } from './store/actions';
import { useAppDispatch } from './store/make';

export const usePaste = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData) {
        dispatch(addDataTransfer(e.clipboardData) as any);
      }
    };
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  });
};
