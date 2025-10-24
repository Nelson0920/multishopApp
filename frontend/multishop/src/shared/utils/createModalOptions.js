const createOptions = [
  { title: "Factura Venta / Ingresos", category: "Clientes", path: "/factura-venta" },
  { title: "Recibo de Caja", category: "Clientes", path: "/recibo-caja" },
  { title: "Clientes", category: "Clientes", path: "/create" },
  { title: "Cotización", category: "Clientes", path: "/cotizacion" },
  { title: "Remisión", category: "Clientes", path: "/remision" },
  { title: "Nota crédito", category: "Clientes", path: "/nota-credito" },
  { title: "Nota débito (Ventas)", category: "Clientes", path: "/nota-debito-ventas" },

  { title: "Factura de compra / Gasto", category: "Proveedores", path: "/factura-compra" },
  { title: "Documento soporte", category: "Proveedores", path: "/documento-soporte" },
  { title: "Proveedores", category: "Proveedores", path: "/create" },
  { title: "Recibo de pago / Egreso", category: "Proveedores", path: "/recibo-pago" },
  { title: "Orden de compra", category: "Proveedores", path: "/orden-compra" },
  { title: "Nota débito (compras)", category: "Proveedores", path: "/nota-debito-compras" },
  { title: "Nota ajuste Doc. Soporte", category: "Proveedores", path: "/nota-ajuste" },
  
  { title: "Usuario", category: "Usuarios y más", path: "/usuario" },
  { title: "Invita a tu contador", category: "Usuarios y más", path: "/invitar-contador" },
  { title: "Empleado", category: "Usuarios y más", path: "/empleado" },
  { title: "Nómina", category: "Usuarios y más", path: "/nomina" },

  { title: "Producto / Servicio", category: "Otros", path: "/producto-servicio" },
  { title: "Traslado entre bodegas", category: "Otros", path: "/traslado-bodegas" },
  { title: "Ajuste inventarios", category: "Otros", path: "/ajuste-inventarios" },
  { title: "Conteo físico", category: "Otros", path: "/conteo-fisico" },
  { title: "Ensamble de producto", category: "Otros", path: "/ensamble-producto" },
  { title: "Comprobante contable", category: "Otros", path: "/comprobante-contable" },
  { title: "Impuestos", category: "Otros", path: "/impuestos" },
  { title: "Traslado de dinero", category: "Otros", path: "/traslado-dinero" },
  { title: "Ajuste de cartera / proveedores", category: "Otros", path: "/ajuste-cartera" },
  { title: "Clientes, proveedores u otros", category: "Otros", path: "/clientes-proveedores" },
  { title: "Favoritos", category: "Otros", path: "/favoritos" },
]

export default createOptions
