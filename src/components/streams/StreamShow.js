import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import flv from 'flv.js';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
    this.buildPlayer();
  }

  // when rerender page find media player
  componentDidUpdate() {
    this.buildPlayer();
  }

  // cleanup loading stream when get back from stream
  componentWillUnmount() {
    this.player.destroy(); // stop video streaming
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }
    // create video player flv
    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading ...</div>;
    }

    const { title, description } = this.props.stream;
    return (
      <div>
        <video style={{ width: '100%' }} controls={true} ref={this.videoRef} />
        <h1>{title}</h1>
        <h3>{description}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
