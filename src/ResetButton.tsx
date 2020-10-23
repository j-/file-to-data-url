import * as React from 'react';
import { useDispatch } from 'react-redux';
import { reset } from './store/actions';

const ResetButton: React.FC = () => {
  const dispatch = useDispatch();
  const handleClick = React.useCallback(() => {
    dispatch(reset());
  }, [dispatch]);
  return (
    <button
      className="btn btn-danger"
      type="button"
      onClick={handleClick}
    >
      Clear all files
    </button>
  );
};

export default ResetButton;
