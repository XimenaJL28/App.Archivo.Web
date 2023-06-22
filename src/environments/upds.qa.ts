export const environment = {
    production: true,
    endPoint: "https://api-saads-qa.upds.edu.bo/archivo/",
    urlLogin: 'https://login-qa.upds.edu.bo/SAADS-WEB?returnUrlLogin==https://saads-qa.upds.edu.bo/archivos/%23/login',
    urlAccess: 'https://api-saads-qa.upds.edu.bo/access/api/',
    urlFile: 'https://portal.upds.edu.bo/gapi.dev/upload/uploadasynccontainer/portal-notificacion',
    endPointAccess: "https://portal.upds.edu.bo/gapi.dev/request/service/?path=access/api/",
    endPointPortal: "http://172.16.248.33:8300/Portal/api/",
    apikey: "5SJE8rmwaw4rKz",
    objModNotificaciones: {
        id: 34002,
        nombre: "Noticias",
        estado: true,
        interfaces: [
            {
                "id": 41004,
                "titulo": "Notificaciones",
                "descripcion": " ",
                "ubicacion": "notice",
                "enlaceTutorial": null,
                "tipo": 1,
                "idModulo": 34002,
                "icono": "pi-align-left",
                "estado": true,
                "tareas": [
                    {
                        "id": 40675,
                        "nombre": "CREAR",
                        "descripcion": "CREAR",
                        "idInterface": 41004,
                        "tipo": 1
                    },
                    {
                        "id": 40676,
                        "nombre": "EDITAR",
                        "descripcion": "EDITAR",
                        "idInterface": 41004,
                        "tipo": 3
                    },
                    {
                        "id": 40677,
                        "nombre": "ELIMINAR",
                        "descripcion": "ELIMINAR",
                        "idInterface": 41004,
                        "tipo": 4
                    },
                    {
                        "id": 40678,
                        "nombre": "LEER",
                        "descripcion": "LEER",
                        "idInterface": 41004,
                        "tipo": 2
                    },
                    {
                        "id": 40679,
                        "nombre": "TODO",
                        "descripcion": "LEER",
                        "idInterface": 41004,
                        "tipo": 5
                    }
                ]
            }]
    }
};