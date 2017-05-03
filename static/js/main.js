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

setSideBar = function () {
	const curPageVals = window.location.href.split('?');
	if (curPageVals[0] === "http://localhost:3000/" || curPageVals === "https://wikiweb.org/") {
		if (curPageVals[1]){
			if (curPageVals[1].includes('filter=requests')) {
				console.log('requests')
				document.getElementById('sidebarNewRequests').classList += ' nav_item_selected';
			} else if (curPageVals[1].includes('filter=connections')) {
				console.log('connections')
				document.getElementById('sidebarNewConnections').classList += ' nav_item_selected';
			} 
		}
		else {
			console.log('homepage')
			document.getElementById('sidebarTopStories').classList += ' nav_item_selected';
		}
	}
}

window.onload = function() {
	setNav();
	setSideBar();
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