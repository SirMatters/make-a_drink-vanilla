import React from 'react';
import { connect } from 'react-redux';
import CocktailCard from './CocktailCard';
import { sortObjectsArr } from '../utils/utils';
import styled from 'styled-components';

const DashboardStyles = styled.div`
  max-width: 100%;

  .card-container {
    max-width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

class Dashboard extends React.Component {
  state = {
    sortOption: 'name',
  };

  onSelect = (e) => {
    this.setState({
      sortOption: e.target.value,
    });
  };

  render() {
    const { cocktails } = this.props;
    let cocktailsDisplay = [];
    for (let c in cocktails) {
      cocktailsDisplay.push(cocktails[c]);
    }

    // FIXME: sorting function behaves differently for text and number fields
    cocktailsDisplay = sortObjectsArr(cocktailsDisplay, this.state.sortOption);

    return (
      <DashboardStyles>
        <select onChange={this.onSelect} value={this.state.sortOption}>
          <option value='raiting'>By raiting</option>
          <option value='name'>By name</option>
          <option value='effort'>By effort</option>
        </select>
        <div className='card-container'>
          {cocktailsDisplay.map((c) => (
            <li key={c.id}>
              <CocktailCard cocktail={c} />
            </li>
          ))}
        </div>
      </DashboardStyles>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Dashboard);
