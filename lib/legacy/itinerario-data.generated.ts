// AUTO-GENERATO da scripts/build-experience-data.mjs — non modificare a mano.
// Fonte: public/itinerario.html (dati verbatim, 5 lingue).
import type { Lang } from "@/lib/i18n";

export type PlanSlot = [string, string];

export type Plan = { title: string; morning: PlanSlot; lunch: PlanSlot; afternoon: PlanSlot; evening: PlanSlot };

export type UiLang = {
  eveningEarly: PlanSlot;
  eveningLate: PlanSlot;
  food: Record<string, PlanSlot>;
  zoneTip: Record<string, string>;
  genericZoneTip: string;
  tips: Record<string, PlanSlot>;
  personalNote: string;
  summary: { dayUnit: { one: string; other: string }; pace: string; interests: string; mixDefault: string; food: string };
  header: string;
  dayName: string;
  slotNames: [string, string, string, string];
  recsIntro: string;
  copied: string;
  copy: string;
};

export const plans: Record<Lang, Record<string, Plan>> = {
      it: {
        salerno: {
          title: 'Salerno con calma',
          morning: ['Centro storico, Duomo e Via Mercanti', 'Iniziate da Salerno: Duomo, vicoli del centro e passeggiata senza fretta.'],
          lunch: ['Pranzo in centro', 'Scegliete pizza, cucina tipica o street food in base al budget e alla voglia del momento.'],
          afternoon: ['Giardino della Minerva e Lungomare', 'Un pomeriggio leggero tra vista, verde e passeggiata sul mare.'],
          evening: ['Aperitivo o rientro tranquillo', 'Se siete stanchi, rientrate ad A Casa di Marco per cenare con calma e godervi il fresco.']
        },
        vietri: {
          title: 'Vietri sul Mare e ceramiche',
          morning: ['Vietri sul Mare', 'Passeggiata nel borgo, botteghe di ceramiche e scorci colorati.'],
          lunch: ['Pranzo semplice vista mare', 'Perfetto per pizza, cucina locale o pranzo veloce prima della spiaggia.'],
          afternoon: ['Marina di Vietri o Cetara', 'Scegliete spiaggia comoda a Vietri oppure Cetara se volete aggiungere sapore di borgo marinaro.'],
          evening: ['Rientro con calma', 'Ottima giornata se volete mare senza spingervi troppo lontano in Costiera.']
        },
        amalfi: {
          title: 'Amalfi e Ravello',
          morning: ['Partenza presto per Amalfi', 'Visitate il centro, il Duomo e prendetevi tempo per una passeggiata.'],
          lunch: ['Pranzo tra Amalfi e Atrani', 'Scegliete un pranzo medio o speciale, evitando gli orari più affollati se possibile.'],
          afternoon: ['Ravello panoramica', 'Ravello è perfetta per viste, ville storiche e atmosfera più elegante.'],
          evening: ['Rientro ad A Casa di Marco', 'Dopo Costiera e folla, il rientro in una zona tranquilla sarà la parte che apprezzerete di più.']
        },
        positano: {
          title: 'Positano o Costiera iconica',
          morning: ['Positano presto', 'Andate presto: è bellissima ma può essere molto affollata, soprattutto in estate.'],
          lunch: ['Pranzo vista mare', 'Scegliete qualcosa di semplice o speciale in base al budget. Prenotate se volete un posto preciso.'],
          afternoon: ['Praiano, Furore o rientro lento', 'Se avete energia, aggiungete una tappa panoramica; altrimenti rientrate prima del traffico serale.'],
          evening: ['Serata leggera', 'Cena tranquilla o relax in giardino dopo una giornata intensa.']
        },
        family: {
          title: 'Giornata facile con bambini',
          morning: ['Lungomare e centro facile', 'Percorso semplice, con soste e senza troppe salite.'],
          lunch: ['Pranzo comodo', 'Pizza, pasta o locale informale: meglio qualcosa di pratico e veloce.'],
          afternoon: ['Pausa nelle ore più calde', 'Rientro a casa o spiaggia comoda, evitando troppe tappe nello stesso giorno.'],
          evening: ['Gelato e passeggiata leggera', 'Una serata senza stress è spesso la scelta migliore con bambini.']
        },
        nature: {
          title: 'Panorami e natura',
          morning: ['Castello Arechi o sentiero panoramico', 'Scegliete Castello Arechi per una versione facile, sentieri solo se siete allenati.'],
          lunch: ['Pranzo semplice o al sacco', 'Meglio organizzarsi con acqua, scarpe comode e orari freschi.'],
          afternoon: ['Giardino della Minerva o Cava de\' Tirreni', 'Una seconda tappa verde e più tranquilla, senza esagerare.'],
          evening: ['Doccia, cena e riposo', 'Dopo natura e camminate, rientrare in una casa silenziosa fa la differenza.']
        },
        paestum: {
          title: 'Paestum e giornata ampia',
          morning: ['Templi di Paestum', 'Partenza al mattino per visitare l\'area archeologica con meno caldo.'],
          lunch: ['Pranzo con prodotti locali', 'Zona perfetta per mozzarella, cucina campana e pranzo più lento.'],
          afternoon: ['Museo o passeggiata verso il mare', 'Scegliete in base al meteo e alla stanchezza.'],
          evening: ['Rientro a Salerno', 'Giornata ideale con auto e ritmo equilibrato.']
        },
        pompeii: {
          title: 'Pompei o Napoli archeologica',
          morning: ['Pompei presto', 'Perfetta per chi ama storia e archeologia. In estate evitate le ore centrali.'],
          lunch: ['Pranzo pratico', 'Meglio una pausa semplice e non troppo lunga.'],
          afternoon: ['Rientro o seconda tappa leggera', 'Se avete energie, aggiungete una passeggiata; se fa caldo, rientrate.'],
          evening: ['Cena tranquilla', 'Chiudete con una serata senza troppi spostamenti.']
        },
        rainy: {
          title: 'Piano alternativo se piove',
          morning: ['Centro storico coperto e Duomo', 'Restate su Salerno: spostamenti brevi, pause caffè e luoghi al chiuso.'],
          lunch: ['Pranzo tipico o pizza', 'Giornata perfetta per mangiare bene senza correre.'],
          afternoon: ['Museo, shopping o guida food', 'Scegliete attività coperte e rimandate mare e Costiera.'],
          evening: ['Cena e rientro comodo', 'Con pioggia conviene restare flessibili e vicini.']
        },
        minori: {
          title: 'Maiori, Minori e dolci',
          morning: ['Maiori o Minori', 'Più comode e gestibili rispetto ad altre tappe molto affollate.'],
          lunch: ['Pranzo sul mare', 'Ottimo per una giornata mare più facile, anche con bambini.'],
          afternoon: ['Passeggiata e dolci a Minori', 'Inserite una pausa dolce e una passeggiata rilassata.'],
          evening: ['Rientro prima del caos', 'Meglio rientrare con calma e godersi la serata a casa.']
        }
      },
      en: {
        salerno: {
          title: 'Salerno at a relaxed pace',
          morning: ['Historic centre, Duomo and Via Mercanti', 'Start from Salerno: Duomo, old-town alleys and a stroll without rushing.'],
          lunch: ['Lunch in the centre', 'Choose pizza, typical food or street food based on your budget and mood.'],
          afternoon: ['Giardino della Minerva and the seafront', 'A light afternoon between views, greenery and a walk along the sea.'],
          evening: ['Aperitivo or a quiet return', 'If you are tired, come back to A Casa di Marco for a relaxed dinner and some fresh air.']
        },
        vietri: {
          title: 'Vietri sul Mare and ceramics',
          morning: ['Vietri sul Mare', 'A walk through the village, ceramics workshops and colourful views.'],
          lunch: ['Simple lunch with a sea view', 'Perfect for pizza, local food or a quick lunch before the beach.'],
          afternoon: ['Marina di Vietri or Cetara', 'Choose an easy beach in Vietri, or Cetara if you want to add the flavour of a fishing village.'],
          evening: ['Relaxed return', 'A great day if you want the sea without going too far up the coast.']
        },
        amalfi: {
          title: 'Amalfi and Ravello',
          morning: ['Leave early for Amalfi', 'Visit the centre, the Duomo and take your time for a walk.'],
          lunch: ['Lunch between Amalfi and Atrani', 'Choose a mid-range or special lunch, avoiding the busiest hours if possible.'],
          afternoon: ['Scenic Ravello', 'Ravello is perfect for views, historic villas and a more elegant atmosphere.'],
          evening: ['Return to A Casa di Marco', 'After the coast and the crowds, coming back to a quiet area will be the part you appreciate the most.']
        },
        positano: {
          title: 'Positano or the iconic coast',
          morning: ['Positano early', 'Go early: it is beautiful but can be very crowded, especially in summer.'],
          lunch: ['Lunch with a sea view', 'Choose something simple or special based on your budget. Book if you want a specific spot.'],
          afternoon: ['Praiano, Furore or a slow return', 'If you have energy, add a scenic stop; otherwise head back before the evening traffic.'],
          evening: ['Light evening', 'A quiet dinner or relax in the garden after an intense day.']
        },
        family: {
          title: 'Easy day with kids',
          morning: ['Easy seafront and centre', 'A simple route, with stops and no steep climbs.'],
          lunch: ['Convenient lunch', 'Pizza, pasta or an informal place: something practical and quick is best.'],
          afternoon: ['Break during the hottest hours', 'Back home or an easy beach, avoiding too many stops in one day.'],
          evening: ['Gelato and a light walk', 'A stress-free evening is often the best choice with kids.']
        },
        nature: {
          title: 'Views and nature',
          morning: ['Castello Arechi or a scenic trail', 'Choose Castello Arechi for an easy version; trails only if you are fit.'],
          lunch: ['Simple or packed lunch', 'Better to organise with water, comfortable shoes and cooler hours.'],
          afternoon: ['Giardino della Minerva or Cava de\' Tirreni', 'A second, greener and quieter stop, without overdoing it.'],
          evening: ['Shower, dinner and rest', 'After nature and walking, coming back to a quiet house makes all the difference.']
        },
        paestum: {
          title: 'Paestum and a full day',
          morning: ['Temples of Paestum', 'Leave in the morning to visit the archaeological area with less heat.'],
          lunch: ['Lunch with local products', 'Perfect area for mozzarella, Campanian food and a slower lunch.'],
          afternoon: ['Museum or a walk towards the sea', 'Choose based on the weather and your energy.'],
          evening: ['Return to Salerno', 'An ideal day with a car and a balanced pace.']
        },
        pompeii: {
          title: 'Pompeii or archaeological Naples',
          morning: ['Pompeii early', 'Perfect for history and archaeology lovers. In summer, avoid the central hours.'],
          lunch: ['Practical lunch', 'A simple and not-too-long break is best.'],
          afternoon: ['Return or a light second stop', 'If you have energy, add a walk; if it is hot, go back.'],
          evening: ['Quiet dinner', 'End with an evening without too many trips.']
        },
        rainy: {
          title: 'Alternative plan if it rains',
          morning: ['Covered historic centre and Duomo', 'Stay in Salerno: short journeys, coffee breaks and indoor places.'],
          lunch: ['Typical lunch or pizza', 'A perfect day to eat well without rushing.'],
          afternoon: ['Museum, shopping or the food guide', 'Choose indoor activities and postpone the sea and the coast.'],
          evening: ['Dinner and easy return', 'In the rain, it is better to stay flexible and nearby.']
        },
        minori: {
          title: 'Maiori, Minori and sweets',
          morning: ['Maiori or Minori', 'More comfortable and manageable than other very crowded stops.'],
          lunch: ['Lunch by the sea', 'Great for an easier beach day, also with kids.'],
          afternoon: ['Walk and sweets in Minori', 'Add a sweet break and a relaxed walk.'],
          evening: ['Return before the rush', 'Better to come back calmly and enjoy the evening at home.']
        }
      },
      es: {
        salerno: {
          title: 'Salerno con calma',
          morning: ['Centro histórico, Duomo y Via Mercanti', 'Empezad en Salerno: Duomo, callejones del centro y paseo sin prisas.'],
          lunch: ['Comida en el centro', 'Elegid pizza, cocina típica o street food según el presupuesto y las ganas del momento.'],
          afternoon: ['Giardino della Minerva y paseo marítimo', 'Una tarde ligera entre vistas, verde y paseo junto al mar.'],
          evening: ['Aperitivo o vuelta tranquila', 'Si estáis cansados, volved a A Casa di Marco para cenar con calma y disfrutar del fresco.']
        },
        vietri: {
          title: 'Vietri sul Mare y cerámicas',
          morning: ['Vietri sul Mare', 'Paseo por el pueblo, talleres de cerámica y rincones llenos de color.'],
          lunch: ['Comida sencilla con vistas al mar', 'Perfecta para pizza, cocina local o almuerzo rápido antes de la playa.'],
          afternoon: ['Marina di Vietri o Cetara', 'Elegid playa cómoda en Vietri o Cetara si queréis añadir el sabor de un pueblo marinero.'],
          evening: ['Vuelta con calma', 'Un día excelente si queréis mar sin alejaros demasiado por la Costiera.']
        },
        amalfi: {
          title: 'Amalfi y Ravello',
          morning: ['Salida temprano hacia Amalfi', 'Visitad el centro, el Duomo y tomáos tiempo para pasear.'],
          lunch: ['Comida entre Amalfi y Atrani', 'Elegid una comida media o especial, evitando las horas más concurridas si es posible.'],
          afternoon: ['Ravello panorámica', 'Ravello es perfecta para vistas, villas históricas y un ambiente más elegante.'],
          evening: ['Vuelta a A Casa di Marco', 'Tras la Costiera y las multitudes, volver a una zona tranquila será lo que más apreciaréis.']
        },
        positano: {
          title: 'Positano o la Costiera icónica',
          morning: ['Positano temprano', 'Id temprano: es preciosa pero puede estar muy concurrida, sobre todo en verano.'],
          lunch: ['Comida con vistas al mar', 'Elegid algo sencillo o especial según el presupuesto. Reservad si queréis un sitio concreto.'],
          afternoon: ['Praiano, Furore o vuelta lenta', 'Si tenéis energía, añadid una parada panorámica; si no, volved antes del tráfico de la tarde.'],
          evening: ['Noche ligera', 'Cena tranquila o relax en el jardín tras un día intenso.']
        },
        family: {
          title: 'Día fácil con niños',
          morning: ['Paseo marítimo y centro fáciles', 'Un recorrido sencillo, con paradas y sin demasiadas cuestas.'],
          lunch: ['Comida cómoda', 'Pizza, pasta o local informal: mejor algo práctico y rápido.'],
          afternoon: ['Pausa en las horas más calurosas', 'Vuelta a casa o playa cómoda, evitando demasiadas paradas el mismo día.'],
          evening: ['Helado y paseo ligero', 'Una noche sin estrés suele ser la mejor opción con niños.']
        },
        nature: {
          title: 'Panoramas y naturaleza',
          morning: ['Castello Arechi o sendero panorámico', 'Elegid Castello Arechi para una versión fácil; los senderos, solo si estáis en forma.'],
          lunch: ['Comida sencilla o de picnic', 'Mejor organizarse con agua, zapatos cómodos y horas frescas.'],
          afternoon: ['Giardino della Minerva o Cava de\' Tirreni', 'Una segunda parada más verde y tranquila, sin pasarse.'],
          evening: ['Ducha, cena y descanso', 'Tras naturaleza y caminatas, volver a una casa silenciosa marca la diferencia.']
        },
        paestum: {
          title: 'Paestum y un día completo',
          morning: ['Templos de Paestum', 'Salid por la mañana para visitar el yacimiento con menos calor.'],
          lunch: ['Comida con productos locales', 'Zona perfecta para mozzarella, cocina campana y comida más lenta.'],
          afternoon: ['Museo o paseo hacia el mar', 'Elegid según el tiempo y el cansancio.'],
          evening: ['Vuelta a Salerno', 'Un día ideal con coche y ritmo equilibrado.']
        },
        pompeii: {
          title: 'Pompeya o Nápoles arqueológica',
          morning: ['Pompeya temprano', 'Perfecta para los amantes de la historia y la arqueología. En verano evitad las horas centrales.'],
          lunch: ['Comida práctica', 'Mejor una pausa sencilla y no demasiado larga.'],
          afternoon: ['Vuelta o segunda parada ligera', 'Si tenéis energía, añadid un paseo; si hace calor, volved.'],
          evening: ['Cena tranquila', 'Terminad con una noche sin demasiados desplazamientos.']
        },
        rainy: {
          title: 'Plan alternativo si llueve',
          morning: ['Centro histórico cubierto y Duomo', 'Quedaos en Salerno: desplazamientos cortos, pausas de café y lugares cubiertos.'],
          lunch: ['Comida típica o pizza', 'Un día perfecto para comer bien sin prisas.'],
          afternoon: ['Museo, compras o guía food', 'Elegid actividades cubiertas y dejad el mar y la Costiera para otro día.'],
          evening: ['Cena y vuelta cómoda', 'Con lluvia conviene ser flexibles y estar cerca.']
        },
        minori: {
          title: 'Maiori, Minori y dulces',
          morning: ['Maiori o Minori', 'Más cómodas y manejables que otras paradas muy concurridas.'],
          lunch: ['Comida junto al mar', 'Ideal para un día de playa más fácil, también con niños.'],
          afternoon: ['Paseo y dulces en Minori', 'Añadid una pausa dulce y un paseo relajado.'],
          evening: ['Vuelta antes del caos', 'Mejor volver con calma y disfrutar de la noche en casa.']
        }
      },
      fr: {
        salerno: {
          title: 'Salerne tranquille',
          morning: ['Centre historique, Duomo et Via Mercanti', 'Commencez par Salerne : Duomo, ruelles du centre et promenade sans se presser.'],
          lunch: ['Déjeuner au centre', 'Choisissez pizza, cuisine typique ou street food selon le budget et l’envie du moment.'],
          afternoon: ['Giardino della Minerva et front de mer', 'Un après-midi léger entre vues, verdure et promenade au bord de la mer.'],
          evening: ['Apéritif ou retour tranquille', 'Si vous êtes fatigués, rentrez à A Casa di Marco pour un dîner calme et profiter de la fraîcheur.']
        },
        vietri: {
          title: 'Vietri sul Mare et céramiques',
          morning: ['Vietri sul Mare', 'Balade dans le village, ateliers de céramique et vues colorées.'],
          lunch: ['Déjeuner simple avec vue sur la mer', 'Parfait pour une pizza, un plat local ou un déjeuner rapide avant la plage.'],
          afternoon: ['Marina di Vietri ou Cetara', 'Choisissez une plage facile à Vietri, ou Cetara pour ajouter le charme d’un village de pêcheurs.'],
          evening: ['Retour tranquille', 'Une excellente journée si vous voulez la mer sans aller trop loin le long de la côte.']
        },
        amalfi: {
          title: 'Amalfi et Ravello',
          morning: ['Départ tôt pour Amalfi', 'Visitez le centre, le Duomo et prenez le temps d’une promenade.'],
          lunch: ['Déjeuner entre Amalfi et Atrani', 'Choisissez un déjeuner moyen ou spécial, en évitant les heures les plus fréquentées si possible.'],
          afternoon: ['Ravello panoramique', 'Ravello est parfaite pour les vues, les villas historiques et une atmosphère plus élégante.'],
          evening: ['Retour à A Casa di Marco', 'Après la côte et la foule, rentrer dans un quartier calme sera ce que vous apprécierez le plus.']
        },
        positano: {
          title: 'Positano ou la côte iconique',
          morning: ['Positano tôt', 'Partez tôt : c’est magnifique mais très fréquenté, surtout en été.'],
          lunch: ['Déjeuner avec vue sur la mer', 'Choisissez quelque chose de simple ou de spécial selon le budget. Réservez pour une place précise.'],
          afternoon: ['Praiano, Furore ou retour lent', 'Si vous avez de l’énergie, ajoutez une étape panoramique ; sinon rentrez avant le trafic du soir.'],
          evening: ['Soirée légère', 'Dîner tranquille ou détente au jardin après une journée intense.']
        },
        family: {
          title: 'Journée facile avec enfants',
          morning: ['Front de mer et centre faciles', 'Un parcours simple, avec des pauses et sans trop de montées.'],
          lunch: ['Déjeuner pratique', 'Pizza, pâtes ou lieu informel : mieux vaut quelque chose de simple et rapide.'],
          afternoon: ['Pause aux heures les plus chaudes', 'Retour à la maison ou plage facile, en évitant trop d’étapes le même jour.'],
          evening: ['Gelato et petite promenade', 'Une soirée sans stress est souvent le meilleur choix avec des enfants.']
        },
        nature: {
          title: 'Panoramas et nature',
          morning: ['Castello Arechi ou sentier panoramique', 'Choisissez le Castello Arechi pour une version facile ; les sentiers seulement si vous êtes en forme.'],
          lunch: ['Déjeuner simple ou pique-nique', 'Mieux vaut prévoir de l’eau, des chaussures confortables et des heures fraîches.'],
          afternoon: ['Giardino della Minerva ou Cava de\' Tirreni', 'Une deuxième étape plus verte et plus calme, sans exagérer.'],
          evening: ['Douche, dîner et repos', 'Après la nature et les balades, rentrer dans une maison silencieuse fait toute la différence.']
        },
        paestum: {
          title: 'Paestum et une journée complète',
          morning: ['Temples de Paestum', 'Partez le matin pour visiter le site archéologique avec moins de chaleur.'],
          lunch: ['Déjeuner avec des produits locaux', 'Zone parfaite pour la mozzarella, la cuisine campanienne et un déjeuner plus lent.'],
          afternoon: ['Musée ou promenade vers la mer', 'Choisissez selon la météo et la fatigue.'],
          evening: ['Retour à Salerne', 'Une journée idéale en voiture avec un rythme équilibré.']
        },
        pompeii: {
          title: 'Pompéi ou Naples archéologique',
          morning: ['Pompéi tôt', 'Parfaite pour les amoureux d’histoire et d’archéologie. En été, évitez les heures centrales.'],
          lunch: ['Déjeuner pratique', 'Mieux vaut une pause simple et pas trop longue.'],
          afternoon: ['Retour ou deuxième étape légère', 'Si vous avez de l’énergie, ajoutez une balade ; s’il fait chaud, rentrez.'],
          evening: ['Dîner tranquille', 'Terminez par une soirée sans trop de déplacements.']
        },
        rainy: {
          title: 'Plan de secours s’il pleut',
          morning: ['Centre historique couvert et Duomo', 'Restez à Salerne : trajets courts, pauses café et lieux couverts.'],
          lunch: ['Déjeuner typique ou pizza', 'Une journée parfaite pour bien manger sans courir.'],
          afternoon: ['Musée, shopping ou guide food', 'Choisissez des activités couvertes et reportez mer et côte.'],
          evening: ['Dîner et retour facile', 'Sous la pluie, mieux vaut rester flexible et proche.']
        },
        minori: {
          title: 'Maiori, Minori et douceurs',
          morning: ['Maiori ou Minori', 'Plus confortables et gérables que d’autres étapes très fréquentées.'],
          lunch: ['Déjeuner face à la mer', 'Parfait pour une journée plage plus facile, aussi avec des enfants.'],
          afternoon: ['Balade et douceurs à Minori', 'Ajoutez une pause sucrée et une promenade détendue.'],
          evening: ['Retour avant le rush', 'Mieux vaut rentrer tranquillement et profiter de la soirée à la maison.']
        }
      },
      de: {
        salerno: {
          title: 'Salerno in aller Ruhe',
          morning: ['Historisches Zentrum, Duomo und Via Mercanti', 'Beginnt in Salerno: Duomo, Gassen der Altstadt und ein Spaziergang ohne Eile.'],
          lunch: ['Mittagessen im Zentrum', 'Wählt Pizza, typische Küche oder Street Food je nach Budget und Lust.'],
          afternoon: ['Giardino della Minerva und Strandpromenade', 'Ein leichter Nachmittag zwischen Aussicht, Grün und einem Spaziergang am Meer.'],
          evening: ['Aperitif oder ruhige Rückkehr', 'Wenn ihr müde seid, kehrt zu A Casa di Marco zurück, um in Ruhe zu Abend zu essen und die Kühle zu genießen.']
        },
        vietri: {
          title: 'Vietri sul Mare und Keramik',
          morning: ['Vietri sul Mare', 'Ein Spaziergang durch das Dorf, Keramikwerkstätten und bunte Ausblicke.'],
          lunch: ['Einfaches Mittagessen mit Meerblick', 'Perfekt für Pizza, lokale Küche oder ein schnelles Mittagessen vor dem Strand.'],
          afternoon: ['Marina di Vietri oder Cetara', 'Wählt einen bequemen Strand in Vietri oder Cetara, wenn ihr das Flair eines Fischerdorfs wollt.'],
          evening: ['Ruhige Rückkehr', 'Ein toller Tag, wenn ihr ans Meer wollt, ohne zu weit die Küste entlangzufahren.']
        },
        amalfi: {
          title: 'Amalfi und Ravello',
          morning: ['Früh aufbrechen nach Amalfi', 'Besucht das Zentrum, den Duomo und nehmt euch Zeit für einen Spaziergang.'],
          lunch: ['Mittagessen zwischen Amalfi und Atrani', 'Wählt ein mittleres oder besonderes Mittagessen und meidet wenn möglich die Stoßzeiten.'],
          afternoon: ['Ravello mit Panorama', 'Ravello ist perfekt für Aussichten, historische Villen und eine elegantere Atmosphäre.'],
          evening: ['Rückkehr zu A Casa di Marco', 'Nach der Küste und dem Trubel werdet ihr die Rückkehr in eine ruhige Gegend am meisten genießen.']
        },
        positano: {
          title: 'Positano oder die ikonische Küste',
          morning: ['Positano früh', 'Fahrt früh los: Es ist wunderschön, kann aber sehr voll sein, besonders im Sommer.'],
          lunch: ['Mittagessen mit Meerblick', 'Wählt etwas Einfaches oder Besonderes je nach Budget. Reserviert, wenn ihr einen bestimmten Platz wollt.'],
          afternoon: ['Praiano, Furore oder langsame Rückkehr', 'Wenn ihr Energie habt, fügt einen Panoramastopp hinzu; sonst fahrt vor dem Abendverkehr zurück.'],
          evening: ['Leichter Abend', 'Ein ruhiges Abendessen oder Entspannung im Garten nach einem intensiven Tag.']
        },
        family: {
          title: 'Leichter Tag mit Kindern',
          morning: ['Strandpromenade und Zentrum, einfach', 'Eine einfache Route mit Pausen und ohne zu viele Anstiege.'],
          lunch: ['Unkompliziertes Mittagessen', 'Pizza, Pasta oder ein ungezwungenes Lokal: am besten etwas Praktisches und Schnelles.'],
          afternoon: ['Pause in den heißesten Stunden', 'Rückkehr nach Hause oder an einen bequemen Strand, ohne zu viele Stopps an einem Tag.'],
          evening: ['Gelato und ein leichter Spaziergang', 'Ein Abend ohne Stress ist mit Kindern oft die beste Wahl.']
        },
        nature: {
          title: 'Panoramen und Natur',
          morning: ['Castello Arechi oder Panoramaweg', 'Wählt das Castello Arechi für eine einfache Variante; Wege nur, wenn ihr fit seid.'],
          lunch: ['Einfaches Mittagessen oder Picknick', 'Plant am besten Wasser, bequeme Schuhe und kühlere Stunden ein.'],
          afternoon: ['Giardino della Minerva oder Cava de\' Tirreni', 'Ein zweiter, grünerer und ruhigerer Stopp, ohne es zu übertreiben.'],
          evening: ['Duschen, Abendessen und Ruhe', 'Nach Natur und Wanderungen macht die Rückkehr in ein ruhiges Haus den Unterschied.']
        },
        paestum: {
          title: 'Paestum und ein langer Tag',
          morning: ['Tempel von Paestum', 'Brecht am Morgen auf, um das archäologische Gelände mit weniger Hitze zu besichtigen.'],
          lunch: ['Mittagessen mit lokalen Produkten', 'Perfekte Gegend für Mozzarella, kampanische Küche und ein gemütlicheres Mittagessen.'],
          afternoon: ['Museum oder Spaziergang Richtung Meer', 'Entscheidet je nach Wetter und Müdigkeit.'],
          evening: ['Rückkehr nach Salerno', 'Ein idealer Tag mit Auto und ausgewogenem Tempo.']
        },
        pompeii: {
          title: 'Pompeji oder das archäologische Neapel',
          morning: ['Pompeji früh', 'Perfekt für Geschichts- und Archäologieliebhaber. Im Sommer meidet die Mittagsstunden.'],
          lunch: ['Praktisches Mittagessen', 'Am besten eine einfache, nicht zu lange Pause.'],
          afternoon: ['Rückkehr oder ein leichter zweiter Stopp', 'Wenn ihr Energie habt, fügt einen Spaziergang hinzu; wenn es heiß ist, fahrt zurück.'],
          evening: ['Ruhiges Abendessen', 'Schließt mit einem Abend ohne zu viele Fahrten ab.']
        },
        rainy: {
          title: 'Alternativplan bei Regen',
          morning: ['Überdachtes historisches Zentrum und Duomo', 'Bleibt in Salerno: kurze Wege, Kaffeepausen und Orte drinnen.'],
          lunch: ['Typisches Mittagessen oder Pizza', 'Ein perfekter Tag, um ohne Hetze gut zu essen.'],
          afternoon: ['Museum, Shopping oder Food-Guide', 'Wählt Aktivitäten drinnen und verschiebt Meer und Küste.'],
          evening: ['Abendessen und einfache Rückkehr', 'Bei Regen lohnt es sich, flexibel und in der Nähe zu bleiben.']
        },
        minori: {
          title: 'Maiori, Minori und Süßes',
          morning: ['Maiori oder Minori', 'Bequemer und entspannter als andere sehr volle Stopps.'],
          lunch: ['Mittagessen am Meer', 'Toll für einen leichteren Strandtag, auch mit Kindern.'],
          afternoon: ['Spaziergang und Süßes in Minori', 'Plant eine süße Pause und einen entspannten Spaziergang ein.'],
          evening: ['Rückkehr vor dem Trubel', 'Am besten kehrt ihr entspannt zurück und genießt den Abend zu Hause.']
        }
      }
    };

