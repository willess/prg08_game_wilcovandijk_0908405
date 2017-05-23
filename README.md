# Voorbereiding PRG04

In PRG04 gaan we werken met Typescript en github. Installeer alvast de benodigde tools en kijk of je "Hello World" kan maken.

## Herhaling Javascript Basics
Zorg dat je onderstaande [javascript basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics) beheerst.
- Scope, Loop, Array, Function, Function arguments en return value

## Typescript en Code Editor
- [Installeer Node en NPM](https://nodejs.org/en/)
- [Installeer Typescript](https://www.typescriptlang.org)
- [Download Visual Studio Code](https://code.visualstudio.com)

## Typescript compiler in terminal
- Maak een nieuw typescript bestand met de naam `test.ts`
- In het bestand zet je de javascript code `console.log('hello world')`
- Open een terminal window in de map van het bestand.
- Compileer javascript naar typescript met `tsc test.ts`

## Localhost instellen
Je test een project altijd via http://localhost/.../project, en niet via file://project/. Als je MAMP of XAMPP al hebt geïntalleerd dan heb je al een localhost server. Het is mogelijk om de native localhost van je machine aan te zetten op [OS X](https://coolestguidesontheplanet.com/get-apache-mysql-php-and-phpmyadmin-working-on-macos-sierra/) en [Windows](https://msdn.microsoft.com/en-us/library/ms181052(v=vs.80).aspx). 

Je kan ook een tijdelijke localhost server voor je project starten met [Python](http://www.pythonforbeginners.com/modules-in-python/how-to-use-simplehttpserver/), [Node](https://www.npmjs.com/package/http-server) of [BrowserSync](https://www.browsersync.io)

## Visual Studio Code

### Download project
- Download dit testproject (zie 'werken met github').
- Open de DOCS folder in een browser via localhost: http://localhost/projecten/prg4/week0/docs/

### Visual Studio Code
- Ga naar **File > Open Folder**. Let op dat de root **Folder** in VS Code je projectmap is! 
- Wijzig 'message.ts' en druk op CMD+SHIFT+B (mac) of CTRL+SHIFT+B (win) om typescript te compileren. 
- De compiler heeft een 'watch' mode. Je wijzigingen worden nu automatisch gecompileerd nadat je opslaat.
- Kijk of het .js bestand wordt gegenereerd en refresh de browser om te zien of je wijziging is doorgevoerd.

![Editor](editor.png?raw=true "Editor")

### Uitleg bestanden
- De DOCS folder bevat de website : html, css en javascript. De javascript files worden automatisch gegenereerd.
- De DEV folder bevat de typescript files. Dit zijn de files waarin je gaat programmeren.
- tsconfig.json bevat instellingen voor het compileren van typescript naar javascript.
- tasks.json bevat het 'build' commando van Visual Studio Code. Dit voer je uit met CMD+SHIFT+B

## Werken met GitHub
- [Installeer git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Maak een github account](https://www.github.com)
- [Git tutorial](https://try.github.io/)

### Fork
- Als je een fork van deze repository maakt heb je meteen je eigen code online staan. 
- Doe `git clone https://github.com/jouw_account/PRG04-Week0.git` in je werk folder.
- Open die folder in Visual Studio Code.
- Als je code is gewijzigd kan je `commit` en daarna `sync` doen om je code online te plaatsen. Zie screenshot.

![Sync](sync.png?raw=true "Sync")

### Publiceren
- Ga naar 'settings' in je eigen repository. Onder 'GitHub Pages' kies je `master branch/docs folder`. Klik op 'save'.
- Je docs folder is nu als webproject te bekijken: [https://hr-cmgt.github.io/PRG04-Week0/](https://hr-cmgt.github.io/PRG04-Week0/)

![Pages](pages.png?raw=true "Pages")

### Offline werken
- Download de ZIP of clone deze repository met `git clone https://github.com/HR-CMGT/PRG04-Week0.git`. 
- Je kan nu offline aan het project werken en de (onzichtbare) git folder weggooien via de terminal: `rm -rf .git`


