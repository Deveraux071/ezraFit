import sentry_sdk
from flask import Flask
from sentry_sdk.integrations.flask import FlaskIntegration
from firebase import firebase
from style_recommender import train_classifier

firebase = firebase.FirebaseApplication('https://ezrafit-e157e-default-rtdb.firebaseio.com/', None)

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

if __name__ == "__main__":
  app.run()