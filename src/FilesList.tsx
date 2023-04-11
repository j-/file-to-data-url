import * as React from 'react';
import { useSelector } from 'react-redux';
import autoAnimate from '@formkit/auto-animate';
import { getFiles } from './store';
import FilesListItem from './FilesListItem';

const FilesList: React.FC = () => {
  const parentRef = React.useRef(null);
  const files = useSelector(getFiles);
  React.useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);
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
