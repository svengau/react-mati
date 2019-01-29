import * as React from 'react';
// @ts-ignore
import * as Script from 'react-load-script';

interface ReactMatiLoaderProps {
  onError: () => void;
  onLoad: () => void;
}

export class ReactMatiLoader extends React.Component<ReactMatiLoaderProps> {
  public loadScript: boolean;

  constructor(props: ReactMatiLoaderProps) {
    super(props);
    const documentScripts = document.getElementsByTagName('script');
    this.loadScript = true;
    for (let i = 0; i < documentScripts.length; i += 1) {
      if (documentScripts[i].src.includes('https://sdk.getmati.com/mati-sdk.min.js')) {
        this.loadScript = false;
      }
    }
  }

  public componentDidMount() {
    const { onLoad } = this.props;
    if (onLoad && this.loadScript === false) {
      onLoad();
    }
  }

  public render() {
    const { onError, onLoad } = this.props;
    if (this.loadScript === true) {
      return (
        <Script
          attributes={{ id: 'matiscript' }}
          url="https://sdk.getmati.com/mati-sdk.min.js"
          onError={onError}
          onLoad={onLoad}
        />
      );
    }
    return null;
  }
}
