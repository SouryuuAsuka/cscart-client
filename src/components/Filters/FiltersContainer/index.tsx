import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import style from './filters-container.module.scss';
import { FiltersItem } from '@/components';
import { useEffect } from 'react';
import { getFilters, setActiveFilters, resetFilters} from '@/redux/sagas';

export const FiltersContainer = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.app.filters);
  useEffect(() => {
    dispatch(getFilters())
  }, [])
  const handleReset = () => {

    dispatch(setActiveFilters([]));
    dispatch(resetFilters());
  }
  return (
    <div className={style["filters-container"]}>
      <h3 className={style["filters-container__title"]}>Фильтры товаров</h3>
      <div className={style["filters-container__body"]} >
        {filters && filters.map((fl) => (
          <FiltersItem key={fl.unique_id} filter={fl} />
        ))}
        <div className={style["filters-container__footer"]}>
          <button className={style["filters-container__reset-button"]} onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

    </div>
  )
}