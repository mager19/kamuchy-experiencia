// Content for the Kamuchy proposal microsite (Spanish, client-facing).
const IMG = "https://i0.wp.com/kamuchy.co/wp-content/uploads/";
const LOGO = "https://i0.wp.com/kamuchy.co/wp-content/uploads/2024/11/logoDark.png";

const INITIATIVES = [
  {
    id: "encuentra",
    name: "Encuentra tu producto",
    tagline: "Un quiz que asesora como una experta en descanso.",
    image: IMG + "2025/03/Almohada_Ibiza_1.jpg",
    tags: [["Ya construida", "pill"], ["Asesora", "pill rosa"], ["Personaliza", "pill rosa"]],
    lead: "Unas pocas preguntas sobre cómo duermes —postura, temperatura, firmeza— y el sitio recomienda la almohada ideal. Es el primer gesto de un sitio que asesora en lugar de solo exhibir.",
    includes: [
      "Recomendación personalizada según la forma de dormir",
      "El resultado lleva a la ficha del producto",
      "Propone el complemento: almohada + protector",
      "Se puede guardar en Mi Kamuchy",
      "Invita a probar la almohada en un centro de experiencia",
      "Ya está construida y lista para mostrar"
    ],
    today: "La guía para elegir almohada vive en el blog y enlaza a la categoría, no a productos concretos. No hay ninguna ayuda para decidir entre los modelos.",
    refs: [["Lagoon Sleep — Get Your Match", "https://lagoonsleep.com"]],
    needs: ["Validar con el equipo de producto las reglas de recomendación.", "Mantener el catálogo y las fotos actualizados."],
    sim: "encuentra",
    simLabel: "Abrir el quiz en vivo"
  },
  {
    id: "arma",
    name: "Arma tu cama",
    tagline: "Vestir la cama por capas, como en un hotel.",
    image: IMG + "2025/06/Juego-de-sabanas_Perla_1.jpg",
    tags: [["Personaliza", "pill rosa"], ["Invita a explorar", "pill rosa"]],
    lead: "El cliente arma su cama completa, capa por capa: protección, sábanas, abrigo, duvet, almohadas y decoración. Al final tiene todo en un solo carrito y la opción de revisarla con una asesora.",
    includes: [
      "Juegos pensados: Cuida tu almohada, Duvet listo para usar, Cama de hotel",
      "Juego completo de color: sábanas, fundas y duvet coordinados",
      "Configurador por capas con camas sugeridas para empezar",
      "Panel “Tu cama” con total y precio de juego",
      "“Revisa tu cama con una asesora”",
      "Productos relacionados que complementan, no que repiten"
    ],
    today: "“También te puede interesar” muestra alternativas (otras almohadas), incluye productos agotados y en el carrito sugiere lo que ya está en él. El carrito lateral no sugiere nada.",
    refs: [
      ["Bed Threads — Build your own bedding bundle", "https://bedthreads.com"],
      ["Brooklinen — Bundles", "https://www.brooklinen.com"],
      ["Frette — Shop the collection set", "https://www.frette.com"],
      ["Zara Home — Completa el look", "https://www.zarahome.com/co"]
    ],
    needs: [
      "Unificar tallas y nombres de color entre líneas.",
      "Reglas de combinación definidas por el equipo de estilo.",
      "Precio de juego o valor añadido, nunca “ahorra X%”."
    ],
    sim: "arma",
    simLabel: "Probar Arma tu cama"
  },
  {
    id: "mikamuchy",
    name: "Mi Kamuchy",
    tagline: "Un espacio donde el sitio recuerda quién eres.",
    image: IMG + "2024/11/unete-a-la-comunidad.jpg",
    tags: [["Personaliza", "pill rosa"], ["Acompaña después de la compra", "pill rosa"]],
    lead: "Una cuenta que vale la pena: el cliente guarda sus camas, sus favoritos y lo que ha comprado, y Kamuchy lo acompaña con mensajes que asesoran en lugar de vender.",
    includes: [
      "Mis camas: talla, alto de colchón y ciudad de cada cama de la casa",
      "Inventario de mi hogar: cada producto con su vida útil",
      "Favoritos y “Guardar mi cama”",
      "Avisos de reposición y de renovación",
      "“¿Te quedó alguna duda?” en lugar de perseguir el carrito",
      "Acceso anticipado a colecciones",
      "Lista de regalos para bodas y casa nueva (fase posterior)",
      "La compra como invitado se mantiene"
    ],
    today: "“Mi cuenta” solo permite iniciar sesión. La lista de deseos no tiene página propia y no existen avisos de reposición ni de renovación.",
    refs: [
      ["Brooklinen — Rewards", "https://www.brooklinen.com"],
      ["Crate & Barrel — Gift Registry", "https://www.crateandbarrel.com/gift-registry/"],
      ["Pottery Barn Kids — Registry checklist", "https://www.potterybarnkids.com/customer-service/registry-features.html"]
    ],
    needs: [
      "Una herramienta de correo automatizado (Klaviyo o Mailchimp + AutomateWoo).",
      "Autorización de tratamiento de datos (Ley 1581).",
      "Definir la vida útil recomendada por producto."
    ],
    sim: "mikamuchy",
    simLabel: "Ver Mi Kamuchy"
  },
  {
    id: "recoger",
    name: "Recoger en tienda",
    tagline: "Recoger también es una experiencia.",
    image: IMG + "2025/07/experiencia-personalizada.jpg",
    tags: [["Asesora", "pill rosa"], ["Centros de experiencia", "pill rosa"]],
    lead: "El cliente compra en línea y recoge en el centro de experiencia más cercano. Indica una hora aproximada y una asesora lo espera para explicarle el cuidado y ofrecerle probar el producto.",
    includes: [
      "“Disponible en tu tienda” en la ficha del producto",
      "Recoge cuando esté listo (productos bajo pedido)",
      "Recoge hoy (productos en existencia)",
      "Entrega asesorada con hora aproximada",
      "Reserva para probar, ideal para almohadas",
      "Sin registro obligatorio"
    ],
    today: "Los centros de experiencia tienen su página con dirección y horario, pero el sitio no permite recoger un pedido ni reservar una prueba.",
    refs: [
      ["Zara Home — Disponibilidad en tienda", "https://www.zarahome.com/co"],
      ["Parachute — Devoluciones en tienda", "https://www.parachutehome.com"]
    ],
    needs: [
      "Confirmar si el inventario de cada tienda está conectado al sitio.",
      "Una asesora disponible para las recogidas agendadas.",
      "Proceso interno de alistamiento y aviso."
    ],
    sim: "recoger",
    simLabel: "Ver la recogida asesorada"
  },
  {
    id: "asesoria",
    name: "Asesoría a distancia",
    tagline: "El showroom, por videollamada.",
    image: IMG + "2025/07/image.jpg",
    tags: [["Asesora", "pill rosa"], ["Atención personalizada", "pill rosa"]],
    lead: "El cliente pide que lo llamen o agenda una videollamada, y una asesora le muestra telas, texturas y combinaciones en vivo desde el centro de experiencia.",
    includes: [
      "Llamada, videollamada o videollamada por WhatsApp",
      "El cliente elige el tema y la franja horaria",
      "La asesora llega preparada",
      "Muestra en vivo desde el showroom",
      "Sin registro obligatorio",
      "Disponible desde la ficha, el quiz, Arma tu cama y el carrito"
    ],
    today: "La página de servicios ofrece visita a domicilio y toma de medidas, pero todo termina en WhatsApp. Además, el sitio muestra cuatro números distintos según la página.",
    refs: [
      ["Boll & Branch — Chat with a specialist", "https://www.bollandbranch.com"],
      ["Crate & Barrel — Design Desk", "https://crateandbarrel.com/interior-design"],
      ["Westwing — Design service", "https://www.westwing.at/en/p/designservice/"]
    ],
    needs: [
      "Definir quién atiende y en qué horario.",
      "Unificar un solo canal y número de contacto."
    ],
    sim: "asesoria",
    simLabel: "Ver cómo se agenda"
  },
  {
    id: "paginas",
    name: "Experiencia en cada página",
    tagline: "Que cada detalle se sienta premium.",
    image: IMG + "2024/12/Almohada_Naxos_2-2.jpg",
    tags: [["Eleva lo premium", "pill rosa"], ["Ajustes sobre el sitio actual", "pill rosa"]],
    lead: "Ajustes sobre el sitio actual para que la experiencia esté a la altura del producto: fichas que asesoran, reseñas reales, una bienvenida cálida y un menú que muestra todo el universo Kamuchy.",
    includes: [
      "Ficha con pestañas: detalle, guía de tallas, envío, disponibilidad",
      "Un lema sensorial por tela y el bloque “¿Es para ti?”",
      "Reseñas verificadas con foto y un detalle por dejarlas",
      "Bienvenida con tono premium",
      "Mensajes de temporada, sin contadores",
      "Mega-menú con todas las categorías",
      "Arreglos: newsletter duplicado, textos repetidos, un solo WhatsApp",
      "Se retira el mosaico “Productos de colección”"
    ],
    today: "Fichas con 3 a 5 fotos, sin reseñas (las estrellas aparecen vacías) y sin guía de tallas. El 10% de bienvenida solo está en el pie de página y el menú muestra cuatro categorías.",
    refs: [
      ["Boll & Branch — Navegar por sensación", "https://www.bollandbranch.com"],
      ["Parachute — Lema por tela", "https://www.parachutehome.com/pages/fabrics"],
      ["Brooklinen — Reseñas y guía de tallas", "https://www.brooklinen.com/products/classic-core-sheet-set"],
      ["Zara Home — Pestañas de ficha", "https://www.zarahome.com/co"]
    ],
    needs: [
      "Fotografía de textura y ambientes.",
      "Pedir reseñas después de cada entrega.",
      "Definir el detalle por reseñar."
    ],
    sim: "paginas",
    simLabel: "Ver la nueva ficha"
  },
  {
    id: "disenador",
    name: "Diseñador virtual de cama",
    tagline: "Ver la cama antes de tenerla.",
    image: IMG + "2025/07/Home_Slider_-21.jpg",
    tags: [["Idea exploratoria", "pill"], ["Invita a explorar", "pill rosa"]],
    lead: "Una habitación interactiva donde el cliente toca cada pieza y la cambia para ver cómo combinan: las sábanas Chocolate con la almohada Naxos, el duvet Pampa con cojines Páramo.",
    includes: [
      "Habitación con cama, mesas de noche y repisa",
      "Cambiar sábanas, duvet, almohadas y cojines con un clic",
      "Guardar y compartir la combinación",
      "Puede evolucionar hacia la versión visual de Arma tu cama"
    ],
    today: "No existe. El mosaico del home se retira para dar paso a esta idea.",
    refs: [
      ["Boll & Branch — Virtual Bed Designer", "https://www.bollandbranch.com/pages/virtual-bed-designer/"],
      ["Pottery Barn Teen — Build My Bed", "https://www.businesswire.com/news/home/20240501175237/en/"],
      ["Smart Bamboo (Dopple) — Configurador 3D", "https://www.dopple.io/case-studies/smart-bamboo"],
      ["Des Kelly (INHAABIT) — Cama en 360°", "https://inhaabit.com/?p=15915"]
    ],
    needs: [
      "Fotografía o modelado de cada tela.",
      "Un proveedor especializado o desarrollo a medida."
    ],
    sim: "disenador",
    simLabel: "Ver el concepto"
  }
];

