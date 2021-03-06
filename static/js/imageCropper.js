
const elementCrop = $('#profile-crop-img');
const elementCropHolder = $('#profile-crop-holder');
const profileImg = $('#profile-img');
const profileImgSrc =  profileImg.attr('src');

function createCropper(){
	elementCropHolder.css('display', '')
	elementCrop.croppie({
		viewport: {
	      width: 140,
	      height: 140,
				type:'square',
	  }
	});
}

$('#profile-input').on('change', function () {
  var file = this.files[0];
	renderImage(file)
});

function renderImage(file) {
  // generate a new FileReader object
  var reader = new FileReader();
  // inject an image with the src url
  reader.onload = function(event) {
		const result = event.target.result
		if (result.search('data:image/jpeg') === 0){
			const the_url = event.target.result
			elementCrop.attr('src', the_url);
			createCropper();
		} else {
			alert('Please Upload a jpeg image.');
		}

  }
  // when the file is read it triggers the onload event above.
  reader.readAsDataURL(file);
}

$('#profile-crop-submit').bind('click', function(){
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
		closeProfilePhotoModal();
		xhr.onload = function(){
			setTimeout(function(){
				profileImg.attr('src', profileImgSrc+'?'+Math.random());
			},1000);
		};
	});
})
