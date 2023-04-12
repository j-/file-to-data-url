import * as React from 'react';
import { useSelector } from 'react-redux';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { getFiles } from './store';
import FilesListItem from './FilesListItem';

const FilesList: React.FC = () => {
  const [parentRef] = useAutoAnimate();
  const files = useSelector(getFiles);
  const children: JSX.Element[] = [];
  for (let i = 0; i < files.length; i++) {
    const listIndex = i + 1;
    const fileIndex = files.length - listIndex;
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
