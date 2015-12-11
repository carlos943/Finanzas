var pictureSource;
			var destinationType;

			document.addEventListener("deviceready", onDeviceReady, false);

			function onDeviceReady() {
				pictureSource = navigator.camera.PictureSourceType;
				destinationType = navigator.camera.DestinationType;
			}

			// Called when a photo is successfully retrieved
			//
			function onPhotoDataSuccess(imageData) {

				var smallImage = document.getElementById('imagen');

				//smallImage.style.display = 'block';

				smallImage.src = "data:image/jpeg;base64," + imageData;

			}

			// Called when a photo is successfully retrieved
			//
			function onPhotoURISuccess(imageURI) {

				var largeImage = document.getElementById('imagen');

				//largeImage.style.display = 'block';

				largeImage.src = imageURI;
			}

			function capturePhoto() {
				// Take picture using device camera and retrieve image as base64-encoded string
				navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
					quality : 50,
					destinationType : destinationType.DATA_URL,
					 saveToPhotoAlbum: true
				});
			}

			function capturePhotoEdit() {
				// Take picture using device camera, allow edit, and retrieve image as base64-encoded string
				navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
					quality : 20,
					allowEdit : true,
					destinationType : destinationType.DATA_URL
				});
			}

			function getPhoto(source) {
				// Retrieve image file location from specified source
				navigator.camera.getPicture(onPhotoURISuccess, onFail, {
					quality : 50,
					destinationType : destinationType.FILE_URI,
					sourceType : source,
					 saveToPhotoAlbum: true
					
				});
			}

			function onFail(message) {
				alert('Failed because: ' + message);
			}
