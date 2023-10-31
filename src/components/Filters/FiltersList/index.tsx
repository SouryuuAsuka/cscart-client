import { useEffect, useState } from 'react';
import style from './filters-list.module.scss';
import { Filter } from '@/types';
import { useAppSelector, useItemFilters } from '@/utils/hooks/';

type Props = {
  filter: Filter
}

export const FiltersList = ({ filter }: Props) => {
  const [search, setSearch] = useState('');
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [pictures, setPictures] = useState({});
  const { getFilter, addToFilter, removeFromFilter } = useItemFilters(filter);
  const resetFilters = useAppSelector((state) => state.app.resetFilters);
  const pictureFilters = useAppSelector((state) => state.app.pictureFilters);
  useEffect(() => {
    console.log('rerender')
    const localFilters = getFilter();
    console.log(localFilters)
    setCheckedList(localFilters?.list_variants ?? []);

  }, [resetFilters]);
  useEffect(() => {
    for (let i = 0; i < pictureFilters.length; i++) {
      if (pictureFilters[i].unique_id == filter.unique_id) {
        let obj = {};
        for (let j = 0; j < pictureFilters[i].list_variants.length; j++) {
          const lv = pictureFilters[i].list_variants[j];
          console.log(lv.unique_id)
          obj[lv.unique_id] = lv.icons
        }
        setPictures(obj);
        break;
      }
    }
  }, [pictureFilters])
  const handleClick = (event: React.ChangeEvent<HTMLInputElement>, id: number,) => {
    if (event.currentTarget.checked) {
      setCheckedList((r) => [...r, id]);
      addToFilter(id);
    } else {
      setCheckedList(removeFromFilter(id));
    }
  }
  let listVariants = []
  if (typeof search === 'string' && search.length >= 0) {
    listVariants = filter.list_variants.filter((variant) => {
      if (variant.display_name.toLowerCase().startsWith(search.toLowerCase())) return true;
      return false;
    })
  } else {
    listVariants = filter.list_variants;
  }
  return (
    <div className={style["filters-list"]}>
      <div className={style["filters-list__search"]} >
        <input type='text' placeholder="Найти" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className={style["filters-list__block"]} >
        {listVariants && listVariants.map((variant) => {
          const checked = checkedList.includes(variant.unique_id);
          const icon = pictures[variant.unique_id] ?? '';
          return (
            <div className={style["filters-list__row"]} key={variant.unique_id}>
              <label className={style["filters-list__label"]}>
                <input type='checkbox' checked={checked} onChange={(e) => handleClick(e, variant.unique_id)} />
                <span>
                  {icon +' '+ variant.display_name}
                </span>
              </label>
            </div>
          )
        }
        )}
      </div>
    </div>
  )
}