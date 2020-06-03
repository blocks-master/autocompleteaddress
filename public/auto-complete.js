let placeSearch, autocomplete;
let componentForm = {
	street_number: "short_name",
	route: "long_name",
	locality: "long_name",
	administrative_area_level_1: "short_name",
	country: "long_name",
	postal_code: "short_name"
};

function initAutocomplete() {
	// Create the autocomplete object
	autocomplete = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */ document.getElementById("autocomplete"),
		{ types: [ "geocode" ] }
	);

	// populate the address fields after user selected
	autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
	// Get the place details from the autocomplete object.
	let place = autocomplete.getPlace();

	for (let component in componentForm) {
		document.getElementById(component).value = "";
		document.getElementById(component).disabled = false;
	}

	// get eaach component of the location object and fill in corresponding input
	for (let i = 0; i < place.address_components.length; i++) {
		let addressType = place.address_components[i].types[0];
		if (componentForm[addressType]) {
			let val = place.address_components[i][componentForm[addressType]];
			document.getElementById(addressType).value = val;
		}
	}
}

// Bias the autocomplete object to the user's geographical location
function geolocate() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			let geolocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			let circle = new google.maps.Circle({
				center: geolocation,
				radius: position.coords.accuracy
			});
			autocomplete.setBounds(circle.getBounds());
		});
	}
}
