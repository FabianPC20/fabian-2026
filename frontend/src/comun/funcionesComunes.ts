export function formatearComoPesos (cantidad: number, codigoMoneda: string = 'MXN'): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: codigoMoneda,
    minimumFractionDigits: 2,
  }).format(cantidad);
}