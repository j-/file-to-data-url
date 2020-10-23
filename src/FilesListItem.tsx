import * as React from 'react';
import { useSelector, getFileDetailsByBlobURL } from './store';
import FileName from './FileName';
import FileLastModified from './FileLastModified';
import FileSize from './FileSize';
import RemoveButton from './RemoveButton';
import CopyButton from './CopyButton';
import './FilesListItem.css';

export interface Props {
  blob: string;
}

const WARNING_SIZE = 1000000;

const FilesListItem: React.FC<Props> = ({ blob: blobURL }) => {
  const fileDetails = useSelector((state) => getFileDetailsByBlobURL(state, blobURL));
  if (!fileDetails) return null;
  return (
    <div className="FilesListItem card card-body mb-3">
      <div className="FilesListItem-grid">
        <div className="FilesListItem-name">
          <FileName>{fileDetails.name}</FileName>
        </div>
        <div className="FilesListItem-last-modified">
          <span className="text-secondary"><FileLastModified>{fileDetails.last}</FileLastModified></span>
        </div>
        <div className="FilesListItem-file-type">
          <span className="text-secondary">{fileDetails.type || <em>unknown</em>}</span>
          {' '}<span className="text-secondary">&bull;</span>{' '}
          <span className={fileDetails.size > WARNING_SIZE ? 'text-warning' : 'text-primary'}><FileSize>{fileDetails.size}</FileSize></span>
        </div>
        <div className="FilesListItem-copy">
          <CopyButton blob={blobURL} />
        </div>
        <div className="FilesListItem-remove">
          <RemoveButton blob={blobURL} />
        </div>
      </div>
    </div>
  );
};

export default FilesListItem;
