/**
* ------------------------------------------------------------
* Copyright (c) 2013 Artem Matevosyan
* ------------------------------------------------------------
*
* @version $Revision: $:
* @author  $Author: $:
* @date    $Date: $:
*/

#target photoshop

//=============================================================================
// Remove Copy
//=============================================================================

//@include 'include/stdlib.js'
//@include 'include/getSelectedLayers.js'

// Dispatch
main();


///////////////////////////////////////////////////////////////////////////////
// Function:	main
// Usage:		starting script rotine
// Input:		none
// Return:		none
///////////////////////////////////////////////////////////////////////////////
function main(){

	if ( app.documents.length <= 0 ) {
		if ( app.playbackDisplayDialogs != DialogModes.NO ) {
			alert("Document must be opened");
		}
		return 'cancel'; // quit, returning 'cancel' (dont localize) makes the actions palette not record our script
	}

	docRef = app.activeDocument;
	docName = docRef.name;

	var comment = prompt('Comment to be added to the comps', '');

	var layers = getSelectedLayers();

	layers.reverse();

	for ( var i=0; i<layers.length; i++ ) {
		var layer = layers[i];
		layer.visible = false;
	}

	var defaultCompName = 'Comp' + String(Math.floor(Math.random()*10000000000));
	var defaultLayerComp = docRef.layerComps.add(defaultCompName, '', false, true, true);
	defaultLayerComp.recapture();

	for ( var i=0; i<layers.length; i++ ) {
		var layer = layers[i];
		layer.visible = true;
		var name = String(layer.name);
		var layerComp = docRef.layerComps.add(name, comment, false, true, true);
		layerComp.recapture();
		layer.visible = false;
	}

	defaultLayerComp = docRef.layerComps.getByName(defaultCompName);
	defaultLayerComp.remove();


}
