import { services } from "@/cosntants/services.js";
import Service from "../cards/Service.jsx";
import Container from "../shared/Container.jsx";
import Paragraph from "../shared/Paragraph.jsx";
import Title from "../shared/Title.jsx";

const Services = () => {
  return (
    <section id="services">
      <Container className="space-y-10 md:sapce-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Title>Empowering Education Through Smart Technology</Title>
          <Paragraph>
            GradeWise streamlines assignment management with AI-powered grading,
            robust evaluation tools, and seamless teacher-student collaboration
            — all in one unified platform.
          </Paragraph>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            return (
              <Service
                key={i}
                title={service.title}
                description={service.description}
                icon={service.icon}
              ></Service>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Services;
