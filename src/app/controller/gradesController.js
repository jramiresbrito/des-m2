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

  async sum(req, res) {
    try {
      const db = JSON.parse(
        await readFile(resolve(__dirname, '..', 'datasets', 'grades.json'))
      );

      const { student, subject } = req.params;

      const records = db.grades.filter(
        (r) =>
          r.student.toLowerCase() === student.toLowerCase() &&
          r.subject.toLowerCase() === subject.toLowerCase()
      );

      let sum = 0;
      records.forEach((r) => {
        sum += r.value;
      });

      return res.json(sum);
    } catch (error) {
      return res.json(error);
    }
  }

  async subjectTypeAverage(req, res) {
    try {
      const db = JSON.parse(
        await readFile(resolve(__dirname, '..', 'datasets', 'grades.json'))
      );

      const { subject, type } = req.params;

      const records = db.grades.filter(
        (r) =>
          r.subject.toLowerCase() === subject.toLowerCase() &&
          r.type.toLowerCase() === type.toLowerCase()
      );

      let avg = 0;
      records.forEach((r) => {
        avg += r.value;
      });

      avg /= records.length;

      return res.json(avg);
    } catch (error) {
      return res.json(error);
    }
  }

  async top3(req, res) {
    try {
      const db = JSON.parse(
        await readFile(resolve(__dirname, '..', 'datasets', 'grades.json'))
      );

      const { subject, type } = req.params;

      const records = db.grades
        .filter(
          (r) =>
            r.subject.toLowerCase() === subject.toLowerCase() &&
            r.type.toLowerCase() === type.toLowerCase()
        )
        .sort((a, b) => b.value - a.value);

      return res.json(records.slice(0, 3));
    } catch (error) {
      return res.json(error);
    }
  }
}

export default new GradesController();
