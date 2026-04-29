interface TermDefListProps {
  items: ReadonlyArray<readonly [term: string, def: string]>;
}

const TermDefList = ({ items }: TermDefListProps) => {
  return (
    <ul className="space-y-3">
      {items.map(([term, def]) => (
        <li key={term} className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#00c8ff" }} />
          <span className="text-body-sm text-secondary-text">
            <strong className="text-primary-text">{term}</strong> — {def}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TermDefList;
