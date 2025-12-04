import React from 'react';

const ExploreByMood = () => {
    const moods = [
        {
            id: 1,
            label: "Quick Bite",
            title: "Street-side snacks",
            desc: "Fuchka, chotpoti, roll – perfect for a fast treat on busy days.",
            tag: "Under 15 minutes",
        },
        {
            id: 2,
            label: "Friends Hangout",
            title: "Cafe & coffee vibes",
            desc: "Cozy cafes with great coffee and long-conversation ambience.",
            tag: "Chill & chat",
        },
        {
            id: 3,
            label: "Family Dinner",
            title: "Shared platters & biriyani",
            desc: "Family-friendly places with big portions and comfortable seating.",
            tag: "Family approved",
        },
        {
            id: 4,
            label: "Date Night",
            title: "Mood lighting & desserts",
            desc: "Romantic settings with beautiful plating and sweet endings.",
            tag: "Special occasion",
        },
    ];

    return (
        <section className="mt-10 md:mt-14">
            <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-primary mb-1">
                        Explore by mood
                    </p>
                    <h2 className="text-xl md:text-2xl font-extrabold">
                        What are you{" "}
                        <span className="text-primary">
                            craving
                        </span>{" "}
                        today?
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {moods.map((mood) => (
                    <div
                        key={mood.id}
                        className="
              rounded-2xl border border-base-200 bg-gradient-to-br
              from-base-100 to-base-200/60
              p-4 md:p-5 flex flex-col justify-between h-full
              hover:shadow-md hover:-translate-y-1 transition
            "
                    >
                        <div className="mb-3">
                            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-primary mb-1">
                                {mood.label}
                            </p>
                            <h3 className="text-sm md:text-base font-semibold mb-1">
                                {mood.title}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600">
                                {mood.desc}
                            </p>
                        </div>
                        <div className="flex items-center justify-between text-xs mt-2">
                            <span className="px-3 py-1 rounded-full bg-white shadow-sm text-gray-600">
                                {mood.tag}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExploreByMood;