//? modul
//?chalk versi 4.1.0
//?validator versi 13.5.2
//? nodemon
//?yargs versi 16.2.0



//! cara pemakaian
//! node index add --nama="" --email="" --noHP=""
//! node index search --nama=""
//!node index list
//! node index remove --nama=""
//! node index --help UNTUK HELP APA AJAYANG HARUS DIKETIK TO COMMAND

const fs = require('fs')
const validator = require('validator')
const chalk = require('chalk')
const { constants } = require('buffer')
const { clear } = require('console')

if (!fs.existsSync('./data')) {
    fs.mkdirSync('data')
}
if (!fs.existsSync('./data/contact.json')) {
    fs.writeFileSync('./data/contact.json', '[]', 'utf-8')
}
function masukJSON() {
    const file = fs.readFileSync('data/contact.json', 'utf-8')
    const contacts = JSON.parse(file)
    return contacts

}


const data = (nama, email, noHP) => {
    const contact = { nama, email, noHP }
    const contacts = masukJSON()
    const duplikat = contacts.find((contact) => contact.nama === nama)
    if (duplikat) {
        console.log(chalk.red('nama anda sudah terdaftar'));
        return false
    }
    if (!validator.isEmail(email)) {
        console.log(chalk.red('email ini salah'));
        return false
    }
    if (!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(chalk.red('nomor anda salah'));
    }


    contacts.push(contact)
    //! untuk mengubah contact menjadi string
    fs.writeFileSync('data/contact.json', JSON.stringify(contacts))
    console.log(chalk.blue('anda berhasil menambahkan'));

}
function list() {
    const contacts = masukJSON()
    contacts.forEach(a => {
        console.log(chalk.black.bgWhite(`namaUser -- ${a.nama}`));
    });
}

function search(nama) {
    const contacts = masukJSON()
    contacts.map(a => {
        if (a.nama.toLowerCase() === nama.toLowerCase()) {
            console.log(chalk.blue.bgGreen(`namaUser -- ${a.nama} ,notlp -- ${a.noHP} ,noEmail -- ${a.email}`));
        }
    });

}

function removeContact(nama) {
    const contact = masukJSON()
    let newcontact = contact.filter((a) => {
        return a.nama.toLowerCase() !== nama.toLowerCase()
    })
    if (contact.length === newcontact.length) {
        console.log(chalk.red(`maaf nama yang anda masukan tidak terdaftar ${list()}`));
    } else {
        fs.writeFileSync('data/contact.json', JSON.stringify(newcontact))
        console.log(chalk.red(`${nama} sudah di hapus`));
    }
}
module.exports = { data, list, search, removeContact }