import argparse
import cv2
import numpy as np
import matplotlib.pyplot as plt
import math
import sys
import body_measurement.segment as segment
import base64
import os 

# initialize the list of reference points and boolean indicating
# whether cropping is being performed or not
refPt = []
r1=5 #for affine correction
r2=2 #for measurement
ref_ht=2.84 #measurement of checkboard
rectangle_row=9
rectangle_col=6
# square_size=int(r+1)
criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)
metre_pixel_x=0
metre_pixel_y=0
window_name1="image"
draw_radius=10

def click_and_crop(event, x, y, flags, param):
	# grab references to the global variables
	global refPt, cropping
	if event == cv2.EVENT_LBUTTONDOWN:
		pass
	elif event == cv2.EVENT_LBUTTONUP:
		refPt.append4((x, y))

def get_points(img):
    points= []
    img_to_show = img.copy()
    def draw_circle(event,x,y,flags,param):
        if event == cv2.EVENT_LBUTTONDOWN:
            cv2.circle(img_to_show,(x,y),draw_radius,(255,0,0),-1)
            points.append([x,y])
    cv2.namedWindow('image',cv2.WINDOW_NORMAL)
    cv2.resizeWindow('image', img.shape[0],img.shape[1])
    cv2.setMouseCallback('image',draw_circle)
    while(1):
        cv2.imshow('image',img_to_show)
        k = cv2.waitKey(20) & 0xFF
        if k == 27:
            break
    cv2.destroyAllWindows()
    return points

# returns 4 points at square_size of checkboard 
def chess_board_corners(image,gray,r):
	square_size=int(r+1)
	ret, corners = cv2.findChessboardCorners(image, (rectangle_row,rectangle_col),None)
	# corners2 = cv2.cornerSubPix(gray,corners,(11,11),(-1,-1),criteria)
	# Uncomment for old opencv version

	cv2.cornerSubPix(gray,corners,(11,11),(-1,-1),criteria)
	# New version does inplace
	corners2=corners
	coordinates=[]
	coordinates.append((corners2[0,0,0],corners2[0,0,1]))
	coordinates.append((corners2[square_size-1,0,0],corners2[square_size-1,0,1]))
	coordinates.append((corners2[rectangle_row*(square_size-1),0,0],corners2[rectangle_row*(square_size-1),0,1]))
	coordinates.append((corners2[rectangle_row*(square_size-1)+square_size-1,0,0],corners2[rectangle_row*(square_size-1)+square_size-1,0,1]))
	return coordinates

# receives an image and performs affine transform using chess_board_corners
def affine_correct_params(image):

	gray=np.copy(image)

	if(len(image.shape)>2):
		gray=cv2.cvtColor(gray,cv2.COLOR_BGR2GRAY) 
	refPt=chess_board_corners(image,gray,r1)
	pt1=np.asarray(refPt,dtype=np.float32)
	dist=(refPt[1][0]-refPt[0][0])
	refPt[1]=(refPt[0][0]+dist,refPt[0][1])
	refPt[2]=(refPt[0][0],refPt[0][1]+dist)
	refPt[3]=(refPt[0][0]+dist,refPt[0][1]+dist)
	pt2=np.asarray(refPt,dtype=np.float32)
	M=cv2.getPerspectiveTransform(pt1,pt2)
	return M


def affine_correct(image,M=None):

	if M is None:
		M=affine_correct_params(image)

	image2=np.copy(image)

	if(len(image2)<3):
		image2=cv2.cvtColor(image2,cv2.COLOR_GRAY2RGB)
	
	dst=cv2.warpPerspective(image2,M,(image.shape[1],image.shape[0]))
	# dst=cv2.cvtColor(dst,cv2.COLOR_BGR2GRAY)
	return dst

def drawCircle(img, pt,state):

	# print img.shape
	# if()
	img=img.astype(np.uint8)
	img_col = np.copy(img)
	if (len(img_col.shape) < 3):
		img_col = cv2.cvtColor(img,cv2.COLOR_GRAY2RGB) #converts image to black and white
	cv2.circle(img_col,(pt[0],pt[1]),10,(255,0,255),-1) #draws circle at center coordinates , radius 10
	if(state==0):
		while(1):
			cv2.imshow('img',img_col)
			k = cv2.waitKey(20) & 0xFF
			if k == 27:
				break
		cv2.destroyAllWindows()
		return img
	else:
		return cv2.cvtColor(img_col,cv2.COLOR_BGR2GRAY)

