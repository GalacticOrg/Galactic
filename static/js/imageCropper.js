
const elementCrop = $('#profile-crop');
const elementCropHolder = $('#profile-crop-holder');
const profileImg = $('#profile-img');
const profileImgSrc =  profileImg.attr('src');

function createCropper(){
	elementCropHolder.css('display', '')
	elementCrop.croppie({
		viewport: {
	      width: 200,
	      height: 200
	  }
	});
}

$('#croppedResult').bind('click', function(){
	elementCrop.croppie('result', {
		format: 'jpeg',
		type: 'blob'
	}).then(function(blob) {
		var formData = new FormData();
		formData.append("image", blob);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/profile', true);
		xhr.send(formData);
		elementCrop.croppie('destroy');
		elementCropHolder.css('display', 'none');
		setTimeout(function(){
			profileImg.attr('src', profileImgSrc+'?'+Math.random());
		},2000)
	});
})
