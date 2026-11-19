import React, { useRef, useState, useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';

export default function RoughSlateModal() {
  const { isSlateOpen, setIsSlateOpen } = useAppState();
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#1e293b');

  useEffect(() => {
    if (!isSlateOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineWidth = 3;
  }, [isSlateOpen]);

  if (!isSlateOpen) return null;

  const getCoords = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDraw = (e) => {
    const { x, y } = getCoords(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    const { x, y } = getCoords(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">✏️</span>
            <h3 className="font-bold text-sm">Rough Slate Scratchpad</h3>
          </div>
          <div className="flex items-center gap-2">
            {['#1e293b', '#2563eb', '#dc2626', '#16a34a'].map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-6 h-6 rounded-full border-2 ${
                  color === c ? 'border-amber-400 scale-110' : 'border-white'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
            <button
              onClick={clearCanvas}
              className="px-3 py-1 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700"
            >
              Clear
            </button>
            <button
              onClick={() => setIsSlateOpen(false)}
              className="px-3 py-1 rounded-lg bg-rose-500 text-white text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={() => setDrawing(false)}
          onMouseLeave={() => setDrawing(false)}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={() => setDrawing(false)}
          className="w-full h-96 bg-amber-50/40 touch-none cursor-crosshair block"
        />
      </div>
    </div>
  );
}
