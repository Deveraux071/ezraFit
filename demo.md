## Demo Video

Link to the demo video: https://drive.google.com/file/d/1tnR3h6lRXTMCNwa-c8oO4rxh9lr4Z7kf/view?usp=sharing

NOTE: To test the size recommender, you will need a 9x6 inch black and white checkerboard that has been added to this repo as `checkboardImg.png`. When using this checkerboard, ensure that the length of each square's side is 2.84cm. This is required for calibration. 

## Demo Writeup

The demo begins with the creation of a test account through which users can save their personal information such as name, email, and future calculations (measurements, size, and preferences) to the database. Once a user has been registered and they log into their account, they are directed to their account details. Clicking ‘Edit’ in the top right section of the page enables them to update their information and credentials.

We start with the style recommender. If a user has previously not entered their preferences, they will see a message saying ‘No Recommendations Yet!’. If previously have been entered and stored previously, they will be displayed under ‘My Preferences’, along with the option to update them using other images, and to get clothing recommendations based on existing preferences. Clicking on ‘Add Image’ under Update Preferences opens a popup using which the user can upload an image representing their preferences. Once the upload is complete, the preferences section is updated with the new info. Clicking on ‘Get Recommendations’ will take users to the “retailer’s website”. For now, a placeholder has been implemented that displays search words that correspond with the preferences generated previously. We had issues with uploading our Machine Learning models to the server, so this feature is available on localhost only. The frontend for this is on our site, but the backend logic does not work when connected to the online server. To test this, you can run our app locally. After running the frontend and backend on your machine, you can follow the same flow as in the demo video. You can even use the same credentials to log in. 

The next flow we have is to get a size recommendation. The Measurements page displays the user’s measurements if they have been calculated before, and also allows users to take new images to get their size. Users who do not wish to create an account are routed to the camera pages using the ‘Continue as Guest’ button on the Sign In page. The camera pages are two-fold; the /take-image page displays the instructions to take the picture, has a timer, and takes the picture when the timer runs out. This routes to /view-image that allows you to see the images taken so far and approve them before proceeding. If a user is dissatisfied with the image, they can retake the image using the ‘Retake’ button. Once all the images have been taken, users are prompted to select the points on the screen which correspond with certain body parts, i.e., the left and right points of the waist, the left and right points of the neck, and so on. After the points have been selected, the user is routed to a page that displays a loading message, followed by the option to see their size (through the Continue Shopping button), get style recommendations, or create an account if they haven’t been logged in. If the server is fails to provide a size, users will see an error message and will be prompted to try again. 




