import * as React from 'react';
import { useDispatch } from 'react-redux';
import { addDataTransfer } from './store/actions';

export const usePaste = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData) {
        dispatch(addDataTransfer(e.clipboardData));
      }
    };
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  });
};
