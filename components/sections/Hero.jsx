import Button from "../shared/Button.jsx";
import Container from "../shared/Container.jsx";
import Paragraph from "../shared/Paragraph.jsx";
import ByNumber from "./ByNumber.jsx";

const Hero = () => {
  return (
    <section className="relative pt-32 lg:pt-36">
      <Container className={"flex flex-col lg:flex-row gap-10 lg:gap-12"}>
        <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 ">
          <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-green-400 blur-xl opacity-60 lg:opacity-95 lg:block hidden"></span>
          <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-primary blur-xl opacity-80"></span>
        </div>
        {/* <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-primary to-red-400 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span> */}
        <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-primary to-green-400 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
        <div
          className="relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 
        lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2"
        >
          <h1
            className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight
             font-bold text-heading-1"
          >
            Revolutionizing Assignment Checking with {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 from-20% via-primary via-30% to-green-600">
              AI
            </span>{" "}
          </h1>
          <Paragraph className="mt-8">
            GradeWise leverages AI to streamline the grading process, ensuring
            accuracy and efficiency for educators.
          </Paragraph>
        </div>

        <div className="flex flex-1 lg:w-1/2 lg:h-auto relative lg:max-w-none lg:mx-0 mx-auto max-w-3xl">
          <img
            src="/images/image1.webp"
            alt="Hero image"
            width="2350"
            height="2359"
            className="lg:absolute lg:w-full lg:h-full rounded-3xl object-cover lg:max-h-none max-h-96"
          />
        </div>
      </Container>

      <ByNumber />
    </section>
  );
};

export default Hero;
