import numpy as np

'''
Upper Body Recommender: 
Required inputs: sizing chart, measurements
    - measurements: dictionary of body part as key and measurement as value
    - sizing chart: for each garment, for each size, get measurements for each body part
        {   
            t-shirt-loose-fit: {
                small: {
                    shoulder: ...
                    chest: ...
                    waist: ...
                    arm: ...
                }, ...
            }, 
            t-shirt-tight-fit: ...
        }
Process:
    - take measurement for each body part and calculate difference w.r.t size
    - compared to a [0, 0, 0, ..] array, calculate euclidean distance
    - the one with the smallest euclidean distance is the right size
    - this must be done for each garment type for each size 
Output:
    - size that is the closest match for each garment type

'''

def get_common_parts(ms, items):
    '''
    Helper function to get the body parts for which we have both measurements and sizing chart information
    Returns a list of common body parts
    '''
    ms_parts = list(ms.keys())
    item_keys = list(items.keys()) # tops, bottoms, etc.
    size_keys = list(items[item_keys[0]].keys()) # small, medium, etc.
    first_entry = items[item_keys[0]][size_keys[0]]
    sz_parts = list(first_entry.keys())
    common = [value for value in ms_parts if value in sz_parts]
    return common

def euclidean_dist(ms, size, ref, common):
    '''
    Helper function to calculate the euclidean distance between two arrays
    '''
    diff = []
    for part in common:
        curr_dif = ms[part] - size[part]
        diff.append(curr_dif)
    diff_np = np.array(diff)
    ref_np = np.array(ref)
    print(diff_np)
    print(ref_np)
    dist = np.linalg.norm(diff_np - ref_np)
    return dist

def upper_body_size(measurements, sizes):
    item_to_size = {}
    ref = [0, 0, 0]
    common_parts = get_common_parts(measurements, sizes)

    for items in sizes:
        ms_to_size = {}
        item = sizes[items]
        for size in item:
            curr_size = item[size]
            euc = euclidean_dist(measurements, curr_size, ref, common_parts)
            ms_to_size[size] = euc
        item_to_size[items] = min(ms_to_size.items(), key=lambda x: x[1])[0]

    return item_to_size

ms = {
    'waist': 79,
    'chest': 77,
    'shoulder': 32,
    'arm': 61,
}

chart = {
    'tops': {
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
}

if __name__=='__main__':
    print(upper_body_size(ms, chart))