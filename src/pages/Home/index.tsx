import { Filters, ProductList } from '@/components'
import style from './home.module.scss'

export function Home(){
  return(
    <div className={style.home}>
      <Filters />
      <ProductList />
    </div>
  )
}