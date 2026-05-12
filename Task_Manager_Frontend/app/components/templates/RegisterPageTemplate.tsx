import AboutApp from "../molecules/AboutApp";
import RegisterForm from "../organisms/RegisterForm";
import Wrapper from "../organisms/Wrapper";

export default function RegisterPageTemplate() {
  return (
    <Wrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[var(--app-height)] px-10">
        <div className="flex items-center justify-center order-1 md:order-2">
          <RegisterForm />
        </div>

        <div className="flex items-center justify-center order-2 md:order-1">
          <AboutApp />
        </div>
      </div>
    </Wrapper>
  );
}
