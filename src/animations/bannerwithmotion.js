import { inView } from 'motion';
const Banner = () => {
  inView(".non-sticky-card", (curr,i) => {
    console.log('Element has entered the viewport',curr);

    return (leaveInfo) => {
      
    }
  });
};
export default Banner;
