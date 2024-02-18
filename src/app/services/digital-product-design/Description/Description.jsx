import Styles from './style.module.css'

const Description = ({ title, paragraph, cards }) => {

  return (
    <div className={Styles.container}>
      <div className={Styles.container_block}>
        <div className={Styles.header}>
          <p className={Styles.title}>
            {title}
          </p>
          <p className={Styles.paragraph}>
            {paragraph}
          </p>
        </div>

        <div className={Styles.cards}>
          {cards.map(card => (
            <div key={card.name} className={Styles.card}>
              <h3>{card.name}</h3>
              <p>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Description