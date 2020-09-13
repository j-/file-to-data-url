import flatten from 'lodash.flatten';

const SUPPORT_GET_AS_ENTRY = typeof DataTransferItem.prototype.webkitGetAsEntry === 'function';

interface FileSystemEntry {
  isFile: true;
  isDirectory: false;
  file(successCallback: (file: File) => void): void;
}

interface FileSystemDirectoryEntry {
  isFile: false;
  isDirectory: true;
  createReader(): FileSystemDirectoryReader;
}

interface FileSystemDirectoryReader {
  readEntries(successCallback: (file: FileSystemEntry[]) => void): void;
}

const getFilesFromEntry = async (entry: FileSystemEntry | FileSystemDirectoryEntry): Promise<File[]> => {
  if (entry.isFile) {
    const file = await new Promise<File>((resolve) => entry.file(resolve));
    return [file];
  } else {
    const reader = entry.createReader();
    const entries = await new Promise<(FileSystemEntry | FileSystemDirectoryEntry)[]>((resolve) => reader.readEntries(resolve));
    const entryFiles = await Promise.all(entries.map(getFilesFromEntry));
    return flatten(entryFiles);
  }
};

export const getFilesFromDataTransfer = async (dataTransfer: DataTransfer): Promise<File[]> => {
  const files = dataTransfer.files ? Array.from(dataTransfer.files) : [];
  const items = dataTransfer.items ? Array.from(dataTransfer.items).filter((item) => item.kind === 'file') : [];
  if (items.length && SUPPORT_GET_AS_ENTRY) {
    const entries = items.map((item) => item.webkitGetAsEntry());
    // Each entry can contain multiple files.
    const entryFiles = await Promise.all(entries.map(getFilesFromEntry));
    // Flatten the files from each entry into a single array.
    return flatten(entryFiles);
  }
  return files;
};
