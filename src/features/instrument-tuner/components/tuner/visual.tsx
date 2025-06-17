interface VisualProps {
  visual: string;
}

export default function Visual({ visual }: VisualProps) {
  return (
    <div className={`visual-container visual-${visual}`}>
      {/* Placeholder for visual representation */}
      <div className="visual-placeholder">Visual {visual} goes here</div>
    </div>
  );
}
