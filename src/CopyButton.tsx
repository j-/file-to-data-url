import * as React from 'react';
import { useSelector, getLatestBlobURL } from './store';

export interface Props {
  blob: string;
}

const CopyButton: React.FC<Props> = ({ blob: blobURL }) => {
  const latestBloblURL = useSelector(getLatestBlobURL);
  const [dataURL, setDataURL] = React.useState<string | null>(null);
  const [buttonText, setButtonText] = React.useState<string | null>(null);
  const process = React.useCallback(async () => {
    try {
      const res = await fetch(blobURL);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setDataURL(String(reader.result));
      });
      reader.readAsDataURL(blob);
    } catch (err) {
      // TODO: Handle error
    }
  }, [blobURL]);
  const handleClickProcess = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>((e) => {
    e.preventDefault();
    process();
  }, [process]);
  const handleClickCopy = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(async (e) => {
    e.preventDefault();
    if (dataURL !== null) {
      await navigator.clipboard.writeText(dataURL);
      setButtonText('Copied!');
    }
  }, [dataURL]);
  React.useEffect(() => {
    if (blobURL === latestBloblURL) {
      process();
    }
  }, [blobURL, latestBloblURL, process]);
  React.useEffect(() => {
    if (buttonText !== null) {
      const clock = setTimeout(() => {
        setButtonText(null);
      }, 1000);
      return () => clearTimeout(clock);
    }
  }, [buttonText]);
  if (dataURL === null) {
    return (
      <button
        className="btn btn-light"
        type="button"
        onClick={handleClickProcess}
      >
        Generate
      </button>
    );
  } else {
    return (
      <button
        className="btn btn-dark"
        type="button"
        onClick={handleClickCopy}
      >
        {buttonText || 'Copy'}
      </button>
    );
  }
};

export default CopyButton;
