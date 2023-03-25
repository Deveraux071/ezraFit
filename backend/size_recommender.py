import numpy as np

'''
Size Recommender: 
Required inputs: sizing chart, measurements
    - measurements: dictionary of body part as key and measurement as value
    - sizing chart for a garment
        {
            small: {
                shoulder: ...
                chest: ...
                waist: ...
                arm: ...
            }, ...
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
    size_keys = list(items.keys()) # small, medium, etc.
    first_entry = items[size_keys[0]]
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
    dist = np.linalg.norm(diff_np - ref_np)
    return dist

def get_size(measurements, item):
    ms_to_size = {}
    common_parts = get_common_parts(measurements, item)
    ref = [0] * len(common_parts)
    for size in item:
        curr_size = item[size]
        euc = euclidean_dist(measurements, curr_size, ref, common_parts)
        ms_to_size[size] = euc
    return min(ms_to_size.items(), key=lambda x: x[1])[0]