export const planZone: Record<string, string> = {
      salerno: 'salerno', vietri: 'vietri', amalfi: 'amalfi', positano: 'positano',
      family: 'salerno', nature: 'salerno', paestum: 'paestum', pompeii: 'pompeii',
      rainy: 'salerno', minori: 'minori'
    };

export const zoneOrder: string[] = ['salerno', 'vietri', 'minori', 'amalfi', 'positano', 'paestum', 'pompeii'];

export const zoneName: Record<Lang, Record<string, string>> = {
      it: {
        salerno: 'Salerno', vietri: 'Vietri/Cetara', minori: 'Maiori/Minori',
        amalfi: 'Amalfi/Ravello', positano: 'Positano/Praiano', paestum: 'Paestum',
        pompeii: 'Pompei/Napoli'
      },
      en: {
        salerno: 'Salerno', vietri: 'Vietri/Cetara', minori: 'Maiori/Minori',
        amalfi: 'Amalfi/Ravello', positano: 'Positano/Praiano', paestum: 'Paestum',
        pompeii: 'Pompeii/Naples'
      },
      es: {
        salerno: 'Salerno', vietri: 'Vietri/Cetara', minori: 'Maiori/Minori',
        amalfi: 'Amalfi/Ravello', positano: 'Positano/Praiano', paestum: 'Paestum',
        pompeii: 'Pompeya/Nápoles'
      },
      fr: {
        salerno: 'Salerno', vietri: 'Vietri/Cetara', minori: 'Maiori/Minori',
        amalfi: 'Amalfi/Ravello', positano: 'Positano/Praiano', paestum: 'Paestum',
        pompeii: 'Pompéi/Naples'
      },
      de: {
        salerno: 'Salerno', vietri: 'Vietri/Cetara', minori: 'Maiori/Minori',
        amalfi: 'Amalfi/Ravello', positano: 'Positano/Praiano', paestum: 'Paestum',
        pompeii: 'Pompeji/Neapel'
      }
    };

