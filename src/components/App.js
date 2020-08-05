import React from 'react';
import { connect } from 'react-redux';
import { handleGetCocktails } from '../actions/cocktails';
import NewCocktail from './NewCocktail';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleGetCocktails());
  }

  render() {
    return Object.keys(this.props.cocktails).length !== 0 && <NewCocktail />;
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(App);
