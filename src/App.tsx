import Layout from "./components/Layout";
import Hero from "./sections/Hero";
import Mission from "./sections/Mission";
import Team from "./sections/Team";
import Achievements from "./sections/Achievements";
import Goal from "./sections/Goal";
import Rifa from "./sections/Rifa";
import Support from "./sections/Support";
import Payment from "./sections/Payment";
import DonorNetwork from "./sections/DonorNetwork";

function App() {
  return (
    <Layout>
      <Hero />
      <Rifa />
      <Goal />
      <Mission />
      <Team />
      <Achievements />
      <DonorNetwork />
      <Support />
      <Payment />
    </Layout>
  );
}

export default App;
