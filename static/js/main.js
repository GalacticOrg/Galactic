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
const tmplString = $('#validateTmpl').html()

if (tmplString){
	const templateValidate = Handlebars.compile();
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
		  	const submitButton = document.getElementById('modalSubmit');
		  	submitButton.disabled = false;
		  },
		});
	}, 1500));
}


setNav = function () {
	const navElement = document.getElementById('appNav')
	if (navElement === null){ return false};

	const navIndex = navElement.getAttribute('data-navIndex');
	switch(navIndex) {
    case 'home':
        document.getElementById('requestsNavButton').classList += ' currentPage';
        break;
    case 'search':
        document.getElementById('connectionsNavButton').classList += ' currentPage';
        break;
    case 'notifications':
        document.getElementById('notificationsNavButton').classList += ' currentPage';
    		break
		case 'newpage':
        document.getElementById('newpageNavButton').classList += ' currentPage';
    		break
		case 'user':
        document.getElementById('userNavButton').classList += ' currentPage';
    		break
    default:
        ''
	}
}

window.onload = function() {
	setNav();
}
