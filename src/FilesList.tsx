import * as React from 'react';
import { useSelector } from 'react-redux';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { getFiles, getPlaceholders } from './store';
import FilesListItem from './FilesListItem';
import FilesListItemPlaceholder from './FilesListItemPlaceholder';

const FilesList: React.FC = () => {
  const [parentRef] = useAutoAnimate();
  const files = useSelector(getFiles);
  const placeholders = useSelector(getPlaceholders);
  const children: JSX.Element[] = [];
  for (let i = 0; i < placeholders; i++) {
    const listIndex = i + 1;
    children.push(
      <li key={i} value={listIndex}>
        <FilesListItemPlaceholder />
      </li>
    );
  }
  for (let i = 0; i < files.length; i++) {
    const listIndex = i + 1 + placeholders;
    const fileIndex = files.length - (i + 1);
    const file = files[fileIndex];
    children.push(
      <li key={file.blob} value={listIndex}>
        <FilesListItem blob={file.blob} />
      </li>
    );
  }
  return (
    <ol ref={parentRef} className="list-unstyled">
      {children}
    </ol>
  );
};

export default FilesList;
