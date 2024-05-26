drop database if exists pc;
create database pc;
use pc;

CREATE TABLE ruoli (
  nome varchar(50) not null primary key
);

CREATE TABLE utenti (
  id int not null primary key AUTO_INCREMENT,
  nome varchar (100),
  cognome varchar (100) not null,
  email varchar (255) not null,
  ruolo varchar (50) not null references ruoli(nome)
);

CREATE TABLE login (
	id int not null primary key AUTO_INCREMENT,
	username varchar(255) not null,
	password varchar(255) not null,
	utente int not null references utenti(id)
);

CREATE TABLE pc (
  id int NOT NULL primary key AUTO_INCREMENT,
  nome varchar(50) NOT NULL,
  numero_inventario int(11) NOT NULL,
  mac_address_wifi varchar(100) NOT NULL,
  note varchar(255) DEFAULT NULL,
  data_ultimo_aggiornamento date DEFAULT NULL,
  osservazioni varchar(255) DEFAULT NULL,
  status varchar(50) DEFAULT NULL,
  armadio int(11) DEFAULT NULL references armadi(id)
);

CREATE TABLE ritiri (
  id int not null primary key AUTO_INCREMENT,
  ora_ritiro time not null,
  ora_consegna time not null,
  data date not null,
  pc int not null references pc(id),
  insegnante varchar(255) not null  
);

CREATE TABLE armadi (
  id int NOT NULL primary key auto_increment,
  capienza int DEFAULT NULL,
  aula int DEFAULT NULL references aule(id),
  nome varchar(20) not null
);

CREATE TABLE aule (
  id int not null primary key AUTO_INCREMENT,
  nome varchar(255) not null,
  piano int not null
);

insert into ruoli values('utente');
insert into ruoli values('admin');
insert into utenti values (1, 'Giuliano', 'Bellucci', 'bellux@gmail.com', 'admin');
insert into login values (1, 'bellux', '$argon2id$v=19$m=65536,t=3,p=4$k0L1JLW7hm4FGRgaxglE6w$GJx5B9MTwjnC/k0nC0fGbashWLayoeUJNamMtVXGm30', 1);
INSERT INTO `aule` (`id`, `nome`, `piano`) VALUES
(1, 'DOCENTIINFO', 2);
INSERT INTO `armadi` (`id`, `capienza`, `aula`, `nome`) VALUES
(1, 30, 1, 'A1');
INSERT INTO `pc` (`id`, `nome`, `numero_inventario`, `mac_address_wifi`, `note`, `data_ultimo_aggiornamento`, `osservazioni`, `status`, `armadio`) VALUES
(1, 'HP-14', 3370, '5C-BA-EF-4C-7C-31', 'PC notebook HP 255 G7 - AMD Ryzen 5 3500U with Radeon Vega Mobile Gfx 2.10 GHz – RAM 8 GB – WIN10PRO 22H2 – H.D.250 GB - N. serie: CND038030P N. prodotto: 3C248EA#ABZ', '2023-12-12', NULL, 'disponibile', 1),
(2, 'HP-1', 3241, '70-66-55-6D-E9-85', 'PC notebook HP 255 G7 - AMD Ryzen 3 3200U with Radeon Vega Mobile Gfx 2.60 GHz - RAM 8 GB – WIN10PRO 22H2 – H.D.250 GB - N. serie: CND01624SQ - N. prodotto: 2D318EA', '2023-06-12', NULL, 'disponibile', 1),
(3, 'LENOVO-2', 3094, 'D0-AB-D5-0B-FF-E5', 'INTEL CORE I5-7200U 2.50GHZ - 8 GB RAM - WIN 10 PRO. 22H2 -MODELL V130-15IKB - TYPE 81HN - N. SERIE R90V0ZJN', '2023-05-12', NULL, 'disponibile', 1),
(4, 'LENOVO-1', 3113, 'D0-AB-D5-08-C1-C2', 'INTEL CORE I5-7200U 2.50GHZ - 8 GB RAM - WIN 10 PRO. 22H2 -MODELL V130-15IKB - TYPE 81HN - N. SERIE R90V0ZR5', '2023-05-12', NULL, 'disponibile', 1),
(5, 'HP-4', 3491, '90-E8-68-82-8A-99', 'NUMERO PRODOTTO: HP 250 G8 Notebook PC – NUMERO DI SERIE: CND1377PCR – COD. PRODOTTO: 3V5P1EA#ABZ - 11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz - Windows 10 Pro Education 64 bit  Versione: 19045.2546 – 8 GB RAM – 500 GB H.D.', '2023-06-12', 'senza veyon tutti hp grigio chiari', 'disponibile', 1),
(6, 'HP-5', 3492, '90-E8-68-82-8A-9D', 'NUMERO PRODOTTO: HP 250 G8 Notebook PC – NUMERO DI SERIE: CND1377P8S – COD. PRODOTTO: 3V5P1EA#ABZ - 11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz - Windows 10 Pro Education 64 bit  Versione: 19045.2546 – 8 GB RAM – 500 GB H.D', '2023-06-12', NULL, 'disponibile', 1),

