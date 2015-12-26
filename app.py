from flask import Flask, abort, render_template,  send_from_directory,Response, make_response,redirect, session, url_for, request, g,jsonify
from flask.ext.sqlalchemy import SQLAlchemy
import os,requests,json

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config.update(SEND_FILE_MAX_AGE_DEFAULT=0)

db = SQLAlchemy(app)
from models import Cat, Tag, CatTag, Availability, Reservation, Posting, Address

cats = [{
        'id': 1,
        'title': 'Buy groceries',
        'description': 'Milk, Cheese, Pizza, Fruit, Tylenol', 
        'done': False
    },
    {
        'id': 2,
        'title': 'Learn Python',
        'description': 'Need to find a good Python tutorial on the web', 
        'done': False
    }]

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/', methods=['GET', 'POST'])
def index():
    errors = []
    results = {}
    if request.method == "POST":
        # get url that the user has entered
        try:
            url = request.form['url']
            r = requests.get(url)
            print(r.text)
        except:
            errors.append(
                "Unable to get URL. Please make sure it's valid and try again."
            )
    return app.send_static_file('index.html')


@app.route('/api/cats/<int:cat_id>', methods=['GET'])
def get_cat(cat_id):
    cat = [cat for cat in cats if cat['id'] == cat_id]
    if len(cat) == 0:
        abort(404)
    return jsonify({'cat': cat[0]})


# GET /api/cats
@app.route('/api/cats',methods=['GET'])
def get_cats():
    return jsonify({'cats':cats})



# POST /api/cats
@app.route('/api/cats',methods=['POST'])
def create_cat():
    if not request.json or not 'title' in request.json:
        abort(400)
    cat = {
        'id': cats[-1]['id'] + 1,
        'title': request.json['title'],
        'description': request.json.get('description', ""),
        'done': False
    }
    cats.append(cat)
    return jsonify({'cat': cat}), 201



# PUT /api/cats/
@app.route('/api/cats/<int:cat_id>', methods=['PUT'])
def update_cat(cat_id):
    cat = [cat for cat in cats if cat['id'] == cat_id]
    
    if len(cat) == 0:
        abort(404)
    if not request.json:
        abort(400)
    if 'done' in request.json and not isinstance(request.json['done'],bool):
        abort(400)
    cat[0]['title'] = request.json.get('title', cat[0]['title'])
    cat[0]['description'] = request.json.get('description', cat[0]['description'])
    cat[0]['done'] = request.json.get('done', cat[0]['done'])
    return jsonify({'cat': cat[0]})


# DELETE /api/cats/
@app.route('/api/cats/<int:cat_id>', methods=['DELETE'])
def delete_cat(cat_id):
    cat = [cat for cat in cats if cat['id'] == cat_id]
    if len(cat) == 0:
        abort(404)
    cats.remove(cat[0])
    return jsonify({'result': True}),204


@app.route('/register', methods=['POST'])
def readUser():
    
    resp = Response(request.form['name'] )
    resp.headers['X-Something'] = 'A value'
    return resp


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('static/js', path)

@app.route('/scripts/<path:path>')
def send_scripts(path):
    return send_from_directory('static/scripts', path)

@app.route('/images/<path:path>')
def send_images(path):
    return send_from_directory('static/images', path)

@app.route('/styles/<path:path>')
def send_styles(path):
    return send_from_directory('static/styles', path)

@app.route('/views/<path:path>')
def send_views(path):
    return send_from_directory('static/views', path)



if __name__ == '__main__':
  app.run()