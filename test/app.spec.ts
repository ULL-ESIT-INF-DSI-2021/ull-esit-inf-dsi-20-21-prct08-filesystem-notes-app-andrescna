import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/note';
import * as fs from 'fs';

describe('Pruebas método Note', () => {
    
    let user1 = new Note("andres");
    let user2 = new Note("juan");
    const path: string = "user/";

    const note1 = {title: "nota1", body: "esta es la nota 1", color: "red"};
    const note2 = {title: "nota2", body: "esta es la nota 2", color: "blue"};
    const note3 = {title: "nota3", body: "esta es la nota 3", color: "yellow"};
    const note4 = {title: "nota4", body: "esta es la nota 4", color: "green"};
    const nota5 = {body: "esta es la nota 1 modificada", color: "purple"};

    
    it("La nota se añade correctamente", () => {
        
        expect(fs.existsSync(path + user1.getUser() + "/" + note1.title + '.json')).to.be.false;
        user1.addNote(note1.title, note1.body, note1.color);
        expect(fs.existsSync(path + user1.getUser() + "/" + note1.title + '.json')).to.be.true;

        expect(fs.existsSync(path + user1.getUser() + "/" + note2.title + '.json')).to.be.false;
        user1.addNote(note2.title, note2.body, note2.color);
        expect(fs.existsSync(path + user1.getUser() + "/" + note2.title + '.json')).to.be.true;

        expect(fs.existsSync(path + user2.getUser() + "/" + note3.title + '.json')).to.be.false;
        user2.addNote(note3.title, note3.body, note3.color);
        expect(fs.existsSync(path + user2.getUser() + "/" + note3.title + '.json')).to.be.true;

        expect(fs.existsSync(path + user2.getUser() + "/" + note2.title + '.json')).to.be.false;
        user2.addNote(note4.title, note4.body, note4.color);
        expect(fs.existsSync(path + user2.getUser() + "/" + note4.title + '.json')).to.be.true;

    });


    it("La nota se lee correctamente", () => {
        expect(user1.readNote(note1.title));
        expect(user1.readNote(note2.title));
        expect(user2.readNote(note3.title));
        expect(user2.readNote(note4.title));
    });

    it("La nota se listan correctamente", () => {
        expect(user1.listNotes());
        expect(user2.listNotes());
    });

    it("La nota se modifican correctamente", () => {
        user1.readNote(note1.title);
        user1.modifyNote(note1.title, nota5.body, nota5.color);
        user1.readNote(note1.title);
    });

    it("La nota se elimina correctamente", () => {
        expect(fs.existsSync(path + user1.getUser() + "/" + note1.title + '.json')).to.be.true;
        user1.removeNote(note1.title);
        expect(fs.existsSync(path + user1.getUser() + "/" + note1.title + '.json')).to.be.false;
        expect(fs.existsSync(path + user1.getUser() + "/" + note2.title + '.json')).to.be.true;
        user1.removeNote(note2.title);
        expect(fs.existsSync(path + user1.getUser() + "/" + note2.title + '.json')).to.be.false;

        expect(fs.existsSync(path + user2.getUser() + "/" + note3.title + '.json')).to.be.true;
        user2.removeNote(note3.title);
        expect(fs.existsSync(path + user2.getUser() + "/" + note3.title + '.json')).to.be.false;
        expect(fs.existsSync(path + user2.getUser() + "/" + note4.title + '.json')).to.be.true;
        user2.removeNote(note4.title);
        expect(fs.existsSync(path + user2.getUser() + "/" + note4.title + '.json')).to.be.false;
        fs.rmSync(path + user2.getUser(), {recursive: true});

    });


    it("Los métodos de error funcionan correctamente", () => {

        user1.addNote(note1.title, note1.body, note1.color);
        user1.addNote(note1.title, note1.body, note1.color);
        user1.removeNote(note1.title);
        user1.removeNote(note1.title);
        user1.modifyNote(note1.title, nota5.body, nota5.color);
        user1.listNotes();
        user1.readNote(note1.title);
    })
    
});

