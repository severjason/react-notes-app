import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import ArrowUp from '@material-ui/icons/KeyboardArrowUp';
import ExpandableContainerStyles from './styles';

interface ExpandableContainerProps {
  heightLimit: number;
}

interface ExpandableContainerState {
  expanded: boolean;
}

const DEFAULT_HEIGHT_LIMIT: number = 300;

class ExpandableContainer extends React.Component<ExpandableContainerProps, ExpandableContainerState> {
  static defaultProps = {
    heightLimit: DEFAULT_HEIGHT_LIMIT,
  };
  private readonly containerRef: React.RefObject<any>;

  constructor(props: ExpandableContainerProps) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      expanded: false,
    };
  }

  private toggleContainer = () => this.setState({expanded: !this.state.expanded});

  private isHeightReachedLimit = () => {
    const {heightLimit} = this.props;
    const refHeight = this.containerRef.current && this.containerRef.current.clientHeight;
    return refHeight >= heightLimit;
  }

  private showButton = () => {
    const {expanded} = this.state;
    const {heightLimit} = this.props;
    const small = heightLimit < DEFAULT_HEIGHT_LIMIT / 2;
    return (
      <IconButton onClick={this.toggleContainer} className={`${small ? 'small' : ''}`}>
        {expanded ? <ArrowUp /> : <ArrowDown/>}
      </IconButton>
    );
  }

  render() {
    const {children, heightLimit} = this.props;
    const {expanded} = this.state;

    return (
      <ExpandableContainerStyles heightLimit={heightLimit}>
        <div className={`container ${expanded ? 'expanded' : 'collapsed'}`} ref={this.containerRef}>
          {children}
        </div>
        <div className="button">
          {this.isHeightReachedLimit() && this.showButton()}
        </div>
      </ExpandableContainerStyles>
    );
  }
}

export default ExpandableContainer;
