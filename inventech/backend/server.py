import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask,request,jsonify
from flask_cors import CORS 
import sys
import logging
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token,get_jwt_identity,jwt_required

#Esta es una prueba


#CREATE

#Facultad/Areas
INSERT_FACULTAD =("INSERT INTO Facultad(nombre,id_organizacion) VALUES (%s,%s);")
INSERT_AREAS =("INSERT INTO Areas(nombre,id_organizacion) VALUES (%s,%s);")
#-----------------------------------------------------------------------------------------------#

#Usuario/Objeto/Rentas
INSERT_USER =("INSERT INTO Usuarios (Id, password,nombre,id_area,id_facultad,rol,status) VALUES (%s,%s,%s,%s,%s,%s,%s);")
INSERT_OBJETO =("INSERT INTO Objetos (nombre,Descripcion,Cant,Cant_disp,Id_Area,Status) VALUES (%s,%s,%s,%s,%s,%s);")
INSERT_RENTAS =("INSERT INTO Rentas (Id_usuario,Id_encargado,Salon,Id_Area,Status) VALUES (%s,%s,%s,%s,%s);")


#READ



#Facultad/Areas
SELECT_FACULTAD=("""SELECT * FROM Facultad """)
SELECT_FACULTAD_UNO=("""SELECT * FROM Facultad WHERE id = (%s)""")
SELECT_FACULTAD_ORG=("""SELECT * FROM Facultad WHERE  id_organizacion = (%s)""")
SELECT_FACULTAD_UN_NOMBRE=("""SELECT nombre FROM Facultad WHERE id = (%s)""")
SELECT_AREAS=("""SELECT * FROM Areas """)
SELECT_AREAS_UNO=("""SELECT * FROM Areas WHERE id = (%s)""")
SELECT_ORGANIZACION=("""SELECT * FROM organizaciones """)
SELECT_ORGANIZACION_NOMBRE=("""SELECT nombre FROM organizaciones WHERE id = (%s) """)
SELECT_AREAS_UNO_NOMBRE=("""SELECT nombre FROM Areas WHERE id = (%s)""")
#-----------------------------------------------------------------------------------------------#
#Usuario/Objeto/Rentas
SELECT_USUARIOS=("""SELECT * FROM Usuarios  """)
SELECT_USUARIOS_UNO=("""SELECT * FROM Usuarios  WHERE Id = (%s)""")
SELECT_OBJETOS=("""SELECT * FROM Objetos """)
SELECT_OBJETOS_UNO_EDITAR=("""SELECT * FROM Objetos  WHERE nombre = (%s)""")
SELECT_OBJETOS_UNO=("""SELECT id,nombre,descripcion,cant_disp FROM Objetos  WHERE id_area = (%s)""")
SELECT_OBJETOS_CREATE=("""SELECT id,nombre,descripcion,cant_disp FROM Objetos  WHERE nombre = (%s)""")
SELECT_OBJETOS_DISP=("""SELECT * FROM objetos WHERE cant_disp > 0 AND id_area = (%s)""")
SELECT_RENTAS=("""SELECT * FROM Rentas """)
SELECT_RENTAS_AREA=("""SELECT * FROM Rentas WHERE id_area = (%s)""")
#SELECT * FROM objetos WHERE cant_disp > 0 AND id_area = :id_area
SELECT_RENTAS_UNO=("""SELECT * FROM Rentas  WHERE Id = (%s)""")
#MISC
SELECT_ID_ORG_ALUM = ("""SELECT id_organizacion FROM facultad WHERE id = (%s)""")
SELECT_ID_ORG_EMP = ("""SELECT id_organizacion FROM Areas WHERE id = (%s)""")
SELECT_AREAS_ALUM = ("""SELECT * FROM areas WHERE id_organizacion = (%s)""")
SELECT_AREAS_EMPRESA = ("""SELECT * FROM areas WHERE id = (%s)""")
SELECT_ENCARGAOS = ("""SELECT * FROM Usuarios WHERE rol = (%s)""")


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
CORS(app)
app.config["JWT_SECRET_KEY"] =os.getenv("JWT_SECRET") # Change this!
jwt = JWTManager(app)
url=os.getenv("DATABASE_URL")
connection=psycopg2.connect(url)

