import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import style from './filters-container.module.scss';
import { FiltersItem } from '@/components';
import { useEffect } from 'react';
import { getFilters } from '@/redux/sagas';

export const FiltersContainer = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state)=>state.app.filters);
  useEffect(()=>{
    dispatch(getFilters())
  })
  return(
    <div className={style["filters"]}>
      <h3 className={style["filters__title"]}>Фильтры товаров</h3>
      <div className={style["filters__body"]} >
        {filters.map((fl)=>(
          <FiltersItem key={fl.unique_id} filter={fl}/>
        ))}
      </div>
    </div>
  )
}