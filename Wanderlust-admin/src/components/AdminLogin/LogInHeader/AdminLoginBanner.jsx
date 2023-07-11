import "./style.scss";

export default function AdminLoginBanner() {
  return (
    <>
      <div className="sign-in-banner hidden lg:flex lg:flex-col lg:justify-end">
        <div className="sign-in-banner-text flex flex-col justify-end text-white ">
          <h2 className="font-[500] lg:px-[25px]  2xl:pl-[54px] 2xl:pr-[52px] 2xl:pt-[288px] lg:text-2xl xl:text-4xl ">
            Experience the world with our exceptional travel services.
          </h2>
          <p className="font-[400] lg:px-[25px] lg:pt-[10px] lg:pb-[35px] 2xl:pl-[54px] 2xl:pr-[86px] 2xl:pt-[35px] 2xl:pb-[109px] lg:text-sm xl:text-base ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>
    </>
  );
}
