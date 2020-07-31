import { resolve } from 'path';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

class GradesController {
  async index(req, res) {
    try {
      const db = JSON.parse(
        await readFile(resolve(__dirname, '..', 'datasets', 'grades.json'))
      );
      return res.json(db.grades);
    } catch (error) {
      return res.send(error);
    }
  }

  async show(req, res) {
    try {
      const db = JSON.parse(
        await readFile(resolve(__dirname, '..', 'datasets', 'grades.json'))
      );
      const { id } = req.params;

      const record = db.grades.find((r) => r.id === parseInt(id, 10));

      return res.json(record);
    } catch (error) {
      return res.send(error);
    }
  }

  async create(req, res) {
    try {
      const db = JSON.parse(
        await readFile(resolve(__dirname, '..', 'datasets', 'grades.json'))
      );

      const { nextId } = db;
      const { student, subject, type, value } = req.body;

      const record = {
        id: nextId,
        student,
        subject,
        type,
        value,
        timestamp: new Date(),
      };

      db.nextId += 1;

      db.grades.push(record);

      await writeFile(
        resolve(__dirname, '..', 'datasets', 'grades.json'),
        JSON.stringify(db)
      );

      return res.json(record);
    } catch (error) {
      return res.send(error);
    }
  }

  async update(req, res) {
    try {
      const db = JSON.parse(
        await readFile(resolve(__dirname, '..', 'datasets', 'grades.json'))
      );

      const { id } = req.params;
      const { student, subject, type, value } = req.body;

      const record = db.grades.find((r) => r.id === parseInt(id, 10));
      const index = db.grades.indexOf(record);

      if (student) record.student = student;
      if (subject) record.subject = subject;
      if (type) record.type = type;
      if (value) record.value = value;
      record.updated_at = new Date();

      db.grades[index] = record;

      await writeFile(
        resolve(__dirname, '..', 'datasets', 'grades.json'),
        JSON.stringify(db)
      );

      return res.json(record);
    } catch (error) {
      return res.json(error);
    }
  }

  async destroy(req, res) {
    try {
      const db = JSON.parse(
        await readFile(resolve(__dirname, '..', 'datasets', 'grades.json'))
      );

      const { id } = req.params;

      const record = db.grades.find((r) => r.id === parseInt(id, 10));
      const index = db.grades.indexOf(record);

      db.grades.splice(index, 1);

      await writeFile(
        resolve(__dirname, '..', 'datasets', 'grades.json'),
        JSON.stringify(db)
      );

      return res.json(record);
    } catch (error) {
      return res.json(error);
    }
  }
}

export default new GradesController();
