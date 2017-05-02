openRecommendationsModal = function() {
	document.getElementById('requestModal').className += " displayRequestModal";
	document.getElementById('modalMask').className += " displayRequestModal";
}

closeRecommendationsModal = function() {
	document.getElementById('requestModal').classList.remove("displayRequestModal");
	document.getElementById('modalMask').classList.remove("displayRequestModal");
}

openProfileEditModal = function() {
	document.getElementById('profileEditModal').className += " displayProfileEditModal";
	document.getElementById('modalMask').className += " displayProfileEditModal";
}

closeProfileEditModal = function() {
	document.getElementById('profileEditModal').classList.remove("displayProfileEditModal");
	document.getElementById('modalMask').classList.remove("displayProfileEditModal");
}

openProfilePhotoModal = function() {
	document.getElementById('profilePhotoModal').className += " displayProfilePhotoModal";
	document.getElementById('modalMask').className += " displayProfilePhotoModal";
}

closeProfilePhotoModal = function() {
	document.getElementById('profilePhotoModal').classList.remove("displayProfilePhotoModal");
	document.getElementById('modalMask').classList.remove("displayProfilePhotoModal");
}

dismissAlert = function() {
	document.getElementById('alerts').remove()
}

setNav = function () {
	const navElement = document.getElementById('appNav')
	
	if (navElement === null){ return false};

	const navIndex = navElement.getAttribute('data-navIndex');
	switch(navIndex) {
    case 'home':
        break;
    case 'search':
        break;
    case 'requests':
        document.getElementById('requestsNavButton').classList += ' currentPage';
        break;
    case 'connections':
        document.getElementById('connectionsNavButton').classList += ' currentPage';
        break;
    case 'notifications':
        document.getElementById('notificationsNavButton').classList += ' currentPage';
    		break
		case 'newpage':
        document.getElementById('newpageNavButton').classList += ' currentPage';
    		break
		case 'profile':
        document.getElementById('userNavButton').classList += ' currentPage';
    		break
    default:
        ''
	}
}

window.onload = function() {
	setNav();
}

const tmplString = $('#validateTmpl').html()

if (tmplString){
	const templateValidate = Handlebars.compile(tmplString);
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
				$('.modalSubmitButton').prop('disabled', false);
		  },
		});
	}, 1500));
}