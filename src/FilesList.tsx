import * as React from 'react';
import { useSelector } from 'react-redux';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { getFiles } from './store';
import FilesListItem from './FilesListItem';

const FilesList: React.FC = () => {
  const [parentRef] = useAutoAnimate();
  const files = useSelector(getFiles);
  return (
    <ol ref={parentRef} className="list-unstyled">
      {files.map((file) => (
        <li key={file.blob}>
          <FilesListItem blob={file.blob} />
        </li>
      ))}
    </ol>
  );
};

export default FilesList;
