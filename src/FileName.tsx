import * as React from 'react';
import './FileName.css';

export interface Props {
  children: string;
}

const FileName: React.FC<Props> = ({ children }) => {
  let index = children.lastIndexOf('.');
  if (index === -1) index = children.length;
  const filename = children.substring(0, index);
  const extension = children.substring(index);
  return (
    <div className="FileName">
      <span
        className="FileName-file-icon file-icon file-icon-xs me-2"
        data-type={extension.replace(/^\./, '')}
      />
      <span className="FileName-file-name">{filename}</span>
      {extension && <span className="FileName-extension">{extension}</span>}
    </div>
  );
};

export default FileName;