@app.route("/")
def home():
    return str('Hello,World')



@app.route("/principal", methods=["GET"])
@jwt_required()
def data_page():
    current_user = get_jwt_identity()

    try:
        with connection.cursor() as cursor:
            cursor.execute(SELECT_USUARIOS_UNO,(current_user,))
            user = cursor.fetchone()
           
            if not user:

                return  jsonify({"error": "No existe el usuario"}), 404
            
            response_data = {
                "message": "Access granted",
                "user_id": current_user,
                "Name": user[2],  # Assuming name is at index 2
                "areas": []
            }
            if user[3] is None and user[4] is not None:
                cursor.execute(SELECT_ID_ORG_ALUM, (user[4],))
                org_code = cursor.fetchone()
                if org_code:
                    #print(org_code)
                    cursor.execute(SELECT_AREAS_ALUM, (org_code,))
                    areas = cursor.fetchall()
                    response_data["areas"] = [{"id": area[0], "name": area[1]} for area in areas]
            elif user[3] is not None:

                cursor.execute(SELECT_AREAS_EMPRESA, (user[3],))
                areas = cursor.fetchall()
                response_data["areas"] = [{"id": area[0], "name": area[1]} for area in areas]
    
            return jsonify(response_data),200
                
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@app.route("/enca_data", methods=["GET"])
@jwt_required()
def enca_data():
    current_user = get_jwt_identity()

    try:
        with connection.cursor() as cursor:
            cursor.execute(SELECT_USUARIOS_UNO,(current_user,))
            user = cursor.fetchone()
           
            if not user:

                return  jsonify({"error": "No existe el usuario"}), 404
            
            response_data = {
                "message": "Access granted",
                "user_id": current_user,
                "Name": user[2],  # Assuming name is at index 2
                "id_area": "",
                "disponible": [],
                "inventraio": [],
                "prestamos":[]

            }
            if user[3] is not None and user[4] is not None:
                cursor.execute(SELECT_ID_ORG_ALUM, (user[4],))
                response_data["id_area"] = user[3]
                org_code = cursor.fetchone()
                if org_code:
                    #print(org_code)
                    cursor.execute(SELECT_OBJETOS_DISP, (user[3],))
                    objetos = cursor.fetchall()
                    response_data["disponible"] = [{"id": objeto[0], "nombre": objeto[1],"descripcion": objeto[2],"cantidad": objeto[4]} for objeto in objetos]
                    cursor.execute(SELECT_OBJETOS_UNO, (user[3],))
                    inventarios = cursor.fetchall()
                    response_data["inventario"] = [{"id": inv[0], "nombre": inv[1],"descripcion": inv[2],"cantidad": inv[3]} for inv in inventarios]
                    cursor.execute(SELECT_RENTAS_AREA, (user[3],))
                    rentas = cursor.fetchall()
                    response_data["prestamos"] = [{"id": renta[0], "nombre": renta[6],"expediente": renta[1],"cantidad": renta[3]} for renta in rentas]


                    
            elif user[3] is not None:

                cursor.execute(SELECT_OBJETOS_DISP, (user[3],))
                objetos = cursor.fetchall()
                response_data["disponible"] = [{"id": objeto[0], "name": objeto[1],"descripcion": objeto[2],"cant_disp": objeto[4]} for objeto in objetos]
            return jsonify(response_data),200
                
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})





