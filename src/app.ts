import {Note} from './note';
import * as yargs from 'yargs';

/**
* Comando add: Añade una nota nueva
*/

yargs.command({
    command: 'add',
    describe: 'Añade una nueva nota',
    builder: {
        user: {
            describe: 'Usuario',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Título',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Contenido de la nota',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Color de la nota',
            demandOption: true,
            type: 'string',
        },
    },

    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
        const Nota: Note = new Note(argv.user);
        Nota.addNote(argv.title, argv.body, argv.color);
        }
    },
});


/**
* Comando modify: modifica una nota ya existente
*/

yargs.command({
    command: 'modify',
    describe: 'Modifica una nota del usuario en función del título',
    builder: {
        user: {
            describe: 'Usuario',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Título de la nota a modificar',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Cuerpo de la nota a modificar',
            demandOption: true,
            type: 'string',
        },
        color: {
            describe: 'Color de la nota a modificar',
            demandOption: false,
            type: 'string',
        },
    },

    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
            const Nota: Note = new Note(argv.user);
            Nota.modifyNote(argv.title, argv.body, argv.color);
        }
    }
});


/**
* Comando remove: elimina una nota ya existente
*/

yargs.command({
    command: 'remove',
    describe: 'Elimina una nota del usuario',
    builder: {
        user: {
            describe: 'Usuario',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Título de la nota a eliminar',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string') {
            const Nota: Note = new Note(argv.user);
            Nota.removeNote(argv.title);
        }
    },
});


/**
* Comando lst: muestra una lista con todas la notas del usuario
*/

yargs.command({
    command: 'list',
    describe: 'Lista las notas del usuario',
        builder: {
        user: {
            describe: 'Usuario',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.user === 'string') {
            const Nota: Note = new Note(argv.user);
            Nota.listNotes();
        }
    },
});

/**
* Comando read: muestra el contenido de una nota del usuario
*/

yargs.command({
    command: 'read',
    describe: 'Muestra una nota del usuario',
    builder: {
        user: {
            describe: 'Usuario',
            demandOption: true,
            type: 'string',
        },
        title: {
            describe: 'Título de la nota a mostrar',
            demandOption: true,
            type: 'string',
        },
    },
    
    handler(argv) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string') {
            const Nota: Note = new Note(argv.user);
            Nota.readNote(argv.title);
        }
    },
});

yargs.parse();