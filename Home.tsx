import { Button } from "@/components/ui/button";
import { Download, Shield, Clock, Lock, Zap, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * FocusBlock Landing Page
 * Design: Dark theme with purple-cyan gradient accents, premium SaaS aesthetic
 * Animations: Scroll-triggered reveals, staggered card entrances, floating elements
 */

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.6;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(8, 10, 15, 0)";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle with gradient
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        gradient.addColorStop(0, `rgba(124, 58, 237, ${p.opacity})`);
        gradient.addColorStop(1, `rgba(6, 182, 212, ${p.opacity * 0.3})`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.6;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track scroll for navbar blur effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      } as any,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 } as any,
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-card/50 backdrop-blur-xl border-b border-border/30"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <img
              src="/manus-storage/focusblock_logo_5d1e7d7b.png"
              alt="FocusBlock"
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              FocusBlock
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#download">
              <Button
                variant="default"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 overflow-hidden">
        {/* Particle Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 opacity-60"
          style={{ top: 0, left: 0 }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 } as any}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Stop Scrolling.
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Start Doing.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Block distracting apps and websites. Reclaim your focus. Achieve
                more in less time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#download">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 text-base animate-pulse-glow"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download for Windows
                  </Button>
                </a>
                <a href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    See How It Works
                  </Button>
                </a>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
                <Shield className="w-4 h-4 text-purple-400" />
                <span>Free • No account needed • Works offline</span>
              </div>
            </motion.div>

            {/* Right: Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 } as any}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <img
                  src="/manus-storage/focusblock_hero_mockup_bef141c0.png"
                  alt="FocusBlock App"
                  className="w-full drop-shadow-2xl animate-float"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-lg" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem → Solution Section */}
      <section className="py-20 md:py-32 bg-card/30 border-y border-border/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 } as any}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Before & After
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how FocusBlock transforms your productivity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-card border border-border/30 rounded-xl p-8 space-y-6"
            >
              <h3 className="text-2xl font-bold text-red-400">Without Focus</h3>
              <div className="space-y-3">
                {[
                  "Netflix calling your name",
                  "Steam games tempting you",
                  "YouTube rabbit holes",
                  "Social media notifications",
                  "Endless distractions",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-xl p-8 space-y-6"
            >
              <h3 className="text-2xl font-bold text-cyan-400">With FocusBlock</h3>
              <div className="space-y-3">
                {[
                  "Distractions blocked",
                  "Deep work enabled",
                  "Goals achieved",
                  "Time reclaimed",
                  "Productivity soaring",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 } as any}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to stay focused and productive
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Shield,
                title: "Block Any App",
                description: "Block games, streaming services, or any app on Windows",
              },
              {
                icon: Clock,
                title: "Schedule Sessions",
                description: "Set focus sessions with custom durations and schedules",
              },
              {
                icon: Lock,
                title: "Password Protected",
                description: "Prevent yourself from cheating with password protection",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Lightweight app that runs instantly without slowing you down",
              },
              {
                icon: Settings,
                title: "Fully Customizable",
                description: "Create custom block lists for different work scenarios",
              },
              {
                icon: Shield,
                title: "Works Offline",
                description: "No internet required. No account needed. Pure focus.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group bg-card border border-border/30 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <feature.icon className="w-12 h-12 text-purple-400 mb-4 group-hover:text-cyan-400 transition-colors" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 bg-card/30 border-y border-border/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 } as any}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in just 3 simple steps
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                step: "1",
                title: "Download & Install",
                description: "Download the FocusBlock app and install it on your Windows PC",
              },
              {
                step: "2",
                title: "Add Apps to Block",
                description: "Select which apps and websites you want to block during focus sessions",
              },
              {
                step: "3",
                title: "Start Your Session",
                description: "Hit start and lock in. Distractions are blocked until your session ends.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 } as any}
                viewport={{ once: true, margin: "-100px" }}
                className="flex gap-6 md:gap-8 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 text-white font-bold text-lg md:text-xl">
                    {item.step}
                  </div>
                </div>
                <div className="flex-grow pt-2">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 } as any}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-2xl mx-auto text-center space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ready to Reclaim Your Focus?
              </h2>
              <p className="text-lg text-muted-foreground">
                Download FocusBlock now and start your productivity journey
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="YOUR_DOWNLOAD_URL_HERE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 text-base animate-pulse-glow"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download .exe
                </Button>
              </a>
              <a
                href="YOUR_DOWNLOAD_URL_HERE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Download .zip
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>No ads</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400" />
                <span>No tracking</span>
              </div>
            </div>

            <div className="pt-4 text-muted-foreground text-sm">
              <p>✓ 1,200+ downloads • ✓ 4.8★ rating • ✓ Windows 10/11</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-card/30 border-y border-border/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 } as any}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-4">
            {[
              {
                q: "Is FocusBlock really free?",
                a: "Yes! FocusBlock is completely free to download and use. No hidden costs, no premium features.",
              },
              {
                q: "Does it work offline?",
                a: "Absolutely. FocusBlock works entirely offline. No internet connection required.",
              },
              {
                q: "Can I unblock apps during a session?",
                a: "Not without the password you set. That's the whole point—to keep you accountable!",
              },
              {
                q: "Is my data tracked?",
                a: "No. FocusBlock doesn't track, collect, or send any of your data anywhere. Your privacy is protected.",
              },
              {
                q: "Does it slow down my computer?",
                a: "No. FocusBlock is lightweight and optimized for minimal resource usage.",
              },
              {
                q: "Can I customize which apps to block?",
                a: "Yes! You can create custom block lists for different scenarios (work, study, gaming, etc.).",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05 } as any}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-card border border-border/30 rounded-lg p-6 hover:border-purple-500/50 transition-colors"
              >
                <h3 className="font-bold text-lg mb-2 text-purple-400">
                  {item.q}
                </h3>
                <p className="text-muted-foreground">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/manus-storage/focusblock_logo_5d1e7d7b.png"
                  alt="FocusBlock"
                  className="w-6 h-6"
                />
                <span className="font-bold">FocusBlock</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Reclaim your productivity. Block distractions. Achieve more.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#download" className="hover:text-foreground transition">
                    Download
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2026 FocusBlock. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition">
                GitHub
              </a>
              <a href="#" className="hover:text-foreground transition">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
