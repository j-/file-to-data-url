import * as React from 'react';
import { useSelector } from 'react-redux';
import { getFiles } from './store';
import FilesListItem from './FilesListItem';

const FilesList: React.FC = () => {
  const files = useSelector(getFiles);
  return (
    <ol className="list-unstyled">
      {files.map((file) => (
        <li key={file.blob}>
          <FilesListItem blob={file.blob} />
        </li>
      ))}
    </ol>
  );
};

export default FilesList;
