import Banner from "../../components/Banner";

import Header from "../../components/Header";
import SpecialityMenu from "../../components/Specialitymenu";



import TopDoctors from "../../components/TopDoctors";

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner/>
      
    </div>
  );
};

export default Home;
