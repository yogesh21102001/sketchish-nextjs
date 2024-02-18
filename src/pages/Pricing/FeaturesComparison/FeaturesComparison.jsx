import React from "react";
import Styles from "./style.module.css";

import { GreenTick, Na } from "../assets";

const FeaturesComparison = () => {
  return (
    <div className={Styles.wraper}>
      <h3 className={Styles.header}>Features comparison</h3>
      <div className={Styles.table_cont}>
        <table className={Styles.table}>
          <tr>
            <th></th>
            <th>Basic</th>
            <th>Pro</th>
            <th>Advance</th>
            <th>Enterprise</th>
          </tr>
          <tr>
            <td className={Styles.clm_hrader}>Access to all icons</td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
          </tr>
          <tr>
            <td className={Styles.clm_hrader}>Access to all styles</td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
          </tr>
          <tr>
            <td className={Styles.clm_hrader}>Access to all categories</td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
          </tr>
          <tr>
            <td className={Styles.clm_hrader}>
              Access to open-source free icons
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
          </tr>
          <tr>
            <td className={Styles.clm_hrader}>
              Unused icons bal. carry forward
            </td>
            <td>
              <Na />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
          </tr>
          <tr>
            <td className={Styles.clm_hrader}>Royalty—free assets</td>
            <td>
              <Na />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
          </tr>
          <tr>
            <td className={Styles.clm_hrader}>Unlimited hi-res png</td>
            <td>
              <Na />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
          </tr>
          <tr>
            <td className={Styles.clm_hrader}>Attribution free</td>
            <td>
              <Na />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
          </tr>
          <tr>
            <td className={Styles.clm_hrader}>Ads free platform</td>
            <td>
              <Na />
            </td>
            <td>
              <Na />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
          </tr>
          <tr>
            <td className={Styles.clm_hrader}>Animated svg</td>
            <td>
              <Na />
            </td>
            <td>
              <Na />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
          </tr>
          <tr>
            <td className={Styles.clm_hrader}>Unlimited icon customisation</td>
            <td>
              <Na />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
            <td>
              <GreenTick />
            </td>
          </tr>
          <tr>
            <td className={Styles.clm_hrader}>Dedicated designer</td>
            <td>
              <Na />
            </td>
            <td>
              <Na />
            </td>
            <td>
              <Na />
            </td>
            <td>
              <GreenTick />
            </td>
          </tr>
          <tr>
            <td className={Styles.clm_hrader}>Daily icons limit</td>
            <td>10</td>
            <td>25</td>
            <td>50</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td className={Styles.clm_hrader}>Pro icons per project</td>
            <td>
              <Na />
            </td>
            <td>50*</td>
            <td>100*</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td className={Styles.clm_hrader}>Icons request/mo.</td>
            <td>
              <Na />
            </td>
            <td>2</td>
            <td>5</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td className={Styles.clm_hrader}>Icons updates</td>
            <td>
              <Na />
            </td>
            <td>Monthly</td>
            <td>Weekly</td>
            <td>Daily</td>
          </tr>
          <tr>
            <td className={Styles.clm_hrader}>Priority support</td>
            <td>
              <Na />
            </td>
            <td>Low</td>
            <td>High</td>
            <td>Priority</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default FeaturesComparison;
