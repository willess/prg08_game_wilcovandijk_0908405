# Installatie game Wilco van Dijk
De Assesor kan een fork maken van deze repository. Vervolgens kan je deze clonen in je htdocs folder. Open de game via localhost:8888/prg08_game_wilcovandijk_0908405

# Interface
Behaviour.ts heeft een interface met daarin de property: 'player' en de methods: update(), onShrink(), onMove().

# Static utility method
Utils.ts heeft een public static functie die checkt of de 2 objecten elkaar raken. Geeft true terug als het waar is, anders false.

# Singleton
In main.ts heb je de getInstance method. Die kan je uitvoeren. Deze checkt of er al een instance is aangemaakt van game, zo niet wordt deze aangemaakt. vervolgens krijg je de gameinstance terug.

# Strategy
Er is een behaviour interface. shrink.ts en move.ts implementeren deze interface. Dit betekent dat de properties en methods die in de interface zijn aangegeven in deze classes moeten staan. Bij het aanmaken van een player wordt de behaviour gezet op move. Wanneer je op spatie klikt wordt deze property overgeschreven door shrink. Je geeft iedere keer de player mee waardoor je de behaviour kan overschrijven.

# Encapsulation, Composition, Inheritance
In game.ts zijn alle properties private. In player.ts zijn properties zoals speed etc  private gemaakt. Dit hoeft alleen player te weten. player.ts en coin.ts extenden allebei van gameobject. In behaviour.ts staat aangegeven welke properties en methods de classes move en shrink moeten hebben.

![alt text](./classDiagram.png)
