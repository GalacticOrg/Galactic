openRecommendationsModal = function() {
	document.getElementById('requestModal').className += " displayRequestModal";
	document.getElementById('modalMask').className += " displayRequestModal";
}

closeRecommendationsModal = function() {
	document.getElementById('requestModal').classList.remove("displayRequestModal");
	document.getElementById('modalMask').classList.remove("displayRequestModal");
}

dismissAlert = function() {
	document.getElementById('alerts').remove()
}

lengthGreaterThanZero = function(el){
	if (el.length > 0) { return true }
		else { return false }
}

const templateValidate = Handlebars.compile($('#validateTmpl').html());
const validateSec = $('#validateSection');
$( "#questionInput" ).bind('input propertychange', $.debounce(function() {
	$.ajax({
	  url: '/pagevalidate',
	  data: {
	    q: this.value
	  },
	  success: function( result ) {
			$( "#questionPageId").val(result.id)
			validateSec.html(templateValidate(result))
	  }
	});
}, 1500));

