import { useEffect } from "react";
import { useAppSelector } from "./redux.hook";
import { ActiveFilter, Filter } from "@/types";
import { useDispatch } from "react-redux";
import { setActiveFilters } from "@/redux/sagas";

export const useItemFilters = (filter: Filter) => {
  const activeFilters = useAppSelector((state) => state.app.activeFilters);
  const dispatch = useDispatch();

  const getFilter = () => {
    let item: ActiveFilter | null;
    if (activeFilters.length){
      for (let i = 0; i < activeFilters.length; i++) {
        if (activeFilters[i]?.unique_id == filter.unique_id) {
          item = activeFilters[i];
          break;
        }
      }
      return item;
    } else {
      return null;
    }

  }
  let localFilter: ActiveFilter;
  useEffect(() => {
    localFilter = getFilter();
  }, [])

  const addToFilter = (id: number) => {
    let founded = false;
    const localFilters = activeFilters.map((ft) => {
      if (ft?.unique_id !== filter.unique_id) return ft;
      founded = true;
      return {
        ...ft,
        list_variants: [...ft.list_variants, id]
      }
    })
    if (!founded) {
      const addFilter: ActiveFilter = {
        unique_id: filter.unique_id,
        type: filter.type,
        list_variants: [id],
      }
      localFilters.push(addFilter)
    }
    console.log(JSON.stringify(localFilters))

    dispatch(setActiveFilters(localFilters));
    return getFilter();
  }
  const removeFromFilter = (id: number) => {
    let localFilters;
    console.log(JSON.stringify(activeFilters))
    const newChecked = getFilter().list_variants.filter((fr) => {
      if (fr === id) return false;
      return true;
    })
    if (activeFilters.length > 0){
      localFilters = activeFilters
      .filter((ft)=>{
        if(!ft || !ft.list_variants|| ft.list_variants.length == 0) return false;
        if(newChecked.length ===0 && ft?.unique_id == filter.unique_id) return false;
        return true;
      })
      .map((ft) => {
        if (ft?.unique_id !== filter.unique_id) return ft;
        if (getFilter()?.list_variants.length === 0) return;
        return {
          ...ft,
          list_variants: newChecked
        }
      });
    } else localFilters =[]
    console.log(JSON.stringify(localFilters))
    console.log(newChecked)
    dispatch(setActiveFilters(localFilters));
    return newChecked;
  }

  return {
    addToFilter,
    removeFromFilter,
    getFilter
  }
}
