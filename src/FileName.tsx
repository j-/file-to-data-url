import * as React from 'react';

export interface Props {
  children: string;
}

const FileName: React.FC<Props> = ({ children }) => {
  let index = children.lastIndexOf('.');
  if (index === -1) index = children.length;
  const filename = children.substring(0, index);
  const extension = children.substring(index);
  return (
    <>
      <span
        className="file-icon file-icon-xs mr-2"
        data-type={extension.replace(/^\./, '')}
        style={{ verticalAlign: 'baseline' }}
      />
      <span>{filename}</span>
      {extension && <span>{extension}</span>}
    </>
  );
};

export default FileName;
