# Datenwaben Heilbronn

Die Datenwaben für Heilbronn zeigen Daten aus dem Open Data Portal Heilbronn opendata.heilbronn.de.

## Installation

1. .env Datei mit Twitter-API Keys erstellen:
    TWITTER_CONSUMER_KEY="xyz"
    TWITTER_CONSUMER_SECRET="xyz"
    TWITTER_BEARER_TOKEN="xyz"
    TWITTER_ACCESS_TOKEN_KEY="xyz"
    TWITTER_ACCESS_TOKEN_SECRET="xyz"
2. Docker und Docker Compose installieren
3. Docker starten
4. In den Datenwaben Ordner navigieren.
5. Folgenden Befehl ausführen: sudo API_PORT=8008 docker-compose up —build -d —force-recreate node-main

## Wie füge ich eine neue Wabe hinzu?

### Dateistruktur

📦heilbronn  
┣ 📂json  
┣ 📂svg  
┣ 📜cityConfig.json  
┣ 📜HeilbronnBackground.jpg  
┗ 📜README.md  

1. cityConfig.json: Diese Datei konfiguriert die Datenwaben-Heilbronn Seite.
2. json Ordner: Hier befindet sich für jede Wabe die Konfigurationsdatei im JSON-Format.
3. svg Ordner: Hier befinden sich die Designs der Waben (die Optik) im SVG-Format.

### Statische Wabe hinzufügen

1. Template.json im json-Ordner (Pfad: app/heilbronn/json) duplizieren und einen passenden Dateinamen vergeben.
Die Felder die später in der Wabe sichtbar sein werden sind:

- url: Die URL, die hier angegeben wird ist der Link, der auf dem Button mit dem Augen-Icon erscheint. Wird keine URL angegeben, so erscheint in der Wabe auch kein Button.
- textTop: Der Text, der über dem Wert angezeigt wird.
- textBottom: Der Text, der unter dem Wert erscheint.
- value: der Wert (kann eine Zahl oder Text sein).
- background: Pfad zur SVG-Datei mit dem Design der Wabe.
- color: die Textfarbe im HEX-Format.
- text: Der Text, der auf der Rückseite der Wabe erscheint.

2. Die neu erstellte JSON-Datei für die Wabe aus Schritt 1 unter "cards" in der app/heilbronn/cityConfig.json Datei hinzufügen.

### Dynamische Wabe hinzufügen

1. Unter api/controllers einen neuen Ordner erstellen.
2. Eine der bestehenden controller.js - Dateien kopieren, zum Beispiel "euElection.controller.js" und unter neuem Namen in dem neuen Ordner aus Schritt 1 einfügen. Hier darauf achten, dass nur der vordere Teil des Dateinamens geändert wird und der Teil "controller.js" bleibt.
3. In der neuen controller.js Datei die Konstanten URL und VALUE anpassen, so wie im Kommentar beschrieben und die Attribute der Wabe in der Funktion createCard() anpassen.

### Echtzeit-Wabe hinzufügen (siehe Twitter-Wabe als 'Proof of Concept'-Beispiel)

1. Unter api/controllers einen neuen Ordner erstellen.
2. Die twitterHn.controller.js Datei kopieren und unter neuem Namen in neuem Ordner speichern. Hier darauf achten, dass nur der vordere Teil des Dateinamens geändert wird und der Teil "controller.js" bleibt.
3. In der Funktion createCard() die Attribute der Wabe anpassen. Hier muss unbedingt ein eindeutiger Bezeichner bei cssClass angegeben werden, damit die Wabe später jedes Mal, wenn der Echtzeit-Wert über die Socketverbindung hereinkommt, gefunden und angepasst werden kann.

## CI/CD Workflow

Es wurde ein einfacher CI/CD Workflow in GitHub Actions erstellt. Die Skripte dafür befinden sich im .github Ordner.
Beim Aktuellen Stand des GitHub Action Skripts wird jedes Mal, wenn auf den Master gepusht wird, die Action getriggert, die den neuen Stand automatisch auf den Server deployed.

## Docker