export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-cyan-500/20">

        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">

          <span className="inline-block bg-cyan-500/20 text-cyan-400 px-5 py-2 rounded-full text-sm font-semibold border border-cyan-500/30">
            🎮 GameVerse Support
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold mt-8">
            Contact
            <span className="text-cyan-400"> GameVerse</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mt-6 leading-8">
            Need help with your order, payment, or game activation?
            Our support team is ready to assist you quickly and make sure
            your gaming experience is smooth.
          </p>

        </div>

      </section>

      {/* CONTACT SECTION */}

      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* WhatsApp */}

          <div className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-8 hover:border-green-400 hover:-translate-y-2 transition duration-300">

            <div className="text-5xl">💬</div>

            <h2 className="text-2xl font-bold mt-6">
              WhatsApp Support
            </h2>

            <p className="text-gray-400 mt-4 leading-7">
              Chat directly with our support team for instant assistance.
            </p>

            <p className="text-cyan-400 font-bold text-xl mt-8">
              +91 87258 41263
            </p>

            <a
              href="https://wa.me/918725841263"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-xl font-bold transition"
            >
              Chat Now →
            </a>

          </div>

          {/* EMAIL */}

          <div className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-8 hover:border-cyan-400 hover:-translate-y-2 transition duration-300">

            <div className="text-5xl">📧</div>

            <h2 className="text-2xl font-bold mt-6">
              Email Support
            </h2>

            <p className="text-gray-400 mt-4 leading-7">
              Send us your questions anytime. We normally reply within a few
              hours.
            </p>

            <p className="text-cyan-400 font-bold mt-8 break-all">
              gameverse0333@gmail.com
            </p>

            <a
              href="mailto:gameverse0333@gmail.com"
              className="inline-block mt-8 bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold transition"
            >
              Send Email →
            </a>

          </div>

          {/* INSTAGRAM */}

          <div className="bg-slate-900 border border-cyan-500/20 rounded-3xl p-8 hover:border-pink-500 hover:-translate-y-2 transition duration-300">

            <div className="text-5xl">📷</div>

            <h2 className="text-2xl font-bold mt-6">
              Instagram
            </h2>

            <p className="text-gray-400 mt-4 leading-7">
              Follow GameVerse for game launches, exclusive offers,
              giveaways, and gaming news.
            </p>

            <p className="font-bold text-pink-400 mt-8">
              @gameverse0333
            </p>

            <a
              href="https://www.instagram.com/gameverse0333?igsh=MWpnY3E1MDlxeXhubA=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transition"
            >
              Follow on Instagram →
            </a>

          </div>

        </div>

      </section>

      {/* WHY CHOOSE US */}

      <section className="max-w-6xl mx-auto px-6 pb-20">

        <div className="bg-slate-900 rounded-3xl border border-cyan-500/20 p-10">

          <h2 className="text-4xl font-bold text-center">
            Why Choose
            <span className="text-cyan-400"> GameVerse?</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mt-12">

            <div className="text-center">
              <div className="text-5xl">⚡</div>
              <h3 className="font-bold text-xl mt-4">
                Instant Delivery
              </h3>
              <p className="text-gray-400 mt-3">
                Fast game delivery after payment verification.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl">🔒</div>
              <h3 className="font-bold text-xl mt-4">
                Secure Payments
              </h3>
              <p className="text-gray-400 mt-3">
                Safe UPI payments with trusted support.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl">🎮</div>
              <h3 className="font-bold text-xl mt-4">
                Premium Games
              </h3>
              <p className="text-gray-400 mt-3">
                Steam, Rockstar, EA, Ubisoft and many more.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl">⭐</div>
              <h3 className="font-bold text-xl mt-4">
                Trusted Support
              </h3>
              <p className="text-gray-400 mt-3">
                Friendly customer service whenever you need help.
              </p>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}