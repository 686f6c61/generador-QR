# Generador de Códigos QR

[Contenido anterior hasta la sección de Uso...]

## 🔧 Uso

### Generación Masiva (QR Lanyards)

1. Descarga la plantilla CSV
2. Completa la información de los contactos
3. Sube el archivo CSV
4. Configura las opciones del QR
5. Añade un logo (opcional)
6. Genera y descarga los códigos QR

#### Estructura del CSV

El archivo CSV debe contener los siguientes campos:

```csv
firstName,lastName,organization,title,email,phone,website,address
```

| Campo | Descripción | Requerido | Ejemplo |
|-------|-------------|-----------|----------|
| firstName | Nombre de la persona | Sí | Juan |
| lastName | Apellidos | Sí | Pérez García |
| organization | Empresa u organización | No | Empresa S.A. |
| title | Cargo o posición | No | Director Técnico |
| email | Correo electrónico | Sí | juan.perez@empresa.com |
| phone | Teléfono (formato internacional) | Sí | +34 600000000 |
| website | Sitio web | No | https://www.empresa.com |
| address | Dirección postal | No | Calle Principal 123, Madrid |

#### Validaciones

- **Email**: Debe ser una dirección de correo válida
- **Teléfono**: Formato internacional con prefijo de país
- **Máximo**: 150 registros por archivo
- **Formato**: UTF-8 con separador de coma (,)

#### Ejemplo de CSV

```csv
firstName,lastName,organization,title,email,phone,website,address
Juan,Pérez García,Empresa S.A.,Director Técnico,juan.perez@empresa.com,+34 600000000,https://www.empresa.com,"Calle Principal 123, Madrid"
Ana,López Martín,Startup XYZ,CEO,ana.lopez@startup.com,+34 611111111,https://www.startup.com,"Gran Vía 456, Barcelona"
```

[Resto del contenido...]