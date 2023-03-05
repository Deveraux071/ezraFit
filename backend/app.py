import sentry_sdk
from flask import Flask
from sentry_sdk.integrations.flask import FlaskIntegration

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
  return "Hello World!"

@app.route('/debug-sentry')
def trigger_error():
  return 1/0

if __name__ == "__main__":
  app.run()