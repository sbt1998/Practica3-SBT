# Practica3-SBT
Práctica 3 Docker: Aplicación web con imágenes personalizadas y entorno multicontenedor
# 🚦 Juego de Semáforo F1 – Práctica Docker Multicontenedor

Este proyecto consiste en una aplicación web que simula un semáforo de Fórmula 1 para medir el tiempo de reacción del usuario.  
Forma parte de la **Práctica 3 de SBT**, cuyo objetivo es crear una aplicación ejecutada mediante **Docker Compose** usando **dos contenedores**:

- Un contenedor **Node.js + Express** para la aplicación web.
- Un contenedor **PostgreSQL** para almacenar los resultados.

---
##▶️ Cómo instalar el proyecto 
1. Tener instalados Docker Desktop o Docker en el ordenador
2. Descargar version con git clone https://github.com/sbt1998/Practica3-SBT.git o descargar el zip desde https://github.com/sbt1998/Practica3-SBT.git
3. lanzar docker-compose up -d
4. Para acceder y jugar, acceder al navegador, y escribir en el http://localhost:8080

---
## 📌 Como funciona 

  1. El usuario entra en la aplicación y escribe su nombre.
  2. Aparece un semáforo de F1 con un botón rojo.
  3. Se muestran instrucciones claras para empezar.
  4. Al pulsar por primera vez, comienza la secuencia del semáforo.
  5. Entre 5 y 10 segundos después, las luces se apagan.
  6. El usuario debe pulsar lo más rápido posible.
  7. La aplicación muestra el tiempo de reacción.
  8. El resultado se guarda en la base de datos.
  9. Se puede consultar un marcador con los mejores tiempos.
  10. Para acceder a la bbdd, ejecutar -->
      docker exec -it semaforo_db psql -U admin -d semaforo 
      Usuario: admin
      Contraseña: admin

