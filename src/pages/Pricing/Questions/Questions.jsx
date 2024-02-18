import React from 'react'
import commonStyle from "../../../style/commonStyle.module.css"
import Styles from "./styles.module.css"

import {Button} from '../../../ui'
import questions from './questionsList'

import './styles.scss'

const Questions = () => {

  return (
    <div className={`${Styles.wraper}`}>
      <h3 className={Styles.questions_title}>FAQ</h3>

      <div className={Styles.questions_cont}>
        {questions.map((question, i) => {
          return (
            <>
              <div key={question.question} className={Styles.question}>
                <span className={Styles.questions_text}>
                  {question.question}
                </span>
                <span className={Styles.questions_answer}>
                  {question.answer}
                </span>
              </div>
              {i + 1 != questions?.length && (
                <div className={Styles.hr_line}></div>
              )}
            </>
          );
        })}
        <Button
          className={Styles.btn}
          onClick={() => {
            window.location.href = "mailto:info@Openstrokeicons.com";
          }}
        >
          Send a Message
        </Button>
      </div>
    </div>
  );
}

export default Questions