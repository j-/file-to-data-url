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
