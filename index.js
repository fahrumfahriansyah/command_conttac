
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

const dataUser = require('./contacts')
const yargs = require('yargs')
const { demandOption } = require('yargs')

yargs.command({
    command: 'add',
    describe: 'menambahkan add baru',
    builder: {
        nama: {
            describe: 'masukan nama anda',
            demandOption: true,
            type: 'string'
        }, email: {
            describe: 'masukan email anda',
            demandOption: true,
            type: 'string'
        }, noHP: {
            describe: 'masukan no hp anda',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        //! kita ambil data nya
        return dataUser.data(argv.nama, argv.email, argv.noHP)
    }
})

yargs.command({
    command: 'list',
    describe: "menambahkan list",
    handler() {
        return dataUser.list()
    }
})

yargs.command({
    command: 'search',
    describe: 'menambahkan search',
    builder: {
        nama: {
            describe: 'menambahkan nama',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        return dataUser.search(argv.nama)
    }

})
yargs.command({
    command: 'remove',
    describe: "menghapus nama",
    builder: {
        nama: {
            describe: 'menghapus',
            demandOption: true,
            type: 'string'
        },

    },
    handler(argv) {
        return dataUser.removeContact(argv.nama)
    }
}).demandCommand()
yargs.parse()

// const main = async () => {
//     const nama = await dataUser.pertanyaan('masukan nama anda : ')
//     const email = await dataUser.pertanyaan('masukan email anda : ')
//     const noHP = await dataUser.pertanyaan('masukan no hp anda : '
//     )
//     dataUser.data(nama, email, noHP)
// }
// main()
//! ini awal nya

// rl.question('masukan nama anda : ', (nama) => {
//     rl.question('masukan no tlp anda : ', (tlp) => {
//         const contact = { nama, tlp }
//         const file = fs.readFileSync('data/contact.json', 'utf-8')
//         const contacts = JSON.parse(file)
//         contacts.push(contact)
//         //! untuk mengubah contact menjadi string
//         fs.writeFileSync('data/contact.json', JSON.stringify(contacts))
//         rl.close()
//     })
// })