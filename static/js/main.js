
openRecommendationsModal = function() {
	document.getElementById('requestModal').className += " displayRequestModal";
	document.getElementById('modalMask').className += " displayRequestModal";
}

closeRecommendationsModal = function() {
	document.getElementById('requestModal').classList.remove("displayRequestModal");
	document.getElementById('modalMask').classList.remove("displayRequestModal");
}

searchOnEnter = function() {
  if(event.which === 13) {
    document.getElementById('navbarSearchButton').click()
  }
}