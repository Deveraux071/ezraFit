import sys, os
sys.path.append(os.path.abspath(os.path.join('..', '')))
from backend.size_recommender import get_size
import unittest

chart_upper = {
    '0': {
        'chest': 76,
        'waist': 60,
        'arm':59.4
    },
    '2': {
        'chest':80,
        'waist': 64,
        'arm':59.6
    },
    '4': {
        'chest':84,
        'waist': 68,
        'arm':59.8
    },
    '6':{
        'chest':88,
        'waist': 72,
        'arm':60
    },
    '8':{
        'chest':92,
        'waist': 76,
        'arm':60.2
    },
    '10':{
        'chest':96,
        'waist': 80,
        'arm':60.4
    },
    '12':{
        'chest':100,
        'waist': 85,
        'arm': 60.6
    },
    '14':{
        'chest':104,
        'waist': 90,
        'arm':60.8
    },
    '16':{
        'chest':110,
        'waist': 96,
        'arm':61
    },
    '18':{
        'chest':116,
        'waist': 102,
        'arm':61.2
    },
    '20':{
        'chest':122,
        'waist': 108,
        'arm': 61.4
    },
    '22':{
        'chest':128,
        'waist': 114,
        'arm':61.6
    },
    '24':{
        'chest':134,
        'waist': 121,
        'arm':61.8
    },
    '26':{
        'chest':140,
        'waist': 128,
        'arm': 62
    },
    '28':{
        'chest':146,
        'waist': 135,
        'arm': 62.2
    },
    '30':{
        'chest':152,
        'waist': 142,
        'arm': 62.4
    },

}

chart_lower = {
    '0': {
        'hip': 84,
        'waist': 60,
        'leg': 78
    },
    '2': {
        'hip':88,
        'waist': 64,
        'leg': 78
    },
    '4': {
        'hip':92,
        'waist': 68,
        'leg': 78
    },
    '6':{
        'hip':96,
        'waist': 72,
        'leg': 78
    },
    '8':{
        'hip':99,
        'waist': 76,
        'leg': 78
    },
    '10':{
        'hip':102,
        'waist': 80,
        'leg': 78
    },
    '12':{
        'hip':105,
        'waist': 85,
        'leg': 78
    },
    '14':{
        'hip':108,
        'waist': 90,
        'leg': 78
    },
    '16':{
        'hip':113,
        'waist': 96,
        'leg': 78
    },
    '18':{
        'hip':118,
        'waist': 102,
        'leg': 78
    },
    '20':{
        'hip':123,
        'waist': 108,
        'leg': 78
    },
    '22':{
        'hip':128,
        'waist': 114,
        'leg': 78
    },
    '24':{
        'hip':134,
        'waist': 121,
        'leg': 78
    },
    '26':{
        'hip':140,
        'waist': 128,
        'leg': 78
    },
    '28':{
        'hip':146,
        'waist': 135,
        'leg': 78
    },
    '30':{
        'hip':152,
        'waist': 142,
        'leg': 78
    },
}

class TestUtils(unittest.TestCase):
    def test_upper_size_1(self):
        ms1 = {
            'waist': 79.23,
            'chest': 92.09,
            'shoulder': 33.36,
            'arm': 48.71,
            'hip': 93.1,
            'leg': 78,
        }
        assert get_size(ms1, chart_upper) == '8'

    def test_upper_size_2(self):
        ms2 = {
            'waist': 73.01,
            'chest': 91.43,
            'shoulder': 32.36,
            'arm': 48.71,
            'hip': 92.1,
            'leg': 78,
        }
        assert get_size(ms2, chart_upper) == '6'

    def test_lower_size_1(self):
        ms1 = {
            'waist': 79.23,
            'chest': 92.09,
            'shoulder': 33.36,
            'arm': 48.71,
            'hip': 93.1,
            'leg': 78,
        }
        assert get_size(ms1, chart_lower) == '8'

    def test_lower_size_2(self):
        ms2 = {
            'waist': 73.01,
            'chest': 91.43,
            'shoulder': 32.36,
            'arm': 48.71,
            'hip': 92.1,
            'leg': 78,
        }
        assert get_size(ms2, chart_upper) == '6'

if __name__ == '__main__':
    unittest.main()
