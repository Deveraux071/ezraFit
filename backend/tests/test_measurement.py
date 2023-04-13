import sys, os
sys.path.append(os.path.abspath(os.path.join('..', '')))
#os.chdir#('..') #allows us to go back up one folder to body_measurement_folder
import unittest
from backend.body_measurement.code2 import analyze_chessboard, getDistance, pixel_to_distance, affine_correct, chess_board_corners
import cv2
import numpy as np

affine_correct_parameters_act_true = np.array([[9.40904323e-01, -2.06049356e-02, 8.65506247e+01], [6.93225464e-03, 9.72540133e-01, -8.98750876e+00], [-1.60726699e-05, 2.47661411e-06, 1.00000000e+00]])
image1 = cv2.imread('./body_measurement/test_images/final_saket1.jpg')
image2 = cv2.imread('./body_measurement/test_images/final_saket2.jpg')

class TestUtils(unittest.TestCase):
    
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