(7, 'HP-6', 3493, '90-E8-68-82-8A-8F', 'NUMERO PRODOTTO: HP 250 G8 Notebook PC – NUMERO DI SERIE: CND1377P95 – COD. PRODOTTO: 3V5P1EA#ABZ - 11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz - Windows 10 Pro Education 64 bit  Versione: 19045.2546 – 8 GB RAM – 500 GB H.D', '2023-06-12', NULL, 'disponibile', 1),
(8, 'ASUS-5', 3247, '9C-FC-E8-B0-03-F6', 'INTEL CORE I3 10TH GEN. -', '2023-05-12', NULL, 'disponibile', 1),
(9, 'HP-8', 3367, '5C-BA-EF-4C-94-8B', 'PC notebook HP 255 G7 - AMD Ryzen 5 3500U with Radeon Vega Mobile Gfx 2.10 GHz – RAM 8 GB – WIN10PRO 22H2 – H.D.250 GB - N. serie: CND0380366 N. prodotto: 3C248EA#ABZ', '2023-07-12', NULL, 'disponibile', 1),
(10, 'HP-9', 3363, '5C-BA-EF-4C-BE-89', 'PC notebook HP 255 G7 - AMD Ryzen 5 3500U with Radeon Vega Mobile Gfx 2.10 GHz – RAM 8 GB – WIN10PRO 22H2 – H.D.250 GB - N. serie: CND0380366 N. prodotto: 3C248EA#ABZ', '2023-07-12', NULL, 'disponibile', 1),
(11, 'HP-10', 3365, '5C-BA-EF-48-CE-59', 'PC notebook HP 255 G7 - AMD Ryzen 5 3500U with Radeon Vega Mobile Gfx 2.10 GHz – RAM 8 GB – WIN10PRO 22H2 – H.D.250 GB - N. serie: ? N. prodotto: 3C248EA#ABZ - NON FUNZIONA SCHEDA DI RETE ETHERNET.', '2023-07-12', 'NON FUNZIONA LA SCHEDA LAN', 'disponibile', 1),
(12, 'HP-11', 3368, '5C-BA-EF-4B-EC-61', 'PC notebook HP 255 G7 - AMD Ryzen 5 3500U with Radeon Vega Mobile Gfx 2.10 GHz – RAM 8 GB – WIN10PRO 22H2 – H.D.250 GB - N. serie: ? N. prodotto: 3C248EA#ABZ', '2023-07-12', NULL, 'disponibile', 1),
(13, 'HP-12', 3366, '5C-BA-EF-4B-DA-D7', 'PC notebook HP 255 G7 - AMD Ryzen 5 3500U with Radeon Vega Mobile Gfx 2.10 GHz – RAM 8 GB – WIN10PRO 22H2 – H.D.250 GB - N. serie: ? N. prodotto: 3C248EA#ABZ', '2023-06-12', NULL, 'disponibile', 1),
(14, 'HP-2', 3242, '70-66-55-7A-C8-07', 'PC notebook HP 255 G7 - AMD Ryzen 3 3200U with Radeon Vega Mobile Gfx 2.60 GHz - RAM 8 GB – WIN10PRO 22H2 – H.D.250 GB - N. serie: ? - N. prodotto: 2D318EA', '2023-06-12', NULL, 'disponibile', 1),
(15, 'HP-7', 3364, '5C-BA-EF-4B-CF-0D', 'PC notebook HP 255 G7 - AMD Ryzen 5 3500U with Radeon Vega Mobile Gfx 2.10 GHz – RAM 8 GB – WIN10PRO 22H2 – H.D.250 GB - N. serie: ? N. prodotto: 3C248EA#ABZ', '2023-07-12', 'veyon da rivedere', 'disponibile', 1),
(16, 'ASUS-4', 3246, '9C-FC-E8-B0-84-BB', 'INTEL CORE I3-1005G1 - 1,20 GHZ - 8 GB RAM - H.D. 250 GB', '2023-05-12', NULL, 'disponibile', 1),
(17, 'ASUS-7', 3249, '9C-FC-E8-AF-80-61', 'INTEL CORE I3-1005G1 - 1,20 GHZ - 8 GB RAM - H.D. 250 GB', '2023-05-12', NULL, 'disponibile', 1),
(18, 'HP-13', 3361, '5C-BA-EF-4C-03-17', 'PC notebook HP 255 G7 - AMD Ryzen 5 3500U with Radeon Vega Mobile Gfx 2.10 GHz – RAM 8 GB – WIN10PRO 22H2 – H.D.250 GB - N. serie: ? N. prodotto: 3C248EA#ABZ', '2023-07-12', NULL, 'disponibile', 1),
(19, 'ASUS-3', 3245, '9C-FC-E8-AF-99-39', 'INTEL CORE I3-1005G1 - 1,20 GHZ - 8 GB RAM - H.D. 250 GB', '2023-05-12', NULL, 'disponibile', 1),
(20, 'HP-3', 3490, '90-E8-68-81-EB-A5', 'NUMERO PRODOTTO: HP 250 G8 Notebook PC – NUMERO DI SERIE: ? – COD. PRODOTTO: 3V5P1EA#ABZ - 11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz - Windows 10 Pro Education 64 bit  Versione: 19045.2546 – 8 GB RAM – 500 GB H.D', '2023-06-12', NULL, 'disponibile', 1),
(21, 'ASUS-9', 3251, '9C-FC-E8-AF-98-85', 'INTEL CORE I3-1005G1 - 1,20 GHZ - 8 GB RAM - H.D. 250 GB', '2023-06-12', 'Lettera M della tastiera mancante', 'disponibile', 1),
(22, 'ASUS-8', 3250, '9C-FC-E8-AF-6C-57', 'INTEL CORE I3-1005G1 - 1,20 GHZ - 8 GB RAM - H.D. 250 GB', '2023-06-12', NULL, 'disponibile', 1),
(23, 'ASUS-6', 3248, '9C-FC-E8-AF-98-8F', 'INTEL CORE I3-1005G1 - 1,20 GHZ - 8 GB RAM - H.D. 250 GB', '2023-05-12', NULL, 'disponibile', 1),
(24, 'ASUS-2', 3244, '9C-FC-E8-AF-80-48', 'INTEL CORE I3-1005G1 - 1,20 GHZ - 8 GB RAM - H.D. 250 GB', '2023-06-12', NULL, 'disponibile', 1),
(25, 'ASUS-1', 3243, '9C-FC-E8-AF-A7-DF', 'INTEL CORE I3-1005G1 - 1,20 GHZ - 8 GB RAM - H.D. 250 GB', '2023-05-12', NULL, 'disponibile', 1);