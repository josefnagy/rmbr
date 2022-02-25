CREATE TABLE users (
 	id SERIAL PRIMARY KEY,
	email VARCHAR(30) UNIQUE NOT NULL,
	password VARCHAR(100) NOT NULL,
 	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

DROP TABLE cards;
DROP TABLE decks;

CREATE TABLE decks (
 	id SERIAL PRIMARY KEY,
	name VARCHAR(15) NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
 	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

CREATE TABLE cards (
 	id SERIAL PRIMARY KEY,
 	deck_id INTEGER REFERENCES decks(id) NOT NULL,
	user_id INTEGER REFERENCES users(id) NOT NULL,
 	url VARCHAR(200),
 	front VARCHAR(500) NOT NULL,
 	back VARCHAR(500) NOT NULL,
	interval INTEGER NOT NULL DEFAULT 0,
	repetition INTEGER NOT NULL DEFAULT 0,
	efactor DECIMAL NOT NULL DEFAULT 2.5,
 	due_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

INSERT INTO decks (name, user_id )
VALUES
	('Javascript', 1),
	('NODEjs', 1),
	('VUE', 1),
	('GiT', 1),
	('C++', 1),
	('Python', 1),
	('English', 1),
	('Germany', 2),
	('Knitting', 2),
	('Tantric massage', 2),
	('WebDEV', 2);

INSERT INTO cards (user_id, deck_id, front, back, due_date)
VALUES
	(1, 1, 'How do you select an element with id fish?', 'document.getElementById(fish)', '2022-02-21 19:10:25-07'),
	(1, 1, 'What was first, Java or Javascript?', 'Java', '2022-02-25 19:10:25-07'),
	(1, 1, 'How do you check if variable is number?', '!isNaN(variable)', '2022-02-20 19:10:25-07'),
	(1, 2, 'Nice question', 'Nice answare', '2022-03-21 19:10:25-07'),
	(1, 2, 'Nice question 2', 'Nice answare 2', '2022-03-21 19:10:25-07'),
	(1, 2, 'Nice question 3', 'Nice answare 3', '2022-03-21 19:10:25-07'),
	(1, 2, 'Nice question 4', 'Nice answare 4', '2022-02-21 19:10:25-07'),
	(1, 2, 'Nice question 5', 'Nice answare 5', '2022-03-21 19:10:25-07'),
	(1, 3, 'What is best FE Framework?', 'VUE', '2022-03-21 19:10:25-07'),
	(1, 3, 'Some question?', 'Some answare', '2022-03-21 19:10:25-07'),
	(1, 4, 'What time it is?', '10:30', '2022-03-21 19:10:25-07'),
	(1, 4, 'Is git awesome or what?', 'Yep', '2022-03-21 19:10:25-07'),
	(1, 5, 'Are you excited to learn C++?', 'Oh yea!', '2022-03-21 19:10:25-07'),
	(1, 5, 'What was first? C or C++', 'C', '2022-03-21 19:10:25-07'),
	(1, 6, 'What does Python mean?', 'Its a snake.', '2022-03-21 19:10:25-07'),
	(1, 7, 'What time it is?', '10:30', '2022-03-21 19:10:25-07'),
	(2, 8, 'Sprachen zi deuche?', 'da', '2022-03-21 19:10:25-07'),
	(2, 9, 'Kolik jehel je potreba na pleteni?', 'Alspon 6', '2022-03-21 19:10:25-07'),
	(2, 9, 'Another awesome knitting question?', 'some answare.', '2022-03-21 19:10:25-07'),
	(2, 10, 'How many hands you should use?', 'Two', '2022-03-21 19:10:25-07'),
	(2, 11, 'What is internet?', 'A big network', '2022-03-21 19:10:25-07'),
	(2, 11, 'What does HTML stands for?', 'HyperTextMarkupLanguage', '2022-03-21 19:10:25-07'),
	(2, 11, 'What does CSS stands for?', 'CascadingStyleSheets', '2022-03-21 19:10:25-07');

CREATE TYPE study_type AS ENUM ('normal', 'custom');

DROP TABLE studied_cards;

CREATE TABLE studied_cards (
	id SERIAL PRIMARY KEY,
	study_type study_type DEFAULT 'normal',
	user_id integer REFERENCES users(id) NOT NULL,
	card_id integer REFERENCES cards(id) NOT NULL,
	card_study_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	card_study_end TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	grade decimal NOT NULL
);

INSERT INTO studied_cards (study_type, user_id, card_id, card_study_start, card_study_end, grade)
VALUES
	('normal', 1, 1, '2022-02-21 19:10:25-07', '2022-02-21 19:10:55-07', 5),
	('normal', 1, 1, '2022-02-23 7:10:25-07', '2022-02-23 7:11:50-07', 3.5);