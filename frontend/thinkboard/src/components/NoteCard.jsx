import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utlis";
import api from "../lib/axios";
import toast from "react-hot-toast";


const NoteCard = ({ note, setNotes }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();  // prevent the Link navigation
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/notes/${note._id}`);
      setNotes(prevNotes => prevNotes.filter(n => n._id !== note._id)); // update the notes state
      toast.success("Note deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Failed to delete note");
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };
  return (
    <>
      <Link
        to={`/note/${note._id}`}
        className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
      >
        <div className="card-body">
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">{formatDate(new Date(note.createdAt))}</span>
            <div className="flex items-center gap-1">
              <PenSquareIcon className="size-4" />
              <button className="btn btn-ghost btn-xs text-error" onClick={handleDeleteClick}> 
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Delete Note</h3>
            <p className="py-4">Are you sure you want to delete this note? This action cannot be undone.</p>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={handleCancelDelete}></div>
        </div>
      )}
    </>
  );
};

export default NoteCard;