@app.route("/admin", methods=["GET"])
@jwt_required()
def data_admin():
    current_user = get_jwt_identity()
    try:
        with connection.cursor() as cursor:
            cursor.execute(SELECT_USUARIOS_UNO,(current_user,))
            user = cursor.fetchone()
           
            if not user:

                return  jsonify({"error": "No existe el usuario"}), 404
            
            response_data = {
                "message": "Access granted",
                "user_id": current_user,
                "Name": user[2],  # Assuming name is at index 2
                "areas": [],
                "facultades":[],
                "Encargados":[],
                "extra":[]
            }
            if user[3] is not None and user[4] is not None:
                cursor.execute(SELECT_ID_ORG_ALUM, (user[4],))
                org_code = cursor.fetchone()
                if org_code:
                    cursor.execute(SELECT_AREAS_ALUM, (org_code,))
                    areas = cursor.fetchall()
                    response_data["areas"] = [{"id": area[0], "name": area[1]} for area in areas]
                    cursor.execute(SELECT_FACULTAD_ORG,(org_code,))
                    facul = cursor.fetchall()
                    response_data["facultades"] =[{"id":facu[0], "name": facu[1]}for facu in facul]
                    cursor.execute(SELECT_ENCARGAOS,("Encargado",))
                    encargado = cursor.fetchall()
                    response_data["Encargados"] = [{"id":x[0], "name": x[2]}for x in encargado]
                    response_data["extra"] = {"id":"1","name":"2"}
                    
            elif user[3] is not None:

                cursor.execute(SELECT_AREAS_EMPRESA, (user[3],))
                areas = cursor.fetchall()
                response_data["areas"] = [{"id": area[0], "name": area[1]} for area in areas]
    
            return jsonify(response_data),200
                
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@app.route("/profile", methods=["GET"])
@jwt_required()
def data_profile():
    current_user = get_jwt_identity()

    try:
        with connection.cursor() as cursor:
            cursor.execute(SELECT_USUARIOS_UNO,(current_user,))
            user = cursor.fetchone()
           
            if not user:

                return  jsonify({"error": "No existe el usuario"}), 404
            
            response_data = {
                "message": "Access granted",
                "user_id": current_user,
                "Name": user[2],  # Assuming name is at index 2
                "Org": '',
                "loc": '',
                "id":''

            }
            if user[3] is None and user[4] is not None:
                cursor.execute(SELECT_ID_ORG_ALUM, (user[4],))
                org_code = cursor.fetchone()
                if org_code:
                    cursor.execute(SELECT_ORGANIZACION_NOMBRE, (org_code,))
                    nombreorg = cursor.fetchall()
                    response_data["Org"] = nombreorg
                    cursor.execute(SELECT_FACULTAD_UN_NOMBRE,(user[4],))
                    facu = cursor.fetchone()
                    response_data["loc"] = facu
                    response_data['id'] = user[0]
            elif user[3] is not None:
                cursor.execute(SELECT_ID_ORG_EMP, (user[3],))
                org_code_emp = cursor.fetchone()
                if org_code_emp:
                    cursor.execute(SELECT_AREAS_UNO_NOMBRE, (user[3],))
                    areanombre = cursor.fetchone()
                    response_data["loc"] = areanombre
                    cursor.execute(SELECT_ORGANIZACION_NOMBRE, (org_code_emp,))
                    nombreorg_emp = cursor.fetchall()
                    response_data["Org"] = nombreorg_emp
                    response_data['id'] = user[0]
            return jsonify(response_data),200
                
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})




@app.route("/areas")
def members():

    return

@app.route("/login",methods =["POST"])
def login(): 
    data=request.get_json()
    if not data:
        app.logger.info(f"No data")
        return jsonify({"error": "No data provided"}), 400
    
    with connection.cursor() as cursor:
        user = int(data.get('user'))
        passw = data.get('pass')
        try:
            cursor.execute(SELECT_USUARIOS_UNO,(user,))
            Exist=cursor.fetchone()
            try:
                if Exist and Exist[0] == user and Exist[1]==passw:

                    access_token = create_access_token(identity=Exist[0])
                    return jsonify({'success': True,'message': f'Bienvenido {Exist[2]}','access_token':access_token,'user_role': Exist[5]}), 200

                return jsonify({'error': True,'message': 'Usuario O contraseña incorrectos'}), 400
            except Exception as e:
                print(e)
                return jsonify({"error": str(e)})
        except Exception as e :
            print(e)
            return jsonify({"error": str(e)})
    return jsonify({'error': True,'message': 'Error no testeado'}), 140



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
                cursor.execute("SELECT nombre,id FROM Areas WHERE id_organizacion = %s", (organization_code,))
                areas = cursor.fetchall()
                return jsonify([{"name": org[0],"id":org[1]} for org in areas]) # Send empty list if no matches
        except Exception as e:
            return jsonify({"error": str(e)})

