## Body Measurements Important information

### Setup
- you will need 4 different images.
    1. An image of your upper half with a checkboard held up to your shoulders. Name this final_{YOUR NAME}1.JPG
    2. An image of your upper half with your arms spread wide. Name this final_{YOUR NAME}2.JPG
    3. An image of your upper half with you facing the right. Name this final_{YOUR NAME}3.JPG
    4. An image of your full body, with you holding the checkerboard. Name this final_{YOUR NAME}4.JPG

- then install opencv
    - pip install opencv-python

### How to run api:
- cd into the body_measurement folder
- run the following command to start the measurements api.
```
python3 code2.py -i1 test_images/final_{YOUR NAME}1.JPG -i2 test_images/final_{YOUR NAME}2.JPG -i3 test_images/final_{YOUR NAME}3.JPG -a true -i4 test_images/final_{YOUR NAME}4.JPG
```

### How to test:
- For the first two images, (arms spread and facing to the side), click where your waist is. (2 dots). Press esc.
- Next two images, (arms spread and facing to the side), click where your chest is. (2 dots). Press esc.
- Next two images, (arms spread and facing to the side), click where your hips are. (2 dots). Press esc.

- Then click the left side of your neck, then the right side of your neck. (2 dots). Press esc. 

- Then click the left shoulder, then the right shoulder. (2 dots). Press esc. 

- Then click left side of your neck, then right side of the neck. (2 dots). Press esc. 

- Then click left shoulder, then right shoulder. (2 dots). Press esc. 

- Then in the next image (arms spread image), click on the left wrist then the right wrist. (2 dots). Press esc.

- Finally the standing image will appear. Click your left inseam, then left ankle, then right inseam and finally right ankle. (4 dots). Press esc. 

- Your results will be in CM. 

