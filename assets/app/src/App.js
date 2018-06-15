import React from 'react';
import GraphiQL from 'graphiql';

/**
 * Style the app
 */
import 'graphiql/graphiql.css';
import './app.css';

function graphQLFetcher(graphQLParams) {

  /**
   * Get the nonce & endpoint from the localized wpGraphiQLSettings object
   * @type {null}
   */
  let nonce = ( window.wpGraphiQLSettings && window.wpGraphiQLSettings.nonce ) ? window.wpGraphiQLSettings.nonce : null;
  let endpoint = ( window.wpGraphiQLSettings && window.wpGraphiQLSettings.graphqlEndpoint ) ? window.wpGraphiQLSettings.graphqlEndpoint : window.location.origin;

  /**
   * Fetch the WPGraphQL API
   */
  return fetch( endpoint, {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': nonce
    },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());

}

const App = () => {
  return (
  	<div className="wrapper" >
		<GraphiQL fetcher={graphQLFetcher} />
	</div>
	);
}

export default App;
