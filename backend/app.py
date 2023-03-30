import sentry_sdk
from flask import Flask
from sentry_sdk.integrations.flask import FlaskIntegration
from firebase import firebase
from body_measurement.code2 import measure_distance
from size_recommender import get_size

fb = firebase.FirebaseApplication('https://ezrafit-e157e-default-rtdb.firebaseio.com/', None)

sentry_sdk.init(
    dsn="https://7f880ed937ed44a5be93ec46fb1d3404@o358880.ingest.sentry.io/4504776538324992",
    integrations=[
        FlaskIntegration(),
    ],

    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    traces_sample_rate=0.1
)
app = Flask(__name__)

@app.route("/")
def hello():
  result = firebase.get('/users', None)
  print (result)
  return "Hello World!"

@app.route('/debug-sentry')
def trigger_error():
  return 1/0


@app.route('/get-measurements')
def get_measurements(userID, img1, img2, img3, img4, affline_flag='True', company_name="zara"):
  userID = 1234
  img1 = '/body_measurement/test_images/final_saket1.jpg'
  img2 = '/body_measurement/test_images/final_saket2.jpg'
  img3 = '/body_measurement/test_images/final_saket3.jpg'
  img4 = '/body_measurement/test_images/final_saket1.jpg'

  measurements = measure_distance(img1, img2, img3, img4, affine_flag)
  
  #get company size charts using the name
  company_size_chart_upper = fb.child("companies").child(company_name).child('chart_upper').get()
  company_size_chart_lower = fb.child("companies").child(company_name).child('chart_lower').get()

  recommanded_upper_size = get_size(measurements, company_size_chart_upper)
  recommanded_lower_size = get_size(measurements, company_size_chart_lower)

  #maybe we need a diff call if the company recommandation already exists
  new_user_data = {"data": measurements, "recommandations": {company_name: {"upper": recommanded_upper_size, "lower": recommanded_lower_size}}}
  result = fb.child("users").child(userID).push(new_user_data)
  print(result)

if __name__ == "__main__":
  app.run()