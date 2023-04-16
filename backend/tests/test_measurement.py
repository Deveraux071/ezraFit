import sys, os
sys.path.append(os.path.abspath(os.path.join('..', '')))
#os.chdir#('..') #allows us to go back up one folder to body_measurement_folder
import unittest
from backend.body_measurement.code2 import analyze_chessboard, getDistance, pixel_to_distance, affine_correct, chess_board_corners, get_pixel_distance, get_perimeter, get_distance_between_fall, get_points_from_measurements
import cv2
import numpy as np

affine_correct_parameters_act_true = np.array([[9.40904323e-01, -2.06049356e-02, 8.65506247e+01], [6.93225464e-03, 9.72540133e-01, -8.98750876e+00], [-1.60726699e-05, 2.47661411e-06, 1.00000000e+00]])
image1 = cv2.imread('./backend/tests/test_images/final_saket1.jpg')
image2 = cv2.imread('./backend/tests/test_images/final_saket2.jpg')

class TestUtils(unittest.TestCase):
    
    def test_get_points_from_measurements(self):
        points_arr, body_part, position = {'waist': {'spread': {'left': [276.5, 351], 'right': [420.5, 361]}, 'side': {'left': [256.5, 371], 'right': [355.5, 355]}, 'leg': {'left': [315.5, 200], 'right': [408.5, 201]}}, 'chest': {'spread': {'left': [295.5, 189], 'right': [411.5, 195]}, 'side': {'left': [254.5, 265], 'right': [378.5, 266]}}, 'hip': {'spread': {'left': [262.5, 411], 'right': [428.5, 415]}, 'side': {'left': [259.5, 416], 'right': [379.5, 417]}}, 'neck': {'spread': {'left': [330.5, 181], 'right': [382.5, 176]}, 'check': {'left': [311.5, 172], 'right': [367.5, 172]}}, 'shoulder': {'spread': {'left': [282.5, 178], 'right': [417.5, 184]}, 'check': {'left': [255.5, 205], 'right': [415.5, 203]}}, 'wrist': {'spread': {'left': [95.5, 179], 'right': [641.5, 197]}}, 'leg': {'leg': {'left': [308.5, 428], 'right': [422.5, 425]}}}, 'hip', 'spread'
        points_out = get_points_from_measurements(points_arr, body_part, position)
        points_act = [[262.5, 411], [428.5, 415]]
        self.assertEqual(points_act, points_out)

    def test_get_pixel_distance(self):
        loc1, loc2, metre_pixel_x, metre_pixel_y = [255.5, 205], [311.5, 172], 0.10531999691445322, 0.3252523974187657
        dist_out = get_pixel_distance(loc1, loc2, metre_pixel_x, metre_pixel_y)
        dist_act = 12.247032790648374
        self.assertEqual(dist_act, dist_out)

    def test_get_distance_between_fall(self):
        points_arr, metre_pixel_x, metre_pixel_y = [[255.5, 205], [311.5, 172], [415.5, 203], [367.5, 172]], 0.10531999691445322, 0.3252523974187657
        dist_out = get_distance_between_fall(points_arr, metre_pixel_x, metre_pixel_y)
        dist_act = 29.42413740665142
        self.assertEqual(dist_act, dist_out)

    def test_get_perimeter(self):
        points1, points2, metre_pixel_x, metre_pixel_y = [[259.5, 416], [379.5, 417]],[[259.5, 416], [379.5, 417]],0.10531999691445322, 0.3252523974187657
        perimeter_acc = 39.716678148606015
        perimeter_out = get_perimeter(points1, points2, metre_pixel_x, metre_pixel_y)
        self.assertEqual(perimeter_acc, perimeter_out)

    def test_getDistance(self):
        getDistance_out = getDistance([620, 1045], [1582, 782])
        getDistance_act = (-962, 263)

        self.assertEqual(getDistance_act, getDistance_out)

    def test_pixel_to_distance(self):
        get_pixels_out = pixel_to_distance((-962, 263), 0.04431528330296793, 0.04419255298436231)
        get_pixels_act = 44.18725777827799

        self.assertEqual(get_pixels_out, get_pixels_act)
    
    def test_analyze_chessboard_affline_false(self):
        # takes in image 1 , affline flag
        metre_pixel_x,metre_pixel_y,coordinate,affine_correct_parameters = analyze_chessboard(image1, 'False')
        metre_pixel_x_act = 0.04431528330296793 
        metre_pixel_y_act = 0.04419255298436231
        coordinate_act = [(1370, 0), (2556, 2268)]
        affine_correct_parameters_act = None

        self.assertEqual(metre_pixel_x, metre_pixel_x_act)
        self.assertEqual(metre_pixel_y, metre_pixel_y_act)
        self.assertEqual(coordinate, coordinate_act)
        self.assertEqual(affine_correct_parameters, affine_correct_parameters_act)

    # test affline_correct and also affine_correct_params
    def test_affine_correct_M_None(self):
        # takes in image 1 , affline flag
        dst_out = affine_correct(image1)
        dst_act_shape = (2268, 4032, 3)
        self.assertEqual(dst_out.shape, dst_act_shape)
        self.assertTrue(isinstance(dst_out, (np.ndarray, np.generic) ))

    # test affline_correct and also affine_correct_params
    def test_affine_correct_M_not_None(self):
        dst_out = affine_correct(image2, affine_correct_parameters_act_true)
        dst_act_shape = (2268, 4032, 3)
        self.assertEqual(dst_out.shape, dst_act_shape)
        self.assertTrue(isinstance(dst_out, (np.ndarray, np.generic) ))

    def test_chess_board(self):
        gray=np.copy(image1)
        gray=cv2.cvtColor(gray,cv2.COLOR_BGR2GRAY)
        coordinates_out = chess_board_corners(image1, gray, 5)
        coordinates_act_zero = [(np.float32(1755.4573), np.float32(1296.0898)), (np.float32(2075.1582), np.float32(1286.9329)), (np.float32(1763.7365), np.float32(1617.6407)), (np.float32(2083.6099), np.float32(1606.7743))]
        self.assertSequenceEqual(coordinates_out, coordinates_act_zero)

if __name__ == '__main__':
    unittest.main()