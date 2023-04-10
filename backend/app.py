import sentry_sdk
from flask import Flask, request
from sentry_sdk.integrations.flask import FlaskIntegration
from firebase import firebase
from body_measurement.code2 import measure_distance, measure_distance_new
from size_recommender import get_size
import firebase_admin
from firebase_admin import db
import json
from flask_cors import CORS
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
CORS(app)

@app.route("/")
def hello():
  # result = fb.get('/users', None)
  print ('hello world')
  return "Hello World!"

@app.route('/debug-sentry')
def trigger_error():
  return 1/0

@app.route('/get-measurements', methods=['POST'])
def get_measurements():
  if request.method == 'POST':
    data = request.get_json()
    print(data)
    company_name = data['company']
    userID = data['user']
    checkboardImage = data['checkboardImg']
    points = data['points']
    measurements = measure_distance_new(checkboardImage, points)
  
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

    # save only if user is logged in 
    if (userID != ''):
      ref_user = db.reference(f"/users/{userID}") 
      result = ref_user.update(new_user_data)
      result = ref_user.update(new_user_recommandations)

    return({
      "upper": recommanded_upper_size, 
      "lower": recommanded_lower_size
    })
  
if __name__ == "__main__":
  app.run(threaded=False, debug=True, use_reloader=False)