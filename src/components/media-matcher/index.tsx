import React from 'react';

type RenderProps = State;

type RenderCallback = (props: RenderProps) => React.ReactNode;

type Props = {
  children: RenderCallback
} & typeof defaultProps;

type State = {
  height?: number;
  width?: number;
} & typeof initialState;

const initialState = {
  matched: [] as string[]
}

const defaultProps = {
  media: {
    xs: '(max-width: 320px)',
    sm: '(min-width: 321px) and (max-width: 640px)',
    md: '(min-width: 641px) and (max-width: 900px)',
    lg: '(min-width: 901px) and (max-width: 1280px)',
    xl: '(min-width: 1281px)'
  } as { [key: string]: string }
}

export class MediaMatcher extends React.PureComponent<Props, State> {
  static defaultProps = defaultProps;
  state = initialState;

  // If we have no window or no size is found, is screen size undefined or some default value? empty array?
  matchedMedia = (media: Props['media']) => {
    let matched: string[] = [];

    // Allow user to set a default match?
    if (typeof window === 'undefined') return matched;

    for (const mkey in media) {
      const query = media[mkey];
      if (window.matchMedia(query).matches)
        matched.push(mkey)
    }

    return matched;
  }

  handleWindowResize = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
      matched: this.matchedMedia(this.props.media)
    });
  }

  componentDidMount() {
    // We need to do this once when component inits
    this.handleWindowResize();

    if (window) {
      window.addEventListener('resize', this.handleWindowResize);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('resize', this.handleWindowResize);
    }
  }

  render() {
    const { media, children } = this.props;
    return children(this.state);
  }
}