export type Rec = [string, string, string];

export const guideFood: Record<string, Rec[]> = {
      pizza: [
        ['A Modo Bio', 'mangiare.html', 'salerno'],
        ['Crosta Pizza in Teglia', 'mangiare.html', 'salerno'],
        ['Opificio - Il Laboratorio della Pizza', 'mangiare.html', 'salerno'],
        ['Pizzeria Errico Porzio Salerno', 'mangiare.html', 'salerno'],
        ['Giagiù', 'mangiare.html', 'salerno'],
        ['Da Michele Salerno', 'mangiare.html', 'salerno']
      ],
      fish: [
        ['Pescheria', 'mangiare.html', 'salerno'],
        ['Controvento', 'mangiare.html', 'salerno'],
        ['Bistrot di Pescheria', 'mangiare.html', 'salerno'],
        ['Convivium Sea Food Restaurant', 'mangiare.html', 'salerno'],
        ['Tramp Ristorante', 'mangiare.html', 'vietri']
      ],
      typical: [
        ['Osteria Canali', 'mangiare.html', 'salerno'],
        ['Il Brigante', 'mangiare.html', 'salerno'],
        ['Da Nonna Maria', 'mangiare.html', 'salerno'],
        ['La Botte Pazza', 'mangiare.html', 'salerno'],
        ['Casa Ragùsa', 'mangiare.html', 'salerno']
      ],
      street: [
        ['Crosta Pizza in Teglia', 'mangiare.html', 'salerno'],
        ['A Modo Bio', 'mangiare.html', 'salerno'],
        ['Al Dente Spaghetteria', 'mangiare.html', 'salerno']
      ],
      dessert: [
        ['Bar Gelateria Nettuno', 'mangiare.html', 'minori'],
        ['Antica Dolceria Pantaleone', 'mangiare.html', 'salerno'],
        ['Bar delle Sirene', 'mangiare.html', 'minori']
      ],
      view: [
        ['Lungomare di Salerno', 'luoghi.html', 'salerno'],
        ['Piazza della Libertà', 'luoghi.html', 'salerno'],
        ['Marina di Vietri', 'luoghi.html', 'vietri']
      ]
    };

