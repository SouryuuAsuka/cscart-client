import { FiltersContainer, ProductList } from '@/components'
import style from './home.module.scss'

export function Home(){
  return(
    <div className={style.home}>
      <FiltersContainer />
      <ProductList />
    </div>
  )
}