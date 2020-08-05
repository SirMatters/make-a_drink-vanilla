import React from 'react';
import { connect } from 'react-redux';
import { handleGetCocktails } from '../actions/cocktails';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleGetCocktails());
  }

  render() {
    return <div>cocktails: {JSON.stringify(this.props)}</div>;
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(App);
