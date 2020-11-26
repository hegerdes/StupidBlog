CREATE TABLE `author` (
	`authorID` INT unsigned NOT NULL AUTO_INCREMENT,
	`firstname` VARCHAR(32) NOT NULL,
	`surname` VARCHAR(32) NOT NULL,
	`salut` VARCHAR(32) NOT NULL,
	`mail` VARCHAR(32) NOT NULL,
	`password` VARCHAR(64),
	PRIMARY KEY (`authorID`)
);


CREATE TABLE `news` (
	`NewsID` INT unsigned NOT NULL AUTO_INCREMENT,
	`authorID` INT unsigned,
	`headline` VARCHAR(512),
	`content` TEXT,
	`date` DATE,
	PRIMARY KEY (`NewsID`),
	FOREIGN KEY (authorID) REFERENCES author(authorID)
);

CREATE TABLE `comments` (
	`commentID` INT unsigned NOT NULL AUTO_INCREMENT,
	`authorID` INT unsigned,
	`newsID` INT unsigned,
	`com_content` TEXT,
	`date` DATE,
	PRIMARY KEY (`commentID`),
	FOREIGN KEY (authorID) REFERENCES author(authorID),
	FOREIGN KEY (newsID) REFERENCES news(newsID)
);