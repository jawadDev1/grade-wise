import Container from "../shared/Container.jsx";
import Title from "../shared/Title.jsx";

const Brands = () => {
  return (
    <section>
      <Container className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <Title>Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 from-20% via-primary via-30% to-green-600"> Institutes </span> like</Title>
        </div>
        <div className="flex justify-center flex-wrap gap-4">
          <div className="p-4 sm:p-5 rounded-xl bg-body border border-box-border group">
            <img
              src="/images/uaf.png"
              width="100"
              height="60"
              alt="spotify"
              className="h-7 sm:h-32 w-auto ease-linear duration-300 grayscale group-hover:!grayscale-0 group-hover:scale-105"
            />
          </div>
          <div className="p-4 sm:p-5 rounded-xl bg-body border border-box-border group">
            <img
              src="/images/nust.png"
              width="100"
              height="60"
              alt="slack"
              className="h-7 sm:h-32 w-auto ease-linear duration-300 grayscale group-hover:!grayscale-0 group-hover:scale-105"
            />
          </div>
          <div className="p-4 sm:p-5 rounded-xl bg-body border border-box-border group">
            <img
              src="/images/lums.jpg"
              width="100"
              height="60"
              alt="paypal"
              className="h-7 sm:h-32 w-auto ease-linear duration-300 grayscale group-hover:!grayscale-0 group-hover:scale-105"
            />
          </div>
          <div className="p-4 sm:p-5 rounded-xl bg-body border border-box-border group">
            <img
              src="/images/fast.png"
              width="100"
              height="60"
              alt="spotify"
              className="h-7 sm:h-32 w-auto ease-linear duration-300 grayscale group-hover:!grayscale-0 group-hover:scale-105"
            />
          </div>
          <div className="p-4 sm:p-5 rounded-xl bg-body border border-box-border group">
            <img
              src="/images/harvard.jpg"
              width="100"
              height="60"
              alt="slack"
              className="h-7 sm:h-32 w-auto ease-linear duration-300 grayscale group-hover:!grayscale-0 group-hover:scale-105"
            />
          </div>
          <div className="p-4 sm:p-5 rounded-xl bg-body border border-box-border group">
            <img
              src="/images/xford.png"
              width="100"
              height="60"
              alt="paypal"
              className="h-7 sm:h-32 w-auto ease-linear duration-300 grayscale group-hover:!grayscale-0 group-hover:scale-105"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Brands;
