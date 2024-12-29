import { FC } from 'react';

import { Loading } from './loading/loading';
import { OrderPlacedLoader } from './order-placed/order-placed';
import { Spinner } from './spinner/spinner';
import { WheelAndHamster } from './wheel-and-hamster/wheel-and-hamster';

interface ILoaderProps {
  variant?: 'order' | 'hamster' | 'loading';
}

export const Loader: FC<ILoaderProps> = ({ variant }) => {
  switch (variant) {
    case 'order':
      return <OrderPlacedLoader />;
    case 'hamster':
      return <WheelAndHamster />;
    case 'loading':
      return <Loading />;
    default:
      return <Spinner />;
  }
};

export default Loader;
