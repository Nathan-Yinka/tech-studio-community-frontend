import Hero from "../../component/Hero";
import { Container } from "react-bootstrap";
import Projects from "../../component/Projects";

const Home = () => {
  return (
    <div>
      <Container>
        <Hero />
        <Projects />
      </Container>
    </div>
  );
};

export default Home;
