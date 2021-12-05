import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

// convert this component to class based to call componentDidMount func
// to make sure that stream loaded when choose its id
class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  render() {
    // console.log(this.props);
    if (!this.props.stream) {
      return <div>Loading ...</div>;
    }
    return <div>{this.props.stream.title} </div>;
  }
}

// ownProps is defalt prop contain same props the streamEdit fun props
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamEdit);
