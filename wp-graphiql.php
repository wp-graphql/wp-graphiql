<?php
/**
 * Plugin Name:     WP GraphiQL
 * Plugin URI:      https://wpgraphql.com
 * Description:     This plugin provides the GraphiQL IDE as an admin page in WordPress, allowing the GraphQL WPGraphQL
 * schema to be browsed from within WordPress.
 * Author:          WPGraphQL, Digital First Media, Jason Bahl
 * Author URI:      http://wpgraphql.com
 * Text Domain:     wp-graphiql
 * Domain Path:     /languages
 * Version:         0.3.0
 *
 * @package         WPGraphiQL
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once __DIR__ . '/class-wpgraphiql.php';

add_action(
	'plugins_loaded',
	function() {
		$wp_graphiql = new WPGraphiQL();
		$wp_graphiql->init();
	}
);
