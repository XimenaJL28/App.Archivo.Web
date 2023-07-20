import { DocumentoInscripcionCarrera } from "../interfaces/estudiante.interface";

export function setColorDocumentoEstado(documento: DocumentoInscripcionCarrera): string {
  const fechaVencimiento = new Date(documento.fechaVencimiento || '')
  const fechaRegistro = new Date(documento.fechaRegistro)

  if (monthDiff(fechaRegistro, fechaVencimiento) < 3)
    return 'danger';

  if (documento.nombreDocumentoEstado === 'Inactivo')
    return 'success';

  if (documento.nombreDocumentoEstado === 'Activo')
    return 'warning';

  if (documento.nombreDocumentoEstado === 'Reprogramado')
    return 'danger';

  return 'info'
}

function monthDiff(d1: Date, d2: Date): number {
  let months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}
