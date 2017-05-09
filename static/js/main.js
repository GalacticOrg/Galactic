
var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var urlRegex = new RegExp(expression);

openRecommendationsModal = function() {
	document.getElementById('requestModal').className += " displayRequestModal";
	document.getElementById('modalMask').className += " displayRequestModal";
}

openModalAndPostRecommendation = function() {
	let val = $( "#questionInput" ).val();
	if (val && val.match(urlRegex) ){
		makeRequest(val);
	} else{
		$( "#questionInput" ).val('');
	}
	openRecommendationsModal();
}

closeRecommendationsModal = function() {
	document.getElementById('requestModal').classList.remove("displayRequestModal");
	document.getElementById('modalMask').classList.remove("displayRequestModal");
}

openConnectModal = function() {
	document.getElementById('connectModal').className += " displayConnectModal";
	document.getElementById('modalMask').className += " displayConnectModal";
}

closeConnectModal = function() {
	document.getElementById('connectModal').classList.remove("displayConnectModal");
	document.getElementById('modalMask').classList.remove("displayConnectModal");
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
    		document.getElementById('connectionsNavButton').classList += ' currentPage';
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
	const sidebarTopStories = document.getElementById('sidebarTopStories')
	if (window.location.pathname === '/' && curPageVals[1]) {
			if (curPageVals[1].includes('filter=requests')) {
				document.getElementById('sidebarNewRequests').classList += ' nav_item_selected';
			} else if (curPageVals[1].includes('filter=connections')) {
				document.getElementById('sidebarNewConnections').classList += ' nav_item_selected';
			}
	} else if(sidebarTopStories) {
		sidebarTopStories.classList += ' nav_item_selected';
	}
}

window.onload = function() {
	setNav();
	setSideBar();
}

const tmplString = $('#validateTmpl').html();
const invalidTmplString = $('#invalidTmpl').html();

if (tmplString && invalidTmplString){
	templateValidate = Handlebars.compile(tmplString);
	templateInvalidate = Handlebars.compile(invalidTmplString);
	validateSec = $('#validateSection');
	$( "#questionInput" ).bind('input propertychange', $.debounce(function(){ makeRequest(this.value) }, 1500));
}

function makeRequest (value) {
	$.ajax({
		url: '/pagevalidate',
		data: {
			q: value
		},
		success: function( result ) {
			if (result.title) {
				$( "#questionPageId").val(result.id)
				validateSec.html(templateValidate(result))
				$('.modalSubmitButton').prop('disabled', false);
			} else {
				validateSec.html(templateInvalidate(result))
				$('.modalSubmitButton').prop('disabled', true);
			}
		},
	});
}
const isParsed = $('#isParsed').is(":checked");
if (location.search.search('pp=true') !== -1 && !isParsed){
	$.ajax({
		type: 'POST',
		url: location.pathname + '/new',
		success: function( result ) {
			if (result.newParse === true){
				window.location = location.href;
			}
		},
	});
}

$('.topicLink').each(function(){
	if(this.dataset.label == getParameterByName('topic')){
		$(this).css('font-weight','bolder')
	}

})

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
