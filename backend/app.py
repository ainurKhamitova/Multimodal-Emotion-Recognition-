from flask import Flask
from flask_cors import CORS
from routes.userRoutes import users_bp
from routes.videoRoutes import videos_bp
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os


load_dotenv()


app = Flask(__name__)
CORS(app)

app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY') # Change this to your desired secret key
jwt = JWTManager(app)

app.register_blueprint(users_bp)
app.register_blueprint(videos_bp)


@app.route('/')
def members():
    return {'message': ['member1', 'member2', 'member3']}

if __name__ == '__main__':
    app.run(debug=True)
   