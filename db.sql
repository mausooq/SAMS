CREATE TABLE STUDENT (
    id BIGINT PRIMARY KEY,
    USN VARCHAR(20) NOT NULL,
    NAME VARCHAR(30) NOT NULL,
    PHONE VARCHAR(12) NOT NULL,
    EMAIL VARCHAR(100),
    PASSWORD VARCHAR(250)
);
CREATE TABLE PROJECT (
    pid BIGINT PRIMARY KEY,
    id BIGINT,
    FOREIGN KEY (id) REFERENCES STUDENT(id),
    image_path VARCHAR(255),
    title VARCHAR(50) NOT NULL,
    date VARCHAR(20) NOT NULL,
    location VARCHAR(100) NOT NULL,
    description varchar(10000) NOT NULL
);
CREATE TABLE ACHIEVEMENT (
    aid BIGINT PRIMARY KEY,
    id BIGINT,
    FOREIGN KEY (id) REFERENCES STUDENT(id),
    image_path VARCHAR(255),
    title VARCHAR(50) NOT NULL,
    date VARCHAR(20) NOT NULL,
    location VARCHAR(100) NOT NULL,
    description varchar(10000) NOT NULL
);
CREATE TABLE INTERNSHIP (
    iid BIGINT PRIMARY KEY,
    id BIGINT,
    FOREIGN KEY (id) REFERENCES STUDENT(id),
    image_path VARCHAR(255),
    title VARCHAR(50) NOT NULL,
    date VARCHAR(20) NOT NULL,
    location VARCHAR(100) NOT NULL,
    description varchar(10000) NOT NULL
);
CREATE TABLE AWARD (
    aid BIGINT PRIMARY KEY,
    id BIGINT,
    FOREIGN KEY (id) REFERENCES STUDENT(id),
    image_path VARCHAR(255),
    title VARCHAR(50) NOT NULL,
    date VARCHAR(20) NOT NULL,
    location VARCHAR(100) NOT NULL,
    description varchar(10000) NOT NULL
);

CREATE TABLE ECA (
    eid BIGINT PRIMARY KEY,
    id BIGINT,
    FOREIGN KEY (id) REFERENCES STUDENT(id),
    image_path VARCHAR(255),
    title VARCHAR(50) NOT NULL,
    date VARCHAR(20) NOT NULL,
    location VARCHAR(100) NOT NULL,
    description varchar(10000) NOT NULL
);

CREATE TABLE Semester (
	id bigint,
    foreign key (id) references student(id),
    semId INT PRIMARY KEY,
    semesterName varchar(20)
);

CREATE TABLE MARKS(
	id bigint,
    semId int,
    subId int primary key,
    subName varchar(100),
    maxMark int,
    subMark int,
    grade char(2),
    foreign key (id) references student(id),
    foreign key (semId) references semester(semId)
);



