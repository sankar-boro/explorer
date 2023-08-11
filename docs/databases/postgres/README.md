CREATE TABLE linuxcmds(
  id SERIAL PRIMARY KEY NOT NULL,
  name           TEXT  NOT NULL,
  cmds           TEXT  NOT NULL,
  label          TEXT  NOT NULL,
  body            TEXT,
  createdAt timestamp default current_timestamp,
  updatedAt timestamp default current_timestamp
);

INSERT INTO linuxcmds(id, name, cmds) VALUES(1, "ls", '\"[\"-la\"]\"');