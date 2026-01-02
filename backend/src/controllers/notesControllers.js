import express from "express";
import note from "../models/note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Internal server Error", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getNoteById(req, res) {
    try {
      const notes = await note.findById(req.params.id);
      res.status(200).json(notes);
    } catch (error) {
      console.error("Internal server Error", error);
      res.status(500).json({ message: "Server Error" });
    }
  }

export async function postNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new note({ title, content });
    await newNote.save();
    res.status(201).json({ messsage: "Note created successfully!" });
  } catch (error) {
    console.error("Internal server Error", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "updated succesfully" });
  } catch (error) {
    console.error("Internal server Error", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Deleted succesfully" });
  } catch (error) {
    console.error("Internal server Error", error);
    res.status(500).json({ message: "Server Error" });
  }
}
