import * as React from 'react';
import { useDispatch } from 'react-redux';
import { removeFile } from './store/actions';

export interface Props {
  blob: string;
}

const RemoveButton: React.FC<Props> = ({ blob: blobURL }) => {
  const dispatch = useDispatch();
  const handleClick = React.useCallback(() => {
    dispatch(removeFile(blobURL));
  }, [dispatch, blobURL]);
  return (
    <button
      className="btn btn-light"
      type="button"
      onClick={handleClick}
      title="Remove this file"
    >
      &times;
    </button>
  );
};

export default RemoveButton;
