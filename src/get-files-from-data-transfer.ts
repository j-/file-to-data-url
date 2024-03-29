import flatten from 'lodash.flatten';

const SUPPORT_GET_AS_ENTRY = typeof DataTransferItem.prototype.webkitGetAsEntry === 'function';

const getFilesFromFileSystemEntry = async (entry: FileSystemEntry): Promise<File[]> => {
  const file = await new Promise<File>((resolve) => entry.file(resolve));
  return [file];
};

const getFilesFromFileSystemDirectoryEntry = async (entry: FileSystemDirectoryEntry): Promise<File[]> => {
  const reader = entry.createReader();
  const entries = await new Promise<(FileSystemEntry | FileSystemDirectoryEntry)[]>((resolve) => reader.readEntries(resolve));
  const entryFiles = await Promise.all(entries.map(getFilesFromEntry));
  return flatten(entryFiles);
};

const entryIsFile = (entry: FileSystemEntry | FileSystemDirectoryEntry): entry is FileSystemEntry => (
  entry.isFile
);

const entryIsDirectory = (entry: FileSystemEntry | FileSystemDirectoryEntry): entry is FileSystemDirectoryEntry => (
  entry.isDirectory
);

const getFilesFromEntry = async (entry: FileSystemEntry | FileSystemDirectoryEntry): Promise<File[]> => {
  if (entryIsFile(entry)) {
    return getFilesFromFileSystemEntry(entry);
  } else if (entryIsDirectory(entry)) {
    return getFilesFromFileSystemDirectoryEntry(entry);
  } else {
    throw new Error('Expected entry to be file or directory');
  }
};

const getFilesFromDataTransferItem = async (item: DataTransferItem): Promise<File[]> => {
  const entry = item.webkitGetAsEntry();
  if (entry != null) return getFilesFromEntry(entry);
  const file = item.getAsFile();
  if (file != null) return [file];
  // Something went wrong. Item was of kind 'file' but at this point it
  // did not contain an entry or a file.
  throw new Error('Expected item to be file entry, got null');
};

const getFilesFromDataTransferItems = async (items: DataTransferItem[]): Promise<File[]> => {
  const files: File[] = [];
  const promises = items.map(async (item) => {
    files.push(...await getFilesFromDataTransferItem(item));
  });
  await Promise.all(promises);
  return files;
};

export const getFilesFromDataTransfer = async (dataTransfer: DataTransfer): Promise<File[]> => {
  const files = dataTransfer.files ? Array.from(dataTransfer.files) : [];
  const items = dataTransfer.items ? Array.from(dataTransfer.items).filter((item) => item.kind === 'file') : [];
  if (items.length && SUPPORT_GET_AS_ENTRY) {
    return getFilesFromDataTransferItems(items);
  }
  return files;
};
