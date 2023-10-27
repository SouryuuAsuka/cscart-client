import style from './loading.module.scss'
import { Spinner } from "@/components/UI";

export function Loading() {

  return (
    <div className={style["loading"]}>
      <div className={style["loading__container"]}>
        <div className={style["loading__spinner"]}>
          <Spinner />
        </div>
      </div>
    </div>
  )
}