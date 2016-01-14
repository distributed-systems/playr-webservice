/**
* JS for the Playr frontend/webservice
*/

/* global window, alert, XMLHttpRequest, FormData, EventEmitter */

( function() {

	'use strict';

	var PlayrRequester = function( element ){

		this._element = element;
		this._setupListeners();

	};

	PlayrRequester.prototype = Object.create( EventEmitter.prototype );
	PlayrRequester.prototype.constructor = PlayrRequester;

	PlayrRequester.prototype._setupListeners = function() {
		
		this._element.addEventListener( 'submit', function( ev ) {
			ev.preventDefault();
			this.request();
		}.bind( this ) );

	};

	PlayrRequester.prototype.request = function() {

		this.emitEvent( 'request' );

		var url 		= this._element.querySelector( 'input[name=url]').value
			, json		= this._element.querySelector( 'textarea[name=json]').value;

		var button = this._element.getElementsByTagName( 'button' )[ 0 ];

		var req = new XMLHttpRequest();

		req.addEventListener( 'load', function( res ) {

			console.log( res, req );

			button.disabled = false;

			if( req.readyState !== 4 ) {
				return;
			}

			if( req.status !== 200 ) {
				alert( 'Request failed: Status ' + req.status + ', ' + req.response );
			}
			else {
				var response = JSON.parse( req.responseText );
				console.error( response );
				this.emitEvent( 'result', [ response.messages ] );
			}

		}.bind( this ) );
		req.addEventListener( 'error', function( res ) {
			button.disabled = false;
			console.error( res, req );
			alert( 'Request failed.' );
		} );
		req.open( 'POST', '/play' );

		var data = new FormData();
		if( url ) {
			data.append( 'url', url );
		}
		data.append( 'scenario', json );

		req.send( data );

		button.disabled = true;

	};







	var PlayrResult = function( element, requester ) {

		this._element = element;
		this._requester = requester;

		this._setupListeners();

	};

	PlayrResult.prototype._setupListeners = function() {
		
		this._requester.on( 'result', function( result ) {
			console.log( 'PlayrResult: Got result %o', result );
			this._element.innerHTML = result.join( '<br/>');
		}.bind( this ) );

		this._requester.on( 'request', function() {
			this._element.innerHTML = 'Requesting …';
		}.bind( this ) );
	
	};







	window.jb = window.jb || {};
	window.jb.playr = window.jb.playr || {};
	window.jb.playr.Requester = PlayrRequester;
	window.jb.playr.Result = PlayrResult;

} )();