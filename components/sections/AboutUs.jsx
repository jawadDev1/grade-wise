import { eye, strike } from "@/cosntants/icons.js";
import Info from "../cards/Info.jsx";
import Container from "../shared/Container.jsx";
import Paragraph from "../shared/Paragraph.jsx";
import Title from "../shared/Title.jsx";

const AboutUs = () => {
  return (
    <section id="about-us">
      <Container className="flex flex-col midmd:flex-row gap-10 lg:gap-12">
        <div className="max-w-md mx-auto midmd:max-w-none lg:mx-0  lg:pr-10 xl:pr-2 flex-1 flex w-11/12 midmd:w-5/12 lg:w-1/2 midmd:h-auto">
          <div className="w-full h-80 sm:h-96 midmd:h-full relative">
            <div className="absolute rotate-45 -left-5 md:-left-10 lg:-left-20 xl:-left-24 p-1 top-1/2 w-16 h-16 bg-gradient-to-br from-primary to-orange-400 blur-3xl opacity-50"></div>
            <div className="absolute  p-1 -top-4 md:-top-10 right-0 w-20 h-20 bg-gradient-to-br from-primary to-orange-400 rounded-full blur-3xl opacity-60"></div>

            <span className="absolute w-full aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-tr from-primary to-green-400 opacity-40 blur-2xl left-0 bottom-0"></span>
            <img
              src={"/images/dev-with-c-1.webp"}
              alt="banner image"
              width="1240"
              height="1385"
              className=" w-auto left-1/2 -translate-x-1/2 absolute bottom-0 max-h-full"
            />
          </div>
        </div>
        <div className="flex-1 flex midmd:w-7/12 lg:w-1/2 flex-col">
          <Title>We help educators transform grading with AI</Title>
          <Paragraph className="mt-8">
            GradeWise is revolutionizing the education system by empowering
            teachers with intelligent tools to evaluate assignments efficiently,
            fairly, and at scale. Our platform streamlines grading, reduces
            manual effort, and ensures consistent, data-driven feedback for
            every student.
          </Paragraph>
          <div className="pt-8 grid grid-cols-2 items-center gap-4 max-w-3xl md:max-w-[none]">
            <Info
              description="Our mission is to simplify and enhance the grading process using AI, enabling educators to focus more on teaching and mentoring rather than manual evaluation."
              title="Mission"
              icon={strike}
            />
            <Info
              description="We envision a future where every educational institution leverages intelligent automation to foster academic excellence and personalized student feedback."
              title="Vision"
              icon={eye}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutUs;
