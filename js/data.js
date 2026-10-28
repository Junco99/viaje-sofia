// Todo el contenido del viaje. Para cambiar algo del plan, edita solo este archivo.
// Precios y horarios son aproximados: comprobadlos antes de ir.

const q = (s) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(s);
const dir = (origin, dest, waypoints = [], mode = "walking") =>
  "https://www.google.com/maps/dir/?api=1&origin=" + encodeURIComponent(origin) +
  "&destination=" + encodeURIComponent(dest) +
  (waypoints.length ? "&waypoints=" + waypoints.map(encodeURIComponent).join("%7C") : "") +
  "&travelmode=" + mode;

const APARTAMENTO = "ul. Dunav 38, Sofia";

const TRIP = {
  inicio: "2026-11-07T01:30:00+02:00",
  apartamento: { nombre: "Dunav 38", q: APARTAMENTO, ll: [42.7016, 23.3238] },

  dias: [
    {
      id: "vie",
      corto: "Vie",
      fecha: "Vie 6 → Sáb 7",
      titulo: "Llegada de madrugada",
      intro: "Aterrizáis sobre la 1:30. A esa hora no hay metro: taxi oficial o Bolt directos a la cama.",
      rutas: [{ texto: "Ruta aeropuerto → apartamento", url: dir("Sofia Airport Terminal 2", APARTAMENTO, [], "driving") }],
      paradas: [
        {
          hora: "01:30", tipo: "transporte", titulo: "Aeropuerto de Sofía",
          desc: "Ignorad a quien os ofrezca taxi dentro de la terminal. Id al mostrador de OK Supertrans en llegadas o pedid un Bolt.",
          precio: "Taxi 10–15 € · Bolt 5–12 €", q: "Sofia Airport Terminal 2", ll: [42.6886, 23.4146]
        },
        {
          hora: "02:00", tipo: "dormir", titulo: "Apartamento Dunav 38",
          desc: "Unos 20 min y 10 km. Tened el código de acceso escrito y la dirección guardada en el móvil.",
          q: APARTAMENTO, ll: [42.7016, 23.3238]
        }
      ]
    },
    {
      id: "sab",
      corto: "Sáb",
      fecha: "Sábado 7",
      titulo: "Sofía a pie y noche de chalga",
      intro: "Unos 6 km por el centro, comida a mitad y una noche larga. Anochece sobre las 17:00, así que lo de exterior va primero.",
      rutas: [
        { texto: "Ruta de la mañana", url: dir(APARTAMENTO, "Rotunda of St George Sofia", ["Zhenski Pazar Sofia", "Banya Bashi Mosque Sofia", "Serdika Ancient Complex"]) },
        { texto: "Ruta de la tarde", url: dir("Vitosha Blvd 27 Sofia", "National Palace of Culture Sofia", ["Russian Church St Nicholas Sofia", "Alexander Nevsky Cathedral Sofia", "Ivan Vazov National Theatre"]) }
      ],
      paradas: [
        {
          hora: "10:00", tipo: "comer", titulo: "Mercado de las Mujeres (Zhenski Pazar)",
          desc: "El mercado de verdad del barrio. Desayunad como ellos: banitsa caliente y boza o ayrán de una ventanilla, comida de pie.",
          precio: "Banitsa 1–2 € · boza 1 €", q: "Zhenski Pazar Sofia", ll: [42.7008, 23.3166]
        },
        {
          hora: "11:00", tipo: "ver", titulo: "Mezquita Banya Bashi y Baños Minerales",
          desc: "Enfrente están las fuentes de agua termal donde los vecinos llenan garrafas. Llevad una botella vacía.",
          q: "Banya Bashi Mosque Sofia", ll: [42.6999, 23.3226]
        },
        {
          hora: "11:30", tipo: "ver", titulo: "Mercado Central (Halite) y Sinagoga",
          desc: "Mercado cubierto de 1911 para curiosear. Al lado, la sinagoga sefardí más grande de los Balcanes.",
          q: "Central Market Hall Sofia", ll: [42.6992, 23.3213]
        },
        {
          hora: "12:10", tipo: "ver", titulo: "Serdika, Sveta Petka y Sveta Nedelya",
          desc: "Calles romanas dentro de la estación de metro, una iglesia medieval semienterrada y la catedral.",
          q: "Serdika Ancient Complex", ll: [42.6976, 23.3218]
        },
        {
          hora: "12:45", tipo: "ver", titulo: "Rotonda de San Jorge y Presidencia",
          desc: "Iglesia del siglo IV escondida en un patio. Cambio de guardia en la Presidencia a cada hora en punto: pillad el de las 13:00.",
          q: "Rotunda of St George Sofia", ll: [42.6969, 23.3238]
        },
        {
          hora: "13:30", tipo: "comer", titulo: "Comida tradicional",
          desc: "Shopska con rakia, y luego kebapche, kyufte o kavarma. Shtastlivetsa, en el bulevar Vitosha, es un clásico búlgaro.",
          precio: "15–20 € por persona", q: "Shtastlivetsa Vitosha Sofia", ll: [42.6918, 23.3196]
        },
        {
          hora: "15:15", tipo: "ver", titulo: "Iglesia rusa de San Nicolás",
          desc: "Pequeña, con cúpulas doradas, en el bulevar Tsar Osvoboditel.",
          q: "Russian Church St Nicholas Sofia", ll: [42.6953, 23.3283]
        },
        {
          hora: "15:45", tipo: "ver", titulo: "Catedral de Alejandro Nevski y Santa Sofía",
          desc: "El símbolo de la ciudad. Entrad dentro: es gratis. Hombros cubiertos y en silencio.",
          q: "Alexander Nevsky Cathedral Sofia", ll: [42.6959, 23.3328]
        },
        {
          hora: "16:30", tipo: "local", titulo: "Jardín de la Ciudad y Teatro Nacional",
          desc: "Jubilados jugando al ajedrez y a la tabla. Quedaos a mirar una partida mientras anochece.",
          q: "Ivan Vazov National Theatre", ll: [42.6941, 23.3260]
        },
        {
          hora: "17:15", tipo: "local", titulo: "Bulevar Vitosha hasta el NDK",
          desc: "Paseo con el monte Vitosha al fondo. Parad en una sladkarnitsa (pastelería) a por tarta garash.",
          precio: "Café y tarta 4–6 €", q: "National Palace of Culture Sofia", ll: [42.6849, 23.3189]
        },
        {
          hora: "18:30", tipo: "beber", titulo: "Cata de rakia (con reserva)",
          desc: "Cinco rakias envejecidas con embutidos, quesos y encurtidos, contadas por gente de allí. Es en Tsar Shishman 41, en plena zona de bares.",
          reserva: true, q: "Tsar Ivan Shishman 41 Sofia", ll: [42.6921, 23.3290]
        },
        {
          hora: "21:00", tipo: "comer", titulo: "Cena en mehana con música",
          desc: "Hadjidraganov's Houses: casas antiguas, cocina tradicional y a veces música folk. Si suena el horo, os sacarán a bailar. Alternativa: Raketa Rakia Bar.",
          precio: "20–25 € por persona", reserva: true, q: "Hadjidraganov's Houses Sofia", ll: [42.7068, 23.3193]
        },
        {
          hora: "23:00", tipo: "beber", titulo: "Copas por Shishman",
          desc: "Ruta de rakia y meze de bar en bar. No os perdáis Hambara: un bar escondido iluminado solo con velas.",
          precio: "Cerveza 2–3,5 € · rakia 2–5 €", q: "Hambara bar Sofia", ll: [42.6911, 23.3254]
        },
        {
          hora: "00:30", tipo: "beber", titulo: "Club de chalga",
          desc: "El pop-folk balcánico, lo más búlgaro de la noche. Id arreglados: nada de chándal. Preguntad en el bar cuál está de moda. Más barato y sin turistas: Studentski Grad.",
          precio: "Entrada 0–10 € · las mesas con botella son caras", q: "Studentski Grad Sofia", ll: null
        },
        {
          hora: "04:00", tipo: "comer", titulo: "Dyuner de cierre",
          desc: "El kebab de madrugada es el final oficial de cualquier noche en Sofía. Vuelta en Bolt.",
          precio: "3–5 €", q: "дюнер Sofia", ll: null
        }
      ]
    },
    {
      id: "dom",
      corto: "Dom",
      fecha: "Domingo 8",
      titulo: "Rila y aguas termales",
      intro: "Con conductor privado salís a las 10:00, sin madrugar después de la fiesta: monasterio, trucha y baño termal al aire libre mientras anochece.",
      rutas: [{ texto: "Ruta del día en coche", url: dir(APARTAMENTO, APARTAMENTO, ["Rila Monastery", "Sapareva Banya"], "driving") }],
      paradas: [
        {
          hora: "10:00", tipo: "transporte", titulo: "Recogida en el apartamento",
          desc: "Comprad banitsa para el camino. Unas 2 h de carretera de montaña: llevad abrigo, que arriba puede nevar.",
          precio: "Conductor 150–200 € por coche (50–65 € cada uno)", reserva: true, q: APARTAMENTO, ll: [42.7016, 23.3238]
        },
        {
          hora: "12:00", tipo: "ver", titulo: "Monasterio de Rila",
          desc: "Patrimonio UNESCO. Dad la vuelta al patio de frescos de colores, entrad en la iglesia (sin fotos) y subid a la torre de Hrelyo. Es un monasterio con monjes: respeto.",
          q: "Rila Monastery", ll: [42.1334, 23.3404]
        },
        {
          hora: "13:15", tipo: "comer", titulo: "Mekitsa y trucha de río",
          desc: "Mekitsa (buñuelo frito) en los puestos de fuera y trucha a la brasa en los restaurantes junto al monasterio.",
          precio: "12–18 € por persona", q: "restaurant near Rila Monastery", ll: null
        },
        {
          hora: "15:15", tipo: "local", titulo: "Termas de Sapareva Banya",
          desc: "Piscinas termales al aire libre y un géiser de agua a casi 100 °C. Bañarse con vapor y frío mientras anochece es el plan búlgaro de invierno. Bañador, chanclas y toalla.",
          precio: "Entrada 10–20 €", q: "Sapareva Banya thermal pool", ll: [42.2873, 23.2645]
        },
        {
          hora: "18:00", tipo: "transporte", titulo: "Vuelta a Sofía",
          desc: "Unos 75 km, 1 h 15 min.", q: APARTAMENTO, ll: null
        },
        {
          hora: "20:00", tipo: "comer", titulo: "Cena de despedida tranquila",
          desc: "Algo cerca del apartamento, que el lunes se madruga. Último brindis: «Nazdrave!» mirando a los ojos.",
          q: "mehana near Dunav 38 Sofia", ll: null
        }
      ],
      planB: {
        titulo: "Plan B: si llueve, hay resaca o no hay conductor",
        items: [
          { titulo: "Iglesia de Boyana", desc: "Frescos medievales, UNESCO. 20 min en taxi.", q: "Boyana Church Sofia", ll: [42.6448, 23.2664] },
          { titulo: "Zlatni Mostove (Vitosha)", desc: "Río de piedras gigantes y paseo por el bosque, lo que hace media Sofía el domingo.", q: "Zlatni Mostove Vitosha", ll: [42.6095, 23.2395] },
          { titulo: "Baños minerales de Bankya", desc: "Balneario público de 1910 con piscina a 37 °C. 17 km del centro.", q: "Mineral Baths Bankya", ll: [42.7072, 23.1462] },
          { titulo: "Piscina termal Korali", desc: "Piscina pública de agua mineral a 30 °C, abierta todo el año.", q: "Korali mineral pool Sofia", ll: null },
          { titulo: "Paradise Center", desc: "El gran centro comercial, adonde van los de allí un domingo de lluvia.", q: "Paradise Center Sofia", ll: [42.6574, 23.3153] }
        ]
      }
    },
    {
      id: "lun",
      corto: "Lun",
      fecha: "Lunes 9",
      titulo: "Vuelta a casa",
      intro: "Vuelo a las 10:00. Recordad que allí es una hora más que en España: poned la alarma con la hora de Sofía.",
      rutas: [{ texto: "Ruta apartamento → aeropuerto", url: dir(APARTAMENTO, "Sofia Airport Terminal 2", [], "driving") }],
      paradas: [
        {
          hora: "07:00", tipo: "dormir", titulo: "Check-out",
          desc: "Llaves según os indique el apartamento. Pedid el Bolt la noche antes o tened la app abierta.",
          q: APARTAMENTO, ll: [42.7016, 23.3238]
        },
        {
          hora: "07:30", tipo: "transporte", titulo: "Salida al aeropuerto",
          desc: "Con maletas, Bolt o taxi (20 min). Ligeros: metro M4 desde Serdika hasta la Terminal 2 (20 min). Mirad en la tarjeta de embarque si salís de la T1 o la T2: el metro solo llega a la T2.",
          precio: "Bolt 5–12 € · metro ~0,80 €", q: "Serdika metro station Sofia", ll: [42.6979, 23.3214]
        },
        {
          hora: "08:00", tipo: "transporte", titulo: "Aeropuerto",
          desc: "Bulgaria está en Schengen: con el DNI basta. Última banitsa en la terminal.",
          q: "Sofia Airport Terminal 2", ll: [42.6886, 23.4146]
        }
      ]
    }
  ],

  reservas: [
    { id: "apto", titulo: "Avisar al apartamento de la llegada a la 1:30", cuando: "24 h antes", desc: "Pedid el código de acceso por escrito.", url: "https://www.stayz.com.au/pdp/lo/64609777", link: "Ver anuncio" },
    { id: "domingo", titulo: "Conductor privado para Rila + Sapareva Banya", cuando: "1–2 semanas antes", desc: "Pedid salida a las 10:00 y vuelta sobre las 19:30. Preguntad también al apartamento: suelen tener contactos.", url: "https://www.getyourguide.com/s/?q=Rila%20Monastery%20private%20tour", link: "Buscar en GetYourGuide", url2: "https://www.viator.com/searchResults/all?text=Rila%20Monastery%20private", link2: "Buscar en Viator" },
    { id: "cata", titulo: "Cata de rakia del sábado a las 18:30", cuando: "Cuanto antes", desc: "Grupos pequeños, se llenan. Alternativa: vinos y rakia en BeWiner.", url: "https://www.byfood.com/experiences/bulgaria-premium-aged-rakia-cold-cuts-and-pickles-tasting-7563", link: "Cata de rakia", url2: "https://www.winedering.com/drinks-of-bulgaria-wine-and-rakia-tasting-experience-2_d8982_travel", link2: "BeWiner" },
    { id: "cena", titulo: "Cena del sábado a las 21:00", cuando: "1 semana antes", desc: "Hadjidraganov's Houses, o Raketa Rakia Bar como alternativa. Pedid mesa donde haya música.", url: q("Hadjidraganov's Houses Sofia"), link: "Hadjidraganov's", url2: q("Raketa Rakia Bar Sofia"), link2: "Raketa" },
    { id: "termas", titulo: "Comprobar horario de las termas el domingo", cuando: "La semana antes", desc: "Algunos complejos cierran pronto en invierno. Elegid uno con piscina exterior.", url: q("Sapareva Banya thermal pool"), link: "Ver en Maps" },
    { id: "bolt", titulo: "Instalar Bolt y probar que acepta vuestra tarjeta", cuando: "Antes de volar", desc: "Lo vais a usar la primera noche y la última mañana.", url: "https://bolt.eu/es-es/", link: "Bolt" },
    { id: "chalga", titulo: "Mesa en el club de chalga (opcional)", cuando: "El mismo sábado", desc: "Solo si queréis botella. En barra no hace falta.", url: null },
    { id: "futbol", titulo: "Mirar si juega el Levski o el CSKA", cuando: "La semana antes", desc: "Un partido en casa es lo más local que podéis hacer.", url: "https://www.google.com/search?q=Levski+CSKA+Sofia+partido+7+8+noviembre+2026", link: "Buscar partidos" },
    { id: "vuelo", titulo: "Check-in del vuelo y comprobar terminal", cuando: "24 h antes", desc: "El metro solo llega a la Terminal 2.", url: null }
  ],

  precios: [
    {
      titulo: "Aeropuerto ↔ centro",
      cols: ["Opción", "Precio", "Tiempo", "Ojo"],
      filas: [
        ["Taxi OK Supertrans", "10–15 €", "20 min", "Que ponga el taxímetro"],
        ["Bolt", "5–12 €", "20 min", "De noche puede tardar y encarecerse"],
        ["Traslado privado", "15–20 €", "20 min", "Hay que reservarlo"],
        ["Metro M4 (solo T2)", "~0,80 €", "20–25 min", "Funciona de 5:00 a 24:00"]
      ]
    },
    {
      titulo: "Domingo: cómo ir a Rila",
      cols: ["Opción", "Precio", "Horario", "Ojo"],
      destacada: 0,
      filas: [
        ["Conductor privado (Rila + termas)", "50–65 € cada uno", "10:00–19:30", "Vais a vuestro ritmo. La mejor opción"],
        ["Tour organizado (Rila + Boyana)", "30–60 € cada uno", "9:00–18:00", "Recogida temprano y sin termas"],
        ["Bus público + taxi a las termas", "10–15 € + 15–20 € de taxi", "Bus ~10:20, vuelta ~15:00", "Un solo bus al día y transbordos"],
        ["Coche de alquiler", "40–70 € + gasolina", "Libre", "Carretera de montaña, puede haber hielo"]
      ]
    },
    {
      titulo: "Aguas termales",
      cols: ["Sitio", "Precio", "Distancia", "Cuándo"],
      filas: [
        ["Sapareva Banya", "10–20 €", "75 km", "Domingo, con Rila"],
        ["Baños de Bankya", "10–15 €", "17 km", "Plan B del domingo"],
        ["Piscina Korali", "~10 €", "En Sofía", "Plan B, de 9:00 a 19:00"],
        ["Fuentes del centro", "Gratis", "Junto a Banya Bashi", "Sábado por la mañana"]
      ]
    },
    {
      titulo: "Comer y beber",
      cols: ["Qué", "Precio"],
      filas: [
        ["Banitsa", "1–2 €"],
        ["Café", "1,50–2,50 €"],
        ["Cerveza (Zagorka, Kamenitza)", "2–3,50 €"],
        ["Rakia", "2–5 €"],
        ["Ensalada shopska", "4–7 €"],
        ["Cena en mehana", "15–25 € por persona"],
        ["Dyuner", "3–5 €"],
        ["Billete de metro", "~0,80 €"]
      ]
    }
  ],

  comidas: [
    { id: "banitsa", nombre: "Banitsa", bg: "баница", desc: "Hojaldre con queso, el desayuno típico" },
    { id: "boza", nombre: "Boza", bg: "боза", desc: "Bebida espesa de cereal fermentado" },
    { id: "ayran", nombre: "Ayrán", bg: "айрян", desc: "Yogur líquido salado" },
    { id: "yogur", nombre: "Kiselo mlyako", bg: "кисело мляко", desc: "El yogur búlgaro auténtico, con miel" },
    { id: "shopska", nombre: "Ensalada shopska", bg: "шопска салата", desc: "Tomate, pepino, pimiento y queso sirene" },
    { id: "tarator", nombre: "Tarator", bg: "таратор", desc: "Sopa fría de yogur, pepino y nueces" },
    { id: "lyutenitsa", nombre: "Lyutenitsa", bg: "лютеница", desc: "Crema de pimiento y tomate para untar" },
    { id: "kebapche", nombre: "Kebapche y kyufte", bg: "кебапче и кюфте", desc: "Carne picada a la parrilla" },
    { id: "kavarma", nombre: "Kavarma", bg: "кавърма", desc: "Guiso en olla de barro" },
    { id: "sarmi", nombre: "Sarmi", bg: "сарми", desc: "Hojas de parra o col rellenas" },
    { id: "mekitsa", nombre: "Mekitsa", bg: "мекица", desc: "Buñuelo frito, en Rila" },
    { id: "trucha", nombre: "Trucha de río", bg: "пъстърва", desc: "A la brasa, en Rila" },
    { id: "garash", nombre: "Tarta garash", bg: "торта Гараш", desc: "Chocolate y nuez, un clásico" },
    { id: "rakia", nombre: "Rakia", bg: "ракия", desc: "A sorbos, con la ensalada" },
    { id: "vino", nombre: "Vino Mavrud o Melnik", bg: "мавруд", desc: "Tintos de uva búlgara" },
    { id: "dyuner", nombre: "Dyuner", bg: "дюнер", desc: "El kebab de después de la fiesta" }
  ],

  frases: [
    { es: "Hola", bg: "Здравейте", pr: "zdravéyte", nota: "Entre amigos: Здрасти (zdrásti)" },
    { es: "Buenos días", bg: "Добро утро", pr: "dobró útro" },
    { es: "Gracias", bg: "Благодаря", pr: "blagodariá", nota: "Más informal: Мерси (mersí)" },
    { es: "Por favor", bg: "Моля", pr: "mólia" },
    { es: "Sí / No", bg: "Да / Не", pr: "da / ne", nota: "Ojo con el gesto de la cabeza, va al revés" },
    { es: "¡Salud!", bg: "Наздраве!", pr: "nazdráve" },
    { es: "La cuenta, por favor", bg: "Сметката, моля", pr: "smétkata, mólia" },
    { es: "Una cerveza", bg: "Една бира", pr: "edná bíra" },
    { es: "Tres rakias", bg: "Три ракии", pr: "tri rakíi" },
    { es: "¿Cuánto cuesta?", bg: "Колко струва?", pr: "kólko strúva" },
    { es: "Muy rico", bg: "Много вкусно", pr: "mnógo vkúsno" },
    { es: "Perdón", bg: "Извинете", pr: "izvinéte" },
    { es: "¿Dónde está el baño?", bg: "Къде е тоалетната?", pr: "kadé e toalétnata" },
    { es: "Agua", bg: "Вода", pr: "vodá" },
    { es: "Adiós", bg: "Довиждане", pr: "dovízhdane", nota: "Entre amigos: Чао (chao)" }
  ],

  cirilico: [
    ["Ж", "zh, como la j francesa"], ["Ц", "ts"], ["Ч", "ch"], ["Ш", "sh"], ["Щ", "sht"],
    ["Ъ", "a sorda, como en «butter»"], ["Ю", "yu"], ["Я", "ya"], ["В", "v"], ["Н", "n"], ["Р", "r"], ["С", "s"], ["У", "u"], ["Х", "j"]
  ],

  noOfender: [
    { t: "El cirílico es búlgaro, no ruso", d: "Lo crearon en Bulgaria los discípulos de Cirilo y Metodio en el siglo IX. Decir «esto es ruso» molesta mucho." },
    { t: "No deis por hecho que hablan ruso", d: "Empezad en inglés o con un «Здравейте»: los jóvenes hablan muy buen inglés." },
    { t: "La shopska no es una ensalada griega", d: "Y el yogur es búlgaro de verdad: la bacteria se llama Lactobacillus bulgaricus. Es orgullo nacional." },
    { t: "Brindad mirando a los ojos", d: "No bebáis antes del brindis del grupo, y la rakia va a sorbos, no de un trago." },
    { t: "Sí y no van al revés", d: "Mover la cabeza de lado a lado es «sí» y asentir es «no». Ante la duda, usad palabras." },
    { t: "En las iglesias, respeto", d: "Hombros cubiertos, gorras fuera y en silencio. En Rila no se hacen fotos dentro de la iglesia." },
    { t: "No toquéis las velas", d: "Las de arriba son por los vivos y las de abajo, en la arena, por los difuntos." },
    { t: "Los papeles con fotos en los portales son esquelas", d: "Se llaman некролози y se cuelgan en postes y puertas. Nada de bromas." },
    { t: "Flores en número impar", d: "Los ramos pares son para los funerales, por si le lleváis algo a alguien." },
    { t: "Dejad que ellos saquen la política", d: "El comunismo, Rusia, los otomanos o Macedonia son temas sensibles. Si sale, escuchad." },
    { t: "Propina del 10 %", d: "En restaurantes se deja alrededor del 10 %. En taxi, se redondea." }
  ],

  comoLocal: [
    { t: "Desayunar de pie", d: "Banitsa con ayrán o boza de una ventanilla de закуски, comida andando." },
    { t: "Llenar botellas en las fuentes minerales", d: "Junto a los Baños Centrales, los vecinos hacen cola con garrafas." },
    { t: "Rakia antes de cenar", d: "Primero shopska y rakia a sorbos durante una hora; después, el plato principal." },
    { t: "Café de una hora", d: "En terraza, por el Doctor's Garden o el barrio de Oborishte." },
    { t: "Ajedrez y tabla en el parque", d: "En el Jardín de la Ciudad, junto al Teatro Nacional." },
    { t: "Subir a Vitosha el domingo", d: "La mitad de la ciudad sale a pasear y comer en una cabaña de montaña." },
    { t: "Bailar el horo", d: "En una mehana con banda, la gente se da la mano y baila en corro. Uníos." },
    { t: "Hacer la compra en el súper", d: "Billa, Kaufland o Fantastico: lyutenitsa, sirene, rakia y aceite de rosa a precio local." },
    { t: "Ir al fútbol", d: "Levski o CSKA, los dos grandes de Sofía." }
  ],

  info: [
    { t: "Hora", d: "Una hora más que en España." },
    { t: "Moneda", d: "Euro desde enero de 2026. Tarjeta casi en todas partes; algo de efectivo para panaderías y puestos." },
    { t: "Documentación", d: "Bulgaria está en Schengen: basta con el DNI." },
    { t: "Clima", d: "Entre 2 y 12 °C, puede llover. En Rila y Vitosha, más frío y quizá nieve." },
    { t: "Metro", d: "De 5:00 a medianoche, se paga con tarjeta sin contacto en los tornos." },
    { t: "Taxis", d: "Solo OK Supertrans, Yellow o Bolt. Mirad que el taxímetro esté encendido." },
    { t: "Enchufes", d: "Los mismos que en España." },
    { t: "Emergencias", d: "112, como en España. El roaming de la UE funciona igual." }
  ],

  enlaces: [
    { t: "Free Sofia Tour", d: "Free tour diario desde el Palacio de Justicia", url: "https://www.freesofiatour.com/" },
    { t: "Sofia Traffic", d: "Metro, buses y tranvías de Sofía", url: "https://www.sofiatraffic.bg/en" },
    { t: "BG Razpisanie", d: "Horarios de buses interurbanos (Rila, Dupnitsa)", url: "https://bgrazpisanie.com/" },
    { t: "Baños de Bankya", d: "Guía de Free Sofia Tour", url: "https://freesofiatour.com/blog/public-bath-in-bankya-near-sofia-history-getting-there-more/" },
    { t: "Tarifas de taxi 2026", d: "GuideBG", url: "https://www.guidebg.com/?p=34889" },
    { t: "Aeropuerto de Sofía", d: "Taxis y traslados", url: "https://www.airporttransferportal.com/en/airport-guides/sof" },
    { t: "Tiempo en Sofía", d: "Previsión", url: "https://www.google.com/search?q=tiempo+Sof%C3%ADa+Bulgaria" }
  ]
};
