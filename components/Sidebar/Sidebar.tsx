import { IconFolderPlus, IconMistOff, IconPlus } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CloseSidebarButton,
  OpenSidebarButton,
} from './components/OpenCloseButton';
import { HiOutlineFolder } from 'react-icons/hi';


import Search from '../Search';

interface Props<T> {
  isOpen: boolean;
  addItemButtonTitle: string;
  side: 'left' | 'right';
  items: T[];
  itemComponent: ReactNode;
  folderComponent: ReactNode;
  footerComponent?: ReactNode;
  searchTerm: string;
  handleSearchTerm: (searchTerm: string) => void;
  toggleOpen: () => void;
  handleCreateItem: () => void;
  handleCreateFolder: () => void;
  handleDrop: (e: any) => void;
}

const Sidebar = <T,>({
  isOpen,
  addItemButtonTitle,
  side,
  items,
  itemComponent,
  folderComponent,
  footerComponent,
  searchTerm,
  handleSearchTerm,
  toggleOpen,
  handleCreateItem,
  handleCreateFolder,
  handleDrop,
}: Props<T>) => {
  const { t } = useTranslation('promptbar');

  const allowDrop = (e: any) => {
    e.preventDefault();
  };

  const highlightDrop = (e: any) => {
    e.target.style.background = '#343541';
  };

  const removeHighlight = (e: any) => {
    e.target.style.background = 'none';
  };

  return isOpen ? (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className={`fixed top-0 ${side}-0 z-40 flex h-full w-[80%] flex-none flex-col space-y-4 bg-gradient-to-r from-green-900/20 to-[#202123]/10 p-4 text-[14px] transition-all sm:relative sm:top-0 border border-white rounded-lg mt-6`}
      >
        
        <Search
          placeholder={t('Search here...') || ''}
          searchTerm={searchTerm}
          onSearch={handleSearchTerm}
        />
  
        <div className="flex-grow overflow-auto">
          {items?.length > 0 && (
            <div className="flex border-b border-white/20 pb-2">
              {folderComponent}
            </div>
          )}

          {items?.length > 0 ? (
            <div
              className="pt-2"
              onDrop={handleDrop}
              onDragOver={allowDrop}
              onDragEnter={highlightDrop}
              onDragLeave={removeHighlight}
            >
              {itemComponent}
            </div>
          ) : (
            <div className="mt-8 select-none text-center text-white opacity-50">
              {/* <IconMistOff className="mx-auto mb-3" /> */}
              <HiOutlineFolder
                className="mx-auto mb-3 text-gradient-to-r from-green-400 via-blue-500 to-purple-500 animate-pulse"
                size={40} // Increase size for better visibility
              />
              <span className="text-[14px] leading-normal">
                {t('No data.')}
              </span>
            </div>
          )}
        </div>
        {footerComponent}
        <div className="flex items-center w-full">
          <button
            className="flex w-[75%] flex-shrink-0 cursor-pointer select-none items-center justify-center gap-3 rounded-md border border-white/20 p-3 text-white transition-colors duration-200 hover:bg-[#4e8d7c]/10 bg-[#4e8d7c]"
            onClick={() => {
              handleCreateItem();
              handleSearchTerm('');
            }}
          >
            <IconPlus size={16} />
            <span>{addItemButtonTitle}</span>
          </button>


          <button
            className="ml-4 flex flex-shrink-0 cursor-pointer items-center gap-3 rounded-md border border-white/20 p-3 text-sm text-white transition-colors duration-200 hover:bg-gray-500/10"
            onClick={handleCreateFolder}
          >
            <IconFolderPlus size={16} />
          </button>
        </div>
      </div>
  
      <CloseSidebarButton onClick={toggleOpen} side={side} />
    </div>
  ) : (
    <OpenSidebarButton onClick={toggleOpen} side={side} />
  );

};

export default Sidebar;
