import React from 'react';

const FinanceCardSections = () => {
    return (
        <div className=" px-4 md:flex gap-5 px-10 lg:flex gap-8 px-20 py-16 space-y-20">

            {/* Budgeting Tips */}
            <section className='bg-base-300  p-5 rounded-3xl'>
                <h2 className="text-3xl font-bold text-primary mb-8">
                    Budgeting Tips
                </h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        "Set daily, weekly & monthly budgets",
                        "Track every expense regularly",
                        "Prioritize needs over wants",
                        "Save before spending",
                        "Review your budget monthly",
                        "Avoid impulse purchases"
                    ].map((tip, idx) => (
                        <div key={idx} className="card bg-base-100 shadow-md hover:shadow-lg transition duration-200">
                            <div className="card-body">
                                <h3 className="font-semibold text-lg">{tip}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Financial Planning Matters */}
            <section className='bg-base-300  p-5 rounded-3xl'>
                <h2 className="text-3xl font-bold text-primary mb-8">
                    Why Financial Planning Matters
                </h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        "Achieve long-term life goals faster",
                        "Build an emergency safety net",
                        "Reduce stress about money",
                        "Prepare for retirement early",
                        "Stay focused on financial priorities",
                        "Grow wealth consistently"
                    ].map((reason, idx) => (
                        <div key={idx} className="card bg-base-100 shadow-md hover:shadow-lg transition duration-200">
                            <div className="card-body">
                                <h3 className="font-semibold text-lg">{reason}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default FinanceCardSections;