export const guidePlaces: Record<string, Rec[]> = {
      salerno: [
        ['Cattedrale di Salerno', 'luoghi.html', 'salerno'],
        ['Giardino della Minerva', 'luoghi.html', 'salerno'],
        ['Lungomare di Salerno', 'luoghi.html', 'salerno'],
        ['Piazza della Libertà', 'luoghi.html', 'salerno']
      ],
      vietri: [
        ['Vietri sul Mare', 'luoghi.html', 'vietri'],
        ['Marina di Vietri', 'luoghi.html', 'vietri'],
        ['Spiaggia La Baia - Vietri', 'luoghi.html', 'vietri'],
        ['La Crestarella - Vietri', 'luoghi.html', 'vietri']
      ],
      amalfi: [
        ['Amalfi e Duomo di Sant\'Andrea', 'luoghi.html', 'amalfi'],
        ['Maiori e Minori', 'luoghi.html', 'minori'],
        ['Vietri sul Mare', 'luoghi.html', 'vietri']
      ],
      positano: [
        ['Positano', 'luoghi.html', 'positano'],
        ['Sentiero degli Dei', 'luoghi.html', 'positano'],
        ['Amalfi e Duomo di Sant\'Andrea', 'luoghi.html', 'amalfi']
      ],
      family: [
        ['Lungomare di Salerno', 'luoghi.html', 'salerno'],
        ['Maiori e Minori', 'luoghi.html', 'minori'],
        ['Marina di Vietri', 'luoghi.html', 'vietri']
      ],
      nature: [
        ['Castello di Arechi', 'luoghi.html', 'salerno'],
        ['Giardino della Minerva', 'luoghi.html', 'salerno'],
        ['Passeggiata sul Monte San Liberatore', 'luoghi.html', 'salerno'],
        ['Badia di Cava de\' Tirreni', 'luoghi.html', 'salerno']
      ],
      paestum: [
        ['Parco Archeologico di Paestum', 'luoghi.html', 'paestum']
      ],
      pompeii: [
        ['Scavi di Pompei', 'luoghi.html', 'pompeii']
      ],
      rainy: [
        ['Cattedrale di Salerno', 'luoghi.html', 'salerno'],
        ['Antica Dolceria Pantaleone', 'mangiare.html', 'salerno'],
        ['Osteria Canali', 'mangiare.html', 'salerno']
      ],
      minori: [
        ['Maiori e Minori', 'luoghi.html', 'minori'],
        ['Bar Gelateria Nettuno', 'mangiare.html', 'minori'],
        ['Bar delle Sirene', 'mangiare.html', 'minori']
      ]
    };

