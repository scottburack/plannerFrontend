import React from 'react'
import '../App.css'
import { connect } from 'react-redux'

class YelpSearchResults extends React.Component {

  handleOnYelpEventClick = (e) => {
    this.props.clickedEvent(e)
    this.props.showAddEventForm(e)
  }

  renderYelpResults = () => {
    console.log(this.props.yelpResults);
    return this.props.yelpResults.map(result => {
      return (
          <div className='yelp-results'>
            <h2><a href={result.url} target='_blank'>{result.name}</a></h2>
            <img name='addEventButtonClicked' className='yelp-images' src={result.image_url} onClick={(e) => this.handleOnYelpEventClick(e)} />
          </div>

      )
    })
  }

  render() {
    return (
      <div id='yelp-container'>
        {this.props.yelpResults ? this.renderYelpResults() : console.log('No Results')}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {yelpResults: state.usersReducer.yelpResults}
}

export default connect(mapStateToProps)(YelpSearchResults)
