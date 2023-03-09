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
        - calculate similarity value (cosine?)
        - report the one with the smallest difference
    - this must be done for each garment type for each size 
Output:
    - size that is the closest match 

'''