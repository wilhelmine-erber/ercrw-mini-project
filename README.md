# Fullstack Todo Applikation

Dies ist meine Fullstack Applikation mit der es möglich ist Aufgaben zu erstellen, zu bearbeiten und zu löschen.
Sie besteht aus einem Backend und einem Frontend, die beide in TypeScript geschrieben sind.

## Inhaltsverzeichnis

- [Fullstack Todo Applikation](#fullstack-todo-applikation)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [Überblick](#überblick)
  - [Technologien](#technologien)
  - [Projektstruktur](#projektstruktur)
  - [Installation](#installation)
  - [Backend](#backend)
    - [Starten des Servers](#starten-des-servers)
  - [Frontend](#frontend)
    - [Starten der Anwendung](#starten-der-anwendung)
    - [Alternativ Anwendung im Hautordner starten](#alternativ-anwendung-im-hautordner-starten)
  - [Verwendung](#verwendung)
    - [Funktionen](#funktionen)
    - [CRUD Operationen](#crud-operationen)
  - [noch zu tun an Todo-App:](#noch-zu-tun-an-todo-app)
      - [Kategorien hinzufügen:](#kategorien-hinzufügen)
    - [prioritäten der Aufgaben hinzufügen:](#prioritäten-der-aufgaben-hinzufügen)
  - [routes](#routes)


## Überblick

Die Todo Applikation besteht aus:
- Einem Node.js Express Backend, das mit TypeScript geschrieben wurde und MongoDB als Datenbank verwendet.
- Einem React Frontend, das in TypeScript geschrieben ist, `react-router-dom` für die Navigation zwischen Seiten nutzt und `useContext` zur Verwaltung von states.

## Technologien

- **Backend:**
  - Node.js
  - Express
  - TypeScript
  - MongoDB
  - Mongoose

- **Frontend:**
  - React
  - TypeScript
  - react-router-dom
  - useContext

## Projektstruktur

```
ercrw-mini-project/
├── backend/
│   ├── src/
|   |   |── controllers/
|   |   |   ├──user.ts
|   |   |── lib/
|   |   |   ├──middlewares/
|   |   |   |   |──auth.ts
|   |   |   |   |──validator.ts
|   |   |   ├──validators/
|   |   |   |   |──user.ts
│   │   ├── models/
|   |   |   ├──Todo.ts
|   |   |   ├──User.ts
|   |   |── routes/
|   |   |   ├──todo.ts
|   |   |   ├──user.ts
│   │   ├── db.ts
│   │   ├── middleware.ts
│   │   ├── server.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   └── package.json
└── README.md
```

## Installation

Installiere die Abhängigkeiten für das Backend und Frontend:

- Backend:

     ```bash
     cd backend
     npm install
     ```

- Frontend:

     ```bash
     cd frontend
     npm install
     ```

## Backend

Das Backend verwendet Node.js mit Express und TypeScript. Die Daten werden in einer MongoDB Datenbank gespeichert.

### Starten des Servers

1. Erstelle eine `.env` Datei im `backend` Verzeichnis mit folgendem Inhalt:
   
   ```bash
   MONGODB_URL=your_mongodb_connection_string
   PORT=8080
   ```

2. Starte den Entwicklungsserver:
   
   ```bash
   cd backend
   npm run dev
   ```

Der Server sollte jetzt auf `http://localhost:8080` laufen.

## Frontend

Das Frontend verwendet React mit TypeScript und `react-router-dom` für die Navigation. Für das Styling wird Tailwind und DaisyUi verwendet.

### Starten der Anwendung

1. Starte die React Entwicklungsumgebung:
   
   ```bash
   cd frontend
   npm run dev
   ```

### Alternativ Anwendung im Hautordner starten

   ```bash
   cd ercrw-mini-project
   npm run dev
   ```


Die Anwendung sollte jetzt auf `http://localhost:5173` laufen.

## Verwendung

Nach dem Start der Backend- und Frontend-Server kannst du die Todo Applikation im Browser unter `http://localhost:5173` aufrufen.

### Funktionen

- **Hauptseite:** Listet alle Todos auf.
- **Todo Seite:** Zeigt die Details eines spezifischen Todos.

### CRUD Operationen

- **Erstellen:** Füge ein neues Todo hinzu.
- **Bearbeiten:** Ändere ein bestehendes Todo.
- **Löschen:** Entferne ein Todo aus der Liste.



## noch zu tun an Todo-App:
- beim Eintragen der Todos wird jeder Eintrag oben in der Liste hinzugefügt - Frontend
- beim holen der Daten aus DB werden die Einträge nach Datum aufsteigend sortiert dargestellt
- registration / login
  - nach registrierung vergleich mit DB ob user exists
  - nach register - login
- login btn ausblenden im Register/Login modus


#### Kategorien hinzufügen:
Tägliche Aufgaben
Wöchentliche Aufgaben
Monatliche Aufgaben

### prioritäten der Aufgaben hinzufügen:
- wichtig
- kann warten
- evtl mit Farben visualisieren

## routes

| method | route     | do |
| ------ | --------- | ----------------------------------- |
| POST   | /todo     |  erstellt einen neuen Todo Eintrag |
| GET    | /todo     |  zeigt alle Todos an |
| GET    | /todo/:id |  zeigt einen Todo Eintarg an |
| PUT    | /todo/:id |  ändern eines Todos |
| DELETE | /todo/:id |  löschen eines Todos |
| ------ | --------- | --------------------------------- |
| GET    | /user     |  alle User ausgeben (macht aber keinen Sinn) |
| POST   | /user     |  registrieren eines Users |
| GET    | /user/:id |  anzeigen user profiledata |

https://excalidraw.com/
