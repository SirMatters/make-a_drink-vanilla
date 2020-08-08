import React from 'react';
import { connect } from 'react-redux';
import { handleGetCocktails } from '../actions/cocktails';
import { authenticateUser } from '../actions/authedUser';
import Dashboard from './Dashboard';
import NewCocktail from './NewCocktail';

class App extends React.Component {
  componentDidMount() {
    // FIXME: fix user
    this.props.dispatch(authenticateUser('placeholder'));
    this.props.dispatch(handleGetCocktails());
  }

  render() {
    return Object.keys(this.props.cocktails).length !== 0 && <NewCocktail />;
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(App);