def getHeadPoint(mask):

	shape=mask.shape
	y_head=(np.nonzero(np.sum(mask,axis=1)))[0][0]
	# print y_head
	x_head=np.argmax(mask[y_head])
	return (x_head,y_head)

def analyze_chessboard(image,affine_correct_flag):
	clone = image.copy()
	gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
	cv2.namedWindow(window_name1,cv2.WINDOW_NORMAL)
	cv2.setMouseCallback(window_name1, click_and_crop)
	cv2.imshow(window_name1, image)
	cv2.waitKey(1)
	dst=np.copy(image) # created to ease affine_correct mode
	affine_correct_parameters=None
	if (affine_correct_flag=='True'):
		affine_correct_parameters=affine_correct_params(dst)

	gray2 = cv2.cvtColor(dst,cv2.COLOR_BGR2GRAY) 
	temp=chess_board_corners(dst,gray2,r2)

	ret, corners = cv2.findChessboardCorners(dst, (rectangle_row,rectangle_col),None)

	# corners2 = cv2.cornerSubPix(gray2,corners,(11,11),(-1,-1),criteria)
	# dst = cv2.drawChessboardCorners(dst, (9,6), corners2, ret)
	# Uncomment this for old version and comment next 2

	cv2.cornerSubPix(gray2,corners,(11,11),(-1,-1),criteria)
	cv2.drawChessboardCorners(dst, (9,6), corners, ret)

	metre_pixel_x=(r2*ref_ht)/(abs(temp[0][0]-temp[1][0]))
	metre_pixel_y=(r2*ref_ht)/(abs(temp[0][1]-temp[2][1]))

	coordinate=[temp[0],temp[1]]
	# 6X6 square co-ord
	sep=((coordinate[1][0]-coordinate[0][0])/6.0)*9.0

	coordinate[0]=(max(0,int(coordinate[0][0]-2*sep)),0)
	coordinate[1]=(min(dst.shape[1],int(coordinate[1][0]+3.5*sep)),dst.shape[0])
	return metre_pixel_x,metre_pixel_y,coordinate,affine_correct_parameters

def getDistance(p1,p2):
	return (p1[0]-p2[0],p1[1]-p2[1])

def pixel_to_distance(p1,mx,my):
	return math.sqrt((p1[0]*mx)**2+(p1[1]*my)**2)

def save_img(txt):
	jpg_recovered = base64.b64decode(txt)
	filename = 'check.jpg'
	with open(filename, 'wb') as f:
		f.write(jpg_recovered)

def get_pixel_distance(loc1, loc2, metre_pixel_x, metre_pixel_y):

	dist1=getDistance(loc1, loc2)
	dist1=pixel_to_distance(dist1,metre_pixel_x,metre_pixel_y)
	return dist1

def get_perimeter(points1, points2, metre_pixel_x, metre_pixel_y):
	
	# dist1=getDistance(points1[0],points1[1])
	# dist1=pixel_to_distance(dist1,metre_pixel_x,metre_pixel_y)
	dist1 = get_pixel_distance(points1[0], points1[1], metre_pixel_x, metre_pixel_y)
	# dist2=getDistance(points2[0],points2[1])
	# dist2=pixel_to_distance(dist2,metre_pixel_x,metre_pixel_y)
	dist2 = get_pixel_distance(points2[0], points2[1], metre_pixel_x, metre_pixel_y)
	dist1 = dist1/2
	dist2 = dist2/2
	perimeter = 2 * 3.1415 * math.sqrt((dist1*dist1 + dist2*dist2)/2)
	return perimeter