// Products used by the Arma tu cama simulation. Prices are illustrative only.
const P = (name, img, price, note) => ({ name, img: IMG + img, price, note });
const CATALOG = {
  proteccion: [
    P("Protector Ultimate Plus", "2025/07/Protector-de-colchon_Ultimate-plus_2.jpg", 189900, "Impermeable y transpirable"),
    P("Protector Efecto Cool", "2025/07/Protector-de-colchon_Efecto-cool_1.jpg", 159900, "Fresco al tacto"),
    P("Protector Terry", "2025/07/Protector-de-colchon_terry_3.jpg", 139900, "Suave e impermeable")
  ],
  sabanas: [
    P("Sábanas 300 hilos Perla", "2025/06/Juego-de-sabanas_Perla_1.jpg", 289900, "Algodón 100%"),
    P("Sábanas 300 hilos Chocolate", "2025/08/Juego-de-sabanas_chocolate_1.jpg", 289900, "Algodón 100%"),
    P("Sábanas 300 hilos Gris", "2025/06/Juego-de-sabanas_gris_1.jpg", 289900, "Algodón 100%"),
    P("Sábanas 300 hilos Blanco", "2026/05/Juego-de-sabanas_blanco_1.jpg", 289900, "Algodón 100%"),
    P("Sábanas Bambú Efecto Frío", "2025/08/Juego-de-sabana_Bambu_Efecto-frio_1.jpg", 349900, "Para clima cálido"),
    P("Juego Tencel", "2025/08/Juego-de-sabanas_Tencel_1-1.jpg", 389900, "Sedoso y fresco")
  ],
  abrigo: [
    P("Plumón Microfibra Delgado", "2025/07/Plumon_Down-Microfibra-Delgado_1.jpg", 219900, "Abrigo ligero"),
    P("Plumón ComfortLife 3D", "2025/07/Plumon_ComfortLife3D_2.jpg", 289900, "Abrigo medio"),
    P("Plumón Sensación Down", "2025/07/Plumon_ULTRA-MICRO-DOWN-Sensacion-Down-Pluma_1.jpg", 359900, "Abrigo alto")
  ],
  duvet: [
    P("Duvet Pampa Rombos Marfil", "2025/09/Duvet-Pampa-rombo_marfil_1.jpg", 329900, "Textura de rombos"),
    P("Duvet Pampa Pepas Taupe", "2025/08/Duvet-pampa_pepas_taupe_1.jpg", 329900, "Tono cálido"),
    P("Duvet Pampa Cenefa Mostaza", "2025/08/Duvet-Pampa_Cenefa_Mostaza_1.jpg", 329900, "Acento de color"),
    P("Duvet Etérea Lino Avena", "2026/04/Duvet_Eterea_Avena_1.jpg", 459900, "Lino natural")
  ],
  almohadas: [
    P("Almohada Naxos ×2", "2024/12/Almohada_Naxos_2-2.jpg", 259800, "Firmeza media"),
    P("Almohada Ibiza ×2", "2025/03/Almohada_Ibiza_1.jpg", 239800, "Suave"),
    P("Almohada Tabarca ×2", "2025/04/Almohada_Tabarca_1.jpg", 139800, "Clásica"),
    P("Protector de almohada ×2", "2025/06/Protector-de-almohada_Ultimate-plus_1.jpg", 99800, "Complemento")
  ],
  decoracion: [
    P("Cojín Verona Marfil", "2025/10/Cojin_verona_beige_1.jpg", 119900, "48 × 48"),
    P("Cojín Páramo Verde Oliva", "2025/10/Cojines-Paramo_Cuadrado_Verde-Oliva_1.jpg", 119900, "48 × 48")
  ]
};

const STEPS = [
  ["tamano", "Tu cama"],
  ["proteccion", "1 · Protección"],
  ["sabanas", "2 · Sábanas"],
  ["abrigo", "3 · Abrigo"],
  ["duvet", "4 · Duvet"],
  ["almohadas", "5 · Almohadas"],
  ["decoracion", "6 · Decoración"]
];

const PRESETS = {
  "Cama de hotel": { proteccion: 0, sabanas: 3, abrigo: 1, duvet: 0, almohadas: 0, decoracion: 0 },
  "Cama fresca": { proteccion: 1, sabanas: 4, abrigo: 0, duvet: 3, almohadas: 1, decoracion: null },
  "Cama de invierno": { proteccion: 2, sabanas: 1, abrigo: 2, duvet: 1, almohadas: 0, decoracion: 1 }
};
