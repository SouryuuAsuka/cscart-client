import style from './spinner.module.scss'

export const Spinner = () => {
  return (
      <div className={style["spinner"]}>
        <div></div><div></div><div></div><div></div>
      </div>
  )
}