CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(200),
  "password" VARCHAR(200),
  "admin" INT,
  "email" VARCHAR(100)
);

CREATE SEQUENCE sequence_for_eol
INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE SEQUENCE sequence_for_npi
INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE SEQUENCE sequence_for_pcn
INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;


CREATE TABLE eol
(
    id VARCHAR(100),
    creator_id integer REFERENCES "user"(id),
    contact_id integer REFERENCES "user"(id),
    "type" character varying(200),
    "date" date,
    change_description character varying(2000),
    last_time_buy character varying(50),
    last_time_ship character varying(50),
    notes character varying(200),
    audience character varying(1000),
    status VARCHAR(20),
    notification_message VARCHAR(2000),
    CONSTRAINT eol_pkey PRIMARY KEY (id)
);

ALTER TABLE eol ALTER COLUMN id
SET
DEFAULT TO_CHAR
(nextval
('sequence_for_eol'::regclass),'"EOL-"fm000000');


CREATE TABLE npi
(
    id VARCHAR(200),
    creator_id integer REFERENCES "user"(id),
    contact_id integer REFERENCES "user"(id),
    "type" character varying(200),
    "date" date,
    "description" character varying(2000),
    notes character varying(2000),
    status varchar(20),
    notification_message VARCHAR(2000),
    CONSTRAINT npi_pkey PRIMARY KEY (id)
);

ALTER TABLE npi ALTER COLUMN id
SET
DEFAULT TO_CHAR
(nextval
('sequence_for_npi'::regclass),'"NPI-"fm000000');


CREATE TABLE pcn
(
    id VARCHAR(200),
    creator_id integer REFERENCES "user"(id),
    contact_id integer REFERENCES "user"(id),
    "type" character varying(200),
    "date" date,
    audience VARCHAR(500),
    change_description character varying(2000),
    notes character varying(2000),
    status varchar(20),
    notification_message VARCHAR(2000),
    CONSTRAINT pcn_pkey PRIMARY KEY (id)
);

ALTER TABLE pcn ALTER COLUMN id
SET
DEFAULT TO_CHAR
(nextval
('sequence_for_pcn'::regclass),'"PCN-"fm000000');


CREATE TABLE image
(
    id SERIAL PRIMARY KEY,
    image_url character varying(1000),
    figure character varying(200)
);

CREATE TABLE pcn_image
(
    id SERIAL PRIMARY KEY,
    pcn_id VARCHAR REFERENCES pcn(id),
    image_id integer REFERENCES image(id)
);

CREATE TABLE eol_image
(
    id SERIAL PRIMARY KEY,
    eol_id VARCHAR REFERENCES eol(id),
    image_id integer REFERENCES image(id)
);

CREATE TABLE npi_image
(
    id SERIAL PRIMARY KEY,
    npi_id VARCHAR REFERENCES npi(id),
    image_id integer REFERENCES "image"(id)
);

CREATE TABLE part
(
    id SERIAL PRIMARY KEY,
    "name" character varying(200),
    "number" character varying(200),
    "description" character varying(200)
);

CREATE TABLE eol_part
(
    id SERIAL PRIMARY KEY,
    eol_id VARCHAR REFERENCES eol(id),
    part_id integer REFERENCES part(id),
    replacement boolean
);

CREATE TABLE npi_part
(
    id SERIAL PRIMARY KEY,
    npi_id VARCHAR REFERENCES npi(id),
    part_id integer REFERENCES part(id)
);

CREATE TABLE pcn_part
(
    id SERIAL PRIMARY KEY,
    pcn_id VARCHAR REFERENCES pcn(id),
    part_id integer REFERENCES part(id)
);

--CREATE TABLE notifications (
--    id SERIAL PRIMARY KEY,
--    "message" character varying(2000)
--);
--
--CREATE TABLE user_notification (
--    id SERIAL PRIMARY KEY,
--    user_id integer REFERENCES "user"(id),
--    notification_id integer REFERENCES notifications(id)
--);