export const ui: Record<Lang, UiLang> = {
      it: {
        eveningEarly: ['Rientro e relax ad A Casa di Marco', 'Serata tranquilla in casa o in giardino: ideale dopo caldo, folla e camminate.'],
        eveningLate: ['Serata fuori', 'Aperitivo, cena o passeggiata serale a Salerno prima del rientro.'],
        food: {
          typical: ['Pranzo tipico campano', 'Cercate cucina locale, primi semplici, verdure, mozzarella o piatti della tradizione nella zona di {zone}.'],
          pizza: ['Pizza o pranzo informale', 'Soluzione comoda, veloce e adatta anche a famiglie e gruppi.'],
          fish: ['Pesce o cucina di mare', 'Ideale a Vietri, Cetara, Salerno o in Costiera. Prenotate se volete un posto preciso.'],
          street: ['Street food o pausa veloce', 'Perfetto per non perdere troppo tempo e continuare la giornata.'],
          dessert: ['Pranzo leggero e pausa dolce', 'Lasciate spazio a gelato, pasticceria o dolci tipici, soprattutto se passate da Minori.'],
          view: ['Pranzo o aperitivo vista mare', 'Scegliete una pausa panoramica, anche solo per un drink e qualcosa di semplice.']
        },
        zoneTip: {
          salerno: 'Scegliete un locale in centro o sul lungomare di Salerno.',
          vietri: 'Cercate una trattoria a Vietri o Cetara. Ottimo per pesce e cucina locale.',
          minori: 'A Minori provate la pasticceria. A Maiori trovate locali sul lungomare.',
          amalfi: 'Scegliete un ristorante tra Amalfi e Atrani: dai panoramici alle trattorie in centro.',
          positano: 'A Positano prenotate in anticipo. Provate anche Praiano per qualcosa di più semplice.',
          paestum: 'Fermatevi in un agriturismo o cercate mozzarella di bufala e prodotti tipici della zona.',
          pompeii: 'Trovate pizzerie e ristoranti vicino agli scavi. Per autenticità, esplorate le stradine vicine.'
        },
        genericZoneTip: 'Cercate un buon locale nella zona di {zone}.',
        tips: {
          summer: ['Estate', 'Partite presto per Costiera, Pompei o Paestum. Nelle ore più calde valutate pausa a casa o attività leggere.'],
          crowd: ['Folla e traffico', 'Per Costiera e Positano meglio mattina presto, traghetto quando possibile e rientro non troppo tardi.'],
          noCar: ['Senza auto', 'Preferite Salerno, Vietri, traghetti e percorsi semplici. Controllate sempre orari di bus e collegamenti.'],
          kids: ['Bambini', 'Non mettete troppe tappe nello stesso giorno. Meglio mare comodo, pause e rientro nelle ore più calde.'],
          walking: ['Camminate', 'Portate scarpe comode e acqua. Sentieri e siti archeologici sono più piacevoli al mattino.'],
          early: ['Rientro presto', 'L’itinerario lascia spazio per godersi calma, privacy e fresco di A Casa di Marco.'],
          food: ['Food', 'Per indirizzi specifici aprite la sezione “Dove mangiare” della guida e scegliete in base alla zona del giorno.']
        },
        personalNote: 'Avete scritto: “{note}”. Usate questa nota per sostituire le tappe già viste.',
        summary: {
          dayUnit: { one: 'giorno', other: 'giorni' },
          pace: 'ritmo',
          interests: 'interessi',
          mixDefault: 'mix Salerno e dintorni',
          food: 'food'
        },
        header: 'Itinerario A Casa di Marco\n\n',
        dayName: 'Giorno',
        slotNames: ['Mattina', 'Pranzo', 'Pomeriggio', 'Sera'],
        recsIntro: 'Consigli dalla guida:',
        copied: 'Itinerario copiato',
        copy: 'Copia itinerario'
      },
      en: {
        eveningEarly: ['Return and relax at A Casa di Marco', 'A quiet evening at home or in the garden: ideal after heat, crowds and walking.'],
        eveningLate: ['Evening out', 'Aperitivo, dinner or an evening stroll in Salerno before heading back.'],
        food: {
          typical: ['Typical Campanian lunch', 'Look for local food, simple first courses, vegetables, mozzarella or traditional dishes in the {zone} area.'],
          pizza: ['Pizza or casual lunch', 'A convenient, quick option that also suits families and groups.'],
          fish: ['Fish or seafood', 'Ideal in Vietri, Cetara, Salerno or along the coast. Book if you want a specific spot.'],
          street: ['Street food or quick break', 'Perfect for not wasting too much time and carrying on with the day.'],
          dessert: ['Light lunch and a sweet break', 'Leave room for gelato, pastry or typical sweets, especially if you pass through Minori.'],
          view: ['Lunch or aperitivo with a sea view', 'Choose a scenic break, even just a drink and something simple.']
        },
        zoneTip: {
          salerno: 'Pick a place in the centre or on the Salerno seafront.',
          vietri: 'Look for a trattoria in Vietri or Cetara. Great for fish and local food.',
          minori: 'In Minori try the pastry shop. In Maiori you will find places on the seafront.',
          amalfi: 'Choose a restaurant between Amalfi and Atrani: from scenic spots to trattorias in the centre.',
          positano: 'In Positano book in advance. Also try Praiano for something simpler.',
          paestum: 'Stop at an agriturismo or look for buffalo mozzarella and typical local products.',
          pompeii: 'Find pizzerias and restaurants near the ruins. For authenticity, explore the nearby alleys.'
        },
        genericZoneTip: 'Look for a good place in the {zone} area.',
        tips: {
          summer: ['Summer', 'Leave early for the Amalfi Coast, Pompeii or Paestum. During the hottest hours, consider a break at home or light activities.'],
          crowd: ['Crowds and traffic', 'For the coast and Positano, better early in the morning, ferry when possible and return not too late.'],
          noCar: ['Without a car', 'Prefer Salerno, Vietri, ferries and simple routes. Always check bus and connection times.'],
          kids: ['Kids', 'Do not plan too many stops in one day. Better an easy beach, breaks and returning during the hottest hours.'],
          walking: ['Walking', 'Bring comfortable shoes and water. Trails and archaeological sites are more pleasant in the morning.'],
          early: ['Early return', 'The itinerary leaves room to enjoy the calm, privacy and freshness of A Casa di Marco.'],
          food: ['Food', 'For specific places, open the “Where to eat” section of the guide and choose based on the day’s area.']
        },
        personalNote: 'You wrote: “{note}”. Use this note to replace stops you have already seen.',
        summary: {
          dayUnit: { one: 'day', other: 'days' },
          pace: 'pace',
          interests: 'interests',
          mixDefault: 'mix of Salerno and surroundings',
          food: 'food'
        },
        header: 'A Casa di Marco itinerary\n\n',
        dayName: 'Day',
        slotNames: ['Morning', 'Lunch', 'Afternoon', 'Evening'],
        recsIntro: 'Recommendations from the guide:',
        copied: 'Itinerary copied',
        copy: 'Copy itinerary'
      },
      es: {
        eveningEarly: ['Vuelta y relax a A Casa di Marco', 'Una noche tranquila en casa o en el jardín: ideal tras calor, multitudes y caminatas.'],
        eveningLate: ['Noche fuera', 'Aperitivo, cena o paseo nocturno en Salerno antes de volver.'],
        food: {
          typical: ['Comida típica campana', 'Buscad cocina local, primeros sencillos, verduras, mozzarella o platos de la tradición en la zona de {zone}.'],
          pizza: ['Pizza o comida informal', 'Una solución cómoda, rápida y apta también para familias y grupos.'],
          fish: ['Pescado o cocina de mar', 'Ideal en Vietri, Cetara, Salerno o en la Costiera. Reservad si queréis un sitio concreto.'],
          street: ['Street food o pausa rápida', 'Perfecto para no perder demasiado tiempo y seguir con el día.'],
          dessert: ['Comida ligera y pausa dulce', 'Dejad hueco para helado, pastelería o dulces típicos, sobre todo si pasáis por Minori.'],
          view: ['Comida o aperitivo con vistas al mar', 'Elegid una pausa panorámica, aunque sea solo un drink y algo sencillo.']
        },
        zoneTip: {
          salerno: 'Elegid un local en el centro o en el paseo marítimo de Salerno.',
          vietri: 'Buscad una trattoria en Vietri o Cetara. Ideal para pescado y cocina local.',
          minori: 'En Minori probad la pastelería. En Maiori encontraréis locales en el paseo marítimo.',
          amalfi: 'Elegid un restaurante entre Amalfi y Atrani: desde panorámicos hasta trattorias en el centro.',
          positano: 'En Positano reservad con antelación. Probad también Praiano para algo más sencillo.',
          paestum: 'Parad en un agriturismo o buscad mozzarella de búfala y productos típicos de la zona.',
          pompeii: 'Encontrad pizzerías y restaurantes cerca de las ruinas. Para autenticidad, explorad las callejuelas cercanas.'
        },
        genericZoneTip: 'Buscad un buen local en la zona de {zone}.',
        tips: {
          summer: ['Verano', 'Salid temprano hacia la Costiera, Pompeya o Paestum. En las horas más calurosas, valorad una pausa en casa o actividades ligeras.'],
          crowd: ['Multitudes y tráfico', 'Para la Costiera y Positano mejor temprano por la mañana, ferry cuando sea posible y vuelta no demasiado tarde.'],
          noCar: ['Sin coche', 'Preferid Salerno, Vietri, ferris y rutas sencillas. Comprobad siempre horarios de bus y conexiones.'],
          kids: ['Niños', 'No pongáis demasiadas paradas el mismo día. Mejor playa cómoda, pausas y vuelta en las horas más calurosas.'],
          walking: ['Caminatas', 'Llevad zapatos cómodos y agua. Los senderos y yacimientos son más agradables por la mañana.'],
          early: ['Vuelta temprana', 'El itinerario deja espacio para disfrutar de la calma, la privacidad y el frescor de A Casa di Marco.'],
          food: ['Food', 'Para direcciones concretas, abrid la sección “Dónde comer” de la guía y elegid según la zona del día.']
        },
        personalNote: 'Habéis escrito: “{note}”. Usad esta nota para sustituir las paradas ya vistas.',
        summary: {
          dayUnit: { one: 'día', other: 'días' },
          pace: 'ritmo',
          interests: 'intereses',
          mixDefault: 'mix de Salerno y alrededores',
          food: 'food'
        },
        header: 'Itinerario A Casa di Marco\n\n',
        dayName: 'Día',
        slotNames: ['Mañana', 'Comida', 'Tarde', 'Noche'],
        recsIntro: 'Consejos de la guía:',
        copied: 'Itinerario copiado',
        copy: 'Copiar itinerario'
      },
      fr: {
        eveningEarly: ['Retour et détente à A Casa di Marco', 'Une soirée tranquille à la maison ou au jardin : idéale après la chaleur, la foule et les balades.'],
        eveningLate: ['Soirée dehors', 'Apéritif, dîner ou promenade du soir à Salerne avant de rentrer.'],
        food: {
          typical: ['Déjeuner typique campanien', 'Cherchez la cuisine locale, des plats simples, des légumes, de la mozzarella ou des plats de la tradition dans la zone de {zone}.'],
          pizza: ['Pizza ou déjeuner informel', 'Une solution pratique, rapide et adaptée aussi aux familles et aux groupes.'],
          fish: ['Poisson ou cuisine de mer', 'Idéal à Vietri, Cetara, Salerne ou sur la côte. Réservez pour une place précise.'],
          street: ['Street food ou pause rapide', 'Parfait pour ne pas perdre trop de temps et poursuivre la journée.'],
          dessert: ['Déjeuner léger et pause sucrée', 'Laissez de la place pour un gelato, la pâtisserie ou les douceurs typiques, surtout si vous passez par Minori.'],
          view: ['Déjeuner ou apéritif avec vue sur la mer', 'Choisissez une pause panoramique, ne serait-ce qu’un verre et quelque chose de simple.']
        },
        zoneTip: {
          salerno: 'Choisissez un lieu au centre ou sur le front de mer de Salerne.',
          vietri: 'Cherchez une trattoria à Vietri ou Cetara. Idéal pour le poisson et la cuisine locale.',
          minori: 'À Minori, essayez la pâtisserie. À Maiori, vous trouverez des lieux sur le front de mer.',
          amalfi: 'Choisissez un restaurant entre Amalfi et Atrani : des panoramiques aux trattorias du centre.',
          positano: 'À Positano, réservez à l’avance. Essayez aussi Praiano pour quelque chose de plus simple.',
          paestum: 'Arrêtez-vous dans un agriturismo ou cherchez de la mozzarella de bufflonne et des produits typiques de la zone.',
          pompeii: 'Trouvez des pizzerias et restaurants près des fouilles. Pour l’authenticité, explorez les ruelles voisines.'
        },
        genericZoneTip: 'Cherchez un bon endroit dans la zone de {zone}.',
        tips: {
          summer: ['Été', 'Partez tôt pour la côte amalfitaine, Pompéi ou Paestum. Aux heures les plus chaudes, pensez à une pause à la maison ou à des activités légères.'],
          crowd: ['Foule et trafic', 'Pour la côte et Positano, mieux vaut partir tôt le matin, prendre le ferry quand c’est possible et rentrer pas trop tard.'],
          noCar: ['Sans voiture', 'Privilégiez Salerne, Vietri, les ferries et les itinéraires simples. Vérifiez toujours les horaires de bus et les correspondances.'],
          kids: ['Enfants', 'Ne mettez pas trop d’étapes le même jour. Mieux vaut une plage facile, des pauses et un retour aux heures les plus chaudes.'],
          walking: ['Balades', 'Prenez de bonnes chaussures et de l’eau. Les sentiers et les sites archéologiques sont plus agréables le matin.'],
          early: ['Retour tôt', 'L’itinéraire laisse de la place pour profiter du calme, de l’intimité et de la fraîcheur d’A Casa di Marco.'],
          food: ['Food', 'Pour des adresses précises, ouvrez la section « Où manger » du guide et choisissez selon la zone du jour.']
        },
        personalNote: 'Vous avez écrit : « {note} ». Utilisez cette note pour remplacer les étapes déjà vues.',
        summary: {
          dayUnit: { one: 'jour', other: 'jours' },
          pace: 'rythme',
          interests: 'intérêts',
          mixDefault: 'mélange de Salerne et ses environs',
          food: 'food'
        },
        header: 'Itinéraire A Casa di Marco\n\n',
        dayName: 'Jour',
        slotNames: ['Matin', 'Déjeuner', 'Après-midi', 'Soir'],
        recsIntro: 'Conseils du guide :',
        copied: 'Itinéraire copié',
        copy: 'Copier l’itinéraire'
      },
      de: {
        eveningEarly: ['Rückkehr und Entspannung bei A Casa di Marco', 'Ein ruhiger Abend zu Hause oder im Garten: ideal nach Hitze, Trubel und Spaziergängen.'],
        eveningLate: ['Abend unterwegs', 'Aperitif, Abendessen oder ein abendlicher Spaziergang in Salerno vor der Rückkehr.'],
        food: {
          typical: ['Typisches kampanisches Mittagessen', 'Sucht lokale Küche, einfache erste Gänge, Gemüse, Mozzarella oder traditionelle Gerichte in der Gegend von {zone}.'],
          pizza: ['Pizza oder ungezwungenes Mittagessen', 'Eine bequeme, schnelle Lösung, die auch für Familien und Gruppen passt.'],
          fish: ['Fisch oder Meeresfrüchte', 'Ideal in Vietri, Cetara, Salerno oder an der Küste. Reserviert, wenn ihr einen bestimmten Platz wollt.'],
          street: ['Street Food oder schnelle Pause', 'Perfekt, um nicht zu viel Zeit zu verlieren und den Tag fortzusetzen.'],
          dessert: ['Leichtes Mittagessen und süße Pause', 'Lasst Platz für Gelato, Konditorei oder typische Süßigkeiten, besonders wenn ihr durch Minori kommt.'],
          view: ['Mittagessen oder Aperitif mit Meerblick', 'Macht eine Pause mit Aussicht, auch nur für einen Drink und etwas Einfaches.']
        },
        zoneTip: {
          salerno: 'Wählt ein Lokal im Zentrum oder an der Strandpromenade von Salerno.',
          vietri: 'Sucht eine Trattoria in Vietri oder Cetara. Ideal für Fisch und lokale Küche.',
          minori: 'In Minori probiert die Konditorei. In Maiori findet ihr Lokale an der Strandpromenade.',
          amalfi: 'Wählt ein Restaurant zwischen Amalfi und Atrani: von Panoramalokalen bis zu Trattorien im Zentrum.',
          positano: 'In Positano reserviert frühzeitig. Probiert auch Praiano für etwas Einfacheres.',
          paestum: 'Macht Halt in einem Agriturismo oder sucht Büffelmozzarella und typische Produkte der Gegend.',
          pompeii: 'Findet Pizzerien und Restaurants in der Nähe der Ausgrabungen. Für Authentizität erkundet die nahen Gassen.'
        },
        genericZoneTip: 'Sucht ein gutes Lokal in der Gegend von {zone}.',
        tips: {
          summer: ['Sommer', 'Fahrt früh zur Amalfiküste, nach Pompeji oder Paestum. In den heißesten Stunden plant eine Pause zu Hause oder leichte Aktivitäten ein.'],
          crowd: ['Menschenmengen und Verkehr', 'Für die Küste und Positano besser früh am Morgen losfahren, wenn möglich die Fähre nehmen und nicht zu spät zurückkehren.'],
          noCar: ['Ohne Auto', 'Bevorzugt Salerno, Vietri, Fähren und einfache Strecken. Prüft immer die Busfahrpläne und Verbindungen.'],
          kids: ['Kinder', 'Plant nicht zu viele Stopps an einem Tag. Besser ein bequemer Strand, Pausen und Rückkehr in den heißesten Stunden.'],
          walking: ['Spaziergänge', 'Bringt bequeme Schuhe und Wasser mit. Wege und archäologische Stätten sind am Morgen angenehmer.'],
          early: ['Frühe Rückkehr', 'Der Reiseplan lässt Raum, um Ruhe, Privatsphäre und die Kühle von A Casa di Marco zu genießen.'],
          food: ['Essen', 'Für konkrete Adressen öffnet den Bereich „Wo essen“ im Guide und wählt passend zur Gegend des Tages.']
        },
        personalNote: 'Ihr habt geschrieben: „{note}“. Nutzt diese Notiz, um bereits gesehene Stopps zu ersetzen.',
        summary: {
          dayUnit: { one: 'Tag', other: 'Tage' },
          pace: 'Tempo',
          interests: 'Interessen',
          mixDefault: 'Mix aus Salerno und Umgebung',
          food: 'Food'
        },
        header: 'Reiseplan A Casa di Marco\n\n',
        dayName: 'Tag',
        slotNames: ['Vormittag', 'Mittagessen', 'Nachmittag', 'Abend'],
        recsIntro: 'Tipps aus dem Guide:',
        copied: 'Reiseplan kopiert',
        copy: 'Reiseplan kopieren'
      }
    };

