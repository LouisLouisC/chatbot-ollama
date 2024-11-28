import { IconSearch, IconX } from '@tabler/icons-react';
import { FC } from 'react';

import { useTranslation } from 'next-i18next';

interface Props {
  placeholder: string;
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}
const Search: FC<Props> = ({ placeholder, searchTerm, onSearch }) => {
  const { t } = useTranslation('sidebar');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    onSearch('');
  };

  return (
    <div className="relative flex items-center">
      <IconSearch
        className="absolute left-4 text-neutral-500"  // Darker icon color
        size={18}
      />
      <input
        className="w-full flex-1 rounded-md border border-neutral-300 bg-white px-4 py-3 pl-10 pr-10 text-[14px] leading-3 text-gray-800"  // White background with dark text
        type="text"
        placeholder={t(placeholder) || ''}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {searchTerm && (
        <IconX
          className="absolute right-4 cursor-pointer text-neutral-500 hover:text-neutral-600"  // Darker icon color with hover effect
          size={18}
          onClick={clearSearch}
        />
      )}
    </div>
  );
};

export default Search;
