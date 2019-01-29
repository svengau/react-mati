import * as React from 'react';
import { ReactMatiLoader } from './ReactMatiLoader';

interface Props {
  children: React.ReactElement<any>;
  clientId: string;
  metadata: any;
  hideChat: boolean;
  product: string;
  country: string;
  style: string;
}

interface State {
  hasError: boolean;
  loadingStatus: string;
  errorElement: any;
}
export class ReactMati extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    clientId: undefined,
    metadata: {},
    hideChat: false,
    product: 'kyc',
    country: 'us',
    style: 'blue',
  };

  public matiButton: React.RefObject<any>;

  public state = {
    hasError: false,
    loadingStatus: 'loading',
    errorElement: undefined,
  };

  constructor(props: Props) {
    super(props);
    this.matiButton = React.createRef();
  }

  public componentDidCatch(error: any, info: any) {
    this.setState({ loadingStatus: 'errored' });
    // console.error('An error occured while loading mati', error, info);
  }

  public onLoad = (): void => {
    const { clientId, metadata, hideChat } = this.props;
    const Mati = (window as any).Mati;
    if (Mati) {
      this.setState({ loadingStatus: 'ready' });
      Mati.render({
        clientId,
        metadata,
        hideChat,
        element: this.matiButton.current,
      });
    }
  };

  public onError = (): void => {
    this.setState({ loadingStatus: 'errored' });
  };

  public render() {
    const { loadingStatus, errorElement } = this.state;
    const { children, product, country, style } = this.props;
    let component = null;
    if (loadingStatus === 'errored') {
      component = errorElement || 'Error loading Mati';
    } else if (loadingStatus === 'loading') {
      component = <ReactMatiLoader onLoad={this.onLoad} onError={this.onError} />;
    }

    return (
      <React.Fragment>
        <div
          ref={this.matiButton}
          className="mati-button responsive"
          data-product={product}
          data-country={country}
          data-style={style}
        />
        {component}
      </React.Fragment>
    );
  }
}

export default ReactMati;
