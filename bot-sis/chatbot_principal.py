import spacy
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()
import os

nlp = spacy.blank("es")

mongo_url = os.getenv("MONGO_URL")

client = MongoClient(mongo_url)
db = client["essiet"]
productos = db["pantallas"]

print("Conexión exitosa a MongoDB")

marcas_comunes = ["samsung", "xiaomi", "huawei", "motorola", "nokia", "lg", "oppo", "vivo", "realme", "iphone", "redmi"]

def extraer_modelo(mensaje):
    
    doc = nlp(mensaje.lower())
    palabras = [token.text for token in doc]
    
    palabras_ignorar = {"casera", "amiga", "tienes", "hay", "pantalla", "para", "disponible", "por", "¿", "?"}
    palabras_filtradas = [p for p in palabras if p not in palabras_ignorar]

    marca = next((m.capitalize() for m in palabras_filtradas if m in marcas_comunes), None)
    if not marca:
        return None

    modelo = []
    for i, palabra in enumerate(palabras_filtradas):
        if palabra.lower() == marca.lower():
            modelo = palabras_filtradas[i:]
            break

    return " ".join(modelo).lower()


def responder_mensaje(mensaje):
    
    modelo = extraer_modelo(mensaje)
    print(f"Modelo extraído: {modelo}")
    if not modelo:
        return "No pude identificar el modelo. Por favor, indícalo correctamente."

    resultado = productos.find_one({"modelo": {"$regex": f"^{modelo}$", "$options": "i"}})
    if resultado:
        cantidad = resultado.get("cantidad", 0)
        if cantidad > 0:
            return (f"Sí, disponible. Modelo: {resultado['modelo']}, "
                    f"calidad: {resultado['calidad']}, precio: {resultado['precio']}.")
        else:
            return "No disponible en la tienda o stock agotado."
    else:
        return "Lo siento, ese modelo no está disponible."
    
print("¡Chatbot iniciado!")
while True:
    mensaje_cliente = input("Introduce tu consulta (o escribe 'salir' para terminar): ")
    if mensaje_cliente.lower() == "salir":
        print("¡Gracias por usar el chatbot!")
        break
    respuesta = responder_mensaje(mensaje_cliente)
    print(respuesta)
