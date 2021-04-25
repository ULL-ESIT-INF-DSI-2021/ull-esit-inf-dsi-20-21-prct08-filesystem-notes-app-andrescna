"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const note_1 = require("../src/note");
const fs = require("fs");
describe('Pruebas método Note', () => {
    let user1 = new note_1.Note("andres");
    let user2 = new note_1.Note("juan");
    const path = "user/";
    const note1 = { title: "nota1", body: "esta es la nota 1", color: "red" };
    const note2 = { title: "nota2", body: "esta es la nota 2", color: "blue" };
    const note3 = { title: "nota3", body: "esta es la nota 3", color: "yellow" };
    const note4 = { title: "nota4", body: "esta es la nota 4", color: "green" };
    it("La nota se añade correctamente", () => {
        chai_1.expect(fs.existsSync(path + user1.getUser() + "/" + note1.title + '.json')).to.be.false;
        user1.addNote(note1.title, note1.body, note1.color);
        chai_1.expect(fs.existsSync(path + user1.getUser() + "/" + note1.title + '.json')).to.be.true;
        chai_1.expect(fs.existsSync(path + user1.getUser() + "/" + note2.title + '.json')).to.be.false;
        user1.addNote(note2.title, note2.body, note2.color);
        chai_1.expect(fs.existsSync(path + user1.getUser() + "/" + note2.title + '.json')).to.be.true;
        /*
                expect(fs.existsSync(path + user2 + "/" + note3.title + '.json')).to.be.false;
                user2.addNote(note3.title, note3.body, note3.color);
                expect(fs.existsSync(path + user2 + "/" + note3.title + '.json')).to.be.true;
        
                expect(fs.existsSync(path + user2 + "/" + note2.title + '.json')).to.be.false;
                user2.addNote(note4.title, note4.body, note4.color);
                expect(fs.existsSync(path + user2 + "/" + note4.title + '.json')).to.be.true;
        */
    });
    it("La nota se elimina correctamente", () => {
        chai_1.expect(fs.existsSync(path + user1 + "/" + note1.title + '.json')).to.be.true;
        user1.removeNote(note1.title);
        chai_1.expect(fs.existsSync(path + user1 + "/" + note1.title + '.json')).to.be.false;
        chai_1.expect(fs.existsSync(path + user1 + "/" + note2.title + '.json')).to.be.true;
        user1.removeNote(note2.title);
        chai_1.expect(fs.existsSync(path + user1 + "/" + note2.title + '.json')).to.be.false;
        chai_1.expect(fs.existsSync(path + user2 + "/" + note3.title + '.json')).to.be.true;
        user2.removeNote(note3.title);
        chai_1.expect(fs.existsSync(path + user2 + "/" + note3.title + '.json')).to.be.false;
        chai_1.expect(fs.existsSync(path + user2 + "/" + note4.title + '.json')).to.be.true;
        user2.removeNote(note4.title);
        chai_1.expect(fs.existsSync(path + user2 + "/" + note4.title + '.json')).to.be.false;
    });
});
