import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask,request,jsonify

#CREATE

#Facultad/Areas
INSERT_FACULTAD =("INSERT INTO Facultad(nombre,id_organizacion) VALUES (%s,%s);")
INSERT_AREAS =("INSERT INTO Areas(nombre,id_organizacion) VALUES (%s,%s);")
#-----------------------------------------------------------------------------------------------#

#Usuario/Objeto/Rentas
INSERT_USER =("INSERT INTO Usuarios (Id, password,nombre,Id_facultad,Rol,Status) VALUES (%s,%s,%s,%s,%s,%s);")
INSERT_OBJETO =("INSERT INTO Objetos (nombre,Descripcion,Cant,Cant_disp,Id_Area,Status) VALUES (%s,%s,%s,%s,%s,%s);")
INSERT_RENTAS =("INSERT INTO Rentas (Id_usuario,Id_encargado,Salon,Id_Area,Status) VALUES (%s,%s,%s,%s,%s);")


#READ

#Facultad/Areas
SELECT_FACULTAD=("""SELECT * FROM Facultad """)
SELECT_AREAS=("""SELECT * FROM Areas """)
SELECT_ORGANIZACION=("""SELECT * FROM organizaciones """)
#-----------------------------------------------------------------------------------------------#
#Usuario/Objeto/Rentas
SELECT_USUARIOS=("""SELECT * FROM Usuarios """)
SELECT_OBJETOS=("""SELECT * FROM Objetos """)
SELECT_RENTAS=("""SELECT * FROM Rentas """)

#UPDATE

#Facultad/Areas
UPDATE_FACULTAD =("UPDATE Facultad SET nombre = (%s), id_organizacion = (%s) WHERE Id = (%s);")
UPDATE_AREAS =("UPDATE Area SET nombre = (%s), id_organizacion = (%s) WHERE Id = (%s);")
#-----------------------------------------------------------------------------------------------#
#Usuario/Objeto/Rentas

UPDATE_USUARIO =("UPDATE Usuario SET Id = (%s), nombre = (%s),Id_facultad = (%s),Rol= (%s),Status = (%s) WHERE Id = (%s);")
UPDATE_OBJETO =("UPDATE Objeto SET nombre = (%s), descripcion = (%s),cant = (%s),cant_disp= (%s),id_area = (%s),Status = (%s) WHERE Id = (%s);")
UPDATE_RENTAS =("UPDATE Objeto SET Status = (%s) WHERE Id = (%s);")


#DELETE
#Facultad/Areas
DELTE_FACULTAD =("DELETE FROM Facultad WHERE Id = (%s);")
DELETE_AREAS =("DELETE FROM Areas WHERE Id = (%s);")
#-----------------------------------------------------------------------------------------------#
#Usuario/Objeto/Rentas
DELETE_USUARIO =("DELETE FROM Usuario WHERE Id = (%s)")
DELETE_OBJETO =("DELETE FROM Objeto WHERE Id = (%s)")
DELETE_RENTAS =("DELETE FROM Rentas WHERE Id = (%s)")







load_dotenv()


app =  Flask(__name__)
url=os.getenv("DATABASE_URL")
connection=psycopg2.connect(url)

@app.route("/")
def home():
    return str('Hello,World')

@app.route("/areas")
def members():

    return

@app.post("/api/new-user")
def create_user():
    data=request.get_json()
    name=data['nombre']
    Id=data['id']
    password=data['password']
    Id_facultad=data['facultad']
    Rol=data['rol']
    Status=data['Status']
    with connection.cursor() as cursor:
        cursor.execute(INSERT_USER,())

@app.route('/users')
def show_users():
    with connection.cursor() as cursor:
        cursor.execute(SELECT_USUARIOS)
        users = cursor.fetchall()   
    return {"users":users}

@app.route("/search_org", methods=["GET"])
def search_org():
    organization_code = request.args.get("code")  # Get query parameter
    if not organization_code:
        return jsonify({"error": "No organization code provided"}), 400

    with connection.cursor() as cursor:
        try:
            cursor.execute("SELECT name FROM organizations WHERE code = %s", (organization_code,))
            orgs = cursor.fetchall()
            if orgs:
                return jsonify([{"name": org[0]} for org in orgs])  # Send JSON list
            else:
                return jsonify([])  # Send empty list if no matches
        except Exception as e:
            return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)