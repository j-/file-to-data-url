import * as React from 'react';
import { useSelector } from 'react-redux';
import { useDragDrop } from './use-drag-drop';
import { usePaste } from './use-paste';
import { hasFiles } from './store';
import ResetButton from './ResetButton';
import FileSelector from './FileSelector';
import FilesList from './FilesList';

const App: React.FC = () => {
  useDragDrop();
  usePaste();
  const showReset = useSelector(hasFiles);
  return (
    <div className="App container mt-5 mb-5">
      <a href="https://skeoh.com/" className="text-secondary">&larr; skeoh.com</a>
      <h1 className="mb-5">File to data URL</h1>
      <p>Drop a file into this window to generate a data URL. You can also use copy+paste or the file browser below.</p>
      <div className="container px-1 my-3">
        <div className="row mx-n2">
          <div className="col-sm px-1"><FileSelector /></div>
          {showReset && <div className="col-auto px-1"><ResetButton /></div>}
        </div>
      </div>
      <FilesList />
    </div>
  );
};

export default App;
