# **Trabajo Práctico Back End**
Aplicación de comercio mayorista con Node.js.

---

## **Índice**
1. [Introducción](#introducción)
2. [Características](#características)
3. [Tecnologías Usadas](#tecnologías-usadas)
4. [Autores](#autores)
5. [Instalación](#instalación)

---

## **Introducción**
La aplicación de comercio electrónico desarrollada permite a los usuarios realizar compras luego de registrarse y cuenta con un sistema de manejo de usuarios, productos, carritos de compra, y una interfaz de administración para gestionar el catálogo y las órdenes.

---

## **Características**
Dentro de las principales funcionalidades podemos mencionar:

- Registro y autenticación de usuarios: Los usuarios se registran con email y contraseña que son validados y guardados en una base de datos MongoDB Atlas. Para tener acceso al catálogo de productos y realizar una compra, deben estar registrados e iniciar sesión. A aquellos usuarios que se registren con un email de dominio “@admin.com” se les asigna el rol de administradores.

- Catálogo de productos: La aplicación cuenta con un listado de productos al cual el usuario puede acceder luego de registrarse. El catálogo muestra los productos existentes con su categoría y precio. Los usuarios pueden filtrar productos por categoría. 
Los productos pueden agregarse al carrito de a uno presionando el botón “Agregar al carrito” en el catálogo de productos.

- Carrito de compras: Cada usuario tiene un carrito de compras activo que se crea al momento de iniciar una nueva sesión, donde se muestran los productos seleccionados, el precio unitario, la cantidad, el precio final y el total a abonar junto con la forma de pago. Al confirmar el pago el sistema genera una orden vinculada a ese carrito y le asigna uno nuevo. Un usuario puede tener muchos carritos pero sólo uno activo, los carritos inactivos están asociados a una orden.

- Chat en vivo: se agregó un chat en vivo usando WebSocket donde los clientes pueden hacer consultas e interactuar con otros clientes. Cuando se carga la página, el cliente establece  una conexión con el servidor y cada vez que se envía un mensaje desde el formulario se emite un evento chat al servidor con el contenido del mismo que se recibe y se agrega dinámicamente a la lista mediante javascript.

- Interfaz de administrador: Los usuarios registrados con rol de administrador tienen acceso a una panel de administración que les permite:
    - Agregar productos
    - Eliminar productos
    - Ver los usuarios registrados
    - Ver las órdenes generadas y modificar su estado
    - Ingresar al chat en vivo 


---

## **Tecnologías Usadas**
Para su desarrollo se utilizó:
- Node.js como entorno de ejecución de JavaScript en el servidor, 
- Express como framework para la creación de rutas y manejo de solicitudes HTTP, 
- MongoDB Atlas como base de datos NoSQL para el almacenamiento de la información,  
- Pug como motor de plantillas para generar dinámicamente las vistas del lado del servidor,
- Websocket para la creación de un chat que permite a los usuarios comunicarse de manera instantánea en la aplicación.
- Jest y Supertest para realizar pruebas.

---

## **Autores**
Proyecto desarrollado por Javier Rodríguez, Santiago Rubio y Viviana Vercesi.

---

## **Instalación**
Pasos para instalar y configurar el proyecto en el entorno local.

```bash
# Clonar el repositorio
git clone https://github.com/2do-cuatri/TP-Back


---