CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(200),
  "password" VARCHAR(200),
  "admin" INT
);

CREATE TABLE eol (
    id SERIAL PRIMARY KEY,
    "type" character varying(200),
    "date" date,
    "number" integer,
    change_description character varying(2000),
    contact_id integer REFERENCES "user"(id),
    end_dates character varying(200),
    notes character varying(200),
    audience character varying(1000),
    images character varying(1000),
    creator_id integer REFERENCES "user"(id)
);

CREATE TABLE npi (
    id SERIAL PRIMARY KEY,
    "type" character varying(200),
    "date" date,
    "number" integer,
    "description" character varying(2000),
    contact_id integer REFERENCES "user"(id),
    notes character varying(2000),
    creator_id integer REFERENCES "user"(id)
);

CREATE TABLE pcn (
    id SERIAL PRIMARY KEY,
    creator_id integer REFERENCES "user"(id),
    "type" character varying(200),
    "date" date,
    "number" integer,
    audience character varying(500),
    change_description character varying(2000),
    contact_id integer REFERENCES "user"(id),
    notes character varying(2000)
);

CREATE TABLE image (
    id SERIAL PRIMARY KEY,
    image_url character varying(1000),
    figure character varying(200)
);

CREATE TABLE eol_image (
    id SERIAL PRIMARY KEY,
    eol_id integer REFERENCES eol(id),
    image_id integer REFERENCES image(id)
);

CREATE TABLE npi_image (
    id SERIAL PRIMARY KEY,
    npi_id integer REFERENCES npi(id),
    image_id integer REFERENCES "image"(id)
);

CREATE TABLE part (
    id SERIAL PRIMARY KEY,
    "name" character varying(200),
    "number" character varying(200),
    "description" character varying(200)
);

CREATE TABLE eol_part (
    id SERIAL PRIMARY KEY,
    eol_id integer REFERENCES eol(id),
    part_id integer REFERENCES part(id),
    replacement boolean
);

CREATE TABLE npi_part (
    id SERIAL PRIMARY KEY,
    npi_id integer REFERENCES npi(id),
    part_id integer REFERENCES part(id)
);

CREATE TABLE pcn_part (
    id SERIAL PRIMARY KEY,
    pcn_id integer REFERENCES pcn(id),
    part_id integer REFERENCES part(id)
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    "message" character varying(2000)
);

CREATE TABLE user_notification (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES "user"(id),
    notification_id integer REFERENCES notifications(id)
);
