
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


timeSince = function(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

printTime = function(timeSinceFunction){
	var aDay = 24*60*60*1000
	console.log(timeSince(new Date(Date.now()-aDay)));
	console.log(timeSince(new Date(Date.now()-aDay*2)));	
}