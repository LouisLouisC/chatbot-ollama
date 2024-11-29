import { IconRobot } from '@tabler/icons-react';

import botLogo from '../../logo/bank.png'
import { FC } from 'react';

interface Props { }

export const ChatLoader: FC<Props> = () => {
  return (
    <div
      className="group bg-white text-gray-800 dark:border-gray-900/50 dark:text-gray-800"
      style={{ overflowWrap: 'anywhere' }}
    >
      <div className="m-auto flex gap-4 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        <div className="min-w-[40px] items-end ml-6">
          <img src={botLogo.src} alt="Bot Icon" width={30} height={30}/>
        </div>
        <span className="animate-pulse cursor-default mt-1">▍</span>
      </div>
      <br />
      <br />
    </div>
  );
};
