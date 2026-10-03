// AUTO-GENERATO da scripts/build-experience-data.mjs — non modificare a mano.
// Fonte: public/mangiare.html (dati verbatim, 5 lingue).
import type { Lang } from "@/lib/i18n";

export type Restaurant = {
  image?: string;
  price?: string;
  featured?: boolean;
  recommended?: boolean;
  walkable?: boolean;
  mapsUrl?: string;
  mapsQuery?: string;
  tip?: Record<Lang, string>;
  name: Record<Lang, string>;
  desc: Record<Lang, string>;
};

export type FoodCategory = { title: Record<Lang, string>; restaurants: Restaurant[] };

export const categories: Record<string, FoodCategory> = {
      pizza: {
        title: {
          it: "Pizzerie consigliate",
          en: "Recommended pizzerias",
          es: "Pizzerías recomendadas",
          fr: "Pizzerias recommandées",
          de: "Empfohlene Pizzerien",
        },
        restaurants: [
          {
            image: "assets/a-modo-bio.jpg",
            price: "€€",
            featured: true,
            walkable: true,
            mapsQuery: "A Modo Bio Brignano Salerno",
            name: {
              it: "A Modo Bio",
              en: "A Modo Bio",
              es: "A Modo Bio",
              fr: "A Modo Bio",
              de: "A Modo Bio",
            },
            desc: {
              it: "Pizzeria vicina alla casa, comoda se non volete spostarvi troppo. È una buona soluzione per una pizza semplice, veloce e raggiungibile a piedi.",
              en: "A pizzeria close to the house, convenient if you do not want to go too far. A good option for a simple, quick pizza within walking distance.",
              es: "Una pizzería cerca de la casa, cómoda si no queréis desplazaros demasiado. Una buena opción para una pizza sencilla, rápida y a poca distancia a pie.",
              fr: "Une pizzeria proche de la maison, pratique si vous ne voulez pas trop vous éloigner. Une bonne option pour une pizza simple et rapide, accessible à pied.",
              de: "Eine Pizzeria in der Nähe des Hauses, praktisch wenn ihr euch nicht zu weit entfernen möchtet. Eine gute Option für eine einfache, schnelle Pizza, zu Fuß erreichbar.",
            },
            tip: {
              it: "Vicino casa e raggiungibile a piedi: perfetta per una serata tranquilla senza prendere l’auto.",
              en: "Close to the house and reachable on foot: perfect for a quiet evening without taking the car.",
              es: "Cerca de la casa y accesible a pie: perfecta para una noche tranquila sin coger el coche.",
              fr: "Proche de la maison et accessible à pied : parfait pour une soirée tranquille sans prendre la voiture.",
              de: "Nah am Haus und zu Fuß erreichbar: perfekt für einen ruhigen Abend, ohne das Auto zu nehmen.",
            }
          },

          {
            image: "assets/errico-porzio-salerno.jpg",
            price: "€€",
            mapsUrl: "https://g.co/kgs/Dia6YTf",
            name: {
              it: "Pizzeria Errico Porzio Salerno",
              en: "Pizzeria Errico Porzio Salerno",
              es: "Pizzeria Errico Porzio Salerno",
              fr: "Pizzeria Errico Porzio Salerno",
              de: "Pizzeria Errico Porzio Salerno",
            },
            desc: {
              it: "Una pizzeria molto conosciuta, ideale se volete provare una pizza napoletana ricca, scenografica e molto social.",
              en: "A very well-known pizzeria, ideal if you want to try a rich, eye-catching and very popular Neapolitan-style pizza.",
              es: "Una pizzería muy conocida, ideal si queréis probar una pizza napolitana abundante, llamativa y muy popular.",
              fr: "Une pizzeria très connue, idéale si vous voulez goûter une pizza napolitaine généreuse, spectaculaire et très populaire.",
              de: "Eine sehr bekannte Pizzeria, ideal wenn ihr eine üppige, spektakuläre und sehr beliebte neapolitanische Pizza probieren möchtet.",
            },
            tip: {
              it: "Perfetta se vi piacciono pizze abbondanti e gusti particolari.",
              en: "Perfect if you like generous pizzas and special flavours.",
              es: "Perfecta si os gustan las pizzas abundantes y los sabores especiales.",
              fr: "Parfaite si vous aimez les pizzas généreuses et les saveurs originales.",
              de: "Perfekt, wenn ihr üppige Pizzen und besondere Geschmacksrichtungen mögt.",
            }
          },
          {
            image: "assets/pizzium-salerno.jpg",
            price: "€€",
            mapsUrl: "https://g.co/kgs/Mm7WKix",
            name: {
              it: "Pizzium - Salerno",
              en: "Pizzium - Salerno",
              es: "Pizzium - Salerno",
              fr: "Pizzium - Salerno",
              de: "Pizzium - Salerno",
            },
            desc: {
              it: "Pizzeria colorata e moderna, con pizze ispirate alle diverse regioni italiane.",
              en: "A colourful and modern pizzeria, with pizzas inspired by different Italian regions.",
              es: "Una pizzería colorida y moderna, con pizzas inspiradas en distintas regiones italianas.",
              fr: "Une pizzeria colorée et moderne, avec des pizzas inspirées des différentes régions italiennes.",
              de: "Eine bunte und moderne Pizzeria mit Pizzen, die von den verschiedenen italienischen Regionen inspiriert sind.",
            },
            tip: {
              it: "Scegliete una pizza regionale se volete provare qualcosa di diverso dalla classica margherita.",
              en: "Choose a regional pizza if you want to try something different from the classic margherita.",
              es: "Elegid una pizza regional si queréis probar algo distinto de la clásica margarita.",
              fr: "Choisissez une pizza régionale si vous voulez essayer autre chose que la classique margherita.",
              de: "Wählt eine regionale Pizza, wenn ihr etwas anderes als die klassische Margherita probieren möchtet.",
            }
          },
          {
            image: "assets/giagiu.jpg",
            price: "€€",
            mapsUrl: "https://g.co/kgs/ukU2iTp",
            name: {
              it: "Giagiù",
              en: "Giagiù",
              es: "Giagiù",
              fr: "Giagiù",
              de: "Giagiù",
            },
            desc: {
              it: "Locale consigliato per una pizza buona in un ambiente curato e piacevole.",
              en: "A recommended place for good pizza in a pleasant and well-kept setting.",
              es: "Un lugar recomendado para una buena pizza en un ambiente agradable y cuidado.",
              fr: "Une adresse conseillée pour une bonne pizza dans un cadre agréable et soigné.",
              de: "Ein empfohlener Ort für eine gute Pizza in einem angenehmen und gepflegten Ambiente.",
            },
            tip: {
              it: "Ottimo se cercate una pizzeria non troppo informale ma comunque accogliente.",
              en: "Great if you are looking for a pizzeria that is not too informal but still welcoming.",
              es: "Ideal si buscáis una pizzería no demasiado informal pero acogedora.",
              fr: "Idéal si vous cherchez une pizzeria pas trop informelle mais accueillante.",
              de: "Ideal, wenn ihr eine Pizzeria sucht, die nicht zu informell, aber dennoch einladend ist.",
            }
          },
          {
            image: "assets/da-michele-salerno.jpg",
            price: "€",
            mapsQuery: "Da Michele Salerno",
            name: {
              it: "Da Michele Salerno",
              en: "Da Michele Salerno",
              es: "Da Michele Salerno",
              fr: "Da Michele Salerno",
              de: "Da Michele Salerno",
            },
            desc: {
              it: "Una scelta perfetta per chi vuole una pizza classica, semplice e legata alla tradizione napoletana.",
              en: "A perfect choice for those who want a classic, simple pizza linked to Neapolitan tradition.",
              es: "Una opción perfecta para quienes quieren una pizza clásica, sencilla y ligada a la tradición napolitana.",
              fr: "Un choix parfait pour ceux qui veulent une pizza classique, simple et liée à la tradition napolitaine.",
              de: "Eine perfekte Wahl für alle, die eine klassische, einfache Pizza möchten, die der neapolitanischen Tradition treu bleibt.",
            },
            tip: {
              it: "Provate la margherita o la marinara.",
              en: "Try the margherita or marinara.",
              es: "Probad la margarita o la marinara.",
              fr: "Goûtez la margherita ou la marinara.",
              de: "Probiert die Margherita oder die Marinara.",
            }
          },
          {
            image: "assets/pepe-nero.jpg",
            price: "€€",
            mapsQuery: "Pepe Nero Salerno",
            name: {
              it: "Pepe Nero",
              en: "Pepe Nero",
              es: "Pepe Nero",
              fr: "Pepe Nero",
              de: "Pepe Nero",
            },
            desc: {
              it: "Locale versatile: va bene per pizza, piatti di pesce e cucina di terra.",
              en: "A versatile place: good for pizza, seafood dishes and meat/local cuisine.",
              es: "Un lugar versátil: va bien para pizza, platos de pescado y cocina de tierra.",
              fr: "Une adresse polyvalente : idéale pour la pizza, les plats de poisson et la cuisine de terre.",
              de: "Ein vielseitiger Ort: ideal für Pizza, Fischgerichte und Landküche.",
            },
            tip: {
              it: "Sceglietelo se nel gruppo non tutti hanno voglia della stessa cosa.",
              en: "Choose it if not everyone in the group wants the same type of food.",
              es: "Elegidlo si en el grupo no todos quieren comer lo mismo.",
              fr: "Choisissez-le si tout le groupe n’a pas envie de la même chose.",
              de: "Wählt ihn, wenn nicht alle in der Gruppe dasselbe essen möchten.",
            }
          },
          {
            image: "assets/granammare.jpg",
            price: "€€",
            mapsQuery: "Granammare Pizza Fritti Cocktail Salerno",
            name: {
              it: "Granammare - Pizza, Fritti e Cocktail",
              en: "Granammare - Pizza, Fried Food and Cocktails",
              es: "Granammare - Pizza, Fritos y Cócteles",
              fr: "Granammare - Pizza, Fritures et Cocktails",
              de: "Granammare - Pizza, Frittiertes und Cocktails",
            },
            desc: {
              it: "Locale consigliato per pizza, fritti e cocktail. Comodo anche se preferite ordinare da asporto o takeaway.",
              en: "A recommended place for pizza, fried food and cocktails. Also convenient if you prefer takeaway.",
              es: "Un lugar recomendado para pizza, fritos y cócteles. También cómodo si preferís pedir para llevar.",
              fr: "Une adresse conseillée pour pizza, fritures et cocktails. Pratique aussi si vous préférez commander à emporter.",
              de: "Ein empfohlener Ort für Pizza, Frittiertes und Cocktails. Auch praktisch, wenn ihr lieber zum Mitnehmen bestellt.",
            },
            tip: {
              it: "Ottima scelta se volete qualcosa di sfizioso e informale, anche da portare a casa.",
              en: "A great choice if you want something tasty and informal, also to take home.",
              es: "Una buena opción si queréis algo sabroso e informal, también para llevar a casa.",
              fr: "Un bon choix si vous voulez quelque chose de gourmand et informel, aussi à emporter.",
              de: "Eine gute Wahl, wenn ihr etwas Leckeres und Ungezwungenes wollt – auch zum Mitnehmen nach Hause.",
            }
          },
          {
            image: "assets/crosta-pizza-in-teglia.jpg",
            price: "€€",
            mapsQuery: "Crosta Pizza in Teglia Salerno",
            name: {
              it: "Crosta Pizza in Teglia",
              en: "Crosta Pizza in Teglia",
              es: "Crosta Pizza in Teglia",
              fr: "Crosta Pizza in Teglia",
              de: "Crosta Pizza in Teglia",
            },
            desc: {
              it: "Locale consigliato se avete voglia di pizza in teglia, più pratica e informale rispetto alla classica pizzeria. Perfetta per qualcosa di veloce ma sfizioso.",
              en: "Recommended if you feel like tray pizza, more casual and practical than a traditional pizzeria. Perfect for something quick but tasty.",
              es: "Recomendado si os apetece pizza en bandeja, más práctica e informal que una pizzería clásica. Perfecta para algo rápido pero sabroso.",
              fr: "Conseillé si vous avez envie de pizza à la plaque, plus pratique et informelle qu'une pizzeria classique. Parfaite pour quelque chose de rapide mais gourmand.",
              de: "Empfohlen, wenn ihr Lust auf Blechpizza habt, praktischer und ungezwungener als eine klassische Pizzeria. Perfekt für etwas Schnelles, aber Leckeres.",
            },
            tip: {
              it: "Ottima scelta se volete mangiare pizza senza una cena troppo impegnativa.",
              en: "A great choice if you want pizza without a full sit-down dinner.",
              es: "Buena opción si queréis comer pizza sin una cena demasiado formal.",
              fr: "Très bon choix si vous voulez manger une pizza sans faire un vrai dîner au restaurant.",
              de: "Eine sehr gute Wahl, wenn ihr Pizza essen wollt, ohne ein großes Abendessen im Restaurant zu machen.",
            }
          },
          {
            image: "assets/opificio-laboratorio-pizza.jpg",
            price: "€€",
            mapsQuery: "Opificio Il Laboratorio della Pizza Salerno",
            name: {
              it: "Opificio - Il Laboratorio della Pizza",
              en: "Opificio - Il Laboratorio della Pizza",
              es: "Opificio - Il Laboratorio della Pizza",
              fr: "Opificio - Il Laboratorio della Pizza",
              de: "Opificio - Il Laboratorio della Pizza",
            },
            desc: {
              it: "Pizzeria consigliata per chi vuole provare una pizza più curata, con impasti e abbinamenti particolari. Adatta a chi cerca qualcosa di diverso dalla solita pizza.",
              en: "Recommended for those who want a more refined pizza, with special doughs and combinations. Suitable if you are looking for something different from the usual pizza.",
              es: "Pizzería recomendada para quien quiere probar una pizza más cuidada, con masas y combinaciones especiales. Ideal si buscáis algo diferente de la pizza habitual.",
              fr: "Pizzeria conseillée pour ceux qui veulent goûter une pizza plus travaillée, avec des pâtes et associations particulières. Idéale si vous cherchez quelque chose de différent de la pizza classique.",
              de: "Empfohlene Pizzeria für alle, die eine raffiniertere Pizza mit besonderen Teigen und Kombinationen probieren möchten. Ideal, wenn ihr etwas anderes als die klassische Pizza sucht.",
            },
            tip: {
              it: "Consigliata se vi piace provare pizze più particolari e non solo le classiche.",
              en: "Recommended if you like trying more special pizzas, not only the classic ones.",
              es: "Recomendada si os gusta probar pizzas más especiales, no solo las clásicas.",
              fr: "Conseillée si vous aimez goûter des pizzas plus originales, pas seulement les classiques.",
              de: "Empfohlen, wenn ihr gerne ausgefallenere Pizzen probiert und nicht nur die Klassiker.",
            }
          }
        ]
      },

      ristoranti: {
        title: {
          it: "Cucina di mare o di terra",
          en: "Seafood or local cuisine",
          es: "Cocina de mar o de tierra",
          fr: "Cuisine de mer ou de terre",
          de: "Fisch- oder Landküche",
        },
        restaurants: [
          {
            image: "assets/pescheria-salerno.jpg",
            price: "€€€",
            mapsQuery: "Pescheria Salerno Corso Garibaldi 227",
            name: {
              it: "Pescheria",
              en: "Pescheria",
              es: "Pescheria",
              fr: "Pescheria",
              de: "Pescheria",
            },
            desc: {
              it: "Ristorante di pesce elegante nel centro di Salerno, consigliato per una cena di mare più curata e speciale.",
              en: "An elegant seafood restaurant in central Salerno, recommended for a more refined and special seafood dinner.",
              es: "Restaurante de pescado elegante en el centro de Salerno, recomendado para una cena de mar más cuidada y especial.",
              fr: "Restaurant de poisson élégant au centre de Salerne, conseillé pour un dîner de la mer plus raffiné et spécial.",
              de: "Ein elegantes Fischrestaurant im Zentrum von Salerno, empfohlen für ein raffinierteres und besonderes Fischdinner.",
            },
            tip: {
              it: "Consigliato per una cena speciale. Fascia di prezzo alta, ma adatto se volete mangiare pesce di qualità.",
              en: "Recommended for a special dinner. Higher price range, but ideal if you want quality seafood.",
              es: "Recomendado para una cena especial. Rango de precio alto, pero ideal si queréis comer pescado de calidad.",
              fr: "Conseillé pour un dîner spécial. Prix plus élevé, mais idéal si vous voulez manger du poisson de qualité.",
              de: "Empfohlen für ein besonderes Abendessen. Höhere Preisklasse, aber ideal, wenn ihr qualitativ hochwertigen Fisch essen möchtet.",
            }
          },
          {
            image: "assets/osso-salerno.jpg",
            price: "€€€",
            mapsQuery: "Osso Salerno Piazza Sedile di Portanova",
            name: {
              it: "Osso Salerno",
              en: "Osso Salerno",
              es: "Osso Salerno",
              fr: "Osso Salerno",
              de: "Osso Salerno",
            },
            desc: {
              it: "Braceria e ristorante di carne nel centro di Salerno, ideale per chi vuole una cena più importante con tagli selezionati.",
              en: "A steakhouse and meat restaurant in central Salerno, ideal for a more important dinner with selected cuts of meat.",
              es: "Bracería y restaurante de carne en el centro de Salerno, ideal para una cena más especial con cortes seleccionados.",
              fr: "Brasserie/restaurant de viande au centre de Salerne, idéal pour un dîner plus spécial avec des morceaux sélectionnés.",
              de: "Steakhouse und Fleischrestaurant im Zentrum von Salerno, ideal für ein besonderes Abendessen mit ausgewählten Fleischstücken.",
            },
            tip: {
              it: "Perfetto per gli amanti della carne. Locale molto buono, ma da considerare come fascia più costosa.",
              en: "Perfect for meat lovers. Very good restaurant, but to be considered a more expensive option.",
              es: "Perfecto para amantes de la carne. Muy buen restaurante, pero de una franja más cara.",
              fr: "Parfait pour les amateurs de viande. Très bon restaurant, mais à considérer comme une option plus chère.",
              de: "Perfekt für Fleischliebhaber. Sehr gutes Restaurant, aber als teurere Option einzuplanen.",
            }
          },
          {
            image: "assets/al-dente-spaghetteria.jpg",
            price: "€€",
            mapsQuery: "Al Dente Spaghetteria Salerno",
            name: {
              it: "Al Dente Spaghetteria",
              en: "Al Dente Spaghetteria",
              es: "Al Dente Spaghetteria",
              fr: "Al Dente Spaghetteria",
              de: "Al Dente Spaghetteria",
            },
            desc: {
              it: "Locale perfetto se avete voglia di pasta. Propone spaghetti artigianali e piatti della tradizione mediterranea.",
              en: "Perfect if you feel like pasta. It offers artisan spaghetti and Mediterranean traditional dishes.",
              es: "Perfecto si os apetece pasta. Ofrece spaghetti artesanales y platos de la tradición mediterránea.",
              fr: "Parfait si vous avez envie de pâtes. On y trouve des spaghetti artisanaux et des plats de tradition méditerranéenne.",
              de: "Perfekt, wenn ihr Lust auf Pasta habt. Hier gibt es handgemachte Spaghetti und Gerichte aus der mediterranen Tradition.",
            },
            tip: {
              it: "Consigliato per chi vuole un buon piatto di pasta senza scegliere un ristorante troppo impegnativo.",
              en: "Recommended if you want a good pasta dish without choosing a too formal restaurant.",
              es: "Recomendado si queréis un buen plato de pasta sin elegir un restaurante demasiado formal.",
              fr: "Conseillé si vous voulez un bon plat de pâtes sans choisir un restaurant trop formel.",
              de: "Empfohlen, wenn ihr ein gutes Pastagericht wollt, ohne ein allzu formelles Restaurant zu wählen.",
            }
          },
          {
            image: "assets/casa-ragusa.jpg",
            price: "€€",
            featured: true,
            recommended: true,
            mapsQuery: "Casa Ragùsa Salerno",
            name: {
              it: "Casa Ragùsa",
              en: "Casa Ragùsa",
              es: "Casa Ragùsa",
              fr: "Casa Ragùsa",
              de: "Casa Ragùsa",
            },
            desc: {
              it: "Ristorante di cucina tipica con pasta fresca fatta a mano. Molto particolare e bello da consigliare ai turisti.",
              en: "A traditional restaurant with handmade fresh pasta. Very special and a great recommendation for tourists.",
              es: "Restaurante de cocina típica con pasta fresca hecha a mano. Muy especial y perfecto para recomendar a turistas.",
              fr: "Restaurant de cuisine typique avec pâtes fraîches faites à la main. Très particulier et idéal à conseiller aux touristes.",
              de: "Restaurant mit typischer Küche und handgemachter frischer Pasta. Sehr besonders und ideal, um es Touristen zu empfehlen.",
            },
            tip: {
              it: "Una delle nostre prime scelte: particolare, autentico e molto bello per i turisti. Spesso si vedono anche le signore preparare la pasta fresca.",
              en: "One of our top choices: special, authentic and lovely for tourists. You may even see the ladies preparing fresh pasta.",
              es: "Una de nuestras primeras opciones: especial, auténtico y muy bonito para turistas. A menudo se puede ver a las señoras preparando pasta fresca.",
              fr: "L’un de nos premiers choix : particulier, authentique et très agréable pour les touristes. On peut parfois voir les dames préparer les pâtes fraîches.",
              de: "Eine unserer ersten Empfehlungen: besonders, authentisch und sehr schön für Touristen. Manchmal kann man den Damen beim Zubereiten der frischen Pasta zusehen.",
            }
          },
          {
            image: "assets/il-brigante.jpg",
            price: "€€",
            mapsQuery: "Il Brigante Salerno",
            name: {
              it: "Il Brigante",
              en: "Il Brigante",
              es: "Il Brigante",
              fr: "Il Brigante",
              de: "Il Brigante",
            },
            desc: {
              it: "Ristorante/trattoria consigliato per una cena di cucina locale, con piatti semplici e sapori tradizionali.",
              en: "A restaurant/trattoria recommended for a local dinner, with simple dishes and traditional flavours.",
              es: "Restaurante/trattoria recomendado para una cena de cocina local, con platos sencillos y sabores tradicionales.",
              fr: "Restaurant/trattoria conseillé pour un dîner local, avec des plats simples et des saveurs traditionnelles.",
              de: "Restaurant/Trattoria, empfohlen für ein Abendessen mit lokaler Küche, einfachen Gerichten und traditionellen Aromen.",
            },
            tip: {
              it: "Buona scelta se volete una cena più autentica e meno turistica.",
              en: "A good choice if you want a more authentic and less touristy dinner.",
              es: "Buena opción si queréis una cena más auténtica y menos turística.",
              fr: "Bon choix si vous voulez un dîner plus authentique et moins touristique.",
              de: "Eine gute Wahl, wenn ihr ein authentischeres und weniger touristisches Abendessen möchtet.",
            }
          },
          {
            image: "assets/osteria-canali.jpg",
            price: "€€",
            mapsQuery: "Osteria Canali Salerno",
            name: {
              it: "Osteria Canali",
              en: "Osteria Canali",
              es: "Osteria Canali",
              fr: "Osteria Canali",
              de: "Osteria Canali",
            },
            desc: {
              it: "Osteria nel centro storico, adatta per provare cucina salernitana e piatti della tradizione in un ambiente caratteristico.",
              en: "An osteria in the historic centre, suitable for trying Salerno cuisine and traditional dishes in a characteristic setting.",
              es: "Ostería en el centro histórico, adecuada para probar cocina salernitana y platos tradicionales en un ambiente característico.",
              fr: "Osteria dans le centre historique, idéale pour goûter la cuisine de Salerne et les plats traditionnels dans un cadre typique.",
              de: "Osteria in der Altstadt, ideal um die Küche von Salerno und traditionelle Gerichte in einem typischen Ambiente zu probieren.",
            },
            tip: {
              it: "Perfetta se siete già in centro storico e volete mangiare qualcosa di tipico.",
              en: "Perfect if you are already in the historic centre and want to eat something typical.",
              es: "Perfecta si ya estáis en el centro histórico y queréis comer algo típico.",
              fr: "Parfaite si vous êtes déjà dans le centre historique et que vous voulez manger typique.",
              de: "Perfekt, wenn ihr bereits in der Altstadt seid und etwas Typisches essen möchtet.",
            }
          },
          {
            image: "assets/controvento.jpg",
            price: "€€€",
            mapsQuery: "Controvento Salerno ristorante",
            name: {
              it: "Controvento",
              en: "Controvento",
              es: "Controvento",
              fr: "Controvento",
              de: "Controvento",
            },
            desc: {
              it: "Ristorante di pesce consigliato per una cena più curata, con piatti di mare e atmosfera elegante.",
              en: "A seafood restaurant recommended for a more refined dinner, with seafood dishes and an elegant atmosphere.",
              es: "Restaurante de pescado recomendado para una cena más cuidada, con platos de mar y ambiente elegante.",
              fr: "Restaurant de poisson conseillé pour un dîner plus raffiné, avec des plats de la mer et une ambiance élégante.",
              de: "Ein Fischrestaurant, empfohlen für ein raffinierteres Abendessen mit Fischgerichten und eleganter Atmosphäre.",
            },
            tip: {
              it: "Da scegliere per una cena speciale. Fascia prezzo più alta.",
              en: "Choose it for a special dinner. Higher price range.",
              es: "Elegidlo para una cena especial. Rango de precio más alto.",
              fr: "À choisir pour un dîner spécial. Prix plus élevé.",
              de: "Für ein besonderes Abendessen zu wählen. Höhere Preisklasse.",
            }
          },
          {
            image: "assets/bistrot-di-pescheria.jpg",
            price: "€€€",
            mapsQuery: "Bistrot di Pescheria Salerno",
            name: {
              it: "Bistrot di Pescheria",
              en: "Bistrot di Pescheria",
              es: "Bistrot di Pescheria",
              fr: "Bistrot di Pescheria",
              de: "Bistrot di Pescheria",
            },
            desc: {
              it: "Locale di pesce collegato al concetto di pescheria/bistrot, ideale per chi vuole piatti di mare in un ambiente più ricercato.",
              en: "A seafood place with a fish-shop/bistrot concept, ideal for those who want seafood dishes in a more refined setting.",
              es: "Local de pescado con concepto de pescadería/bistró, ideal para quien quiere platos de mar en un ambiente más cuidado.",
              fr: "Adresse de poisson avec un concept poissonnerie/bistrot, idéale pour ceux qui veulent des plats de la mer dans un cadre plus recherché.",
              de: "Ein Fischlokal mit Konzept Fischhandlung/Bistro, ideal für alle, die Fischgerichte in einem anspruchsvolleren Ambiente möchten.",
            },
            tip: {
              it: "Consigliato se volete mangiare pesce e cercate qualcosa di più particolare.",
              en: "Recommended if you want seafood and are looking for something a little more special.",
              es: "Recomendado si queréis comer pescado y buscáis algo más particular.",
              fr: "Conseillé si vous voulez manger du poisson et cherchez quelque chose de plus particulier.",
              de: "Empfohlen, wenn ihr Fisch essen und etwas Besonderes sucht.",
            }
          },
          {
            image: "assets/nonna-patty.jpg",
            price: "€€",
            mapsQuery: "Nonna Patty Salerno",
            name: {
              it: "Nonna Patty",
              en: "Nonna Patty",
              es: "Nonna Patty",
              fr: "Nonna Patty",
              de: "Nonna Patty",
            },
            desc: {
              it: "Locale consigliato per una cucina semplice e familiare, adatto se cercate un posto informale e accogliente.",
              en: "Recommended for simple and homestyle food, suitable if you are looking for an informal and welcoming place.",
              es: "Recomendado para cocina sencilla y familiar, adecuado si buscáis un lugar informal y acogedor.",
              fr: "Conseillé pour une cuisine simple et familiale, adapté si vous cherchez un endroit informel et accueillant.",
              de: "Empfohlen für einfache, hausgemachte Küche, geeignet wenn ihr einen ungezwungenen und einladenden Ort sucht.",
            },
            tip: {
              it: "Buona opzione se volete qualcosa di tranquillo e senza troppa formalità.",
              en: "A good option if you want something relaxed and not too formal.",
              es: "Buena opción si queréis algo tranquilo y sin demasiada formalidad.",
              fr: "Bonne option si vous voulez quelque chose de tranquille et sans trop de formalités.",
              de: "Eine gute Option, wenn ihr etwas Ruhiges und ohne viel Förmlichkeit wollt.",
            }
          },
          {
            image: "assets/tramp-ristorante.jpg",
            price: "€€",
            featured: true,
            recommended: true,
            mapsQuery: "Tramp Ristorante Salerno",
            name: {
              it: "Tramp Ristorante",
              en: "Tramp Restaurant",
              es: "Tramp Restaurante",
              fr: "Restaurant Tramp",
              de: "Tramp Ristorante",
            },
            desc: {
              it: "Un locale consigliato per chi vuole mangiare pesce fresco a Salerno, in un ambiente informale e piacevole.",
              en: "A recommended place for those who want to eat fresh seafood in Salerno, in an informal and pleasant setting.",
              es: "Un lugar recomendado para quienes quieren comer pescado fresco en Salerno, en un ambiente informal y agradable.",
              fr: "Une adresse conseillée pour ceux qui veulent manger du poisson frais à Salerne, dans une ambiance simple et agréable.",
              de: "Ein empfohlener Ort für alle, die in Salerno frischen Fisch essen möchten, in einem ungezwungenen und angenehmen Ambiente.",
            },
            tip: {
              it: "Il pesce è di qualità. I camerieri sono un po’ sopra le righe: tendono a scherzare con i clienti e a rendere il servizio molto informale e vivace.",
              en: "The seafood is high quality. The waiters are a little over the top: they tend to joke with guests and make the service very informal and lively.",
              es: "El pescado es de calidad. Los camareros son un poco particulares: suelen bromear con los clientes y hacen que el servicio sea muy informal y animado.",
              fr: "Le poisson est de qualité. Les serveurs sont un peu originaux : ils ont tendance à plaisanter avec les clients et rendent le service très informel et vivant.",
              de: "Der Fisch ist von hoher Qualität. Die Kellner sind etwas außergewöhnlich: Sie scherzen gerne mit den Gästen und sorgen für einen sehr ungezwungenen und lebhaften Service.",
            }
          },
          {
            image: "assets/convivium-sea-food.jpg",
            price: "€€€",
            mapsQuery: "Convivium Sea Food Restaurant Salerno",
            name: {
              it: "Convivium Sea Food Restaurant",
              en: "Convivium Sea Food Restaurant",
              es: "Convivium Sea Food Restaurant",
              fr: "Convivium Sea Food Restaurant",
              de: "Convivium Sea Food Restaurant",
            },
            desc: {
              it: "Ristorante elegante, ideale per una cena più curata, con piatti di mare e proposte ispirate alla tradizione campana.",
              en: "An elegant restaurant, ideal for a more refined dinner, with seafood dishes inspired by Campania’s tradition.",
              es: "Restaurante elegante, ideal para una cena más cuidada, con platos de mar inspirados en la tradición de Campania.",
              fr: "Restaurant élégant, idéal pour un dîner plus raffiné, avec des plats de la mer inspirés de la tradition campanienne.",
              de: "Ein elegantes Restaurant, ideal für ein raffinierteres Abendessen, mit Fischgerichten, die von der Tradition Kampaniens inspiriert sind.",
            },
            tip: {
              it: "Perfetto per una cena romantica o per una serata speciale.",
              en: "Perfect for a romantic dinner or a special evening.",
              es: "Perfecto para una cena romántica o una noche especial.",
              fr: "Parfait pour un dîner romantique ou une soirée spéciale.",
              de: "Perfekt für ein romantisches Abendessen oder einen besonderen Abend.",
            }
          },
          {
            image: "assets/da-nonna-maria.jpg",
            price: "€€",
            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Da+Nonna+Maria+Salerno",
            name: {
              it: "Da Nonna Maria",
              en: "Da Nonna Maria",
              es: "Da Nonna Maria",
              fr: "Da Nonna Maria",
              de: "Da Nonna Maria",
            },
            desc: {
              it: "Un posto adatto per chi cerca cucina semplice, tradizionale e sapori di casa.",
              en: "A good place for those looking for simple, traditional food and home-style flavours.",
              es: "Un lugar adecuado para quienes buscan cocina sencilla, tradicional y sabores caseros.",
              fr: "Une bonne adresse pour ceux qui cherchent une cuisine simple, traditionnelle et familiale.",
              de: "Eine gute Adresse für alle, die einfache, traditionelle und hausgemachte Küche suchen.",
            },
            tip: {
              it: "Ideale per provare piatti più autentici e meno turistici.",
              en: "Ideal for trying more authentic and less touristy dishes.",
              es: "Ideal para probar platos más auténticos y menos turísticos.",
              fr: "Idéal pour goûter des plats plus authentiques et moins touristiques.",
              de: "Ideal, um authentischere und weniger touristische Gerichte zu probieren.",
            }
          },
          {
            image: "assets/la-botte-pazza.jpg",
            price: "€€",
            mapsUrl: "https://www.google.com/maps/search/?api=1&query=La+Botte+Pazza+Salerno",
            name: {
              it: "La Botte Pazza",
              en: "La Botte Pazza",
              es: "La Botte Pazza",
              fr: "La Botte Pazza",
              de: "La Botte Pazza",
            },
            desc: {
              it: "Locale consigliato per una cena tipica e conviviale, con piatti saporiti e atmosfera informale.",
              en: "A recommended place for a typical and convivial dinner, with tasty dishes and an informal atmosphere.",
              es: "Un lugar recomendado para una cena típica y agradable, con platos sabrosos y ambiente informal.",
              fr: "Une adresse conseillée pour un dîner typique et convivial, avec des plats savoureux et une ambiance simple.",
              de: "Ein empfohlener Ort für ein typisches und geselliges Abendessen mit schmackhaften Gerichten und ungezwungener Atmosphäre.",
            },
            tip: {
              it: "Perfetto se volete una serata semplice, buona e molto salernitana.",
              en: "Perfect if you want a simple, good and very local evening.",
              es: "Perfecto si queréis una noche sencilla, buena y muy local.",
              fr: "Parfait si vous voulez une soirée simple, bonne et très locale.",
              de: "Perfekt, wenn ihr einen einfachen, guten und sehr lokalen Abend verbringen möchtet.",
            }
          },
          {
            image: "assets/pepe-nero.jpg",
            price: "€€",
            mapsQuery: "Pepe Nero Salerno",
            name: {
              it: "Pepe Nero",
              en: "Pepe Nero",
              es: "Pepe Nero",
              fr: "Pepe Nero",
              de: "Pepe Nero",
            },
            desc: {
              it: "Locale versatile: va bene sia per piatti di mare sia per cucina di terra, quindi è comodo quando nel gruppo ci sono gusti diversi.",
              en: "A versatile place, good for both seafood and local/meat dishes, convenient when people in the group have different tastes.",
              es: "Un lugar versátil, válido tanto para platos de mar como para cocina de tierra, cómodo cuando en el grupo hay gustos diferentes.",
              fr: "Une adresse polyvalente, idéale pour les plats de mer comme pour la cuisine de terre, pratique quand le groupe a des goûts différents.",
              de: "Ein vielseitiger Ort, ideal für Fischgerichte ebenso wie für Landküche, praktisch wenn die Gruppe unterschiedliche Geschmäcker hat.",
            },
            tip: {
              it: "Sceglietelo se nel gruppo non tutti hanno voglia della stessa cosa.",
              en: "Choose it if not everyone in the group wants the same type of food.",
              es: "Elegidlo si en el grupo no todos quieren comer lo mismo.",
              fr: "Choisissez-le si tout le groupe n’a pas envie de la même chose.",
              de: "Wählt ihn, wenn nicht alle in der Gruppe dasselbe essen möchten.",
            }
          }
        ]
      },

      gelato: {
        title: {
          it: "Gelato e dolci",
          en: "Gelato and desserts",
          es: "Helado y dulces",
          fr: "Glaces et desserts",
          de: "Eis und Desserts",
        },
        restaurants: [
          {
            image: "assets/bar-gelateria-nettuno.jpg",
            price: "€",
            mapsQuery: "Bar Gelateria Nettuno Salerno",
            name: {
              it: "Bar Gelateria Nettuno",
              en: "Bar Gelateria Nettuno",
              es: "Bar Gelateria Nettuno",
              fr: "Bar Gelateria Nettuno",
              de: "Bar Gelateria Nettuno",
            },
            desc: {
              it: "A Salerno è quasi una legge: da Nettuno bisogna prendere la brioche con il gelato. È una delle esperienze più salernitane, soprattutto in estate.",
              en: "In Salerno, it is almost a rule: at Nettuno you have to try the brioche with gelato. It is one of the most authentic local experiences, especially in summer.",
              es: "En Salerno es casi una regla: en Nettuno hay que probar la brioche con helado. Es una de las experiencias más auténticas de la ciudad, sobre todo en verano.",
              fr: "À Salerne, c’est presque une règle : chez Nettuno, il faut goûter la brioche avec glace. C’est l’une des expériences les plus typiques, surtout en été.",
              de: "In Salerno ist es fast ein Gesetz: Bei Nettuno muss man die Brioche mit Eis probieren. Es ist eines der typischsten Erlebnisse der Stadt, besonders im Sommer.",
            },
            tip: {
              it: "Ci sono due sedi. Quella sul lungomare è più turistica e spesso affollata; quella a Mercatello è meno turistica, ma molto frequentata dai salernitani. Provate nocciotella o pistacchio.",
              en: "There are two locations. The seafront one is more touristy and often crowded; the Mercatello one is less touristy but very popular with locals. Try nocciotella or pistachio.",
              es: "Hay dos sedes. La del paseo marítimo es más turística y suele estar llena; la de Mercatello es menos turística, pero muy frecuentada por los salernitanos. Probad nocciotella o pistacho.",
              fr: "Il y a deux adresses. Celle du front de mer est plus touristique et souvent bondée ; celle de Mercatello est moins touristique, mais très fréquentée par les habitants. Goûtez la nocciotella ou la pistache.",
              de: "Es gibt zwei Standorte. Der an der Uferpromenade ist touristischer und oft voll; der in Mercatello ist weniger touristisch, aber bei den Einheimischen sehr beliebt. Probiert Nocciotella oder Pistazie.",
            }
          },
          {
            image: "assets/pantaleone.jpg",
            price: "€€",
            mapsQuery: "Antica Dolceria Pantaleone Salerno",
            name: {
              it: "Antica Dolceria Pantaleone",
              en: "Antica Dolceria Pantaleone",
              es: "Antica Dolceria Pantaleone",
              fr: "Antica Dolceria Pantaleone",
              de: "Antica Dolceria Pantaleone",
            },
            desc: {
              it: "Storica pasticceria nel centro di Salerno, perfetta per assaggiare dolci della tradizione in un luogo pieno di storia.",
              en: "A historic pastry shop in the centre of Salerno, perfect for tasting traditional desserts in a place full of history.",
              es: "Una pastelería histórica en el centro de Salerno, perfecta para probar dulces tradicionales en un lugar lleno de historia.",
              fr: "Une pâtisserie historique au centre de Salerne, idéale pour goûter des desserts traditionnels dans un lieu chargé d’histoire.",
              de: "Eine historische Konditorei im Zentrum von Salerno, ideal um traditionelle Desserts an einem geschichtsträchtigen Ort zu probieren.",
            },
            tip: {
              it: "Provate la Scazzetta, uno dei dolci simbolo di Salerno.",
              en: "Try the Scazzetta, one of Salerno’s signature desserts.",
              es: "Probad la Scazzetta, uno de los dulces símbolo de Salerno.",
              fr: "Goûtez la Scazzetta, l’un des desserts emblématiques de Salerne.",
              de: "Probiert die Scazzetta, eines der Wahrzeichen-Desserts von Salerno.",
            }
          },
          {
            image: "assets/bar-delle-sirene.jpg",
            price: "€",
            mapsQuery: "Bar delle Sirene Salerno",
            name: {
              it: "Bar delle Sirene",
              en: "Bar delle Sirene",
              es: "Bar delle Sirene",
              fr: "Bar delle Sirene",
              de: "Bar delle Sirene",
            },
            desc: {
              it: "Un bar storico e molto conosciuto a Salerno, perfetto per una pausa dolce, un gelato o qualcosa di fresco durante una passeggiata.",
              en: "A well-known historic bar in Salerno, perfect for a sweet break, gelato or something refreshing during a walk.",
              es: "Un bar histórico y muy conocido en Salerno, perfecto para una pausa dulce, un helado o algo fresco durante un paseo.",
              fr: "Un bar historique et très connu à Salerne, idéal pour une pause sucrée, une glace ou quelque chose de frais pendant une promenade.",
              de: "Ein historisches und sehr bekanntes Café in Salerno, ideal für eine süße Pause, ein Eis oder etwas Erfrischendes während eines Spaziergangs.",
            },
            tip: {
              it: "Perfetto se siete già in centro o sul lungomare e volete fermarvi senza allontanarvi troppo.",
              en: "Perfect if you are already in the centre or near the seafront and want to stop without going too far.",
              es: "Perfecto si ya estáis en el centro o cerca del paseo marítimo y queréis hacer una parada sin alejaros demasiado.",
              fr: "Parfait si vous êtes déjà dans le centre ou près du front de mer et que vous voulez faire une pause sans trop vous éloigner.",
              de: "Perfekt, wenn ihr schon im Zentrum oder an der Uferpromenade seid und eine Pause machen wollt, ohne euch weit zu entfernen.",
            }
          },
          {
            image: "assets/punto-freddo.jpg",
            price: "€",
            mapsQuery: "Punto Freddo Salerno",
            name: {
              it: "Punto Freddo",
              en: "Punto Freddo",
              es: "Punto Freddo",
              fr: "Punto Freddo",
              de: "Punto Freddo",
            },
            desc: {
              it: "Una gelateria semplice e amata, ideale se avete voglia di un buon gelato senza troppi fronzoli.",
              en: "A simple and popular gelato shop, ideal if you want good gelato without too many frills.",
              es: "Una heladería sencilla y apreciada, ideal si os apetece un buen helado sin demasiadas complicaciones.",
              fr: "Un glacier simple et apprécié, idéal si vous avez envie d’une bonne glace sans trop de chichis.",
              de: "Eine einfache und beliebte Eisdiele, ideal wenn ihr Lust auf ein gutes Eis ohne viel Schnickschnack habt.",
            },
            tip: {
              it: "Ottimo per una pausa veloce e fresca, soprattutto nelle giornate calde.",
              en: "Great for a quick and refreshing break, especially on hot days.",
              es: "Ideal para una pausa rápida y refrescante, sobre todo en los días calurosos.",
              fr: "Très bien pour une pause rapide et fraîche, surtout pendant les journées chaudes.",
              de: "Sehr gut für eine schnelle und erfrischende Pause, besonders an heißen Tagen.",
            }
          },

          {
            image: "assets/gelateria-attimi.jpg",
            price: "€€",
            mapsQuery: "Gelateria Attimi Salerno",
            name: {
              it: "Gelateria Attimi",
              en: "Gelateria Attimi",
              es: "Gelateria Attimi",
              fr: "Gelateria Attimi",
              de: "Gelateria Attimi",
            },
            desc: {
              it: "Gelateria consigliata per una pausa dolce, un cono o una coppetta. Ideale se avete voglia di gelato artigianale e volete provare un’alternativa alle gelaterie più famose.",
              en: "Recommended ice cream shop for a sweet break, a cone or a cup. Ideal if you feel like artisan gelato and want to try an alternative to the most famous gelaterias.",
              es: "Heladería recomendada para una pausa dulce, un cono o una copa. Ideal si os apetece helado artesanal y queréis probar una alternativa a las heladerías más famosas.",
              fr: "Glacier conseillé pour une pause sucrée, un cornet ou une coupe. Idéal si vous avez envie de glace artisanale et voulez essayer une alternative aux glaciers les plus connus.",
              de: "Empfohlene Eisdiele für eine süße Pause, einen Becher oder eine Tüte. Ideal, wenn ihr Lust auf handwerklich hergestelltes Eis habt und eine Alternative zu den bekanntesten Eisdielen ausprobieren möchtet.",
            },
            tip: {
              it: "Consiglio: perfetta per un gelato senza scegliere sempre i soliti posti più affollati.",
              en: "Tip: perfect for gelato without always choosing the usual more crowded places.",
              es: "Consejo: perfecta para tomar un helado sin elegir siempre los sitios habituales más llenos.",
              fr: "Conseil : parfaite pour une glace sans toujours choisir les adresses habituelles les plus fréquentées.",
              de: "Tipp: perfekt für ein Eis, ohne immer die üblichen, überfüllten Adressen zu wählen.",
            }
          },

          {
            image: "assets/pasticceria-sal-de-riso.jpg",
            price: "€€",
            mapsQuery: "Pasticceria Sal De Riso Minori",
            name: {
              it: "Pasticceria Sal De Riso",
              en: "Sal De Riso Pastry Shop",
              es: "Pastelería Sal De Riso",
              fr: "Pâtisserie Sal De Riso",
              de: "Pasticceria Sal De Riso",
            },
            desc: {
              it: "A Minori, in Costiera Amalfitana, è una tappa famosa per chi ama i dolci. Perfetta se visitate la Costiera.",
              en: "In Minori, on the Amalfi Coast, this is a famous stop for dessert lovers. Perfect if you are visiting the Coast.",
              es: "En Minori, en la Costa Amalfitana, es una parada famosa para los amantes de los dulces. Perfecta si visitáis la Costa.",
              fr: "À Minori, sur la Côte Amalfitaine, c’est une adresse célèbre pour les amateurs de desserts. Parfait si vous visitez la Côte.",
              de: "In Minori an der Amalfiküste ist dies eine berühmte Adresse für Dessertliebhaber. Perfekt, wenn ihr die Küste besucht.",
            },
            tip: {
              it: "Provate la delizia al limone.",
              en: "Try the lemon delight.",
              es: "Probad la delicia de limón.",
              fr: "Goûtez la délice au citron.",
              de: "Probiert die Delizia al limone (Zitronen-Delizia).",
            }
          },
          {
            image: "assets/vietri-sul-mare.jpg",
            price: "€€",
            mapsQuery: "Eco del Mare gelateria Vietri sul Mare",
            name: {
              it: "Eco del Mare - Vietri",
              en: "Eco del Mare - Vietri",
              es: "Eco del Mare - Vietri",
              fr: "Eco del Mare - Vietri",
              de: "Eco del Mare - Vietri",
            },
            desc: {
              it: "Gelateria artigianale a Vietri sul Mare, perfetta per una pausa dolce dopo una passeggiata tra le ceramiche. Gelati buonissimi con vista mare.",
              en: "Artisan gelato shop in Vietri sul Mare, perfect for a sweet break after a walk among the ceramics. Delicious gelato with sea views.",
              es: "Heladería artesanal en Vietri sul Mare, perfecta para una pausa dulce tras un paseo entre cerámicas. Helados buenísimos con vistas al mar.",
              fr: "Glacier artisanal à Vietri sul Mare, parfait pour une pause sucrée après une promenade parmi les céramiques. Glaces délicieuses avec vue mer.",
              de: "Handwerkliche Eisdiele in Vietri sul Mare, perfekt für eine süße Pause nach einem Spaziergang zwischen den Keramiken. Köstliches Eis mit Meerblick.",
            },
            tip: {
              it: "Fermatevi dopo aver visitato Vietri: gelato artigianale e vista mare.",
              en: "Stop by after visiting Vietri: artisan gelato and sea views.",
              es: "Parad después de visitar Vietri: helado artesanal y vistas al mar.",
              fr: "Arrêtez-vous après avoir visité Vietri : glace artisanale et vue mer.",
              de: "Macht einen Stopp, nachdem ihr Vietri besucht habt: handwerklich hergestelltes Eis und Meerblick.",
            }
          }
        ]
      },

      vino: {
        title: {
          it: "Bar, vino e aperitivo",
          en: "Cafés, wine and aperitivo",
          es: "Bares, vino y aperitivo",
          fr: "Cafés, vin et apéritif",
          de: "Cafés, Wein und Aperitif",
        },
        restaurants: [
          {
            image: "assets/brignan-cafe.jpg",
            price: "€",
            featured: true,
            walkable: true,
            mapsQuery: "Brignan Cafè Salerno Via Brignano Inferiore",
            name: {
              it: "Brignan Cafè",
              en: "Brignan Cafè",
              es: "Brignan Cafè",
              fr: "Brignan Cafè",
              de: "Brignan Cafè",
            },
            desc: {
              it: "Bar convenzionato con A Casa di Marco e molto vicino alla struttura. Comodo se avete voglia di un caffè, una colazione, una pausa veloce o qualcosa da bere senza allontanarvi troppo.",
              en: "Partner café of A Casa di Marco and very close to the property. Convenient if you feel like coffee, breakfast, a quick break or something to drink without going too far.",
              es: "Bar asociado con A Casa di Marco y muy cerca de la casa. Cómodo si os apetece un café, un desayuno, una pausa rápida o algo para beber sin alejaros demasiado.",
              fr: "Café partenaire de A Casa di Marco et très proche de la maison. Pratique si vous avez envie d’un café, d’un petit-déjeuner, d’une pause rapide ou de boire quelque chose sans trop vous éloigner.",
              de: "Partner-Café von A Casa di Marco und ganz in der Nähe der Unterkunft. Praktisch, wenn ihr Lust auf einen Kaffee, Frühstück, eine schnelle Pause oder etwas zu trinken habt, ohne euch weit zu entfernen.",
            },
            tip: {
              it: "Vicino casa: perfetto per un caffè al volo o per una pausa semplice durante la giornata.",
              en: "Close to the house: perfect for a quick coffee or an easy break during the day.",
              es: "Cerca de la casa: perfecto para un café rápido o una pausa sencilla durante el día.",
              fr: "Proche de la maison : parfait pour un café rapide ou une pause simple pendant la journée.",
              de: "Nah am Haus: perfekt für einen schnellen Kaffee oder eine einfache Pause am Tag.",
            }
          },
          {
            image: "assets/compagnia-del-buon-vino.jpg",
            price: "€€",
            mapsQuery: "Compagnia del buon vino Salerno",
            name: {
              it: "Compagnia del Buon Vino",
              en: "Compagnia del Buon Vino",
              es: "Compagnia del Buon Vino",
              fr: "Compagnia del Buon Vino",
              de: "Compagnia del Buon Vino",
            },
            desc: {
              it: "Una wine bar accogliente dove assaggiare vini locali e passare una serata tranquilla.",
              en: "A cosy wine bar where you can taste local wines and enjoy a relaxed evening.",
              es: "Un wine bar acogedor donde probar vinos locales y pasar una noche tranquila.",
              fr: "Un bar à vin chaleureux où déguster des vins locaux et passer une soirée tranquille.",
              de: "Ein gemütliches Weinlokal, wo ihr lokale Weine verkosten und einen ruhigen Abend verbringen könnt.",
            },
            tip: {
              it: "Chiedete un calice di vino campano e fatevi consigliare l’abbinamento.",
              en: "Ask for a glass of Campania wine and let them suggest the pairing.",
              es: "Pedid una copa de vino campano y dejad que os recomienden el maridaje.",
              fr: "Demandez un verre de vin de Campanie et laissez-vous conseiller pour l’accord.",
              de: "Bittet um ein Glas kampanischen Wein und lasst euch die passende Kombination empfehlen.",
            }
          },
          {
            image: "assets/marama-tiki-bar.jpg",
            price: "€€",
            mapsQuery: "Marama Tiki Bar Salerno",
            name: {
              it: "Marama Tiki Bar Salerno",
              en: "Marama Tiki Bar Salerno",
              es: "Marama Tiki Bar Salerno",
              fr: "Marama Tiki Bar Salerno",
              de: "Marama Tiki Bar Salerno",
            },
            desc: {
              it: "Locale ideale per un aperitivo diverso dal solito, cocktail e serata più informale in compagnia.",
              en: "An ideal place for a different kind of aperitivo, cocktails and a relaxed evening with friends.",
              es: "Un lugar ideal para un aperitivo diferente, cócteles y una noche informal en compañía.",
              fr: "Un lieu idéal pour un apéritif différent, des cocktails et une soirée décontractée entre amis.",
              de: "Ein idealer Ort für einen anderen Aperitif, Cocktails und einen lockeren Abend in Gesellschaft.",
            },
            tip: {
              it: "Consigliato se avete voglia di bere qualcosa in un ambiente più giovane e vivace.",
              en: "Recommended if you feel like having a drink in a younger and lively atmosphere.",
              es: "Recomendado si os apetece tomar algo en un ambiente más joven y animado.",
              fr: "Conseillé si vous avez envie de boire quelque chose dans une ambiance plus jeune et animée.",
              de: "Empfohlen, wenn ihr etwas trinken möchtet und ein jüngeres, lebendigeres Ambiente sucht.",
            }
          }
        ]
      },

      panini: {
        title: {
          it: "Panini e sfizi",
          en: "Sandwiches and quick bites",
          es: "Bocadillos y algo rápido",
          fr: "Sandwichs et snacks",
          de: "Panini und Snacks",
        },
        restaurants: [
          {
            image: "assets/ingordo-panini.jpg",
            price: "€€",
            mapsQuery: "Ingordo Panini Salerno",
            name: {
              it: "Ingordo Panini",
              en: "Ingordo Panini",
              es: "Ingordo Panini",
              fr: "Ingordo Panini",
              de: "Ingordo Panini",
            },
            desc: {
              it: "Locale perfetto se avete voglia di un panino ricco, sfizioso e informale. Ideale per una cena veloce senza scegliere un ristorante classico.",
              en: "Perfect if you feel like a rich, tasty and informal sandwich. Ideal for a quick dinner without choosing a traditional restaurant.",
              es: "Perfecto si os apetece un bocadillo abundante, sabroso e informal. Ideal para una cena rápida sin elegir un restaurante clásico.",
              fr: "Parfait si vous avez envie d’un sandwich généreux, gourmand et informel. Idéal pour un dîner rapide sans choisir un restaurant classique.",
              de: "Perfekt, wenn ihr Lust auf ein üppiges, leckeres und ungezwungenes Panino habt. Ideal für ein schnelles Abendessen, ohne ein klassisches Restaurant zu wählen.",
            },
            tip: {
              it: "Consigliato se volete qualcosa di abbondante, veloce e senza troppe formalità.",
              en: "Recommended if you want something generous, quick and very informal.",
              es: "Recomendado si queréis algo abundante, rápido y sin demasiadas formalidades.",
              fr: "Conseillé si vous voulez quelque chose de copieux, rapide et sans trop de formalités.",
              de: "Empfohlen, wenn ihr etwas Üppiges, Schnelles und ohne viel Förmlichkeit wollt.",
            }
          },
          {
            image: "assets/toc-toc.jpg",
            price: "€€",
            mapsQuery: "Toc Toc Salerno",
            name: {
              it: "Toc Toc",
              en: "Toc Toc",
              es: "Toc Toc",
              fr: "Toc Toc",
              de: "Toc Toc",
            },
            desc: {
              it: "Locale informale e carino, adatto per panini, sfizi e una pausa diversa dal solito.",
              en: "A nice informal place, suitable for sandwiches, quick bites and a different kind of break.",
              es: "Un local informal y agradable, adecuado para bocadillos, algo rápido y una pausa diferente.",
              fr: "Une adresse informelle et agréable, adaptée aux sandwichs, snacks et à une pause différente.",
              de: "Ein ungezwungenes und angenehmes Lokal, geeignet für Panini, Snacks und eine etwas andere Pause.",
            },
            tip: {
              it: "Buona scelta se cercate qualcosa di semplice ma più particolare del solito panino.",
              en: "A good choice if you are looking for something simple but a little more special than a usual sandwich.",
              es: "Buena opción si buscáis algo sencillo pero un poco más especial que un bocadillo normal.",
              fr: "Bon choix si vous cherchez quelque chose de simple mais un peu plus original qu’un sandwich classique.",
              de: "Eine gute Wahl, wenn ihr etwas Einfaches, aber etwas Originelleres als ein klassisches Panino sucht.",
            }
          },
          {
            image: "assets/tagliere-e-calice.jpg",
            price: "€€",
            mapsQuery: "Tagliere e Calice Salerno",
            name: {
              it: "Tagliere e Calice",
              en: "Tagliere e Calice",
              es: "Tagliere e Calice",
              fr: "Tagliere e Calice",
              de: "Tagliere e Calice",
            },
            desc: {
              it: "Perfetto per taglieri, salumi, formaggi e un calice di vino. Ideale per una cena leggera o un aperitivo rinforzato.",
              en: "Perfect for boards, cured meats, cheeses and a glass of wine. Ideal for a light dinner or a generous aperitivo.",
              es: "Perfecto para tablas, embutidos, quesos y una copa de vino. Ideal para una cena ligera o un aperitivo abundante.",
              fr: "Parfait pour les planches, charcuteries, fromages et un verre de vin. Idéal pour un dîner léger ou un apéritif copieux.",
              de: "Perfekt für Antipasti-Platten, Aufschnitt, Käse und ein Glas Wein. Ideal für ein leichtes Abendessen oder einen üppigen Aperitif.",
            },
            tip: {
              it: "Ottimo se non volete un pasto completo ma qualcosa di sfizioso da condividere.",
              en: "Great if you do not want a full meal but something tasty to share.",
              es: "Ideal si no queréis una comida completa, sino algo sabroso para compartir.",
              fr: "Idéal si vous ne voulez pas un repas complet mais quelque chose de gourmand à partager.",
              de: "Ideal, wenn ihr keine komplette Mahlzeit wollt, sondern etwas Leckeres zum Teilen.",
            }
          },

          {
            image: "assets/waqas-kebab.jpg",
            price: "€",
            mapsQuery: "Waqas Kebab Salerno",
            name: {
              it: "Waqas Kebab",
              en: "Waqas Kebab",
              es: "Waqas Kebab",
              fr: "Waqas Kebab",
              de: "Waqas Kebab",
            },
            desc: {
              it: "Soluzione economica e veloce se avete voglia di kebab, piadine o qualcosa da mangiare senza troppe attese.",
              en: "A budget-friendly and quick option if you feel like kebab, wraps or something to eat without waiting too long.",
              es: "Opción económica y rápida si os apetece kebab, wraps o algo para comer sin esperar demasiado.",
              fr: "Option économique et rapide si vous avez envie de kebab, wraps ou quelque chose à manger sans trop attendre.",
              de: "Eine günstige und schnelle Option, wenn ihr Lust auf Kebab, Wraps oder etwas zu essen habt, ohne lange zu warten.",
            },
            tip: {
              it: "Perfetto per una cena super informale o per uno spuntino veloce.",
              en: "Perfect for a very informal dinner or a quick snack.",
              es: "Perfecto para una cena muy informal o un snack rápido.",
              fr: "Parfait pour un dîner très informel ou un snack rapide.",
              de: "Perfekt für ein sehr ungezwungenes Abendessen oder einen schnellen Snack.",
            }
          }
        ]
      },

      mondo: {
        title: {
          it: "Cucina del mondo",
          en: "World cuisine",
          es: "Cocina del mundo",
          fr: "Cuisine du monde",
          de: "Küche aus aller Welt",
        },
        restaurants: [
          {
            image: "assets/el-salvador-cantina-messicana.jpg",
            price: "€€",
            mapsQuery: "El Salvador Cantina Messicana Salerno",
            name: {
              it: "El Salvador Cantina Messicana",
              en: "El Salvador Mexican Cantina",
              es: "El Salvador Cantina Mexicana",
              fr: "El Salvador Cantina Mexicaine",
              de: "El Salvador Cantina Messicana",
            },
            desc: {
              it: "Locale consigliato se avete voglia di cucina messicana, tacos, burritos, nachos e sapori più speziati.",
              en: "Recommended if you feel like Mexican food, tacos, burritos, nachos and spicier flavours.",
              es: "Recomendado si os apetece comida mexicana, tacos, burritos, nachos y sabores más especiados.",
              fr: "Conseillé si vous avez envie de cuisine mexicaine, tacos, burritos, nachos et saveurs plus épicées.",
              de: "Empfohlen, wenn ihr Lust auf mexikanische Küche habt: Tacos, Burritos, Nachos und würzigere Aromen.",
            },
            tip: {
              it: "Perfetto per una serata informale e diversa dalla cucina italiana.",
              en: "Perfect for an informal evening and something different from Italian food.",
              es: "Perfecto para una noche informal y algo diferente de la cocina italiana.",
              fr: "Parfait pour une soirée informelle et différente de la cuisine italienne.",
              de: "Perfekt für einen ungezwungenen Abend, der sich von der italienischen Küche unterscheidet.",
            }
          },
          {
            image: "assets/mythos.jpg",
            price: "€€",
            mapsQuery: "Mythos ristorante greco Salerno",
            name: {
              it: "Mythos",
              en: "Mythos",
              es: "Mythos",
              fr: "Mythos",
              de: "Mythos",
            },
            desc: {
              it: "Locale greco, ideale per pita, gyros e piatti semplici ma saporiti. Buona scelta anche per qualcosa di veloce.",
              en: "A Greek place, ideal for pita, gyros and simple but tasty dishes. Also a good choice for something quick.",
              es: "Local griego, ideal para pita, gyros y platos sencillos pero sabrosos. Buena opción también para algo rápido.",
              fr: "Adresse grecque, idéale pour pita, gyros et plats simples mais savoureux. Bon choix aussi pour manger rapidement.",
              de: "Ein griechisches Lokal, ideal für Pita, Gyros und einfache, aber schmackhafte Gerichte. Auch eine gute Wahl, wenn es schnell gehen soll.",
            },
            tip: {
              it: "Scelta economica e pratica se volete qualcosa di diverso ma non troppo impegnativo.",
              en: "A budget-friendly and practical choice if you want something different but not too formal.",
              es: "Opción económica y práctica si queréis algo diferente pero no demasiado formal.",
              fr: "Choix économique et pratique si vous voulez quelque chose de différent mais pas trop formel.",
              de: "Eine günstige und praktische Wahl, wenn ihr etwas anderes, aber nicht allzu Förmliches wollt.",
            }
          },
          {
            image: "assets/prunus-sushi-cocktails.jpg",
            price: "€€€",
            mapsQuery: "Prunus Sushi & Cocktails Salerno",
            name: {
              it: "Prunus - Sushi & Cocktails",
              en: "Prunus - Sushi & Cocktails",
              es: "Prunus - Sushi & Cocktails",
              fr: "Prunus - Sushi & Cocktails",
              de: "Prunus - Sushi & Cocktails",
            },
            desc: {
              it: "Locale per sushi e cocktail, più curato e adatto a una serata particolare.",
              en: "A sushi and cocktail place, more refined and suitable for a special evening.",
              es: "Local de sushi y cócteles, más cuidado y adecuado para una noche especial.",
              fr: "Adresse de sushi et cocktails, plus raffinée et adaptée à une soirée spéciale.",
              de: "Ein Ort für Sushi und Cocktails, raffinierter und geeignet für einen besonderen Abend.",
            },
            tip: {
              it: "Da scegliere se volete sushi in un ambiente più elegante. Fascia prezzo più alta.",
              en: "Choose it if you want sushi in a more elegant setting. Higher price range.",
              es: "Elegidlo si queréis sushi en un ambiente más elegante. Rango de precio más alto.",
              fr: "À choisir si vous voulez du sushi dans une ambiance plus élégante. Prix plus élevé.",
              de: "Zu wählen, wenn ihr Sushi in einem eleganteren Ambiente möchtet. Höhere Preisklasse.",
            }
          },
          {
            image: "assets/okaeri-ramen.jpg",
            price: "€€",
            mapsQuery: "Okaeri Ramen Salerno",
            name: {
              it: "Okaeri Ramen",
              en: "Okaeri Ramen",
              es: "Okaeri Ramen",
              fr: "Okaeri Ramen",
              de: "Okaeri Ramen",
            },
            desc: {
              it: "Locale consigliato per ramen e cucina giapponese calda, perfetto se volete qualcosa di diverso dalla solita cena.",
              en: "Recommended for ramen and warm Japanese dishes, perfect if you want something different from the usual dinner.",
              es: "Recomendado para ramen y cocina japonesa caliente, perfecto si queréis algo diferente de la cena habitual.",
              fr: "Conseillé pour le ramen et les plats japonais chauds, parfait si vous voulez changer du dîner habituel.",
              de: "Empfohlen für Ramen und warme japanische Gerichte, perfekt wenn ihr mal etwas anderes als das übliche Abendessen wollt.",
            },
            tip: {
              it: "Ottimo soprattutto nelle serate fresche o se avete voglia di una bowl calda e saporita.",
              en: "Great especially on cooler evenings or if you feel like a warm and tasty bowl.",
              es: "Ideal sobre todo en noches frescas o si os apetece un bowl caliente y sabroso.",
              fr: "Très bien surtout les soirées fraîches ou si vous avez envie d’un bol chaud et savoureux.",
              de: "Sehr gut besonders an kühlen Abenden oder wenn ihr Lust auf eine warme, schmackhafte Bowl habt.",
            }
          },

          {
            image: "assets/kikko-sushi-salerno.jpg",
            price: "€€",
            mapsQuery: "Kikko Sushi Ristorante Giapponese Salerno",
            name: {
              it: "Kikko Sushi Ristorante Giapponese",
              en: "Kikko Sushi Japanese Restaurant",
              es: "Kikko Sushi Restaurante Japonés",
              fr: "Kikko Sushi Restaurant Japonais",
              de: "Kikko Sushi Ristorante Giapponese",
            },
            desc: {
              it: "Ristorante giapponese consigliato per chi ha voglia di sushi, cucina asiatica e piatti giapponesi. Una buona scelta se volete qualcosa di diverso dalla cucina campana.",
              en: "Japanese restaurant recommended for sushi, Asian cuisine and Japanese dishes. A good choice if you want something different from Campanian food.",
              es: "Restaurante japonés recomendado para sushi, cocina asiática y platos japoneses. Una buena opción si queréis algo diferente de la cocina campana.",
              fr: "Restaurant japonais conseillé pour les sushis, la cuisine asiatique et les plats japonais. Un bon choix si vous voulez quelque chose de différent de la cuisine campanienne.",
              de: "Empfohlenes japanisches Restaurant für Sushi, asiatische Küche und japanische Gerichte. Eine gute Wahl, wenn ihr etwas anderes als die kampanische Küche wollt.",
            },
            tip: {
              it: "Consiglio: sceglietelo se avete voglia di sushi o di una cena giapponese più tranquilla.",
              en: "Tip: choose it if you feel like sushi or a relaxed Japanese dinner.",
              es: "Consejo: elegidlo si os apetece sushi o una cena japonesa tranquila.",
              fr: "Conseil : choisissez-le si vous avez envie de sushi ou d’un dîner japonais tranquille.",
              de: "Tipp: wählt es, wenn ihr Lust auf Sushi oder ein ruhiges japanisches Abendessen habt.",
            }
          }
        ]
      }
    };

