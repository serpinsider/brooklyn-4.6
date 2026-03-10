import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-serif font-bold bg-gradient-to-r from-[#dfbd69] to-[#926f34] bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-white/70 mb-8 text-lg">
          Sorry, we couldn't find the page you're looking for. Let us help you find what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-slate-900 transition-all duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #dfbd69 0%, #926f34 100%)' }}
          >
            Back to Home
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white border border-[#dfbd69] hover:bg-[#dfbd69]/10 transition-all duration-200"
          >
            Get a Quote
          </Link>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/50 text-sm mb-3">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/services/deep-clean" className="text-[#dfbd69] hover:text-[#dfbd69]/80 transition-colors">Deep Cleaning</Link>
            <span className="text-white/20">|</span>
            <Link href="/services/move-out" className="text-[#dfbd69] hover:text-[#dfbd69]/80 transition-colors">Move Out Cleaning</Link>
            <span className="text-white/20">|</span>
            <Link href="/locations" className="text-[#dfbd69] hover:text-[#dfbd69]/80 transition-colors">Service Areas</Link>
            <span className="text-white/20">|</span>
            <Link href="/booking" className="text-[#dfbd69] hover:text-[#dfbd69]/80 transition-colors">Book Online</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
