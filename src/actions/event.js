export function addEvent(groupId, name, dateStart, dateEnd, timeStart, timeEnd, votes) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/events', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        event: {
          group_id: groupId,
          name: name,
          date_start: dateStart,
          date_end: dateEnd,
          time_start: timeStart,
          time_end: timeEnd,
          votes: votes
        }
      })
    })
    .then(response => response.json())
    .then(groupEvents => dispatch(getEvents(groupEvents)))
  }
}

export function getEvents(groupEvents) {
  return {
    type: 'GET_EVENTS',
    payload: groupEvents
  }
}

export function handleEventVoting(votes, eventId) {
  // debugger
    fetch(`http://localhost:3000/api/v1/events/${eventId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        event: {
          votes: votes
        }
      })
    })
    .then(response => response.json())
    .then(eventVotes => console.log(eventVotes))
  console.log('done');
}

export function getVotes(eventVotes) {
  return {
    type: 'EVENT_VOTES',
    payload: eventVotes
  }
}

export function passYelpFormValues(city, state, country, radioValue, locationName) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/events/fetch_from_yelp', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        city: city,
        state: state,
        country: country,
        radio_value: radioValue,
        location_name: locationName
      })
    })
    .then(response => response.json())
    .then(yelpResults => dispatch(setYelpResults(yelpResults)))
  }
}

export function setYelpResults(yelpResults) {
  return {
    type: 'YELP_RESULTS',
    payload: yelpResults
  }
}
