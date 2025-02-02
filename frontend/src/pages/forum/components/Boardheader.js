import React from "react";

const Boardheader = () => {
  return (
    <div>
      <div
        className=" h-20 bg-cover"
        style={{
          backgroundImage:
            'url("https://styles.redditmedia.com/t5_2qs0q/styles/bannerBackgroundImage_7glcgg5ymxp21.png?width=4000&v=enabled&s=4410b1628a50f39b8ca5c32798cb45ca9841a5fc")',
        }}
      ></div>
      <div className="bg-gray-200">
        <div className="mx-6 relative flex">
          <div className="h-20 w-20 rounded-full overflow-hidden relative -top-4 border-4 border-white bg-white ">
            <img
              className=""
              src="https://styles.redditmedia.com/t5_2qs0q/styles/communityIcon_kxcmzy9bt1381.jpg?width=256&format=pjpg&v=enabled&s=6a2945f540463756d33acd2919b0476668879106"
              alt=""
            />
          </div>
          <div className="pt-2 pl-4 ">
            <h1 className="text-black text-3xl">
              Eco : IF U NEED HELP JUST ASK !
            </h1>
            <h5 className="text-gray-500">/help</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boardheader;
