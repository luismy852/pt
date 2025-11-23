# Prueba técnica Full‑Stack (React + Node + AWS)
![Coverage](https://img.shields.io/badge/Coverage-%3E%3D60%25-brightgreen)
![Lighthouse](https://img.shields.io/badge/Lighthouse-%3E%3D70-blue)

1) Contexto

Se desea desarrollar un curso para diferentes usuarios. Tu reto consiste en recrear desde cero un módulo que permita al usuario registrarse al curso y al administrador asignar a cada usuario un curso especifico, lo anterior desarrollado en un sistema de gestión con backend escalable, frontend modular y despliegue productivo.
 
2) Alcance del reto

Desarrolla un MVP funcional desde cero, con el siguiente stack obligatorio:

•	Frontend: React.js (Next.js 14+ preferido)

•	Backend: Node.js (NestJS o Express estructurado)

•	Base de datos: PostgreSQL o MongoDB (usa ORM/ODM moderno)

•	Integraciones: APIs REST y GraphQL

•	Autenticación: JWT o AWS Cognito (a elección, documenta el flujo)

•	Despliegue: AWS (Amplify / Lambda / API Gateway / EC2) o plataforma equivalente

Este proyecto debe demostrar que dominas todo el ciclo: diseño, desarrollo, seguridad, testing, documentación y despliegue.
 
3) Requisitos funcionales mínimos

Entidades

•	Program: { id, name, description, startDate, status }

•	User: { id, programId, fullName, email }

Flujos requeridos

   a.	Autenticación: login/logout; persistencia de sesión; protección de rutas privadas
   
   b.	CRUD Cursos: crear, listar (con filtro y paginación), editar, eliminar.
   
   c.	Usuarios del curso: crear y listar usuarios vinculados a un curso.
   
   d.	GraphQL: consulta programs(filter, page) que devuelva { items { id name } total }.
   
   e.	Validaciones: formularios con control de errores y feedback al usuario.
   
   f.	Control de acceso: endpoints seguros con middleware/guard.
 
4) Requisitos técnicos y de calidad

Frontend

•	Next.js 14+ (React 18, preferible App Router)

•	Redux Toolkit o Context API con hooks personalizados

•	Validaciones de formularios con librería profesional (Formik/Yup o React Hook Form)

•	Lazy loading y optimización básica de rendimiento (Lighthouse > 70)

Backend

•	NestJS modular (controllers, services, guards, DTOs, pipes) o Express con arquitectura por capas.

•	Implementación de middleware de errores y validaciones.

•	Manejo seguro de variables de entorno.

•	Tests unitarios y de integración (mínimo 60% cobertura).

Integraciones y despliegue

•	API REST + GraphQL.

•	Implementar CORS, autenticación JWT, y control de roles.

•	Despliegue funcional: backend y frontend accesibles públicamente.
 
5) Entregables
1.	Repositorio GitHub (monorepo o carpetas separadas):

o	frontend/ → código Next.js.

o	backend/ → código Node.js.

2.	README completo, con:

o	Instrucciones claras para ejecutar localmente.

o	Diagrama o breve descripción de la arquitectura.

o	Variables de entorno necesarias (.env.example).

o	Usuarios de prueba (si aplica Cognito).

o	URLs públicas de despliegue.

o	Resumen de decisiones técnicas y priorización.

3.	Colección Postman (CRUD y autenticación).

4.	Script de datos semilla.

5.	Pruebas automatizadas (Jest) y reporte de cobertura.

6.	Video de demostración (máx. 8 minutos) mostrando flujo completo: login → CRUD → GraphQL → despliegue.
 
6) ### Criterios de evaluación

| Área                         | Peso | Criterios clave                                                                 |
|------------------------------|------|----------------------------------------------------------------------------------|
| **Arquitectura y diseño**    | 25%  | Modularidad, separación de responsabilidades, buenas prácticas.                 |
| **Frontend**                 | 20%  | React/Next, manejo de estado, validaciones, rendimiento, UX.                   |
| **Backend**                  | 20%  | API REST/GraphQL, seguridad, validación, autenticación, testing.               |
| **Calidad del código**       | 15%  | Lint, tipado, organización, legibilidad.                                       |
| **Despliegue y CI/CD**       | 10%  | Funcionamiento público y documentación.                                        |
| **Documentación y presentación** | 10% | Claridad del README, explicaciones, video demo.                               |


Aprobación: ≥ 80 puntos sobre 100.
 
7) Plazos y condiciones

•	Tiempo total disponible: 48 horas (2 días) desde la recepción del reto.

•	Modo de entrega: envía por correo a proyectos@globalmfoundation.org:

o	Enlace al repositorio GitHub (público o con acceso otorgado).

o	URLs de despliegue (frontend y backend).

o	Video de demostración (YouTube no listado o Loom).

Este reto está diseñado para simular un entorno real de entrega ágil bajo presión. La evaluación considerará tanto la calidad técnica como tu capacidad para priorizar y entregar una versión funcional dentro del tiempo asignado.
 
8) Reglas

•	Se permite consultar documentación y usar librerías estándar.

•	Se prohíbe el uso de plantillas completas o código generado automáticamente (por ejemplo, proyectos boilerplate preconstruidos).

•	Todo el código debe ser tuyo y original.

•	No publiques claves o secretos reales.
 
9) Recomendaciones

•	Empieza por definir el flujo de autenticación y los modelos de datos.

•	Planifica las 48h: 60% desarrollo, 20% testing, 20% documentación/despliegue.

•	Usa commits claros para mostrar progreso.

•	Si algo no alcanza, explica en el README cómo lo resolverías en una siguiente iteración.
 
Objetivo del reto: Evaluar tu dominio del stack completo, tu criterio técnico, tu capacidad para entregar valor en un plazo corto y tu habilidad para comunicar decisiones de desarrollo.
