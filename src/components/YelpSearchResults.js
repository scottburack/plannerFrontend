import React from 'react'
import '../App.css'
import { connect } from 'react-redux'

class YelpSearchResults extends React.Component {

  renderYelpResults = () => {
    console.log(this.props.yelpResults);
    return this.props.yelpResults.map(result => {
      return (
      
          <div id='yelp-results'>
            <h2><a href={result.url} target='_blank'>{result.name}</a></h2>
            <img className='yelp-images' src={result.image_url} />
          </div>

      )
    })
  }

  render() {
    return (
      <div>
        {this.props.yelpResults ? this.renderYelpResults() : console.log('no results')}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {yelpResults: state.usersReducer.yelpResults}
}

export default connect(mapStateToProps)(YelpSearchResults)