#CRUD FACULTAD/AREAS ------------------------
#FACULTAD
@app.route("/create_facultad",methods=["POST"])
def create_facultad():
    data=request.get_json()
    if not data:
        app.logger.info(f"No data")
        return jsonify({"error": "No data provided"}), 400

    with connection.cursor() as cursor:
        nombre_facultad = data.get('nombre')
        id_org = data.get('org-code')
        id_txt = data.get('id')
        id = int(id_txt)
        try:
            cursor.execute(SELECT_FACULTAD_UNO,(id,))
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



#Areas
@app.route("/create_Area",methods=["POST"])

def create_Area():
    data=request.get_json()
    if not data:
        app.logger.info(f"No data")
        return jsonify({"error": "No data provided"}), 400

    with connection.cursor() as cursor:
        nombre_area = data.get('nombre')
        id_org = data.get('org-code')
        id_txt = data.get('id')
        id=int(id_txt)
        try:
            cursor.execute(SELECT_AREAS_UNO,(id_org,))
            Exist=cursor.fetchone()
            if not Exist:
                cursor.execute(INSERT_AREAS,(nombre_area,id_org))
                connection.commit()
                return {"Success":"Se creo el Area"}     
            return {"Error":"Existe el Area"}
        except Exception as e :
            return jsonify({"error": str(e)})
    return {"Nose":"nose"}

@app.route("/delete_area",methods=["POST"])
def delete_area():
    data=request.get_json()
    if not data:
        app.logger.info(f"No data")
        return jsonify({"error": "No data provided"}), 400

    with connection.cursor() as cursor:
        id_txt = data.get('Id')
        id = int(id_txt)
        try:
            cursor.execute(DELETE_AREAS,(id))
            cursor.commit()
        except Exception as e :
            return jsonify({"error": str(e)})
    return {"Nose":"nose"}


@app.route("/update_area",methods=["POST"])
def update_area():
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
            cursor.execute(UPDATE_AREAS,(nombre,id_org,id))
            cursor.commit()
        except Exception as e :
            return jsonify({"error": str(e)})
    return {"Nose":"nose"}






#CRUD USUARIOS/OBJETOS/RENTAS---------------
#USUARIOS
@app.route("/create_user",methods=["POST"])
def create_user():
    data=request.get_json()
    if not data:
        app.logger.info(f"No data")
        return jsonify({"error": "No data provided"}), 400

    with connection.cursor() as cursor:
        print(data)
        id_txt = data.get('id')
        id = int(id_txt)
        nombre = data.get('name')
        password = data.get('password')
        id_Area_txt = data.get('Id_Area')   
        id_facultad_txt = data.get('Id_facultad')
        Status= "Activo"
        Rol = "User"
        tipo = "User"
        try:
            cursor.execute(SELECT_USUARIOS_UNO,(id,))
            Exist=cursor.fetchone()
            if not Exist:
                if len(id_Area_txt)>0:
                    try:
                        id_Area=int(id_Area_txt)
                        cursor.execute(INSERT_USER,(id,password,nombre,id_Area,None,Rol,Status))
                        connection.commit()
                        return jsonify({'success': True,'message': 'User registered successfully'}), 200
                    except Exception as e:
                        print(f"Database error in Area case: {str(e)}") 
                else:
                    try:

                        id_facultad = int(id_facultad_txt)
                        cursor.execute(INSERT_USER,(id,password,nombre,None,id_facultad,Rol,Status))
                        connection.commit()
                        return jsonify({'success': True,'message': 'User registered successfully'}), 200
                    except Exception as e :
                        print(f"Database error in Area case: {str(e)}") 


                
            return jsonify({'error': True,'message': 'Usuario ya registrados'}), 140
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