def get_distance_between_fall(points_arr, metre_pixel_x, metre_pixel_y):

	# dist1=getDistance(left_shoulder,left_fall)
	# dist1=pixel_to_distance(dist1,metre_pixel_x,metre_pixel_y)
	dist1 = get_pixel_distance(points_arr[0], points_arr[1], metre_pixel_x, metre_pixel_y)
	# dist2=getDistance(right_shoulder,right_fall)
	# dist2=pixel_to_distance(dist2,metre_pixel_x,metre_pixel_y)
	dist2 = get_pixel_distance(points_arr[2], points_arr[3], metre_pixel_x, metre_pixel_y)
	# dist3=getDistance(left_fall,right_fall)
	# dist3=pixel_to_distance(dist3,metre_pixel_x,metre_pixel_y)
	dist3 = get_pixel_distance(points_arr[1], points_arr[3], metre_pixel_x, metre_pixel_y)
	return dist1+dist2+dist3

def get_points_from_measurements(points_arr, body_part, position):
	return = [points[body_part][position]['left'], points[body_part][position]['right']]


def measure_distance_new(checkboardImage, points, affineFlag='False'):
	cb = save_img(checkboardImage)
	image = cv2.imread('check.jpg')

	affine_correct_flag= (affineFlag)
	metre_pixel_x,metre_pixel_y,coordinate,affine_correct_parameters=analyze_chessboard(image,affine_correct_flag)
	
	segmented_image=segment.segmenter(image)
	print("Segmentation Completed 1")

	cv2.imwrite("first.jpg",segmented_image)
	
	print("images saved")
	block_cut = np.zeros(segmented_image.shape)
	block_cut[coordinate[0][1]:coordinate[1][1],coordinate[0][0]:coordinate[1][0]] = 1

	if(affine_correct_flag=='True'):
		arm_spread_image=affine_correct(arm_spread_image,affine_correct_parameters)
		waist_chest_image=affine_correct(waist_chest_image,affine_correct_parameters)
		segmented_image=affine_correct(segmented_image,affine_correct_parameters)
		print("Affine Corrected")

	print(metre_pixel_x)
	print(metre_pixel_y)

	all_measurements = {}
	
	# waist_a = [points['waist']['spread']['left'], points['waist']['spread']['right']]
	# waist_b = [points['waist']['side']['left'], points['waist']['side']['right']]
	waist_a = get_points_from_measurements(points, 'waist', 'spread')
	waist_b = get_points_from_measurements(points, 'waist', 'side')
	# dist1=getDistance(waist_a[0],waist_a[1])
	# dist1=pixel_to_distance(dist1,metre_pixel_x,metre_pixel_y)
	# dist2=getDistance(waist_b[0],waist_b[1])
	# dist2=pixel_to_distance(dist2,metre_pixel_x,metre_pixel_y)
	# dist1 = dist1/2
	# dist2 = dist2/2
	# perimeter = 2 * 3.1415 * math.sqrt((dist1*dist1 + dist2*dist2)/2)
	all_measurements['waist'] = get_perimeter(waist_a, waist_b, metre_pixel_x, metre_pixel_y)

	# chest_a = [points['chest']['spread']['left'], points['chest']['spread']['right']]
	# chest_b = [points['chest']['side']['left'], points['chest']['side']['right']]
	chest_a = get_points_from_measurements(points, 'chest', 'spread')
	chest_b = get_points_from_measurements(points, 'chest', 'side')
	# dist1=getDistance(chest_a[0],chest_a[1])
	# dist1=pixel_to_distance(dist1,metre_pixel_x,metre_pixel_y)
	# dist2=getDistance(chest_b[0],chest_b[1])
	# dist2=pixel_to_distance(dist2,metre_pixel_x,metre_pixel_y)
	# dist1 = dist1/2
	# dist2 = dist2/2
	# perimeter = 2 * 3.1415 * math.sqrt((dist1*dist1 + dist2*dist2)/2)
	all_measurements['chest'] = get_perimeter(chest_a, chest_b, metre_pixel_x, metre_pixel_y)

	# hip_a = [points['hip']['spread']['left'], points['hip']['spread']['right']]
	# hip_b = [points['hip']['side']['left'], points['hip']['side']['right']]
	hip_a = get_points_from_measurements(points, 'hip', 'spread')
	hip_b = get_points_from_measurements(points, 'hip', 'side')
	# dist1=getDistance(hip_a[0],hip_a[1])
	# dist1=pixel_to_distance(dist1,metre_pixel_x,metre_pixel_y)
	# dist2=getDistance(hip_b[0],hip_b[1])
	# dist2=pixel_to_distance(dist2,metre_pixel_x,metre_pixel_y)
	# dist1 = dist1/2
	# dist2 = dist2/2
	# perimeter = 2 * 3.1415 * math.sqrt((dist1*dist1 + dist2*dist2)/2)
	all_measurements['hip'] = get_perimeter(hip_a, hip_b, metre_pixel_x, metre_pixel_y)

	cv2.imwrite('detected2.jpg', segmented_image)	
	
	left_fall = points['neck']['check']['left']
	left_shoulder = points['shoulder']['check']['left']
	right_fall = points['neck']['check']['right']
	right_shoulder = points['shoulder']['check']['right']
	
	# dist1=getDistance(left_shoulder,left_fall)
	# dist1=pixel_to_distance(dist1,metre_pixel_x,metre_pixel_y)
	# dist2=getDistance(right_shoulder,right_fall)
	# dist2=pixel_to_distance(dist2,metre_pixel_x,metre_pixel_y)
	# dist3=getDistance(left_fall,right_fall)
	# dist3=pixel_to_distance(dist3,metre_pixel_x,metre_pixel_y)
	points_arr = [left_shoulder, left_fall, right_shoulder, right_fall]
	dist_ans= get_distance_between_fall(points_arr, metre_pixel_x, metre_pixel_y)

	left_fall = points['neck']['spread']['left']
	left_shoulder = points['shoulder']['spread']['left']
	right_fall = points['neck']['spread']['right']
	right_shoulder = points['shoulder']['spread']['right']
	left_wrist = points['wrist']['spread']['left']
	right_wrist = points['wrist']['spread']['right']

	# dist1=getDistance(left_shoulder,left_fall)
	# dist1=pixel_to_distance(dist1,metre_pixel_x,metre_pixel_y)
	# dist2=getDistance(right_shoulder,right_fall)
	# dist2=pixel_to_distance(dist2,metre_pixel_x,metre_pixel_y)
	# dist3=getDistance(left_fall,right_fall)
	# dist3=pixel_to_distance(dist3,metre_pixel_x,metre_pixel_y)
	points_arr = [left_shoulder, left_fall, right_shoulder, right_fall]
	dist= get_distance_between_fall(points_arr, metre_pixel_x, metre_pixel_y)

	# dist4=getDistance(left_wrist,left_shoulder)
	# dist4=pixel_to_distance(dist4,metre_pixel_x,metre_pixel_y)
	# dist5=getDistance(right_wrist,right_shoulder)
	# dist5=pixel_to_distance(dist5,metre_pixel_x,metre_pixel_y)
	dist4 = get_pixel_distance(left_wrist, left_shoulder, metre_pixel_x, metre_pixel_y)
	dist5 = get_pixel_distance(right_wrist, right_shoulder, metre_pixel_x, metre_pixel_y)

	# dist_sleeve = (dist5+dist4)/2.0
	
	# dist_tuple=dist1,dist2,dist3
	shoulder_length = (dist+dist_ans)/2
	sleeve_length = (dist4+dist5)/2
	all_measurements['shoulder'] = shoulder_length
	all_measurements['sleeve'] = sleeve_length

	left_waist = points['waist']['leg']['left']
	right_waist = points['waist']['leg']['right']

	left_bottom = points['leg']['leg']['left']
	right_bottom = points['leg']['leg']['right']
	
	# dist1=getDistance(left_waist, left_bottom)
	# dist1=pixel_to_distance(dist1,metre_pixel_x,metre_pixel_y)
	# dist2=getDistance(right_waist, right_bottom)
	# dist2=pixel_to_distance(dist2,metre_pixel_x,metre_pixel_y)
	dist1 = get_pixel_distance(left_waist, left_bottom, metre_pixel_x, metre_pixel_y)
	dist2 = get_pixel_distance(right_waist, right_bottom, metre_pixel_x, metre_pixel_y)

	maxDist = max(dist1,dist2) #average distance btw the two sides
	distanceBtwWaistAndAnkle = maxDist * 2 #radius * 2= distance
	all_measurements['leg'] = distanceBtwWaistAndAnkle
	if os.path.exists("check.jpg"):
		os.remove("check.jpg")
	return all_measurements