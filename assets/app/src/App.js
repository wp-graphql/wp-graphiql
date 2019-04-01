import React from 'react';
import GraphiQL from 'graphiql';
/**
 * Style the app
 */
import 'graphiql/graphiql.css';
import './app.css';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      fetcher: null,
      theme: 'solarized light',
    };
    this.refreshFetcher = this.refreshFetcher.bind( this );
    this.setTheme = this.setTheme.bind( this );
  }

  componentDidMount() {
    this.refreshFetcher();
    if ( ( window.wpGraphiQLSettings ) ) {
      const { debug } = window.wpGraphiQLSettings;
      if ( debug ) {
        this.setIntervalRefresh(isNumeric(debug) ? parseFloat(debug) : 15000);
      }
    }
  }

  setIntervalRefresh(ms) {
    setInterval(this.refreshFetcher, ms);
  }

  refreshFetcher() {
    this.setState({
      fetcher: (graphQLParams) => {
        /**
         * Get the nonce & endpoint from the localized wpGraphiQLSettings object
         * @type {null}
         */
        let nonce = ( window.wpGraphiQLSettings && window.wpGraphiQLSettings.nonce ) ? window.wpGraphiQLSettings.nonce : null;
        let endpoint = ( window.wpGraphiQLSettings && window.wpGraphiQLSettings.graphqlEndpoint ) ? window.wpGraphiQLSettings.graphqlEndpoint : window.location.origin;

        // Fetch the WPGraphQL API.
        return fetch( endpoint, {
          method: 'post',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': nonce
          },
          body: JSON.stringify(graphQLParams),
        }).then(response => response.json());
      },
    });
  }

  setTheme( theme ) {
    console.log(theme);
    this.setState({ theme });
  }

  render() {
    const { fetcher, theme } = this.state;
    return (
      <div className="wrapper">
        { fetcher && (
          <GraphiQL editorTheme={theme} fetcher={fetcher}>
            <GraphiQL.Footer>
              <GraphiQL.Button
                onClick={this.refreshFetcher}
                label="Refresh Schema"
                title="Refresh Schema"
              />
            </GraphiQL.Footer>
          </GraphiQL>
        ) }
      </div>
    );
  }
}

export default App;
