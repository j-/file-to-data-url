import * as React from 'react';
import { addDataTransfer } from './store/actions';
import { useAppDispatch } from './store/make';

export const useDragDrop = () => {
  const dispatch = useAppDispatch();

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
        dispatch(addDataTransfer(e.dataTransfer) as any);
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
