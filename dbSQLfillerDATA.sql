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

INSERT INTO cards (user_id, deck_id, front, back)
VALUES
	(1, 1, 'How do you select an element with id fish?', 'document.getElementById(fish)'),
	(1, 1, 'What was first, Java or Javascript?', 'Java'),
	(1, 1, 'How do you check if variable is number?', '!isNaN(variable)'),
	(1, 2, 'Nice question', 'Nice answare'),
	(1, 2, 'Nice question 2', 'Nice answare 2'),
	(1, 2, 'Nice question 3', 'Nice answare 3'),
	(1, 2, 'Nice question 4', 'Nice answare 4'),
	(1, 2, 'Nice question 5', 'Nice answare 5'),
	(1, 3, 'What is best FE Framework?', 'VUE'),
	(1, 3, 'Some question?', 'Some answare'),
	(1, 4, 'What time it is?', '10:30'),
	(1, 4, 'Is git awesome or what?', 'Yep'),
	(1, 5, 'Are you excited to learn C++?', 'Oh yea!'),
	(1, 5, 'What was first? C or C++', 'C'),
	(1, 6, 'What does Python mean?', 'Its a snake.'),
	(1, 7, 'What time it is?', '10:30'),
	(2, 8, 'Sprachen zi deuche?', 'da'),
	(2, 9, 'Kolik jehel je potreba na pleteni?', 'Alspon 6'),
	(2, 9, 'Another awesome knitting question?', 'some answare.'),
	(2, 10, 'How many hands you should use?', 'Two'),
	(2, 11, 'What is internet?', 'A big network'),
	(2, 11, 'What does HTML stands for?', 'HyperTextMarkupLanguage'),
	(2, 11, 'What does CSS stands for?', 'CascadingStyleSheets');
