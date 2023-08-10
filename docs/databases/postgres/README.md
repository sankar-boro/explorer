CREATE TABLE linuxcmds(
  id INT PRIMARY KEY   NOT NULL,
  name           TEXT  NOT NULL,
  cmds           TEXT  NOT NULL,
  createdAt timestamp default current_timestamp,
  updatedAt timestamp default current_timestamp
);

INSERT INTO linuxcmds(id, name, cmds) VALUES(1, "ls", '\"[\"-la\"]\"');