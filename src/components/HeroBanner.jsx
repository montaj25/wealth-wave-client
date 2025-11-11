import React from 'react';

const HeroBanner = () => {
    return (
        <div className="hero bg-base-200 px-4">
            <div className="hero-content flex-col lg:flex-row-reverse gap-10">

                {/* Right Image */}
                <img
                    src="https://i.ibb.co.com/NdhS60ym/top-view-jar-savings.jpg"
                    alt="Finance Illustration"
                    className="w-full max-w-md rounded-xl shadow-xl"
                />

                {/* Left Text */}
                <div className="text-center lg:text-left max-w-lg">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Manage Money. <span className="text-primary">Master Life.</span>
                    </h1>
                    <p className="py-4 text-lg text-base-content/70">
                        Track your spending, set smart goals, and take control of your financial future — one step at a time.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <button className="btn btn-primary px-8">Get Started</button>
                        <button className="btn btn-outline px-8">Learn More</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HeroBanner;