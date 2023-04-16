import cv2
import numpy as np
import math
import sys, os
sys.path.append(os.path.abspath(os.path.join('..', '')))
import backend.body_measurement.segment as segment
import base64

# initialize the list of reference points and boolean indicating
# whether cropping is being performed or not
refPt = []
r1=5 #for affine correction
r2=2 #for measurement
ref_ht=2.84 #measurement of checkboard
rectangle_row=9
rectangle_col=6
criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)
metre_pixel_x=0
metre_pixel_y=0
window_name1="image"
draw_radius=10

def click_and_crop(event, x, y, flags, param):
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

	cv2.cornerSubPix(gray,corners,(11,11),(-1,-1),criteria)
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
	return dst

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

	cv2.cornerSubPix(gray2,corners,(11,11),(-1,-1),criteria)
	cv2.drawChessboardCorners(dst, (9,6), corners, ret)

	metre_pixel_x=(r2*ref_ht)/(abs(temp[0][0]-temp[1][0]))
	metre_pixel_y=(r2*ref_ht)/(abs(temp[0][1]-temp[2][1]))

	coordinate=[temp[0],temp[1]]
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
	dist1 = get_pixel_distance(points1[0], points1[1], metre_pixel_x, metre_pixel_y)
	dist2 = get_pixel_distance(points2[0], points2[1], metre_pixel_x, metre_pixel_y)
	dist1 = dist1/2
	dist2 = dist2/2
	perimeter = 2 * 3.1415 * math.sqrt((dist1*dist1 + dist2*dist2)/2)
	return perimeter

def get_distance_between_fall(points_arr, metre_pixel_x, metre_pixel_y):
	dist1 = get_pixel_distance(points_arr[0], points_arr[1], metre_pixel_x, metre_pixel_y)
	dist2 = get_pixel_distance(points_arr[2], points_arr[3], metre_pixel_x, metre_pixel_y)
	dist3 = get_pixel_distance(points_arr[1], points_arr[3], metre_pixel_x, metre_pixel_y)
	return dist1+dist2+dist3

def get_points_from_measurements(points_arr, body_part, position):
	return [points_arr[body_part][position]['left'], points_arr[body_part][position]['right']]

def measure_distance_new(checkboardImage, points, affineFlag='False'):
	cb = save_img(checkboardImage)
	image = cv2.imread('check.jpg')
	affine_correct_flag= (affineFlag)
	metre_pixel_x,metre_pixel_y,coordinate,affine_correct_parameters=analyze_chessboard(image,affine_correct_flag)
	segmented_image=segment.segmenter(image)
	cv2.imwrite("first.jpg",segmented_image)
	block_cut = np.zeros(segmented_image.shape)
	block_cut[coordinate[0][1]:coordinate[1][1],coordinate[0][0]:coordinate[1][0]] = 1

	all_measurements = {}
	
	waist_a = get_points_from_measurements(points, 'waist', 'spread')
	waist_b = get_points_from_measurements(points, 'waist', 'side')
	all_measurements['waist'] = get_perimeter(waist_a, waist_b, metre_pixel_x, metre_pixel_y)
	chest_a = get_points_from_measurements(points, 'chest', 'spread')
	chest_b = get_points_from_measurements(points, 'chest', 'side')
	all_measurements['chest'] = get_perimeter(chest_a, chest_b, metre_pixel_x, metre_pixel_y)
	hip_a = get_points_from_measurements(points, 'hip', 'spread')
	hip_b = get_points_from_measurements(points, 'hip', 'side')
	all_measurements['hip'] = get_perimeter(hip_a, hip_b, metre_pixel_x, metre_pixel_y)

	cv2.imwrite('detected2.jpg', segmented_image)
	left_fall = points['neck']['check']['left']
	left_shoulder = points['shoulder']['check']['left']
	right_fall = points['neck']['check']['right']
	right_shoulder = points['shoulder']['check']['right']
	
	dist_ans= get_distance_between_fall([left_shoulder, left_fall, right_shoulder, right_fall], metre_pixel_x, metre_pixel_y)

	left_fall = points['neck']['spread']['left']
	left_shoulder = points['shoulder']['spread']['left']
	right_fall = points['neck']['spread']['right']
	right_shoulder = points['shoulder']['spread']['right']
	left_wrist = points['wrist']['spread']['left']
	right_wrist = points['wrist']['spread']['right']

	dist= get_distance_between_fall([left_shoulder, left_fall, right_shoulder, right_fall], metre_pixel_x, metre_pixel_y)
	dist4 = get_pixel_distance(left_wrist, left_shoulder, metre_pixel_x, metre_pixel_y)
	dist5 = get_pixel_distance(right_wrist, right_shoulder, metre_pixel_x, metre_pixel_y)

	all_measurements['shoulder'] = (dist+dist_ans)/2
	all_measurements['sleeve'] = (dist4+dist5)/2

	left_waist, right_waist = points['waist']['leg']['left'], points['waist']['leg']['right']
	left_bottom, right_bottom = points['leg']['leg']['left'], points['leg']['leg']['right']
	
	dist1 = get_pixel_distance(left_waist, left_bottom, metre_pixel_x, metre_pixel_y)
	dist2 = get_pixel_distance(right_waist, right_bottom, metre_pixel_x, metre_pixel_y)

	all_measurements['leg'] = max(dist1,dist2) * 2
	if os.path.exists("check.jpg"):
		os.remove("check.jpg")
	return all_measurements