// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  endPoint: "https://localhost:7250/",
  urlLogin: 'https://portal.upds.edu.bo/web/SAADS/DEV/Login/SAADS-WEB?returnUrlLogin=http://localhost:4200/%23/login',
  urlAccess: 'https://portal.upds.edu.bo/api/dev/access/api/',
  urlFile: 'https://portal.upds.edu.bo/gapi/upload/uploadasynccontainer/portal-notificacion',
  endPointAccess: "https://portal.upds.edu.bo/gapi/request/service/?path=access/api/",
  endPointPortal: "http://172.16.248.33:8300/Portal/api/",
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











//?Old variables
// export const environment = {
//   production: false,
//   endPointAccess: "http://172.16.248.33:8300/access/api/",
//   endPointPagos: "http://172.16.248.33:8300/PagosPortal/",
//   endPointTransferenciaExt: "http://172.16.248.33:8300/TransferenciaExterna/",
//   endPointPortal: "http://172.16.248.33:8300/Portal/api/",
//   urlLogin: 'https://portal.upds.edu.bo/web/SAADS/DEV/Acceso/Login/SAADS-WEB?returnUrlLogin=http://localhost:4200/%23/login?token=',
//   urlFile: 'https://portal.upds.edu.bo/gapi/upload/uploadasynccontainer/linea-grafica-angular',
//   paypalApi: 'https://api-m.sandbox.paypal.com',
//   and: '&'
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
