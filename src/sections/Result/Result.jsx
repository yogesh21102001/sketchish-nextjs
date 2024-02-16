import Styles from './style.module.css'

const Result = ({texts}) => {

  return (
    <div className={Styles.container}>
      <p className={Styles.title}>
        Result
      </p>

      {texts.map(text => (
        <p key={text} className={Styles.text}>
          {text}
        </p>
      ))}
    </div>
  )
}

export default Result