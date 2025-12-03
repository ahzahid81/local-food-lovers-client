const Hero = () => {
    return (
        <section className="mb-10">
            <div className="hero min-h-[320px] rounded-3xl bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1200')",
                }}
            >
                <div className="hero-overlay bg-black/40 rounded-3xl"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-xl">
                        <h1 className="mb-4 text-4xl md:text-5xl font-extrabold">
                            Discover Local <span className="text-primary">Flavors</span>
                        </h1>
                        <p className="mb-6 text-sm md:text-base">
                            Join the Local Food Lovers Network to explore honest reviews,
                            hidden gems, and must-try dishes around you.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <a href="/all-reviews" className="btn btn-primary rounded-full px-6">
                                Explore Reviews
                            </a>
                            <a href="/add-review" className="btn btn-outline rounded-full px-6">
                                Share Your Review
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
