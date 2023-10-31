import style from './filters-item.module.scss';
import iconExpend from '@/assets/images/expand.svg'
import { Filter } from '@/types';
import { useState } from 'react';
import { FiltersList, FiltersSlider } from '@/components';

type Props = {
  filter: Filter
}
export const FiltersItem = ({ filter }: Props) => {
  const [showBody, setShowBody] = useState(true);
  return (
    <div className={style["filters-item"]}>
      <div className={style["filters-item__header"]} onClick={() => setShowBody((st) => !st)}>
        <span className={style["filters-item__title"]}>
          {filter.display_name ?? 'Filter'}
        </span>
        <span className={showBody ? style["filters-item__expand"] : style["filters-item__expand_hide"]}>
          <img src={iconExpend} />
        </span>
      </div>
      {showBody && <>
        {
          filter.type === 'list' && <FiltersList filter={filter}  />
        }
        {
          filter.type === 'slider' && <FiltersSlider filter={filter} />
        }
      </>}
    </div>
  )
}