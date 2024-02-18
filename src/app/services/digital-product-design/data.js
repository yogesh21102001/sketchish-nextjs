import ideation from './ideation.webp'
import design from './design.webp'
import build from './build.webp'
import analisysAndGrow from './analisys_and_grow.webp'

export const cards = [
  {
    name: 'UX Design',
    description: 'Craft intuitive and engaging user experiences with our UX design expertise. Elevate usability, aesthetics, and user satisfaction seamlessly.',
  },
  {
    name: 'UI Design',
    description: 'Craft visually compelling user interfaces. Elevate user experiences with intuitive designs, fostering engagement and seamless interactions for optimal usability.',
  },
  {
    name: 'Mobile App Design',
    description: 'Craft intuitive and visually appealing mobile app designs. Elevate user experiences with a blend of creativity, functionality, and responsiveness.',
  },
  {
    name: 'Website Design',
    description: 'Craft visually stunning and user-friendly websites. Our designs marry aesthetics with functionality, ensuring an engaging online experience for visitors.',
  },
  {
    name: 'SaaS Web App Design',
    description: 'Crafting intuitive SaaS web app designs, ensuring seamless user experiences. Combining functionality and aesthetics for optimal performance and engagement.',
  },
  {
    name: 'Wireframe',
    description: 'Blueprint of digital design, visually outlining structure and functionality. Essential for UX planning and collaborative development of interfaces.',
  },
]

export const stages = [
  {
    title: 'Ideation',
    description: 'We seek to understand users’ problems. We leverage various techniques like user interviews, surveys, and even stakeholder interviews.',
    picture: ideation,
    backgroundColor: '#FDF2E7'
  },
  {
    title: 'Design',
    description: 'Monolithic apps are broken into microservices. Decoupling the code allows teams to move faster and more independently.',
    picture: design,
    backgroundColor: '#E7F3FE'
  },
  {
    title: 'Build',
    description: 'We design flexible and scalable designs keeping tech capacity in mind. Every interaction is empathetically designed keeping our end users in mind.',
    picture: build,
    backgroundColor: '#EEE7FD'
  },
  {
    title: 'Analysis and grow',
    description: 'Growth strategies are baked into the design, KPIs are set. We test, measure and feed learnings back into iteration cycles of product building.',
    picture: analisysAndGrow,
    backgroundColor: '#FEE7FD'
  },
]