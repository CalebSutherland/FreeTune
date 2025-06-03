import "./tools-layout.css";

export function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="tools-layout-wrapper">
      <div className="tool-content-wrapper">{children}</div>
      <div className="other-tools-wrapper">
        <h2>Tools</h2>
        <div className="card-row">
          <p>tools</p>
          <p>tools</p>
          <p>tools</p>
          <p>tools</p>
        </div>
      </div>
      <div className="htu-wrapper">
        <h2>How to Use</h2>
        <div className="htu-content">
          <h3>Instruction 1</h3>
          <p>blah blah blah</p>
          <h3>Instruction 2</h3>
          <p>blah blah blah</p>
          <h3>Instruction 3</h3>
          <p>blah blah blah</p>
        </div>
      </div>
    </div>
  );
}
