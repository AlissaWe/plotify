# Charaktere

Ein Charakter ist eine handelnde Person in einer Geschichte.


## Attribute

Jeder Charakter hat die folgenden Attribute:

| Name      | Datentyp | Beschreibung                                                     |
|-----------|----------|------------------------------------------------------------------|
| id        | UUID     | Ein eindeutiger Bezeichner für den Charakter in Form einer UUID. |
| name      | String   | Der Name des Charakters.                                         |
| deleted   | boolean  | Wurde der Charakter gelöscht?                                    |

Jedem Charakter ist ein Steckbrief zugeordnet, der aus einer Reihe von
gruppierten Key-Value-Paaren besteht. Jeder Steckbrief hat die folgenden
Attribute:

| Name      | Datentyp | Beschreibung                                                     |
|-----------|----------|------------------------------------------------------------------|
| id        | UUID     | Die ID des Charakters, dem dieser Steckbrief zugeorndet ist.     |
| groups    | Group[]  | Ein Array mit den Gruppen des Steckbriefs.                       |

Jede Gruppe hat die folgenden Attribute:

| Name      | Datentyp | Beschreibung                                                     |
|-----------|----------|------------------------------------------------------------------|
| title     | String   | Der Titel der Gruppe.                                            |
| entries   | Entry[]  | Ein Array mit den Einträgen in der Gruppe.                       |

Jeder Eintrag hat die folgenden Attribute:

| Name      | Datentyp | Beschreibung                                                     |
|-----------|----------|------------------------------------------------------------------|
| title     | String   | Der Titel des Eintrags.                                          |
| value     | String   | Der Wert des Eintrags.                                           |


## Tabellen in SQLite

Charaktere und deren Steckbriefe werden in den folgenden Tabellen in einer
SQLite-Datenbank abgelegt.

![](tables.png)

- Alle Texte werden in der Zeichenkodierung UTF-8 gespeichert.
- Die IDs sind die 16 Bytes einer UUID.
- Die Spalte `queue` der Tabelle `character_changes_sequence` kann die folgenden
  Werte enthalten: 0 = past, 1 = future.
- Die Spalte `type` der Tabelle `character_changes_sequence` kann die folgenden
  Werte enthalten: 0 = character, 1 = entry_group, 2 = entry.

```sql
CREATE TABLE `character` (
  `id`                  BLOB NOT NULL,
  `presence_history_id` BLOB NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(`presence_history_id`) REFERENCES character_history(id)
);

CREATE TABLE `character_history` (
  `id`      BLOB    NOT NULL,
  `name`    TEXT    NOT NULL,
  `deleted` INTEGER NOT NULL DEFAULT 0 CHECK(deleted = 0 OR deleted = 1),
  PRIMARY KEY(id)
);

CREATE TABLE `character_changes_sequence` (
  `character_id` BLOB    NOT NULL,
  `queue`        INTEGER NOT NULL CHECK(queue = 0 OR queue = 1),
  `position`     INTEGER NOT NULL CHECK(position >= 0),
  `type`         INTEGER NOT NULL CHECK(type = 0 OR type = 1 OR type = 2),
  `history_id`   BLOB NOT NULL,
  FOREIGN KEY(`character_id`) REFERENCES character(id)
);

CREATE TABLE `entry_group` (
  `character_id`        BLOB NOT NULL,
  `id`                  BLOB NOT NULL,
  `presence_history_id` BLOB NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(`character_id`)        REFERENCES character(id),
  FOREIGN KEY(`presence_history_id`) REFERENCES entry_group_history(id)
);

CREATE TABLE `entry_group_history` (
  `id`       BLOB    NOT NULL,
  `title`    TEXT    NOT NULL,
  `position` INTEGER NOT NULL           CHECK(position >= 0),
  `deleted`  INTEGER NOT NULL DEFAULT 0 CHECK(deleted = 0 OR deleted = 1),
  PRIMARY KEY(id)
);

CREATE TABLE `entry` (
  `group_id`            BLOB NOT NULL,
  `id`                  BLOB NOT NULL,
  `presence_history_id` BLOB NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(`group_id`)            REFERENCES entry_group(id),
  FOREIGN KEY(`presence_history_id`) REFERENCES entry_history(id)
);

CREATE TABLE `entry_history` (
  `id`       BLOB    NOT NULL,
  `title`    TEXT    NOT NULL,
  `value`    TEXT    NOT NULL DEFAULT '',
  `position` INTEGER NOT NULL            CHECK(position >= 0),
  `deleted`  INTEGER NOT NULL DEFAULT 0  CHECK(deleted = 0 OR deleted = 1),
  PRIMARY KEY(id)
);
```
