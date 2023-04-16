import sentry_sdk
from flask import Flask, request, redirect
from sentry_sdk.integrations.flask import FlaskIntegration
# import firebase
from firebase import firebase

from style_recommender import train_classifier
from body_measurement.code2 import measure_distance_new
from size_recommender import get_size
import firebase_admin
from firebase_admin import db
import os
import json
from werkzeug.utils import secure_filename
from flask_cors import CORS

import sys
sys.path.append('./style_recommender')
import search_keywords

cred_obj = firebase_admin.credentials.Certificate('ezrafit-e157e-firebase-adminsdk-cen4y-5f13f60f88.json')
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL':'https://ezrafit-e157e-default-rtdb.firebaseio.com/'
	})
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
UPLOAD_FOLDER = 'demo_data'
USAGE_CLASS_INDICES = {0: 'Casual', 1: 'Ethnic', 2: 'Formal', 3: 'Party', 4: 'Smart Casual', 5: 'Sports'}
ARTICLE_CLASS_INDICES = {0: 'Baby Dolls', 1: 'Bath Robe', 2: 'Blazers', 3: 'Boxers', 4: 'Bra', 5: 'Briefs', 6: 'Camisoles', 7: 'Capris', 8: 'Churidar', 9: 'Dresses', 10: 'Dupatta', 11: 'Innerwear Vests', 12: 'Jackets', 13: 'Jeans', 14: 'Jeggings', 15: 'Jumpsuit', 16: 'Kurta Sets', 17: 'Kurtas', 18: 'Kurtis', 19: 'Leggings', 20: 'Lounge Pants', 21: 'Lounge Shorts', 22: 'Lounge Tshirts', 23: 'Nehru Jackets', 24: 'Night suits', 25: 'Nightdress', 26: 'Patiala', 27: 'Rain Jacket', 28: 'Robe', 29: 'Rompers', 30: 'Salwar', 31: 'Salwar and Dupatta', 32: 'Sarees', 33: 'Shapewear', 34: 'Shirts', 35: 'Shorts', 36: 'Shrug', 37: 'Skirts', 38: 'Stockings', 39: 'Suspenders', 40: 'Sweaters', 41: 'Sweatshirts', 42: 'Swimwear', 43: 'Tights', 44: 'Tops', 45: 'Track Pants', 46: 'Tracksuits', 47: 'Trousers', 48: 'Trunk', 49: 'Tshirts', 50: 'Tunics', 51: 'Waistcoat'}
SEASON_CLASS_INDICES = {0: 'Fall', 1: 'Spring', 2: 'Summer', 3: 'Winter'}
COLOUR_CLASS_INDICES = {0: 'Beige', 1: 'Black', 2: 'Blue', 3: 'Brown', 4: 'Burgundy', 5: 'Charcoal', 6: 'Coffee Brown', 7: 'Cream', 8: 'Green', 9: 'Grey', 10: 'Grey Melange', 11: 'Khaki', 12: 'Lavender', 13: 'Lime Green', 14: 'Magenta', 15: 'Maroon', 16: 'Mauve', 17: 'Multi', 18: 'Mushroom Brown', 19: 'Mustard', 20: 'Navy Blue', 21: 'Nude', 22: 'Off White', 23: 'Olive', 24: 'Orange', 25: 'Peach', 26: 'Pink', 27: 'Purple', 28: 'Red', 29: 'Rose', 30: 'Rust', 31: 'Sea Green', 32: 'Skin', 33: 'Tan', 34: 'Teal', 35: 'Turquoise Blue', 36: 'White', 37: 'Yellow'}



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

def create_app():
  app = Flask(__name__)
  app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
  global usage_model
  # global usage_classes
  global article_model
  # global article_classes
  global season_model
  # global season_classes
  global bc_model
  # global bc_classes
  
  # usage_res = train_classifier.train_single_model("usage", 1, 4000, 4000)
  # usage_model = usage_res[0]
  # usage_classes = usage_res[1]

  # article_res = train_classifier.train_single_model("articleType", 3, 3000, 2500)
  # article_model = article_res[0]
  # article_classes = article_res[1]

  # season_res = train_classifier.train_single_model("season", 3, 4000, 4000)
  # season_model = season_res[0]
  # season_classes = season_res[1]

  # bc_res = train_classifier.train_single_model("baseColour", 3, 4000, 4000)
  # bc_model = bc_res[0]
  # bc_classes = bc_res[1]

  article_model, usage_model, season_model, bc_model = train_classifier.load_all_models()

  return app

app = create_app()
CORS(app, origins=['http://localhost:3000'])


@app.route("/")
def hello():
  # result = fb.get('/users', None)
  print ('hello world')
  return "Hello World!"

@app.post("/upload_sample")
def upload_sample():
  img = request.files['file']
  if img.filename == '':
    return redirect(request.url)
  else:
    img.filename = "uploaded_img.jpg"
    filename = secure_filename(img.filename)
    img.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return "ok"

@app.route('/debug-sentry')
def trigger_error():
  return 1/0

@app.post('/train_usage')
def train_usage():
  global usage_model
  global usage_classes
  usage_res = train_classifier.train_single_model("usage", 1, 4000, 4000)
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
  
  usage_res = train_classifier.train_single_model("usage", 1, 4000, 4000)
  usage_model = usage_res[0]
  usage_classes = usage_res[1]

  article_res = train_classifier.train_single_model("articleType", 3, 3000, 2500)
  article_model = article_res[0]
  article_classes = article_res[1]

  season_res = train_classifier.train_single_model("season", 3, 4000, 4000)
  season_model = season_res[0]
  season_classes = season_res[1]

  bc_res = train_classifier.train_single_model("baseColour", 3, 4000, 4000)
  bc_model = bc_res[0]
  bc_classes = bc_res[1]

  return "ok"

@app.post('/predict_usage')
def predict_usage():
  img = request.files['file']
  if img.filename == '':
    return redirect(request.url)
  else:
    img.filename = "uploaded_img.jpg"
    filename = secure_filename(img.filename)
    img.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    # return "ok"
    return train_classifier.predict(usage_model, USAGE_CLASS_INDICES, "demo_data/uploaded_img.jpg")

@app.post('/predict_all')
def predict_all():
  img = request.files['file']
  if img.filename == '':
    return redirect(request.url)
  else:
    img.filename = "uploaded_img.jpg"
    filename = secure_filename(img.filename)
    img.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    usage = train_classifier.predict(usage_model, USAGE_CLASS_INDICES, "demo_data/uploaded_img.jpg")
    article = train_classifier.predict(article_model, ARTICLE_CLASS_INDICES, "demo_data/uploaded_img.jpg")
    season = train_classifier.predict(season_model, SEASON_CLASS_INDICES, "demo_data/uploaded_img.jpg")
    bc = train_classifier.predict(bc_model, COLOUR_CLASS_INDICES, "demo_data/uploaded_img.jpg")

    to_return = [article, usage, season, bc]
    return to_return

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

@app.route('/get-keywords')
def get_search_keywords():
  response = search_keywords.generate(request.args.to_dict())
  return response, 200


if __name__ == "__main__":
  app.run(threaded=False, debug=True, use_reloader=False)