export const labels: Record<string, Record<Lang, string>> = {
      maps: {
        it: "📍 Apri su Maps",
        en: "📍 Open in Maps",
        es: "📍 Abrir en Maps",
        fr: "📍 Ouvrir sur Maps",
        de: "📍 Auf Maps öffnen",
      },
      tip: {
        it: "Consiglio",
        en: "Tip",
        es: "Consejo",
        fr: "Conseil",
        de: "Tipp",
      },
      walkable: {
        it: "🚶 Raggiungibile a piedi",
        en: "🚶 Within walking distance",
        es: "🚶 Se puede llegar a pie",
        fr: "🚶 Accessible à pied",
        de: "🚶 Zu Fuß erreichbar",
      },
      price: {
        it: "Prezzo indicativo",
        en: "Indicative price",
        es: "Precio orientativo",
        fr: "Prix indicatif",
        de: "Richtpreis",
      },
      recommended: {
        it: "⭐ Consigliato da noi",
        en: "⭐ Recommended by us",
        es: "⭐ Recomendado por nosotros",
        fr: "⭐ Recommandé par nous",
        de: "⭐ Von uns empfohlen",
      }
    };

export const placesWithTip: string[] = [
        "A Modo Bio",
        "Bar Gelateria Nettuno",
        "Antica Dolceria Pantaleone",
        "Pasticceria Sal De Riso",
        "Casa Ragùsa",
        "Tramp Ristorante"
      ];

