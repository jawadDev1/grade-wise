import Container from "../shared/Container.jsx";
import Paragraph from "../shared/Paragraph.jsx";
import Title from "../shared/Title.jsx";

const Features = () => {
  return (
    <section id="features">
      <Container className="flex flex-col midmd:flex-row gap-10 lg:gap-12">
        <div className="flex-1 flex midmd:w-7/12 lg:w-1/2 flex-col">
          <Title>Essential Features That Power Smart Grading</Title>
          <Paragraph className="mt-8">
            GradeWise offers a powerful suite of tools designed to streamline
            assignment evaluation, enhance grading accuracy, and reduce
            administrative workload for educators.
          </Paragraph>
          <Paragraph className="mt-2">
            From AI-assisted evaluation to detailed rubrics and teacher
            overrides, every feature is crafted to support fair, consistent, and
            efficient academic assessment at scale.
          </Paragraph>
          <ul className="mt-8 space-y-4 text-heading-3 font-medium">
            <li>
              <span className="font-bold bg-box-bg rounded-full w-8 h-8 mr-3 text-primary inline-flex justify-center items-center">
                &#10004;
              </span>{" "}
              AI-Powered Assignment Checking
            </li>
            <li>
              <span className="font-bold bg-box-bg rounded-full w-8 h-8 mr-3 text-primary inline-flex justify-center items-center">
                &#10004;
              </span>{" "}
              Customizable Marking Rubrics
            </li>
            <li>
              <span className="font-bold bg-box-bg rounded-full w-8 h-8 mr-3 text-primary inline-flex justify-center items-center">
                &#10004;
              </span>{" "}
              Teacher Review & Final Approval
            </li>
            <li>
              <span className="font-bold bg-box-bg rounded-full w-8 h-8 mr-3 text-primary inline-flex justify-center items-center">
                &#10004;
              </span>{" "}
              Plagiarism Detection & Report Generation
            </li>
          </ul>
        </div>

        <div className="max-w-md mx-auto midmd:max-w-none lg:mx-0  lg:pr-10 xl:pr-2 flex-1 flex w-11/12 midmd:w-5/12 lg:w-1/2 midmd:h-auto">
          <div className="w-full h-80 sm:h-96 midmd:h-full relative">
            <div className="absolute rotate-45 -left-5 md:-left-10 lg:-left-20 xl:-left-24 p-1 top-1/2 w-16 h-16 bg-gradient-to-br from-primary to-orange-400 blur-3xl opacity-50"></div>
            <div className="absolute  p-1 -top-4 md:-top-10 right-0 w-20 h-20 bg-gradient-to-br from-primary to-orange-400 rounded-full blur-3xl opacity-60"></div>

            <span className="absolute w-full aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-tr from-primary to-green-400 opacity-40 blur-2xl left-0 bottom-0"></span>
            <img
              src={"/images/dev-with-c.webp"}
              alt="GradeWise Features"
              width="1240"
              height="1385"
              className=" w-auto left-1/2 -translate-x-1/2 absolute bottom-0 max-h-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Features;
