type Props = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Search({ handleSearch }: Props) {
  return (
    <div className="mb-6">
      <input
        type="search"
        placeholder="search videos"
        className="p-4 outline-0 border border-yellow-400 rounded-2xl w-full max-w-full"
        onChange={handleSearch}
      />
    </div>
  );
}
