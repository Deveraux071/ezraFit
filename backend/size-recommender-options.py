import numpy as np
from numpy.linalg import norm

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
    - Procedure 1: 
        - take measurement for each body part and calculate difference w.r.t size
        - find size with the smallest difference for each body part
        - take majority response
            NOTE: we may only want to consider something with a positive difference, since 
            negative difference means that the clothing item may be tight
    - Procedure 2:
        - for every size, create measurement-size pair
        - calculate cosine similarity
        - report the one with the smallest difference
    - Procedure 3:
        - take measurement for each body part and calculate difference w.r.t size
        - compared to a [0, 0, 0, ..] array, calculate euclidean distance
        - the one with the smallest euclidean distance is the right size
    - this must be done for each garment type for each size 
Output:
    - size that is the closest match for each garment type

'''
# TODO: 
#   need to figure out a way to leave out body parts that aren't common to both measurements and sizes dict.
#   need to figure out if average is better than max count - might be if there's 1 of each size as best fit
#   if taking average, might be better to assign number to each size - cannot average strings 
#   is euclidean distance better than majority vote? yes - Procedure 3 should be used

# uses Procedure 3
# def upper_body_size_3(measurements, sizes):
#     item_to_size = {}
#     ref = [0, 0, 0]
#     for items in sizes:
#         ms_to_size = {}
#         item = sizes[items]
#         for size in item:
#             curr_size = item[size]
#             euc = euclidean_dist(measurements, curr_size, ref)
#             ms_to_size[size] = euc
#         item_to_size[items] = min(ms_to_size.items(), key=lambda x: x[1])[0]

#     return item_to_size

def euclidean_dist(ms, size, ref):
    diff = [ms['waist'] - size['waist'], ms['chest'] - size['chest'], ms['arm'] - size['arm']]
    diff_np = np.array(diff)
    ref_np = np.array(ref)
    print(diff_np)
    print(ref_np)
    dist = np.linalg.norm(diff_np - ref_np)
    return dist

# uses Procedure 1
def convert_key_to_num(sizes, hash):
    '''
    Helper function to convert the sizes dictionary to have keys that are numbers instead of string
    Returns a new dictionary with sizes as integers and corresponding measurements 

    sizes: dictionary containing the measurement chart info for each size
    hash: dictionary to store mapping from number keys to size keys for the resultant dictionary
    '''
    new = {}
    count = 0
    for size in sizes:
        new[count] = sizes[size]
        hash[count] = size
        count += 1
    return new

def upper_body_size_1(measurements, sizes):
    item_to_size = {}
    ms = [measurements['waist'], measurements['chest'], measurements['arm']]
    
    for items in sizes:
        diffs = {}
        size_occurrence = {}
        item = sizes[items]
        for size in item:
            curr_size = item[size]
            sz = [curr_size['waist'], curr_size['chest'], curr_size['arm']]
            sub = [x1 - x2 for (x1, x2) in zip(sz, ms)]
            if ('waist' in diffs):
                diffs['waist'][size] = sub[0]
            else:
                diffs['waist'] = {size: sub[0]}
            if ('chest' in diffs):
                diffs['chest'][size] = sub[0]
            else:
                diffs['chest'] = {size: sub[0]}
            if ('arm' in diffs):
                diffs['arm'][size] = sub[0]
            else:
                diffs['arm'] = {size: sub[0]}
        # loop through body part and find size with min diff
        for body_part in diffs:
            differences = diffs[body_part]
            match = min(differences.items(), key=lambda x: x[1])[0]
            if (match in size_occurrence):
                size_occurrence[match] += 1
            else:
                size_occurrence[match] = 1
        sum_sizes = sum(size_occurrence.values())
        
        #majority = max(size_occurrence.items(), key=lambda x: x[1])[0]
        #print('majority is', majority)
        item_to_size[items] = sum_sizes/3

    return item_to_size

# Cosine similarity is not a viable option.
def upper_body_size_2(measurements, sizes):
    item_to_size = {}
    ref = [0, 0, 0]
    for items in sizes:
        ms_to_size = {}
        item = sizes[items]
        for size in item:
            curr_size = item[size]
            cosine = cosine_simil(measurements, curr_size, ref)
            ms_to_size[size] = cosine
        item_to_size[items] = max(ms_to_size.items(), key=lambda x: x[1])[0]

    return item_to_size

def cosine_simil(ms, size, ref):
    diff = [ms['waist'] - size['waist'], ms['chest'] - size['chest'], ms['arm'] - size['arm']]
    diff_np = np.array(diff)
    ref_np = np.array(ref)
    cosine = np.dot(diff_np,ref_np)/(norm(diff_np)*norm(ref_np))
    return cosine

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
    print(upper_body_size_2(ms, chart))