from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from models import db, User, Target
from flask_cors import CORS, cross_origin
from flask_marshmallow import Marshmallow

app = Flask(__name__)


app.config['SECRET_KEY'] = 'smart_airbus_V2D'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pymssql://@DESKTOP-OTMRG7F:1433/smart'
app.config['SQLALCHEMY_BINDS'] = {'master': 'mssql+pymssql://@DESKTOP-OTMRG7F:1433/master'}

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True

ma=Marshmallow(app)
CORS(app, supports_credentials=True)
db.init_app(app)

with app.app_context():
    db.create_all()


class UserSchema(ma.Schema):
    class Meta:
        fields = ('email', 'fullAccess')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class TargetSchema(ma.Schema):
    class Meta:
        fields = ('trimestre', 'year', 'target')

target_schema = TargetSchema()
targets_schema = TargetSchema(many=True)

@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]
    full_Access = request.json["full_Access"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "Email already exists"}), 409


    hashed_password = Bcrypt(app).generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, fullAccess=full_Access)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })


@app.route('/login', methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()
  
    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401
  
    if not Bcrypt(app).check_password_hash(user.password, password):
        return jsonify({"error": "Wrong Password"}), 401
      
    session["user_id"] = user.id
  
    return jsonify({
        "id": user.id,
        "email": user.email,
        "is_admin": user.fullAccess
    })

@app.route('/listusers',methods =['GET'])
def listusers():
    all_users = User.query.all()
    results = users_schema.dump(all_users)
    return jsonify(results)

@app.route('/userdetails/<email>',methods =['GET'])
def userdetails(email):
    user = User.query.filter_by(email=email).first()
    return user_schema.jsonify(user)


@app.route('/userupdate/<email>', methods=['POST'])
def userupdate(email):
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    email = request.json.get('email', user.email)
    password = request.json.get('password')
    hashed_password = None  
    if password:
        hashed_password = Bcrypt(app).generate_password_hash(password)
    else:
        hashed_password = user.password
    fullAccess = request.json.get('fullAccess', user.fullAccess)

    user.email = email
    user.password = hashed_password  # Assign the hashed password
    user.fullAccess = fullAccess

    db.session.commit()
    return user_schema.jsonify(user), 200



@app.route('/userdelete/<email>', methods=['DELETE'])
def userdelete(email):
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200


@app.route("/addtarget", methods=["POST"])
def add_target():
    data = request.json
    trimestre = data.get("trimestre")
    year = data.get("year")
    target_value = data.get("target")

    # Check if the target already exists
    existing_target = Target.query.filter_by(trimestre=trimestre, year=year).first()
    if existing_target:
        return jsonify({"message": "Target already exists for the specified trimester and year"}), 409

    # Create a new target
    new_target = Target(trimestre=trimestre, year=year, target=target_value)
    db.session.add(new_target)
    db.session.commit()

    return jsonify({"message": "Target added successfully"}), 201


@app.route('/gettarget/<trimester>/<year>',methods =['GET'])
def gettargets(trimester, year):
    target_ = Target.query.filter_by(trimestre=trimester, year=year).first()
    if not target_:
        return jsonify({'message': 'target not found'}), 404
    else:
        return target_schema.jsonify(target_)


@app.route('/listtarget',methods =['GET'])
def listtargets():
    target_list = Target.query.all()
    results = targets_schema.dump(target_list)
    return jsonify(results)

@app.route('/updatetarget/<trimester>/<year>', methods=['POST'])
def targetupdate(trimester, year):
    target_ = Target.query.filter_by(trimestre=trimester, year=year).first()

    if not target_:
        return jsonify({'message': 'Target not found'}), 404

    trimestre = request.json.get('trimester', target_.trimestre)
    year = request.json.get('year', target_.year)
    target = request.json.get('target', target_.target)

    target_.trimestre = trimestre
    target_.year = year  # Assign the hashed password
    target_.target = target

    db.session.commit()
    return target_schema.jsonify(target_), 200

@app.route('/targetdelete/<trimester>/<year>', methods=['DELETE'])
def targetdelete(trimester, year):
    target_ = Target.query.filter_by(trimestre=trimester, year=year).first()

    if not target_:
        return jsonify({'message': 'User not found'}), 404

    db.session.delete(target_)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200



if __name__ == "__main__":
    app.run(debug=True)