export const buttons: { key: string; icon: string; title: Record<Lang, string>; desc: Record<Lang, string> }[] = [{"key":"pizza","icon":"🍕","title":{"de":"Ich habe Lust auf Pizza","en":"I feel like pizza","es":"Me apetece pizza","fr":"J’ai envie de pizza","it":"Ho voglia di pizza"},"desc":{"de":"Empfohlene Pizzerien","en":"Recommended pizzerias","es":"Pizzerías recomendadas","fr":"Pizzerias recommandées","it":"Pizzerie consigliate"}},{"key":"ristoranti","icon":"🍽️","title":{"de":"Ich habe Lust auf Fisch- oder Landküche","en":"I feel like seafood or local cuisine","es":"Me apetece cocina de mar o de tierra","fr":"J’ai envie de cuisine de mer ou de terre","it":"Ho voglia di cucina di mare o di terra"},"desc":{"de":"Fisch- und Fleischrestaurants sowie traditionelle Küche","en":"Seafood, meat and traditional restaurants","es":"Restaurantes de pescado, carne y cocina típica","fr":"Restaurants de poisson, viande et cuisine traditionnelle","it":"Ristoranti di pesce, carne e cucina tipica"}},{"key":"gelato","icon":"🍦","title":{"de":"Ich habe Lust auf Eis","en":"I feel like gelato","es":"Me apetece helado","fr":"J’ai envie de glace","it":"Ho voglia di gelato"},"desc":{"de":"Eisdielen und Süßes","en":"Gelato and sweets","es":"Heladerías y dulces","fr":"Glaciers et douceurs","it":"Gelaterie e dolci"}},{"key":"vino","icon":"☕","title":{"de":"Ich habe Lust auf Café / Aperitif","en":"I feel like a café / aperitivo","es":"Me apetece un bar / aperitivo","fr":"J’ai envie d’un café / apéritif","it":"Ho voglia di bar / aperitivo"},"desc":{"de":"Kaffee, Cocktails, Wein und Aperitifs","en":"Coffee, cocktails, wine and aperitivo","es":"Café, cócteles, vino y aperitivos","fr":"Café, cocktails, vin et apéritifs","it":"Caffè, cocktail, vino e aperitivi"}},{"key":"panini","icon":"🥪","title":{"de":"Ich habe Lust auf Panini und Snacks","en":"I feel like sandwiches and quick bites","es":"Me apetece bocadillos y algo rápido","fr":"J’ai envie de sandwichs et snacks","it":"Ho voglia di panini e sfizi"},"desc":{"de":"Panini, Antipasti-Platten, Kebab und schnelle Snacks","en":"Sandwiches, boards, kebab and quick bites","es":"Bocadillos, tablas, kebab y algo rápido","fr":"Sandwichs, planches, kebab et snacks rapides","it":"Panini, taglieri, kebab e cose veloci"}},{"key":"mondo","icon":"🌍","title":{"de":"Ich habe Lust auf Küche aus aller Welt","en":"I feel like world cuisine","es":"Me apetece cocina del mundo","fr":"J’ai envie de cuisine du monde","it":"Ho voglia di cucina del mondo"},"desc":{"de":"Sushi, griechisch, mexikanisch und andere Aromen","en":"Sushi, Greek, Mexican and other flavours","es":"Sushi, griego, mexicano y otros sabores","fr":"Sushi, grec, mexicain et autres saveurs","it":"Sushi, greco, messicano e altri sapori"}}];

export const backLabel: Record<Lang, string> = {"de":"← Zurück zu den Kategorien","en":"← Back to categories","es":"← Volver a las categorías","fr":"← Retour aux catégories","it":"← Torna alle categorie"};

export function shouldShowTip(place: Restaurant): boolean {
  if (!place || !place.tip || !place.name || !place.name.it) return false;
  return placesWithTip.indexOf(place.name.it) !== -1;
}

export function mapsUrlFor(place: Restaurant): string {
  if (place.mapsUrl) return place.mapsUrl;
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place.mapsQuery || "");
}
