import RangeSlider from 'react-range-slider-input';
import './range-slider.css';

import style from './filters-slider.module.scss';
import { ActiveFilter, Filter } from '@/types';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/utils/hooks';
import { useDispatch } from 'react-redux';
import { setActiveFilters } from '@/redux/sagas';
type Props = {
  filter: Filter
}
export const FiltersSlider = ({ filter }: Props) => {
  const [range, setRange] = useState([]);
  const activeFilters = useAppSelector((state) => state.app.activeFilters);
  const resetFilters = useAppSelector((state) => state.app.resetFilters);
  const dispatch = useDispatch();
  useEffect(() => {
    let range = null;
    activeFilters.map((ft) => {
      if (ft.unique_id === filter.unique_id) {
        range = ft.range
      }
    })
    if (!range) {
      range = [filter.slider_min_value, filter.slider_max_value];
    }
    setRange(range);
  }, [resetFilters])
  const setRangeInStore = (range: number[]) => {
    setRange(range);
    let founded = false;
    let localFilters = activeFilters.map((ft) => {
      if (ft.unique_id === filter.unique_id) {
        founded = true;
        return {
          ...ft,
          range
        }
      } else return ft;
    })
    if (!founded) {
      const addFilter: ActiveFilter = {
        unique_id: filter.unique_id,
        type: filter.type,
        range,
      }
      localFilters.push(addFilter)
    }
    dispatch(setActiveFilters(localFilters));
  }
  const changeValue = (value: number, index: number) => {
    if (index === 0) {
      if (value > range[1]) {
        setRangeInStore([range[1], value]);
      } else {
        setRangeInStore([value, range[1]]);
      }
    } else if (index === 1) {
      if (value < range[0]) {
        setRangeInStore([value, range[0]]);
      } else {
        setRangeInStore([range[0], value]);
      }
    }
  }
  return (
    <div className={style["filters-slider"]}>
      <div className={style["filters-slider__inputs"]} >
        <div className={style["filters-slider__input-container"]} >
          {filter.slider_value_prefix && <span className={style["filters-slider__prefix"]}>
            {filter.slider_value_prefix}
          </span>}
          <input type='text' className={style["filters-slider__input-text"]} value={range[0]} onChange={(e) => changeValue(Number(e.target.value), 0)} />
          {filter.slider_value_suffix && <span className={style["filters-slider__suffix"]}>
            {filter.slider_value_suffix}
          </span>}
        </div>
        –
        <div className={style["filters-slider__input-container"]} >
          {filter.slider_value_prefix && <span className={style["filters-slider__prefix"]}>
            {filter.slider_value_prefix}
          </span>}
          <input type='text' className={style["filters-slider__input-text"]} value={range[1]} onChange={(e) => changeValue(Number(e.target.value), 1)} />
          {filter.slider_value_suffix && <span className={style["filters-slider__suffix"]}>
            {filter.slider_value_suffix}
          </span>}
        </div>
      </div>
      <div className={style["filters-slider__slider-container"]} >
        <div className={style["filters-slider__slider-num--left"]} >
          <span>{filter.slider_min_value}</span>
        </div>
        <RangeSlider
          min={filter.slider_min_value}
          max={filter.slider_max_value}
          value={range}
          defaultValue={[filter.slider_min_value, filter.slider_max_value]}
          onInput={setRangeInStore}
        />
        <div className={style["filters-slider__slider-num--right"]} >
          <span>{filter.slider_max_value}</span>
        </div>
      </div>
    </div>
  )
}