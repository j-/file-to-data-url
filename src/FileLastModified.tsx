import * as React from 'react';
import format from 'date-fns/format';

export interface Props {
  children: string;
}

const FileLastModified: React.FC<Props> = ({ children }) => {
  return <>{format(new Date(children), 'EEE d MMMM yyyy \'at\' h:mm a')}</>;
};

export default FileLastModified;
