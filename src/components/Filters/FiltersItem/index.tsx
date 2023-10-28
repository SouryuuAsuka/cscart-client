import style from './filters-item.module.scss';
import { Filter } from '@/types';
type Props = {
  filter: Filter
}
export const FiltersItem = ({ filter }: Props) => {
  return (
    <div className={style["filters-item"]}>
      <div className={style["filters-item__header"]}>
        <h4 className={style["filters-item__title"]}>
          {filter.display_name}
        </h4>
        <span className={style["filters-item__expand"]}></span>
      </div>
    </div>
  )
}