# Reflektion FakeStore

## Kodstruktur

HTML-strukturen har jag delat upp i tre olika sidor, index, inlog och user. Dessa har jag försökt att hålla enkla och envänt så mycket semantiska element som möjligt för att dela upp innehållet på ett överskådligt sätt.

- Index.html som vi fick när vi startade uppgiften som jag inte rört nämnvärt mer än att lägga till en länk till inloggningssidan i headern.
- Inlog.html som är inloggningssidan innehåller formulär för inloggning och registrering. Här ändrade jag även headern för att länken som tog en till inloggningssidan istället ska leda tillbaka till startsidan. Om någon ickemedlem vill kollarunt lite till där innan man blir medlem.
- user.html som är själva användarsidan. Här finns produktvisning, en sökfunktion för att kunna söka på varor via fritext samt ett kategorifilter för att kunna söka på specifika kategoreier.
- Genom att dela upp koden på detta vis upplever jag det lättare att hålla ordning på koden och den blir mer lättöverskådeligt. Samt att det iaf för mig som nybörjade går mycket lättare att hitta de fel jag gör när jaghar saker separerat istället för i en lång fil.

### CSS

Även CSS har jag valt att lägga i tre separata filer då jag upplevde att det blev mer överskådligt. Valde att inte gå in djupare i CSSen denna gång utan fokus har legat mer på Js, vilket lett till att det är rätt basic och enkla lösningar.

- Jag valde att hålla mig till flexbox för att få layouten på sidorna responsiv samt centrerad. Detta då det är lätt att anpassa designen till en responsiv sida.
- Jag har använt mig av klasser och id för att få en design som är övergripande och så att vissa saker, som till exempel produkterna presenteras likadant. Jag har även använt border-radius för att få en mjukare känsla samt skuggor för att det ska kännas mindre platt.

### Js

Även Javascripten har jag valt att dela upp i olika filer, då den blir mer modulär och lättare att underhålla. Det blev dock bara två, en för inloggningen och en för användarsidan.

- Login.js gör att formulären för inlogningen och bli meddlem fungerar. Den tar emot input från användaren och checkar denna mot databasen, om det är en medlem så kollar den av att medlemmen finns och om den inte gör det skickar en alert om detta. För den som vill bli medlem kollar den av så att det inte redan finns en användare med de användarnamnet etc.

- user.js gör så att hämtningen av APIet fungerar för att hämta och visa data. Här används även asynkrona metoder för att användaren till exempel ska kunna söka efter en specifik vara och locale storage för att spara användardata.

- I båda filerna har jag använt mig asynkrona funktioner för att göra koden mer läsbar och minska risken för fel och att all data hämtas i rätt ordning.

## JSON-data

Jag har använt mig av JSON i båda mina js-filer.
Då jag inte läste instruktionerna tillräckligt noga, även om jag verkligen försökte, så missade jag biten om API.
Så jag gjorde en lokal databas med hjälp av JSON för inloggning och bli medlem.
På användarsidan används JSON för att hämta innehållet från APIet FakeStore till getProducts och getCategories så att det sedan kan användas på webbsidan. Genom att använda sig av JSON blir det lättare att arbeta med data på ett strukturerat sätt samt att det gör de lättare att använda sig av ett API.

## HTTP-förfrågningar

I båda mina js-filer använder jag HTTP-förfrågningar, GET-förfrågningar för att hämta data och POST-förfrågningar för att skicka ny data till servern. Http-förfrågningarna används med async/await för att det hela ska bli tydligare och för att säkerställa att förfrågningarna blir rätt. Det gör även koden lättare att läsa och debugga. Genom korrekta HTTP-förfrågningar (vilket jag hoppas jag har nu) så säkerställer man att användaren får den efterfrgade informetionen snabbt och utan fel.

## Felhantering

Jag har försökt att använda try-catch block för att eventuella fel ska fångas upp. Då dessa gör att risken för att programmet ska krascha vid ett oväntat fel minskar. Samt att det blir lättare att felsöka programmet om dessa används.

Jag har även valt att lägga alerts på vissa ställen för att användaren ska se vad som gick snett tydligt, även om jag förstå att alerts ibland kan upplevas som störande för användare. Genom dessa hoppas jag att användare snabbt ska kunna se vad som gick fel och att man lättare ska kunna felsöka om så skulle behövas.

Jag har även använt mig ac if-else- kontroller i koden för att kontrollera att anbart giltig data hanteras och unvika att saker blir fel.
Genom en ordentlig felhantering kan man förbättra användarupplevelsen avsevärt då användaren får tydlig feedback när något går fel.

## Sidenote

Om reflektion kring tankar och känslor kring denna uppgift önskas hade jag kunnat publicera en bok.
I övrigt kan jag bara konstatera att detta nog var den svåraste reflektionen att få ihop. Men kanske inte så konstigt då jag kämpat en hel del med själva uppgiften också!
