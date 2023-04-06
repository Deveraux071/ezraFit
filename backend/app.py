import sentry_sdk
from flask import Flask
from sentry_sdk.integrations.flask import FlaskIntegration
# import firebase
from firebase import firebase
from style_recommender import train_classifier
from body_measurement.code2 import measure_distance
from size_recommender import get_size
import firebase_admin
from firebase_admin import db


cred_obj = firebase_admin.credentials.Certificate('backend/ezrafit-e157e-firebase-adminsdk-cen4y-5f13f60f88.json')
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

@app.post('/train_usage')
def train_usage():
  global usage_model
  global usage_classes
  usage_res = train_classifier.train_usage_model()
  usage_model = usage_res[0]
  usage_classes = usage_res[1]

  return "ok"

@app.post('/train_all_models')
def train_models():
  global usage_model
  global usage_classes
  global article_model
  global article_classes
  global season_model
  global season_classes
  global bc_model
  global bc_classes
  
  usage_res = train_classifier.train_usage_model()
  usage_model = usage_res[0]
  usage_classes = usage_res[1]

  article_res = train_classifier.train_article_model()
  article_model = article_res[0]
  article_classes = article_res[1]

  season_res = train_classifier.train_season_model()
  season_model = season_res[0]
  season_classes = season_res[1]

  bc_res = train_classifier.train_bc_model()
  bc_model = bc_res[0]
  bc_classes = bc_res[1]

  return "ok"

@app.get('/predict_usage')
def predict_usage():
  return train_classifier.predict(usage_model, usage_classes, "backend/demo_data/1855.jpg")

@app.get('/predict_all')
def predict_all():
  usage = train_classifier.predict(usage_model, usage_classes, "backend/demo_data/1855.jpg")
  article = train_classifier.predict(article_model, article_classes, "backend/demo_data/1855.jpg")
  season = train_classifier.predict(season_model, season_classes, "backend/demo_data/1855.jpg")
  bc = train_classifier.predict(bc_model, bc_classes, "backend/demo_data/1855.jpg")

  to_return = [article, usage, season, bc]
  return to_return

@app.route('/get-measurements')
def get_measurements(userID=None, img1=None, img2=None, img3=None, img4=None, affline_flag='False', company_name="zara"):
  userID = 1234
  img_1 = "body_measurement/test_images/final_saket1.jpg"
  img_2 = "body_measurement/test_images/final_saket2.jpg"
  img_3 = "body_measurement/test_images/final_saket3.jpg"
  img_4 = "body_measurement/test_images/final_saket1.jpg"
  measurements = measure_distance(img_1, img_2, img_3, img_4, affline_flag)

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

if __name__ == "__main__":
  app.run(threaded=False, debug=True, use_reloader=False)