#OBJETOS
@app.route("/create_objeto",methods=["POST"])
def create_objeto():
    data=request.get_json()
    if not data:
        app.logger.info(f"No data")
        return jsonify({"error": "No data provided"}), 400
    #print(data)
    with connection.cursor() as cursor:
        try:
            nombre = data.get('name')
            desc = data.get('descripcion')
            cant = int(data.get('cantidad'))
            cant_disp = int(data.get('cantidad'))
            id_Area = int(data.get('areaId'))
            print(type(cant),type(cant_disp),type(id_Area))
            Status= "Activo"
            cursor.execute(SELECT_OBJETOS_UNO_EDITAR, (nombre,))
            Exist = cursor.fetchone()
            print(Exist)
            if not Exist:
                cursor.execute(INSERT_OBJETO, (nombre, desc, cant, cant_disp, id_Area, Status))
                connection.commit()
                return {"Success": "Se creo el Objeto"}
            else:
                connection.rollback()
                return {"Error": "Existe el objeto"}

        except Exception as e:
            connection.rollback()
            app.logger.error(f"Error creating objeto: {e}")
            return jsonify({"error": str(e)}), 500


@app.route("/delete_objeto",methods=["POST"])
def delete_objeto():
    data=request.get_json()
    if not data:
        app.logger.info(f"No data")
        return jsonify({"error": "No data provided"}), 400

    with connection.cursor() as cursor:
        id_txt = data.get('Id')
        id = int(id_txt)
        try:
            cursor.execute(DELETE_OBJETO,(id))
            cursor.commit()
        except Exception as e :
            return jsonify({"error": str(e)})
    return {"Nose":"nose"}


@app.route("/update_objeto",methods=["POST"])
def update_objeto():
    data=request.get_json()
    if not data:
        app.logger.info(f"No data")
        return jsonify({"error": "No data provided"}), 400

    with connection.cursor() as cursor:
        id_txt = data.get('Id')
        id = int(id_txt)
        nombre = data.get('name')
        desc = data.get('desc')
        cant = int(data.get('cant'))
        cant_disp = int(data.get('cant_disp'))
        id_Area = int(data.get('id-area'))
        Status= "Activo"

        try:
            cursor.execute(UPDATE_OBJETO,(nombre,desc,cant,cant_disp,id_Area,Status,id))
            cursor.commit()
        except Exception as e :
            return jsonify({"error": str(e)})
    return {"Nose":"nose"}

@app.route("/get-objetos")
def show_objetos():
    area_id = request.args.get('area')
    if not area_id:
        app.logger.info(f"No data")
        return jsonify([]), 400

    with connection.cursor() as cursor:
        try:
            cursor.execute(SELECT_OBJETOS_UNO,(area_id,))
            objetos = cursor.fetchall()
            if objetos:
                return jsonify([{"id": objeto[0],"nombre":objeto[1],"descripcion":objeto[2],"cant_disp":objeto[3]} for objeto in objetos])
        except Exception as e :
            return jsonify({"error": str(e)})
    return {"Nose":"nose"}




#Rentas
@app.route("/create_rentas",methods=["POST"])
def create_rentas():
    data=request.get_json()
    if not data:
        app.logger.info(f"No data")
        return jsonify({"error": "No data provided"}), 400
    
    with connection.cursor() as cursor:
        name = data.get('name')
        id__organizacion = int(data.get('org-code'))
        try:
            cursor.execute(INSERT_AREAS,(name,id__organizacion))
            connection.commit()
            return jsonify({'success': True,'message': 'User registered successfully'}), 200
        except Exception as e:
            return jsonify({'error': True,'message': f'Ocurrio un error {e}'}), 400

    return {"Nose":"nose"}

@app.route("/delete_renta",methods=["POST"])
def delete_renta():
    data=request.get_json()
    if not data:
        app.logger.info(f"No data")
        return jsonify({"error": "No data provided"}), 400

    return {"Nose":"nose"}


@app.route("/update_objeto",methods=["POST"])
def update_renta():
    data=request.get_json()
    if not data:
        app.logger.info(f"No data")
        return jsonify({"error": "No data provided"}), 400

    return {"Nose":"nose"}



if __name__ == "__main__":
    app.run(debug=True)
