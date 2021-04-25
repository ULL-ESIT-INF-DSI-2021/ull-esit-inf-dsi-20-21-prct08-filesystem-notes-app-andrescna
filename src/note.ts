import * as chalk from 'chalk';
import * as fs from 'fs';


export class Note {

    private user: string;

    /**
   * Constructor de la clase Nota
   * @param user usuario
   */

    constructor(user: string) {
        this.user = user;
    }

    /**
   * Getter de la clase Nota
   * @returns @param user nombre de usuario
   */

    getUser() {
        return this.user;
    }

    /**
   * Función addNote, crea una nueva nota en el directorio del usuario @param user
   * o crea el directorio si no existe. Cada nota se almacena en un fichero JSON
   * separado. 
   * @param title Título de la nota a crear
   * @param body Cuerpo de la nota a crear
   * @param color Color de la nota a crear
   * La función @returns un mensaje de éxito o error según haya podido crear la nota, 
   * o esta ya exista.
   */

    addNote(title: string, body: string, color: string) {
        
        let path: string = 'user/' + this.user;
        
        if (fs.existsSync(path)) {
            if (fs.existsSync(path + "/" + title + '.json'))
                console.log(chalk.red("ERROR - Ya existe una nota con ese nombre"));
            else {
                let newNote = {"title": title, "body": body, "color": color};
                let newNoteJSON = JSON.stringify(newNote);
                fs.writeFileSync(path + "/" + title + '.json', newNoteJSON)
                console.log(chalk.green("Nota añadida correctamente"));
            }
        }
        else {
            fs.mkdirSync(path);
            let newNote = {"title": title, "body": body, "color": color};
            let newNoteJSON = JSON.stringify(newNote);
            fs.writeFileSync(path + "/" + title + '.json', newNoteJSON)
            console.log(chalk.green("Nota añadida correctamente"));
        }
    }
        
        

    /**
   * Función modifyNote, modifica una nota ya creada. Permite cambiar el cuerpo de la 
   * nota y el color.
   * @param title Título de la nota que se modifica
   * @param body Cuerpo de la nota que se modifica
   * @param color Color de la nota que se modifica
   * La función @returns un mensaje de éxito o error según haya podido modificar la nota, 
   * o esta no exista.
   */
    modifyNote(title: string, body: string, color: string) {

        let path: string = 'user/' + this.user;
        
        if (fs.existsSync(path + "/" + title + '.json')) {
            fs.rmSync(path + "/" + title + '.json');
            let modNote = {"title": title, "body": body, "color": color};
            let modNoteJSON = JSON.stringify(modNote);
            fs.writeFileSync(path + "/" + title + '.json', modNoteJSON)
            console.log(chalk.green("Nota modificada correctamente"));
        }
        else {
            console.log(chalk.red("ERROR - No existe una nota con ese nombre"));
        }
    }



    /**
   * Función removeNote, elimina una nota ya creada. Para ello comprueba que la nota existe.
   * @param title Título de la nota que se elimina
   * La función @returns un mensaje de éxito o error según haya podido eliminar la nota o
   * esta no exista.
   */

    removeNote(title: string) {

        let path: string = 'user/' + this.user;
        
        if (fs.existsSync(path + "/" + title + '.json')) {
            fs.rmSync(path + "/" + title + '.json');
            console.log(chalk.green("Nota eliminada correctamente"));
        }
        else {
            console.log(chalk.red("ERROR - No existe una nota con ese nombre"));
        }
    }



    /**
   * Función listNote, elimina una nota ya creada. Para ello comprueba que la nota existe.
   * La función @returns una lista de los títulos de las notas en su color correspondiente 
   * o un mensaje de error si no existen notas.
   */

    listNotes(){

        let path: string = 'user/' + this.user;
        
        if (fs.readdirSync(path).length === 0) {
            console.log(chalk.red("ERROR - El usuario no dispone de notas"));
        }
        else {
            let notes = fs.readdirSync(path);
            notes.forEach(note => {
                let readNoteJSON = fs.readFileSync(path + "/" + note, "utf-8");
                let readNote = JSON.parse(readNoteJSON);
                console.log(chalk.keyword(readNote["color"])(readNote["title"]));
            });
        }
    }

    /**
   * Función readNote, lee una nota del usuario y la muestra por pantalla. Para ello 
   * comprueba que la nota existe.
   * @param title título de la nota a mostrar
   * La función @returns el cuerpo de la nota en su color correspondiente
   * o un mensaje de error si no existe la nota.
   */

    readNote(title: string){

        let path: string = 'user/' + this.user;
        
        if (fs.existsSync(path + "/" + title + '.json')) {
            let readNoteJSON = fs.readFileSync(path + "/" + title + '.json', "utf-8");
            let readNote = JSON.parse(readNoteJSON);
            console.log(chalk.keyword(readNote["color"])(readNote["body"]));
        }
        else {
            console.log(chalk.red("ERROR - No existe una nota con ese nombre"));
        }
    }
}