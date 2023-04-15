import sys, os
sys.path.append(os.path.abspath(os.path.join('..', '')))

import unittest
from backend.style_recommender.search_keywords import generate


class TestUtils(unittest.TestCase):
    def test_generate(self):
        keywords = generate({
            'Article Type': "skirt", 
            'Usage': "casual", 
            'Season': "fall", 
            "Colour": "blue"
        })

        assert type(keywords) == list
        assert len(keywords) >= 8  # openAI should generate at least 10, but we're giving it some leeway


if __name__ == '__main__':
    unittest.main()