export const valueLabels: Record<Lang, Record<string, string>> = {
        it: { car:'con auto', 'no-car':'senza auto', mixed:'auto alcuni giorni', relax:'relax', balanced:'equilibrato', full:'intenso', sea:'mare', coast:'Costiera', culture:'cultura', food:'food', nature:'natura', shopping:'shopping', villages:'borghi', romantic:'romantico', typical:'tipico', pizza:'pizza', fish:'pesce', street:'street food', dessert:'dolci', view:'vista mare' },
        en: { car:'by car', 'no-car':'without a car', mixed:'car on some days', relax:'relaxed', balanced:'balanced', full:'intense', sea:'sea', coast:'Amalfi Coast', culture:'culture', food:'food', nature:'nature', shopping:'shopping', villages:'villages', romantic:'romantic', typical:'typical', pizza:'pizza', fish:'fish', street:'street food', dessert:'desserts', view:'sea view' },
        es: { car:'con coche', 'no-car':'sin coche', mixed:'coche algunos días', relax:'relax', balanced:'equilibrado', full:'intenso', sea:'mar', coast:'Costa Amalfitana', culture:'cultura', food:'food', nature:'naturaleza', shopping:'compras', villages:'pueblos', romantic:'romántico', typical:'típico', pizza:'pizza', fish:'pescado', street:'street food', dessert:'dulces', view:'vista al mar' },
        fr: { car:'en voiture', 'no-car':'sans voiture', mixed:'voiture certains jours', relax:'détendu', balanced:'équilibré', full:'intense', sea:'mer', coast:'côte amalfitaine', culture:'culture', food:'food', nature:'nature', shopping:'shopping', villages:'villages', romantic:'romantique', typical:'typique', pizza:'pizza', fish:'poisson', street:'street food', dessert:'douceurs', view:'vue sur la mer' },
        de: { car:'mit Auto', 'no-car':'ohne Auto', mixed:'Auto an manchen Tagen', relax:'entspannt', balanced:'ausgewogen', full:'intensiv', sea:'Meer', coast:'Amalfiküste', culture:'Kultur', food:'Food', nature:'Natur', shopping:'Shopping', villages:'Dörfer', romantic:'romantisch', typical:'typisch', pizza:'Pizza', fish:'Fisch', street:'Street Food', dessert:'Süßes', view:'Meerblick' }
      };
