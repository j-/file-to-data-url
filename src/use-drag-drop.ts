import * as React from 'react';
import { useDispatch } from 'react-redux';
import { addDataTransfer } from './store/actions';

export const useDragDrop = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const handleDragover = (e: DragEvent) => {
      if (!e.dataTransfer) return;
      const kinds = Array.from(e.dataTransfer.items, (item) => item.kind);
      const hasFiles = kinds.some((kind) => kind === 'file');
      e.dataTransfer.dropEffect = hasFiles ? 'copy' : 'none';
      if (hasFiles) {
        e.preventDefault();
      }
    };
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer) {
        dispatch(addDataTransfer(e.dataTransfer));
      }
    };
    window.addEventListener('dragover', handleDragover);
    window.addEventListener('drop', handleDrop);
    return () => {
      window.removeEventListener('dragover', handleDragover);
      window.removeEventListener('drop', handleDrop);
    };
  });
};
