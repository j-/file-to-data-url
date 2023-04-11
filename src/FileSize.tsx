import * as React from 'react';
import { filesize } from 'filesize';

export interface Props {
  children: number;
}

const FileSize: React.FC<Props> = ({ children }) => {
  return <>{filesize(children, { round: 0 })}</>;
};

export default FileSize;
