import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard/Dashboard';
import NewCocktail from './EditCocktail/NewCocktail';
import Nav from './Nav/Nav';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading-bar';
import ViewCocktail from './CocktailView/ViewCocktail';
import EditCocktail from './EditCocktail/EditCocktail';
import FourOFour from './Common/FourOFour';
import styled from 'styled-components';

const AppStyles = styled.div`
  display: flex;
  flex-direction: column;

  .container {
    max-width: 1020px;
  }
`;

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {this.props.authedUser ? (
            <AppStyles>
              <Nav />
              <div className='container'>
                <Switch>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/add' component={NewCocktail} />
                  <Route path='/cocktails/:id/edit' component={EditCocktail} />
                  <Route path='/cocktails/:id' component={ViewCocktail} />
                  <Route component={FourOFour} />
                </Switch>
              </div>
            </AppStyles>
          ) : // TODO: provide login page
          null}
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(App);
