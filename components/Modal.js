import React from "react";

export default function Modal({ show, onClose, children }) {
  return (
    <div
      style={{
        transform: show ? "translatex(0%)" : "translateX(-200%)",
      }}
      className="absolute top-0 left-0 w-full h-full z-10 transition-all duration-700 "
    >
      <div
        className="max-w-2xl mx-auto h-[80vh] bg-slate-800 rounded-3xl py-6 px-4 overflow-y-scroll  scrollbar-thin
      scrollbar-thumb-slate-700 scrollbar-track-slate-800 scroll-smooth scrollbar-thumb-rounded-2xl"
      >
        <button
          onClick={() => {
            onClose(false);
          }}
          className="w-10 h-10 bg-stone-600 rounded-full font-bold mb-4"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}
