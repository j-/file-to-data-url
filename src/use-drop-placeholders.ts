import * as React from 'react';
import { clearPlaceholders, setPlaceholders } from './store/actions';
import { useAppDispatch } from './store/make';

export const useDropPlaceholders = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    let counter = 0;

    const handleDragenter = (e: DragEvent) => {
      counter++;
      if (!e.dataTransfer) return;
      const kinds = Array.from(e.dataTransfer.items, (item) => item.kind);
      const fileCount = kinds.filter((kind) => kind === 'file').length;
      if (fileCount > 0) e.preventDefault();
      dispatch(setPlaceholders(fileCount));
    };

    const handleDragleave = () => {
      counter--;
      if (counter <= 0) {
        dispatch(clearPlaceholders());
      }
    };

    const handleDragend = () => {
      counter = 0;
      dispatch(clearPlaceholders());
    };

    const handleDrop = (e: DragEvent) => {
      counter = 0;
      e.preventDefault();
      dispatch(clearPlaceholders());
    };

    const target = document.documentElement;

    target.addEventListener('dragenter', handleDragenter);
    target.addEventListener('dragleave', handleDragleave);
    target.addEventListener('dragend', handleDragend);
    target.addEventListener('drop', handleDrop);

    return () => {
      target.removeEventListener('dragenter', handleDragenter);
      target.removeEventListener('dragleave', handleDragleave);
      target.removeEventListener('dragend', handleDragend);
      target.removeEventListener('drop', handleDrop);
    };
  });
};
