hypathiaAcademy.filter('ago',
	[function() {
		return function(text) {
			return moment(text).fromNow(true);
		};
	}]
);