import * as React from 'react';
import { useDispatch } from 'react-redux';
import { addFiles } from './store/actions';

const FileSelector: React.FC = () => {
  const dispatch = useDispatch();
  const handleChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    if (e.currentTarget.files) {
      dispatch(addFiles(e.currentTarget.files));
      // Clear file input. Allows the same file to be selected twice.
      // This is necessary if the user clears the file list but wants
      // to add the same file again afterwards.
      e.currentTarget.value = '';
    }
  }, [dispatch]);
  return (
    <input
      id="FileSelector"
      className="form-control"
      type="file"
      multiple={true}
      onChange={handleChange}
    />
  );
};

export default FileSelector;
