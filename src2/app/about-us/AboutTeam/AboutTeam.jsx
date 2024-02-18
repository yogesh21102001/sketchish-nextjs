import Image from 'next/image'

import team from './team.webp'
import emblem from './emblem.webp'
import teamPartFirst from './teamPartFirst.webp'
import teamPartSecond from './teamPartSecond.webp'
import founder from './founder.webp'

import Styles from './style.module.css'

const AboutTeam = () => {

  return (
    <div className={Styles.container}>
      <div className={Styles.top_section}>
        <div className={Styles.text_container}>
          <p className={Styles.title}>
            A Team behind the magic you see around the world.
          </p>
          <p className={Styles.text}>
            We pride ourselves on our culture, industry expertise, and creative folks. We come together to craft stunning digital experiences for our clients. Pick a team, work with them for years—that&rsquo;s how you cultivate the kind of camaraderie that propels you forward together.
          </p>
        </div>

        <Image alt='Team' className={Styles.team_picture} src={team} />
      </div>

      <div className={Styles.down_section}>
        <div className={Styles.down_section_block}>
          <Image alt='Emblem' src={emblem} className={`${Styles.down_section_picture} ${Styles.rotation}`} />
        </div>
        <div className={Styles.down_section_block} />
        <div className={Styles.down_section_block}>
          <Image alt='Part of team' src={teamPartFirst} className={Styles.down_section_picture} />
        </div>
        <div className={Styles.down_section_block}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" rx="10" fill="#FA38A1"/>
          </svg>
        </div>

        <div className={Styles.down_section_block} />
        <div className={`${Styles.down_section_block} ${Styles.founder_container}`}>
          <Image alt='Founder' src={founder} className={Styles.down_section_picture} />
          <p className={Styles.founder_text}>
            <strong> Chirag Dave </strong> <br/>
            CEO & Founder
          </p>
        </div>
        <div className={Styles.down_section_block}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" rx="10" fill="#AF38E1"/>
          </svg>
        </div>
        <div className={Styles.down_section_block}>
          <Image alt='Part of team' src={teamPartSecond} className={Styles.down_section_picture} />
        </div>
      </div>

      
      <div className={`${Styles.down_section} ${Styles.mobile}`}>
        <div className={Styles.down_section_block}>
          <Image alt='Emblem' src={emblem} className={Styles.down_section_picture} />
        </div>
        
        <div className={Styles.down_section_block}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" rx="10" fill="#FA38A1"/>
          </svg>
        </div>
        <div className={Styles.down_section_block} />
        <div className={Styles.down_section_block}>
          <Image alt='Part of team' src={teamPartFirst} className={Styles.down_section_picture} />
        </div>
        <div className={`${Styles.down_section_block} ${Styles.founder_container}`}>
          <Image alt='Part of team' src={founder} className={Styles.down_section_picture} />
          <p className={Styles.founder_text}>
            <strong> Chirag Dave </strong> <br/>
            CEO & Founder
          </p>
        </div>

        <div className={Styles.down_section_block}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" rx="10" fill="#AF38E1"/>
          </svg>
        </div>
        <div className={Styles.down_section_block} />
        <div className={Styles.down_section_block}>
          <Image alt='Part of team' src={teamPartSecond} className={Styles.down_section_picture} />
        </div>
      </div>

    </div>
  )
}

export default AboutTeam