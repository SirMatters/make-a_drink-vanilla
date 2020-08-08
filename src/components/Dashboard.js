import React from 'react';
import { connect } from 'react-redux';
import CocktailCard from './CocktailCard';

class Dashboard extends React.Component {
  render() {
    const { cocktails } = this.props;
    return (
      <div className='card-container'>
        {Object.keys(cocktails).map((c) => (
          <li key={c}>
            <CocktailCard cocktail={cocktails[c]} />
          </li>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Dashboard);
