import sentry_sdk
from flask import Flask, request
from sentry_sdk.integrations.flask import FlaskIntegration
from firebase import firebase
from body_measurement.code2 import measure_distance, measure_distance_new
from size_recommender import get_size
import firebase_admin
from firebase_admin import db
import json

cred_obj = firebase_admin.credentials.Certificate('ezrafit-e157e-firebase-adminsdk-cen4y-5f13f60f88.json')
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL':'https://ezrafit-e157e-default-rtdb.firebaseio.com/'
	})



# fb = firebase.FirebaseApplication('https://ezrafit-e157e-default-rtdb.firebaseio.com/', None)

sentry_sdk.init(
    dsn="https://7f880ed937ed44a5be93ec46fb1d3404@o358880.ingest.sentry.io/4504776538324992",
    integrations=[
        FlaskIntegration(),
    ],

    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    traces_sample_rate=0.1,
    environment="production",
)
app = Flask(__name__)

@app.route("/")
def hello():
  # result = fb.get('/users', None)
  print ('hello world')
  return "Hello World!"

@app.route('/debug-sentry')
def trigger_error():
  return 1/0


@app.route('/get-measurements', methods=['POST'])
def get_measurements(userID=None, img1=None, img2=None, img3=None, img4=None, affline_flag='False', company_name="zara"):
  userID = 1234
  img_1 = "body_measurement/AV1.1.jpg"
  img_2 = "body_measurement/AV2.jpg"
  img_3 = "body_measurement/AV3.jpg"
  img_4 = "body_measurement/final_av1.jpg"
  measurements = measure_distance(img_1, img_2, img_3, img_4)

  # measurements = {
  #           'waist': 73.01,
  #           'chest': 91.43,
  #           'shoulder': 32.36,
  #           'arm': 48.71,
  #           'hip': 92.1,
  #           'leg': 78,
  # }
  
  #get company size charts using the name
  ref_comp_upper = db.reference(f"/companies/{company_name}/chart_upper") 
  ref_comp_lower = db.reference(f"/companies/{company_name}/chart_lower") 
  
  company_size_chart_upper = ref_comp_upper.get()
  company_size_chart_lower = ref_comp_lower.get()

  upper_chart = {}
  lower_chart = {}
  count = 0
  for item in company_size_chart_upper:
    if item is not None:
      upper_chart[count] = item
      count += 1
  
  count = 0
  for item in company_size_chart_lower:
    if item is not None:
      lower_chart[count] = item
      count += 1

  recommanded_upper_size = get_size(measurements, upper_chart)
  recommanded_lower_size = get_size(measurements, lower_chart)

 
  new_user_data = {"data": measurements}
  new_user_recommandations = {"recommandations": {company_name: {"upper": recommanded_upper_size, "lower": recommanded_lower_size}}}
 
  ref_user = db.reference(f"/users/{userID}") 
  result = ref_user.update(new_user_data)
  result = ref_user.update(new_user_recommandations)

  return('measurement_complete')

@app.route('/get-measurements1', methods=['POST'])
def get_measurements_1():
  if request.method == 'POST':
    userID = 1234
    company_name = 'zara'
    #checkboardImage = request.form['checkboardImg']
    # TODO: save image from local storage to local or find a way to upload - maybe upload to db and draw in from there? 
    checkboardImage = "body_measurement/d2.jpg"
    pts = {
      'waist': 
        {
        'spread': 
          {'left': [314, 315], 'right': [412, 299]}, 
        'side': 
          {'left': [315, 313], 'right': [411, 300]}, 
        'leg': 
          {'left': [277, 317], 'right': [404, 308]}}, 
      'chest': {
        'spread': 
          {'left': [271, 255], 'right': [390, 236]}, 
        'side': 
          {'left': [398, 222], 'right': [398, 222]}}, 
      'hip': {
        'spread': 
          {'left': [270, 383], 'right': [408, 373]}, 
        'side': 
          {'left': [308, 382], 'right': [414, 361]}}, 
      'neck': {
        'spread': 
          {'left': [309, 183], 'right': [347, 181]}, 
        'check': 
          {'left': [273, 176], 'right': [317, 167]}}, 
      'shoulder': {
        'spread': 
          {'left': [272, 196], 'right': [391, 192]}, 
        'check': {'left': [236, 194], 'right': [369, 183]}},
      'wrist': {
        'spread': {'left': [82, 245], 'right': [574, 204]}}, 
      'leg': {
        'leg': {'left': [273, 441], 'right': [412, 442]}}
      }
    #points = json.loads(request.form['points'])
    measurements = measure_distance_new(checkboardImage, pts)
  
  #get company size charts using the name
    ref_comp_upper = db.reference(f"/companies/{company_name}/chart_upper") 
    ref_comp_lower = db.reference(f"/companies/{company_name}/chart_lower") 
    
    company_size_chart_upper = ref_comp_upper.get()
    company_size_chart_lower = ref_comp_lower.get()

    upper_chart = {}
    lower_chart = {}
    count = 0
    for item in company_size_chart_upper:
      if item is not None:
        upper_chart[count] = item
        count += 1
    
    count = 0
    for item in company_size_chart_lower:
      if item is not None:
        lower_chart[count] = item
        count += 1

    recommanded_upper_size = get_size(measurements, upper_chart)
    recommanded_lower_size = get_size(measurements, lower_chart)

  
    new_user_data = {"data": measurements}
    new_user_recommandations = {"recommandations": {company_name: {"upper": recommanded_upper_size, "lower": recommanded_lower_size}}}
  
    ref_user = db.reference(f"/users/{userID}") 
    result = ref_user.update(new_user_data)
    result = ref_user.update(new_user_recommandations)

    return({
      "upper": recommanded_upper_size, 
      "lower": recommanded_lower_size
    })
  
if __name__ == "__main__":
  app.run(threaded=False, debug=True, use_reloader=False)