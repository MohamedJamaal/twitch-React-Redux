import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

// Client ID from project created in console.dvelopers.google.com where created project oauth
// 578951469846-bnr4k58gmu1ipqgkmedv5fb1t8rmtma2.apps.googleusercontent.com

class GoogleAuth extends React.Component {
  componentDidMount() {
    //   initialize library of google oAuth and its project id
    window.gapi.load('client:auth2', () => {
      // init send request with client id to know if user signed in
      window.gapi.client
        .init({
          clientId:
            '578951469846-bnr4k58gmu1ipqgkmedv5fb1t8rmtma2.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      // get user id
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  OnSignInClick = () => {
    this.auth.signIn();
  };

  OnSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.OnSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.OnSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
