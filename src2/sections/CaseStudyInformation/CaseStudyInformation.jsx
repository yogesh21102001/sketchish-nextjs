import Styles from './style.module.css'

const CaseStudyInformation = ({texts, keydata, industry, services}) => {

  return (
    <div className={Styles.container}>
      <div className={Styles.left_side}>
        <div className={Styles.texts}>
          {texts.map((text, index) => (
            <p key={text} className={Styles.text}>
              {text}
              <br />
              {index < texts.length - 1 && <br />}
            </p>
          ))}
        </div>

        {keydata &&
          <div className={Styles.keydata}>
            {keydata.map(data => (
              <div key={data.information} className={Styles.keydata_block}>
                <p className={Styles.keydata_block_numbers}>
                  {data.numbers}
                </p>
                <p className={Styles.keydata_block_information}>
                  {data.information}
                </p>
              </div>
            ))}
          </div>
        }
      </div>

      <div className={Styles.right_side}>
        <div className={Styles.right_side_block}>
          <p className={Styles.title}>
            Industry
          </p>
          <p className={Styles.right_side_text}>
            {industry}
          </p>
        </div>
        <div className={`${Styles.second_title} ${Styles.right_side_block}`}>
          <p className={Styles.title}>
            Services
          </p>
          <p className={Styles.right_side_text}>
            {services}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CaseStudyInformation