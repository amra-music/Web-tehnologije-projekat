const Sequelize = require("sequelize");
const sequelize = new Sequelize("DBWT19","root","root",{host:"127.0.0.1",dialect:"mysql",logging:false});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.osoblje = sequelize.import(__dirname+'/osoblje.js');
db.sala = sequelize.import(__dirname+'/sala.js');
db.rezervacija = sequelize.import(__dirname+'/rezervacija.js');
db.termin = sequelize.import(__dirname+'/termin.js');


//relacije
// Veza 1-n vise rezervacija moze imati jedna osoba
db.osoblje.hasMany(db.rezervacija,{foreignKey:'osoba'});
//Veza 1-n vise sala moze imati jednu rezervaciju
db.sala.hasMany(db.rezervacija,{foreignKey:'sala'});


//Veza 1-1 
db.termin.hasOne(db.rezervacija,{foreignKey:'termin'});
db.osoblje.hasOne(db.sala,{foreignKey:'zaduzenaOsoba'});

db.sequelize.sync({force:true}).then(function () {
	unosPodataka();
});

module.exports=db;


function unosPodataka(){
	var osoblje;
	var termin;
	var rezervacija;
	var sala;

	db.osoblje.bulkCreate([
  { id:1 , ime:'Neko', prezime:'Nekic', uloga:'profesor' },
  { id:2 , ime:'Drugi', prezime:'Neko', uloga:'asistent' },
  { id:3 , ime:'Test', prezime:'Test', uloga:'asistent' }
]);

	db.sala.bulkCreate([
  { id:1 , naziv:'1-11', zaduzenaOsoba:1},
  { id:2 , naziv:'1-15', zaduzenaOsoba:2}
]);

	db.termin.bulkCreate([
  { id:1 , redovni:false, datum:'01.01.2020', pocetak:'12:00', kraj:'13:00' },
  { id:2 , redovni:true, dan:0, semestar:'zimski' , pocetak:'13:00', kraj:'14:00' },
 
]);

	db.rezervacija.bulkCreate([
  { id:1 , termin:1, sala:1, osoba:1 },
  { id:2 , termin:2, sala:1, osoba:3 }
]);

}
