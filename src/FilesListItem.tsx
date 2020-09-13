import * as React from 'react';
import { useSelector, getFileDetailsByBlobURL } from './store';
import FileName from './FileName';
import FileLastModified from './FileLastModified';
import FileSize from './FileSize';
import RemoveButton from './RemoveButton';
import CopyButton from './CopyButton';

export interface Props {
  blob: string;
}

const WARNING_SIZE = 1000000;

const FilesListItem: React.FC<Props> = ({ blob: blobURL }) => {
  const fileDetails = useSelector((state) => getFileDetailsByBlobURL(state, blobURL));
  if (!fileDetails) return null;
  return (
    <div className="card card-body mb-3 position-relative">
      <div className="d-flex">
        <div className="flex-grow-1">
          <FileName>{fileDetails.name}</FileName><br />
          <span className="text-secondary"><FileLastModified>{fileDetails.last}</FileLastModified></span><br />
          <span className="text-secondary">{fileDetails.type || <em>unknown</em>}</span>
          {' '}<span className="text-secondary">&bull;</span>{' '}
          <span className={fileDetails.size > WARNING_SIZE ? 'text-warning' : 'text-primary'}><FileSize>{fileDetails.size}</FileSize></span>
        </div>
        <div className="ml-1">
          <CopyButton blob={blobURL} />
        </div>
        <div className="ml-1">
          <RemoveButton blob={blobURL} />
        </div>
      </div>
    </div>
  );
};

export default FilesListItem;
