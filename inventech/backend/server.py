import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask,request,jsonify
from flask_cors import CORS 
import sys
import logging

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
SELECT_FACULTAD_UNO=("""SELECT * FROM Facultad WHERE id = (%s)""")
SELECT_AREAS=("""SELECT * FROM Areas """)
SELECT_AREAS_UNO=("""SELECT * FROM Areas WHERE id = (%s)""")
SELECT_ORGANIZACION=("""SELECT * FROM organizaciones """)
SELECT_AREAS_UNO=("""SELECT * FROM Areas WHERE id = (%s)""")
#-----------------------------------------------------------------------------------------------#
#Usuario/Objeto/Rentas
SELECT_USUARIOS=("""SELECT * FROM Usuarios  """)
SELECT_USUARIOS_UNO=("""SELECT * FROM Usuarios  WHERE Id = (%s)""")
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
CORS(app, origins=["http://localhost:3000"])
url=os.getenv("DATABASE_URL")
connection=psycopg2.connect(url)

@app.route("/")
def home():
    return str('Hello,World')

@app.route("/areas")
def members():

    return

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
            cursor.execute("SELECT nombre,id FROM Facultad WHERE id_organizacion = %s", (organization_code,))
            facultades = cursor.fetchall()
            if facultades:
                return jsonify([{"name": org[0],"id":org[1]} for org in facultades])  # Send JSON list
            else:
                return jsonify([])  # Send empty list if no matches
        except Exception as e:
            return jsonify({"error": str(e)})


@app.route("/create_facultad",methods=["POST"])
def create_facultad():
    data=request.get_json()
    if not data:
        app.logger.info(f"No data")
        return jsonify({"error": "No data provided"}), 400

    with connection.cursor() as cursor:
        nombre_facultad = data.get('nombre')
        id_org = data.get('org-code')
        try:
            cursor.execute(SELECT_FACULTAD_UNO,(id_org,))
            Exist=cursor.fetchone()
            if not Exist:
                cursor.execute(INSERT_FACULTAD,(id_org,nombre_facultad))
                connection.commit()
                return {"Success":"Se creo la facultad"}     
            return {"Error":"Existe la facultad"}
        except Exception as e :
            return jsonify({"error": str(e)})
    return {"Nose":"nose"}

@app.route("/delete_facultad",methods=["POST"])
def delete_facultad():
    data=request.get_json()
    if not data:
        app.logger.info(f"No data")
        return jsonify({"error": "No data provided"}), 400

    with connection.cursor() as cursor:
        id_txt = data.get('Id')
        id = int(id_txt)
        try:
            cursor.execute(DELTE_FACULTAD,(id))
            cursor.commit()
        except Exception as e :
            return jsonify({"error": str(e)})
    return {"Nose":"nose"}

@app.route("/update_facultad",methods=["POST"])
def update_facultad():
    data=request.get_json()
    if not data:
        app.logger.info(f"No data")
        return jsonify({"error": "No data provided"}), 400

    with connection.cursor() as cursor:
        id_txt = data.get('Id')
        id = int(id_txt)
        nombre = data.get('name')
        id_org = data.get('id-org')
        try:
            cursor.execute(UPDATE_FACULTAD,(nombre,id_org,id))
            cursor.commit()
        except Exception as e :
            return jsonify({"error": str(e)})
    return {"Nose":"nose"}







@app.route("/create_user",methods=["POST"])
def create_user():
    data=request.get_json()
    if not data:
        app.logger.info(f"No data")
        return jsonify({"error": "No data provided"}), 400

    with connection.cursor() as cursor:
        id_txt = data.get('Id')
        id = int(id_txt)
        nombre = data.get('name')
        password = data.get('password')
        id_facultad_txt = data.get('Id_facultad')
        id_facultad=int(id_facultad_txt)
        Status= "Activo"
        Rol = "User"
        try:
            cursor.execute(SELECT_USUARIOS_UNO,(id,))
            Exist=cursor.fetchone()
            if not Exist:
                cursor.execute(INSERT_USER,(id,password,nombre,id_facultad,Rol,Status))
                connection.commit()
                return {"Success":"Se creo el Usuario"}     
            return {"Error":"Existe el usuario"}
        except Exception as e :
            return jsonify({"error": str(e)})
    return {"Nose":"nose"}

@app.route("/delete_user",methods=["POST"])
def delete_user():
    data=request.get_json()
    if not data:
        app.logger.info(f"No data")
        return jsonify({"error": "No data provided"}), 400

    with connection.cursor() as cursor:
        id_txt = data.get('Id')
        id = int(id_txt)
        try:
            cursor.execute(DELETE_USUARIO,(id))
            cursor.commit()
        except Exception as e :
            return jsonify({"error": str(e)})
    return {"Nose":"nose"}

@app.route("/update_user",methods=["POST"])
def update_user():
    data=request.get_json()
    if not data:
        app.logger.info(f"No data")
        return jsonify({"error": "No data provided"}), 400

    with connection.cursor() as cursor:
        id_txt = data.get('Id')
        id = int(id_txt)
        nombre = data.get('name')

        id_facultad_txt = data.get('Id_facultad')
        id_facultad=int(id_facultad_txt)
        Status= data.get('Status')
        Rol = data.get('Rol')
        try:
            cursor.execute(UPDATE_USUARIO,(id,nombre,id_facultad,Rol,Status,id))
            cursor.commit()
        except Exception as e :
            return jsonify({"error": str(e)})
    return {"Nose":"nose"}

if __name__ == "__main__":
    app.run(debug=True)